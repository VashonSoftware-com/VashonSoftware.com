---
title: "Data in, answer out: what seven weeks of a pure domain layer bought"
description: "In October, RangerTrak's business rules moved into a framework-free folder that the build polices. Seven weeks later it holds 65 files, 97% line coverage and the app's hardest rules. What paid off, what it cost, and the one thing it didn't fix."
pubDate: 2026-12-29
tags: ["architecture", "angular", "testing", "rangertrak"]
series: { name: "Architecture by the numbers", part: 2 }
---

In [part 1](/blog/measuring-an-angular-app-instead-of-guessing) I measured
[RangerTrak](https://rangertrak.com), an offline-first Angular field app, instead of guessing at
its shape. The measurement had one clear winner: the `domain/` folder, the app's business
rules, sat at an instability of 0.05. Almost everything depends on it; it depends on nothing at
runtime.

That folder didn't exist at the start of October. [The first architecture
pass](/blog/architecture-pass-rangertrak) created it, made the build enforce its boundary, and
moved the first rules in. By the end of October it held 44 files. On 2026-11-20 it held 65:
5,713 lines of code, 86% of files with a spec beside them.

This post is about what that layer actually bought, seven weeks on, and what it didn't.

## The rule: data in, answer out

A file in `domain/` is plain TypeScript. No Angular, no services, no `inject()`, no
`localStorage`, no IndexedDB, no DOM. It takes values and returns values. An ESLint
import-boundary rule enforces it and gates the deploy.

Since 2026-11-20 the rule is stricter: `domain/` may import only `domain/`. Before that it was
allowed type-only imports from the services folder, because that's where the data model
interfaces lived. Part 4 covers why that exception existed and why it's gone.

Here is the kind of thing that lives there: the rule for which team a radio log entry belongs
to.

```ts
/** The team to stamp on a new entry: the From ranger's roster team, or undefined. */
export function teamAtSave(rangerUid: string | undefined, roster: RosterLike): string | undefined {
  if (!rangerUid) return undefined
  const team = roster.find(r => r.uid === rangerUid)?.team?.trim()
  return team || undefined
}

/** The team an entry shows: the one recorded when it was logged, else the roster team now. */
export function entryTeam(entry: { team?: string; rangerUid?: string }, roster: RosterLike): string {
  const recorded = entry.team?.trim()
  if (recorded) return recorded
  return teamAtSave(entry.rangerUid, roster) ?? ''
}
```

Small, boring, and it carries a real decision. When a volunteer moves from one team to another
mid-mission, their earlier log entries should still show the old team, because that's what the
log said at the time and what an after-action review needs. So the team is recorded when the
entry is saved, not looked up from the roster when it's shown. In a log, history beats
normalization. The decision is in the file header, next to the code that carries it out, and
nowhere else.

## What it bought

**Tests that are cheap enough to write.** Once the coverage report existed (it came in with the
pre-1.0 fixes on 2026-11-20), the numbers by layer were:

| Layer | Line coverage |
| --- | ---: |
| domain | 97% |
| infrastructure (storage, export, mapping) | 81% |
| services | 76% |
| UI widgets | 68% |
| map engines | 46% |
| pages | 46% |

That's the right shape, and it isn't because anyone was more diligent about the rules than
about the pages. A pure function needs no test bed, no fake services, no change detection. You
call it with a value and compare the answer. When testing costs that little, it gets done. The
pages are carried by an end-to-end suite instead, which is the right tool for them.

**Table-driven specs for the hard rules.** The rules that scare me most are in `domain/` and are
tested as tables: merging radio log entries from a field phone's report packet, migrating
records saved by older versions, assigning message numbers, parsing coordinate formats, deciding
map layers. A table of inputs and expected answers reads like a specification, and adding a case
when a tester finds one is a one-line change.

**New code started there unasked.** I noted this in the first pass and it held. The features
built since (a call sign directory import, field report receipts, resource requests, undo
history) all put their rules in `domain/`. The folder is no longer where rules were moved
*to*; it's where they start.

**Network behavior you can test without a network.** RangerTrak can publish its log to a
read-only remote viewer, RangerView, run by a small web server on the local network. The
publishing has real states: claim the viewer, get a key, lose it when the server restarts,
claim again, find that another device has taken over. The app's half of that protocol is
`domain/board-client.ts`: the pure parts of the publishing service, with no fetch, no storage
and no timers. So the whole claim, re-claim and replaced story is tested as plain function
calls, no server needed. The service around it just does the I/O.

## What it cost

Not much, but not nothing.

- **Values have to be passed in.** A rule that needs "the location an entry carries when it has
  no location" can't import the app's constant if that constant lives outside `domain/`. It
  takes it as a parameter. A rule that needs the time takes an optional clock. Slightly longer
  signatures, in exchange for rules you can test without mocking anything.
- **The model lived in the wrong place for seven weeks.** The data interfaces stayed in the
  services folder, so the most stable layer pointed at a less stable one for its types: 29
  type-only imports. Harmless at runtime, but it meant the model sat beside the code that saves
  it rather than beside the rules that define it.

## The one thing it didn't fix

The rules moved. **The step that uses them didn't.**

Saving a radio log entry means: read the mission and the roster, resolve who it's from and to,
stamp the team and the operator, pick the default status, attach the optional fields, save.
Every one of those rules was a pure function in `domain/`. The step that gathers the inputs,
applies them in order and calls save still lived inside a page component.

That was fine while there was one screen that saved entries. Then a second screen needed the
same step, and it was copied. That's the subject of [part 3](/blog/the-second-form-that-copied-the-first).

## The takeaways

- **"Data in, answer out" is a rule a linter can enforce.** That's most of why it held.
- **Cheap tests get written.** Domain coverage is 97% because the tests cost nothing to write,
  not because anyone tried harder.
- **Put the decision next to the code.** The team-at-save rule explains itself in its header,
  where the next person will actually read it.
- **A rules layer isn't an application layer.** Moving the rules out of components is half the
  job. The steps that apply them need a home too.

---

*Numbers are as of 2026-11-20, from the public repository
([github.com/SteadyEOC/RangerTrak](https://github.com/SteadyEOC/RangerTrak)).*
