---
title: "The second form that copied the first"
description: "RangerTrak's business rules were pure functions with 97% coverage. Then a second entry screen needed the same save step, and it was copied field by field, with a comment saying so. Why use cases need a home of their own, and the small fix: one pure function both screens call."
pubDate: 2027-01-05
tags: ["architecture", "angular", "refactoring", "rangertrak"]
series: { name: "Architecture by the numbers", part: 3 }
draft: true
---

[Part 2](/blog/data-in-answer-out) ended on a gap. [RangerTrak](https://rangertrak.com)'s
business rules had moved into a framework-free `domain/` layer: who a report is from, which team
they're on, what the next message number is. All pure functions, all tested. What hadn't moved
was the step that *uses* them.

This is the post about what happened when that mattered.

## Four ways to type the same thing

RangerTrak is a radio log for the scribe at an emergency command post: someone calls in, the
scribe records who, where, when and what. For most of the app's life there was one Entry form,
and it does a lot: optional location and bearing for a clue, an ICS-213 message, a resource
request, attachments.

Not every station needs all that. A net control station wants one line per call, fast. A
radio room keeping a plain log wants a grid. So in November the Entry page got layouts, picked
per mission: **Command post** (the full form, still the default), **Net** (type a call sign,
press Enter), **Basic log** (a Form 309-style grid with the entry row on top) and **Field team**
(the map beside the form). A layout is a per-mission setting, not a fork of the data. Every
layout writes the same radio log entry into the same log.

That last sentence was the design. Here is how the code met it.

## The copy

The full form built its entry in a method called `mergedFormValue()` on the Entry component.
The new layouts got a small service, `EntryQuickSaveService`, with a `save()` method. Its doc
comment said:

> It builds the same entry the full form builds (`mergedFormValue()` in EntryComponent: station
> resolution, From ranger's team, operator, source) and hands it to the same
> `RadioLogService.addRadioLogEntry()`.

And it did build the same entry. By hand, field for field. Both resolved the From and To text
against the roster and the tactical calls. Both stamped the team. Both spread the same five
optional fields, each left off when empty:

```ts
...(from.tactical ? { tacticalCall: from.tactical } : {}),
...(team ? { team } : {}),
...(to.tactical ? { toTactical: to.tactical } : {}),
...(to.callsign ? { toCallsign: to.callsign } : {}),
...(to.rangerUid ? { toRangerUid: to.rangerUid } : {}),
```

That block appeared twice, character for character.

Nobody did anything careless. Every *rule* involved was already a shared pure function:
`resolveStationText`, `teamAtSave`. The new service reused every rule there was. The
assembly wasn't a rule. It had no name, no file and no home, so there was nothing to reuse.
It lived inside a component, and the only way to get it out of a component is to copy it.

The comment is the tell. When code has to explain that it does the same thing as some other
code, the thing it does wants a name.

## It had already started to drift

When the measurement found them, the two copies had been in the repository for less than a
day, and they were already not quite the same.

- **The default status came by different paths.** The full form read it from a form control
  that had been initialized from the mission's default. The quick service indexed the mission's
  status list directly. Same answer today; two places to change tomorrow.
- **The mission's default location was derived in both,** and in four more components that read
  the mission's default latitude and longitude for themselves.
- **One of those derivations had leaked a bug to the screen.** On the first visual check of the
  new layouts, the net layout's "Add location" opened at latitude −1, longitude −1: the app's
  internal "no location" marker, shown to the user as if it were a place. Unit tests and the
  end-to-end spec had passed. They checked what someone thought to ask. It took looking at the
  screen.

And two more layouts were on the roadmap: a net band and entry templates. Each would have been
a third or fourth copy.

## The fix: one function both call

No new framework, no "application layer" folder full of interfaces. One file in `domain/`,
`entry-build.ts`, with four small pure functions:

```ts
export function stationFields(fromText: string, toText: string, ctx: StationContext): StationFields
export function defaultStatus(mission: MissionDefaults | null | undefined): string
export function missionDefaultLocation(mission: MissionDefaults | null | undefined, fallback: LocationType): LocationType
export function buildRadioLogEntry(input: QuickEntryInput, ctx: QuickEntryContext)
```

`stationFields` is the block above, written once: resolve From and To, stamp the team, leave
empty optional fields off. The full form's `mergedFormValue()` spreads it. The quick layouts call
`buildRadioLogEntry`, which uses it too. Everything the builder needs from outside `domain/` is
passed in, including the "no location" value and an optional clock for tests:

```ts
export type QuickEntryContext = {
  rangers: readonly RangerType[]
  mission: MissionDefaults | null | undefined
  operator: string
  /** What an entry with no location carries (the app's `undefinedLocation`). */
  noLocation: LocationType
  /** Clock override for tests. */
  now?: () => Date
}
```

The commit: 222 lines added, 45 removed, of which 108 added lines are a new table-driven spec.
Four files touched, behavior unchanged, and not one existing test needed editing, which is
what you want from a refactor.

## The save that took a string

While the builder was going in, the measurement from [part 1](/blog/measuring-an-angular-app-instead-of-guessing)
had pointed at the other end of the same path. `RadioLogService.addRadioLogEntry()` took
`formData: string`. All 11 callers built an object, turned it into JSON text, and the service
parsed it back. The most important write in the app had no type checking.

The second commit changed the signature to take a `NewRadioLogEntry` object. The service
still revives ISO date strings on the way in, and it takes a `structuredClone` at the boundary,
so the saved entry never shares an object with the caller. A small change, and an easy one once
the builder existed, because the builder was now where most of those objects came from.

## Why use cases need a home

The general lesson is older than this app. A rules layer answers "what is true". A use case
answers "what happens when the user presses Save": gather these inputs, apply these rules in
this order, persist the result. If the rules have a home and the use cases don't, the use cases
stay in whatever component first needed them, and the second screen that needs one gets a copy.

The home doesn't have to be heavy. For RangerTrak the plan is:

- **Plain functions in `domain/` that build what gets saved.** That's `entry-build.ts`. No
  framework, fully testable.
- **Small per-feature workflow services for the multi-step flows,** such as merging a field
  phone's report packet into the log, or handing over at a shift change. Those have I/O and
  user prompts in the middle, so they're services, not pure functions. They're the work in
  [part 5](/blog/god-components-in-a-field-app).
- **Components keep the form state and the view.** Nothing else.

And the timing rule I took from this: **the second copy is the signal; the third is the bill.**
The fix was small because it came at two copies. At four, each subtly different, it
would have been an investigation.

## The takeaways

- **Shared rules aren't enough.** If the step that applies them has no name, it gets copied.
- **A comment that says "same as X" is a refactoring request.**
- **Drift starts immediately.** These copies differed within a day.
- **Look at the screen.** A test checks what someone thought to ask; a screenshot at phone and
  laptop width is cheap, and it found a bug every test had passed.
- **Fix it before the next copy, not after the next release.** The extraction went in before
  the next two layouts, so they'll be built on it.

Next: [why "shared" is not an architecture](/blog/shared-is-not-an-architecture).

---

*Code and numbers are from the public repository
([github.com/SteadyEOC/RangerTrak](https://github.com/SteadyEOC/RangerTrak)), as of 2026-11-20.*
