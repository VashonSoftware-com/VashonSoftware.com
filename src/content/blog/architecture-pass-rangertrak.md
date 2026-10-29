---
title: '"No spaghetti" as a check, not a hope: an architecture pass on a live Angular app'
description: "Three answers to one question, a decision record that had quietly stopped, and no linter at all. How we added a business-rules layer to RangerTrak without a rewrite, and what still didn't work."
pubDate: 2026-11-03
tags: ["architecture", "angular", "eslint", "rangertrak"]
series: { name: "Architecture in practice", part: 1 }
---

[RangerTrak](https://rangertrak.com) is an offline-first Angular app that emergency-response
volunteers (CERT, search and rescue, amateur radio) use in the field to track teams, locations
and radio traffic. It runs on whatever phone or laptop is at hand, often with no network, and
people rely on it during real incidents. The code is open source under the AGPL:
[github.com/SteadyEOC/RangerTrak](https://github.com/SteadyEOC/RangerTrak).

This post is about one month of architecture work on it, from 1 October to 29 October 2026,
with the numbers measured on the days they happened. The short version: **we made "no
spaghetti" a check the build enforces, rather than a hope the team holds.** Most of that worked.
One part didn't, and I'll show that too.

## It started with a product question

The architecture pass didn't start as an architecture question. A tester couldn't find the
demos one evening, which led to a product question: how can the app tell when someone is using
it for real (an exercise or an incident), so it can stay out of the way, and when the device
holds nothing real, so the demos are easy to find?

In the same breath I asked the other question I'd been carrying around: *am I getting a pile of
spaghetti code? Do we need a review of coupling before beta?*

Answering the first question answered the second. Looking for where the app decided "is this
data real?" turned up:

- **Three answers to one question.** It was decided in three places, three different ways: a
  `canLoadDemoData()` check on the Entry page, an "untouched sample roster" check in the
  readiness pill, and a demo-scenario marker in `localStorage`. None of them handled real
  entries typed on top of a demo. Nobody had done anything wrong. Each feature had reasonably
  added its own check, which is exactly how spaghetti grows.
- **A decision record that had quietly stopped.** The architecture decision log's last entry
  was nine days old. In those nine days at least six real decisions had been made (IndexedDB
  with encryption at rest, a backup-compatibility gate, a storage freeze before beta, and
  others) and recorded only in roadmap lines, handoff notes and code comments.
- **No linter at all.** `npm run lint:ts` called tslint, which was deprecated in 2019 and
  wasn't even installed. CI ran only the type checker. No rule about structure could be
  enforced anywhere; the architecture was held together by memory and good intentions.
- **One god class.** The Leaflet map component was 2,507 lines that morning and 2,852 by the
  evening, after one day's print feature. Every other large file was 1,000 to 1,200 lines.
- **A good pattern already in the code.** A few rules (overdue timers, coordinate formats,
  print layout) were already plain, framework-free TypeScript with unit tests. The healthy
  shape existed; it just wasn't the rule.

## What we recommended, and what we didn't

The recommendation was **incremental and enforced, not a rewrite**:

1. **Catch up the decision record** first. Seven entries were drafted that evening, each citing
   its source and saying "not recorded" where the record was silent, rather than inventing a
   rationale after the fact.
2. **A framework-free `src/app/domain/` layer** for business rules: no Angular, no map library,
   no DOM, no storage.
3. **Enforce it with tooling.** Replace the dead tslint with ESLint and add import-boundary
   rules, checked in CI.
4. **Split the god class** into the component plus controllers, with behaviour unchanged and the
   end-to-end map tests as the safety net.
5. **One inventory of everything stored on the device**, with a test that fails if a storage key
   appears without an entry.

Just as deliberate was what we *didn't* recommend before beta: no state-management framework
(NgRx), and no split into libraries or a monorepo. Both are reasonable tools. Neither addressed
the problem we had found, which was rules scattered across components with nothing to stop
them scattering further. A small team gets more from one enforced boundary than from a new
framework to learn.

The product feature itself became the first thing built *inside* the new layer. "Is this data
real?" now lives in one file, `domain/usage-state.ts`, covered by a table-driven spec of 18
cases. The three old checks are gone, and everything reads one service:

```ts
/**
 * "Is this device being used for something real?" decided in ONE place.
 * Pure rules - no Angular, Leaflet, DOM or storage imports - so the
 * table-driven spec can run every case without a browser.
 *
 * States, from least to most "stay out of the way":
 *   empty  - nothing on the device
 *   demo   - only demo data
 *   setup  - a real mission is being prepared, nothing logged for real yet
 *   live   - real use now or imminently: be quiet
 * `live` beats everything: the safe mistake is being quiet.
 */
export type UsageState = 'empty' | 'demo' | 'setup' | 'live'
```

Architecture and feature arrived together, instead of the feature adding a fourth check.

## Enforce first

ESLint went in on 5 October, with the recommended Angular and TypeScript rule sets and two
boundary rules of our own:

- `domain/` imports only `domain/` (plus type-only `*.interface` files), and nothing from a
  framework or storage.
- Components never import `shared/storage/` or touch `localStorage`; they go through a service.

Here is the first one, trimmed, from
[`eslint.config.mjs`](https://github.com/SteadyEOC/RangerTrak/blob/main/eslint.config.mjs):

```js
{
  files: ['src/app/domain/**/*.ts'],
  ignores: ['src/app/domain/**/*.spec.ts'],
  rules: {
    '@typescript-eslint/no-restricted-imports': ['error', {
      patterns: [
        { group: ['@angular/*', 'rxjs', 'rxjs/*', 'leaflet', 'leaflet.*', 'maplibre-gl'],
          message: 'domain/ is framework-free (ADR D-57).' },
        { group: ['../**', '!../**/*.interface'],
          message: 'domain/ may import only domain/ (and type-only *.interface files).' },
        { group: ['../**/*.interface'], allowTypeImports: true,
          message: 'domain/ may use *.interface files as types only.' },
      ],
    }],
    'no-restricted-globals': ['error',
      { name: 'localStorage', message: 'Persistence lives in services, not domain/.' },
      { name: 'indexedDB',    message: 'Persistence lives in services, not domain/.' }],
  },
},
```

Each message names the decision record entry, so whoever trips the rule can find out why it
exists.

The recommended rule sets reported **616 warnings and 0 errors**. The boundary rules found
**8 violations in 5 components**: three components imported a storage singleton just to flush
it before a reload, when an injectable wrapper already existed, and two read and wrote UI
preferences straight from `localStorage`. All eight were fixed the same day, without moving
anything stored.

Then we **proved the rules could fail**. A throwaway probe file in each zone (an Angular import
and `localStorage` in `domain/`; the storage singleton in a component) had to trip every rule
before we believed a clean run meant anything. Then the probes were deleted.

With zero hits, the boundary rules went straight to **errors that gate the deploy**. The 616
recommended-set warnings stayed warnings. Keeping the two apart mattered: a 616-item backlog
couldn't be allowed to block the one rule that protects the architecture.

## Then move

On 12 October the business rules moved out of the components: overdue rules, station labels,
print-layout geometry, coordinate parsing, status colours, and the stored-data migrations for
settings, radio log, roster and more. Six commits. `domain/` went from 6 entries to 26 in a day.

What made that safe wasn't care. It was the order. The boundary rules were already errors, so
every moved file had to drop its framework and storage imports to pass. **A move that leaked
didn't build.** That turned a risky refactor into a checked one.

The same day, the map component was split into three controllers (overlays, print, offline
saving). It went from **2,864 lines to 1,365**.

## The test of a layering

The real test of a layer isn't whether you can move code into it. It's whether new code lands
there without anyone asking.

Between 15 and 23 October, five features were built: map layers held on the device, a mission
summary, the rules for photo attachments, a simple/full view switch, and a hash-chained
mission journal. Every one started as a pure rule file in `domain/` with its spec, and the UI
came after. Nobody asked for that; it had become the obvious place to start. Within a week,
`domain/` went from "where we moved the rules" to "where we begin". As of 29 October it holds
**44 files**, not counting specs.

The boundary has also held: **0 errors across 468 files** on 29 October, after three weeks of
heavy feature work.

## What didn't work

Two things.

**Warnings grew.** The plan was to fix the 616 recommended-set warnings as files were touched.
That never happened, because nothing made it happen. On 29 October the count is **702**, up 14%.
`prefer-inject` went from 200 to 252; `no-explicit-any` from 136 to 179. The rules that gate
the deploy held at zero; the rules that only warn grew. A warning nobody is made to act on is
decoration.

**The god class came back.** The map component went **2,864 → 1,365 → 1,521** lines in two
weeks as features landed. Extracting code once is a cut, not a cure. Without a size budget, or
a rule about what belongs in the component, a big file pulls new code back in.

Both failures have the same shape as the original problem: a rule that lived in people's heads
rather than in the build.

## A smaller lesson along the way

One more pattern turned up three times in the month. An end-to-end test helper kept its own
hand-written copy of the app's list of stored records; it drifted and missed two. A test tool
kept its own assumption about which dialogs open when a demo loads; when one dialog was
removed, the tool quietly wrote a plaintext file labelled "encrypted". And the storage
inventory was a document until CI started checking it against the code.

The fix was the same each time: **copies of knowledge rot, so derive them from the source or
assert them in CI.** That deserves its own post, and will get one.

## What's next

Both failures point at the same fix: turn the hope into a check.

- **A warning ratchet.** CI records the current warning count per rule and fails if any count
  goes up. The backlog can then only shrink, with no big cleanup day. Several rules can be
  auto-fixed to zero in one commit.
- **A size budget on hot components.** For example, fail CI if the map component passes 1,600
  lines, so the next split happens on purpose.

I'll report back on whether the ratchet works.

## The takeaways

- **Turn on enforcement before the refactor.** It makes the refactor checkable.
- **Separate the rule that protects the architecture from the style backlog.** Gate the first;
  ratchet the second.
- **Prove a check can fail** before trusting it when it passes.
- **A layer works when new code lands in it unasked.**
- **Write the numbers down on the day.** "It got smaller" won't carry an argument;
  "2,864 → 1,365 → 1,521" will.

None of this needed a new framework or a rewrite. It needed one boundary, enforced by the build,
on a live app that people were using the whole time.

---

*Numbers are as of the dates given, from the public repository. I worked through this with
Claude (Anthropic's AI model) as a pair: it helped find the duplicate checks, drafted the
decision-record entries and the lint configuration, and ran the measurements. The
guidance, recommendations and decisions are mine, and I reviewed every change.*
