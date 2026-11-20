---
title: "God components in a field app, and why we're not splitting them yet"
description: "RangerTrak's Radio Log component injects 24 dependencies and does four jobs. The map component was split from 2,864 lines to 1,365 in October, regrew, and shrank again. What a component split actually needs to stick, and why the big ones wait until after 1.0."
pubDate: 2027-01-19
tags: ["architecture", "angular", "refactoring", "rangertrak"]
series: { name: "Architecture by the numbers", part: 5 }
---

Every app that lives long enough grows a few components that do everything. In
[RangerTrak](https://rangertrak.com), an offline-first Angular app for emergency command posts,
there are three. They're the three screens people use most during an incident, which is not a
coincidence and is also why I'm in no hurry to cut them up.

This is the last developer post in the series. The earlier parts covered
[measuring the app](/blog/measuring-an-angular-app-instead-of-guessing), its
[pure rules layer](/blog/data-in-answer-out), the
[save step that got copied](/blog/the-second-form-that-copied-the-first) and the
[layer check](/blog/shared-is-not-an-architecture). This one is about weight.

## The three

From the measurement on 2026-11-20, with code lines meaning non-blank, non-comment TypeScript:

| Component | Code lines | Template lines | Injected | Branches |
| --- | ---: | ---: | ---: | ---: |
| Radio Log | 1,225 | 534 | 24 | 232 |
| Entry | 975 | 892 | 20 | 191 |
| Rangers (the roster) | 854 | 357 | 14 | 148 |

For context: of 92 components, 13 are over 300 code lines and 12 inject ten or more
dependencies. The median component is small. These three are not.

Each has a spec, and an end-to-end suite drives all three. They aren't untested and they aren't
broken. They're heavy.

## Weight isn't the problem; jobs are

Line counts tell you where to look. What you find when you look is the number of *jobs*.

The Radio Log component does four:

1. **It configures the grid.** `buildColumnDefs` and its helpers are about 360 lines of column
   definitions, formatters and cell styling.
2. **It runs the report packet merge.** When a field phone sends its reports, the scribe merges
   the packet into the log: `mergePacketFile`, `finishPacketMerge`, `finishBatchMerge`,
   `showMergeSummary`. The merge *rules* are pure functions in `domain/entry-merge.ts`, tested as
   a table. The *workflow* around them (pick the file, check it, ask the user, apply, summarize,
   offer a receipt) lives in the component.
3. **It runs the shift hand-over.** `onHandoverFileSelected`, `applyHandover`: the same shape
   again, a multi-step flow with prompts in the middle.
4. **It decides what prints and exports.** `reportsForPrintScope`, `onBtnPrint309`,
   `onBtnExport`.

That's why it needs 24 injected dependencies. No single job needs that many; together they do.

This is the same gap as [part 3](/blog/the-second-form-that-copied-the-first), one level up. The
rules moved out. The workflows that string the rules together, with I/O and dialogs between the
steps, didn't, because they had nowhere to go.

## The split that worked, and what happened next

RangerTrak has done this once. On 2026-10-01 the Leaflet map component was 2,864 lines. In the
[first architecture pass](/blog/architecture-pass-rangertrak) it was split into the component plus
three controllers (overlays, print, offline saving), each in its own file. That took it to
1,365 lines.

Then the history, by line count of the whole file:

| Date | Lines | What happened |
| --- | ---: | --- |
| 2026-10-01 | 2,864 | before the split |
| early October | 1,365 | after the split into controllers |
| 2026-10-29 | 1,521 | new features landed in the component |
| 2026-11-11 | 1,660 | more of the same |
| 2026-11-17 | 1,518 | a new feature moved old code out |
| 2026-11-20 | 1,521 | (783 code lines, 10 injected) |

Two lessons in that table.

**A split is a one-time cut, not a cure.** After the split, new map features went back into the
component, because that's where the map was. It regrew 22% in six weeks. I wrote about this in
the first post and suggested a size budget in CI. I didn't build one, and the regrowth is what
that costs.

**The shrink came from a feature, not a cleanup.** On 2026-11-17 the app got a "Go to my location"
button on both map engines. Doing that properly meant pulling the existing locate control,
about 140 lines, out of the component into its own file with its own 61-line spec, so the
second engine could have the same behavior. The component lost 151 lines in a commit whose goal
was a button. The best time to split a component is when a feature needs a piece of it somewhere
else. That's when the seam is real and the move pays for itself.

## The plan, after 1.0

| Component | Split | Target |
| --- | --- | --- |
| Radio Log | the packet and hand-over workflows to a `RadioLogImportFlow` service; column config to `radio-log-columns.ts`; print and export scope as domain functions | under 500 code lines, under 12 injected |
| Entry | form state stays; submit goes through the shared entry builder from part 3; the ICS-213, resource request and evidence sections become child components | under 500 code lines, template under 400 |
| Rangers | the roster import workflow moves out | under 500 code lines |

The Entry split has an obvious seam already: the optional sections are separate panels in the
template, opened one at a time. They'll become components with an input and an output each.

## Why not now

Because of where the churn would land.

RangerTrak is heading for 1.0. Testers are about to hand-test the release on their own phones
and laptops, in exactly these three screens. A split that keeps behavior the
same still moves code in the screens people are testing, and in a field app the cost of a
regression isn't a support ticket. It's a scribe at a command post who can't log a call.

The end-to-end suite is good, and I'd trust it for a split. But "trust the tests" is a bet, and
the payoff of splitting now is small: a 1,225-line component doesn't get worse by sitting still.
What *does* get worse by waiting is anything that multiplies, like the copied save step in part 3,
which would have been copied again by the next two layouts. That went in before 1.0, the same
day it was found.

So the rule I've settled on: **before a release, fix what multiplies. After it, fix what's merely
big.**

## What a split needs to stick

From doing it once, and watching it partly undo itself:

- **Somewhere for the extracted code to live**, with a name. Controllers for the map; workflow
  services for Radio Log. Without a destination, new code goes back to the component.
- **A spec per extracted piece**, so it's cheaper to add code there than in the component.
- **A budget the build checks.** Not as a hard wall: a line in CI that fails when a hot component
  passes its target, so the next split is a decision rather than a surprise.
- **A feature to ride on**, when you can get one. The cheapest split is the one a new feature
  needs anyway.

## The takeaways

- **Count jobs, not lines.** Radio Log's 24 dependencies come from four jobs, none of which needs
  that many alone.
- **Rules moving out doesn't move workflows out.** Multi-step flows with prompts need their own
  home: small services per feature.
- **A split regrows without a budget.** Mine did, by 22%.
- **Split when a feature needs the piece elsewhere.** That's when the seam is real.
- **Before a release, fix what multiplies; after it, fix what's merely big.**

That's the series. The short version of all five posts: measure, find the one thing that
multiplies, fix it before the next copy, and leave a check behind so the result outlives the
review.

---

*Code and numbers are from the public repository
([github.com/SteadyEOC/RangerTrak](https://github.com/SteadyEOC/RangerTrak)), as of 2026-11-20.*
