---
title: "Measuring a 55,000-line Angular app instead of guessing"
description: "One 120-line script, an import graph and Robert Martin's instability metric answered an architecture question that would otherwise have been argued from memory. What the numbers showed about RangerTrak, and what they can't tell you."
pubDate: 2026-12-22
tags: ["architecture", "angular", "metrics", "rangertrak"]
series: { name: "Architecture by the numbers", part: 1 }
draft: true
---

Late one evening I asked a question about my own app that I couldn't answer from memory: *do
we need to separate the input forms from the business rules, from the display views, from the
extras?* I had opinions. Opinions are cheap, and they come from whatever you touched last week.
So the next day I measured instead.

The app is [RangerTrak](https://rangertrak.com), an offline-first Angular app that emergency
volunteers (CERT, search and rescue, amateur radio) use to log radio traffic and track teams in
the field. It is open source under the AGPL at
[github.com/SteadyEOC/RangerTrak](https://github.com/SteadyEOC/RangerTrak). Seven weeks earlier
I wrote about [the first architecture pass](/blog/architecture-pass-rangertrak), which added a
framework-free business-rules layer and made the build enforce it. This series picks up from
there, with numbers.

This post is about the method. The rest of the series is about what it found.

## The size of the thing

As of 2026-11-20, `src/app` holds 319 TypeScript files, not counting specs: 55,218 lines. There
are 92 components and 53 services. The app also has code outside `src/app` (a read-only viewer,
a Cloudflare Worker, some field tools), which I counted but didn't graph, because it talks to
the app through one data contract and nothing else.

That is too big to hold in your head and too small to justify a tool you have to buy or learn.
It is about the right size for one script.

## The script

About 120 lines of Node. No dependencies beyond `fs` and `path`. It does four things.

**1. Draw areas.** Each top-level folder under `src/app` is one area: `entry`, `map`,
`radio-log`, `domain` and so on. The catch-all `shared/` folder is split one level down
(`shared/services`, `shared/storage`, `shared/export`, and so on), because "shared" isn't one
thing, and treating it as one would hide exactly what I was looking for.

**2. Build the import graph.** Read every relative `import` and `export ... from` in non-spec
files, resolve each to a file, and map both ends to an area. Type-only imports are flagged
separately, because a type-only edge disappears at runtime and means something different from a
real one.

**3. Score each area.** Robert Martin's package metrics, applied to folders:

- **Ca** (afferent coupling): how many other areas depend on this one.
- **Ce** (efferent coupling): how many other areas this one depends on.
- **Instability**, I = Ce / (Ca + Ce). An area near 0 is leaned on by everyone and should hold
  stable things: models and rules. An area near 1 is a leaf, free to change: pages.

**4. Weigh each component.** Code lines (non-blank, non-comment), template lines, injected
dependencies (`inject()` calls plus constructor parameters), and a branch count (`if`, `switch`,
`?:`, `&&`, `||`, `??`) as a rough proxy for decisions made in place. Plus whether a `.spec.ts`
sits beside the file.

That's it. No AST, no build step: a regex over import lines was enough at this size, and
simple enough that I could check its output by hand on a few files.

## What the shape looked like

The headline was the instability column, and it was the shape you'd want:

| Area | Role | I |
| --- | --- | ---: |
| `domain` | business rules | 0.05 |
| `shared/services` | state and persistence | 0.28 |
| `shared/storage` | IndexedDB, encryption | 0.40 |
| `entry` | the main input form | 0.89 |
| `radio-log`, `rangers`, `mission` | pages | 1.00 |

Rules at the bottom, pages at the top. This is the stable-dependencies principle working: things
depend in the direction of stability. It was not true seven weeks earlier, when there was no
rules layer to sit at the bottom.

There were also zero import cycles across all 319 files, and no component touched
`localStorage` directly. Both were already checked in CI.

## What it found that nobody had noticed

Two things, and these are the reason to measure rather than review by eye.

**Folders that import each other both ways.** There were no file-level cycles, but at folder
level `shared/services` and its neighbors went both ways: services to storage 27 imports and
storage back to services 2; export 4 and 23; mapping 7 and 7; UI 2 and 49. So the `shared/`
subfolders looked like layers in the file tree and weren't layers in the code. No cycle checker
would ever flag that, because each individual edge is legal.

**The most important write in the app took a string.** The hub list (most-imported files,
most-injected services) led me to `RadioLogService.addRadioLogEntry(formData: string)`. It took
JSON text. All 11 callers built an object, `JSON.stringify`'d it, and the service parsed it back.
The single most important save in a logging app had no type checking at all. It worked, every
test passed, and so nobody looked.

## What the numbers can't tell you

The metrics pointed at places. They didn't say what was wrong with them. Some limits worth
being honest about:

- **They can't see duplicated meaning.** The biggest finding of the whole pass (part 3 of this
  series) was that two screens built the same record by hand, field for field. No metric
  flagged it. I found it by reading the two places the numbers sent me to.
- **Ca and Ce count areas, not imports.** An area that imports one helper from a neighbor scores
  the same as one that imports forty. I kept the raw import counts beside the metric for that
  reason.
- **Branch count is a proxy.** A component with 232 branches is probably making decisions that
  belong elsewhere. Probably. A form with many optional fields has many honest `if`s.
- **A heavy component isn't automatically wrong.** Twenty-four injected dependencies is a
  signal to go and read the file. It's not a verdict.
- **Line coverage was unmeasurable.** The coverage plugin wasn't installed, so all I had was
  "has a spec file or not". That became one of the fixes.

Martin's metrics were designed for packages with published interfaces, not folders in one app.
Applied to folders they're a map, not a grade. A map was what I needed.

## From a script to a check

The script lived in a scratch folder and wasn't committed. That was deliberate for the first
run: a measurement you're still deciding how to read shouldn't become a gate yet.

The useful part of it didn't stay there. The plan that came out of the pass ended with a CI
check (`npm run check:layers`) that encodes the allowed directions between areas and fails the
build when an import points the wrong way. Part 4 covers it. An architecture review that leaves
no check behind decays by the time of the next one; I learned that from the first pass, where
the rule the build enforced held at zero and the rules that only warned grew.

## The takeaways

- **A cheap script beats an argument from memory.** One evening of measurement settled questions
  I'd have otherwise debated with myself for a week, and found two things I'd never have looked
  for.
- **Split the junk drawer before you measure it.** Treating `shared/` as one area would have
  hidden the two-way dependencies entirely.
- **Flag type-only imports.** They change what an edge means.
- **Let the numbers choose where to read, not what to conclude.** The biggest finding came from
  reading code the metrics pointed at.
- **Date every number.** These are as of 2026-11-20, commit `5b137dd3`. Some have already
  changed, because the fixes went in the same day.

Next: [what seven weeks of a pure business-rules layer actually bought](/blog/data-in-answer-out).

---

*Numbers are as of 2026-11-20, from the public repository.*
