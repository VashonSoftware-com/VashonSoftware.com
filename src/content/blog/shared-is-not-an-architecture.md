---
title: '"Shared" is not an architecture'
description: "A catch-all folder depended on by 18 of 21 areas, two barrels that hid a 26-file import circle, folders that import each other both ways, and the data model filed under services. How RangerTrak turned its layers into a CI check that lists every known exception and fails when the list could shrink."
pubDate: 2027-01-12
tags: ["architecture", "angular", "ci", "rangertrak"]
series: { name: "Architecture by the numbers", part: 4 }
---

Every Angular app I've worked on has a `shared/` folder, and in every one it started as a good
idea. A widget two pages use goes in `shared/`. A service three pages inject goes in `shared/`.
Five years later `shared/` is the biggest folder in the app, and the name tells you only one
thing about what's in it: more than one place uses it.

That's a fact about the callers, not about the code. **"Shared" names who uses something, not
what it is.** This post is about what that cost [RangerTrak](https://rangertrak.com), an
offline-first Angular field app, and the check that now keeps its layers honest.

## What was in the drawer

When I [measured the app](/blog/measuring-an-angular-app-instead-of-guessing) on 2026-11-20,
`shared/services` alone held 50 files, 7,486 lines of code and 38 services. Eighteen of the 21
areas depended on it. In it, side by side:

- **The core state:** the mission, the radio log, the roster.
- **The data model:** the interfaces for a radio log entry, a mission, a ranger, a place. So
  `domain/`, the app's most stable layer, pointed at the services folder for its types.
- **Product extras:** the demo data (`sample-data.service`, 1,139 lines), the service that
  publishes to the remote viewer (849 lines, no spec), offline basemaps, pop-out window sync.

The rest of `shared/` was storage, export, mapping, attachments, help, UI widgets and loose
utility files. Some of those were real layers. The measurement showed that several weren't:
`shared/services` and its neighbors imported each other in both directions. Services to storage
27 imports, storage back to services 2. Export 4 one way, 23 the other. Mapping 7 and 7. UI 2
and 49. No file-level cycle, so nothing failed. They just weren't layers.

## The barrels

Two barrel files made it worse: `shared/services/index.ts`, imported 62 times, the most-imported
file in the app, and `shared/index.ts`, which re-exported components and map helpers together.

Barrels feel tidy. One import line instead of five. What they actually do is widen every import:
ask for one function and you depend, at module-load time, on everything the barrel re-exports.

On 2026-11-10 that stopped being theoretical. The unit tests were moving from Karma to Vitest,
and once Vitest split the test bundle into chunks, eight test files failed with an error ending `reading 'ɵcmp'`: Angular looking for a
component definition on something that was still `undefined`. The cause:

- The header component imported a utility class through `shared/index.ts`.
- That same barrel re-exported the header component and the page component.
- When the barrel happened to load first, the page component read the header component before
  it existed.

Meanwhile, eight services imported their siblings through `./`, the services barrel, closing a
26-file circle that nobody had noticed because it worked in the old load order.

The fix was dull: import each name from its own file. The useful part was the check that came
with it, `npm run check:cycles`, which fails the deploy on any circle among value imports and was
proved red on the old header import before it went in. Bonus: with chunk splitting back on, the
unit suite went from about 31 seconds to about 12.

A cycle check catches circles. It doesn't catch the folder-level two-way traffic above, because
each edge on its own is legal. That needed a different check.

## Three small moves

The plan from the measurement had three moves for this, all behavior-neutral, all done on
2026-11-20:

**The model moved to `domain/model/`.** Seven interface files, moved with `git mv`. No
re-export shims at the old paths. The services barrel re-exports from the new place for anyone
still using it. Then the lint rule that guards `domain/` lost its exception: it used to allow
type-only imports from the services folder, and now `domain/` may import only `domain/`. Proved
red with a probe import before it was trusted.

**The map engines stopped importing each other.** The app has two map folders, `map/` (the map
page, with the MapLibre engine) and `mapLeaflet/` (the Leaflet engine), and they imported each
other: 5 imports one way, 2 the other. The location dialog, the print furniture and the heat-map points were shared map
infrastructure filed under one feature. They moved to a new `map-core/` area.

**The rule judged the refactor, not just the code.** As planned, `MapEngineService` would also
have moved to `map-core/`. The new layer check (next section) showed that would only rename one
bad edge, services → map, into another, services → map-core. `MapEngineService` injects
`MissionService`. It *is* a service. So it went to `shared/services` instead. I'd planned it
wrong, and the check said so before the commit, not in review.

## The check: layers as a table

`tools/check-layers.js`, run as `npm run check:layers` in the deploy workflow, is about 140 lines.
It gives every folder under `src/app` a layer and requires imports to point down:

| Layer | What's in it |
| --- | --- |
| 0 domain | business rules and the model |
| 1 util | loose helpers, crypto |
| 2 infra | storage, export, mapping |
| 3 services | app state |
| 4 ui | widgets, attachments, help, `map-core` |
| 5 engines | the Leaflet map engine |
| 6 pages | entry, map, mission, radio log, roster, ... |
| 7 app | the shell |

Same-layer imports are allowed, except page to page: pages don't import each other. A folder
with no layer fails the check too, so a new folder can't slip in unclassified.

Two things about it I'd do again on any project.

**The first run found what the review missed.** The hand-built dependency matrix had listed
every wrong-way edge I knew of. The check found one more: a map helper in the infra layer that
read the demo map regions from a service. A review gives you the edges somebody looked at; a
check gives you all of them.

**Known debt is listed by file, and the list can only shrink.** Eleven wrong-way edges existed on
the day. They weren't fixed, because fixing them properly is the post-1.0 re-filing of
`shared/services`. Instead of a blanket exemption, each one is a line with a reason:

```js
const KNOWN = {
  'shared/mapping/demo-map.ts -> shared/services': 'demo config, not map code; goes to a demo/ area (Q4)',
  'shared/services/global-error-handler.ts -> ui': 'opens the feedback component on an error',
  'shared/guide/guide-drawer.component.ts -> pages': 'the guide drawer shows help tabs from lazy/help',
  // ... eight more
}
```

A new wrong-way import fails the build. And so does a `KNOWN` entry that no longer happens: if
someone fixes an edge and forgets to delete its line, the check tells them to delete it. The
exemption list is a to-do list that can't grow and can't go stale.

On 2026-11-20 it reported: 859 cross-area imports among 320 source files, all pointing down,
11 known exceptions.

## What's left

The drawer isn't empty. After 1.0 the plan is to re-file `shared/services` by feature (radio
log, mission, roster, device preferences, publishing, demo data) and retire both barrels, with
a simple target: nothing stays in `shared/` that fewer than two areas import. Each move should
delete lines from `KNOWN`. The check will say when it's done.

## The takeaways

- **Name folders for what's in them, not for who uses them.** "Shared" is a symptom, not a
  layer.
- **Barrels widen every import.** They hid a 26-file circle until a bundler change exposed it.
- **A cycle check isn't a layer check.** Folders can trade imports both ways with no file cycle.
- **Write the layers down as a table the build reads.** Then a refactor is judged by the same
  rule as the code.
- **Grandfather by file, with a reason, and fail on stale entries.** Known debt becomes a list
  that can only get shorter.

Next: [god components in a field app](/blog/god-components-in-a-field-app).

---

*Code and numbers are from the public repository
([github.com/SteadyEOC/RangerTrak](https://github.com/SteadyEOC/RangerTrak)), as of 2026-11-20.*
