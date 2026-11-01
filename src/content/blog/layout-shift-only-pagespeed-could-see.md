---
title: "The layout shift only PageSpeed could see"
description: "PageSpeed scored a 0.49 layout shift on every run, and nine local runs couldn't reproduce it. The cause was one task's gap in how zoneless Angular renders a routed page. The fix was three lines; finding it meant questioning how the lab measures."
pubDate: 2026-12-15
tags: ["architecture", "angular", "performance", "rangertrak"]
series: { name: "Architecture in practice", part: 2 }
---

[RangerTrak](https://rangertrak.com) is an open-source, offline-first Angular app that
emergency-response volunteers use in the field. In early October 2026, Google's PageSpeed
Insights gave its mobile start page a **Cumulative Layout Shift (CLS) of 0.505** on every run.
Anything over 0.25 is rated "poor". The Performance score sat between 48 and 53.

I couldn't reproduce it. Not once, in nine tries. This post is about how the cause was found,
and why the answer was in how the lab takes its measurement rather than in the page.

## Nine runs that said "fine"

PageSpeed blamed all of the shift on one element: the start page's `<main>`. Locally,
Lighthouse gave a CLS of 0 to 0.011 every time. So I added the usual suspects one by one:

- simulated throttling, then real (devtools) throttling;
- CPU slowdown at 8× and then 16×;
- web fonts delayed by 3 seconds;
- the app's lazy-loaded chunks delayed by 2.5 seconds;
- finally, a real Linux Chrome in Docker, to rule out anything about fonts on Windows.

Nothing reproduced it. A score that only one machine can see is hard to argue with and
harder to fix.

Getting PageSpeed's own data took a detour too. The PageSpeed API has no quota without an API
key, so I drove pagespeed.web.dev in a browser through an automation tool and pulled the full
Lighthouse JSON out of the page's network traffic. It confirmed the number, but it didn't
explain it: there was no cause, and the filmstrip was too coarse to show the shift.

## A real bug that wasn't the bug

One local run did show a shift of 0.24. The welcome panel on the start page has a dismiss
button. When the Roboto web font replaced the fallback font, the button's label got slightly
wider, which pushed a wrapping flex row over its breaking point, and the row below it jumped.

That was a genuine layout shift, and it was fixed (0.24 → 0.006 locally) and shipped in
version 0.99.25. PageSpeed then said **0.492**.

It's a useful failure to remember. I had fixed what I could measure, and assumed it was what
had been reported. It wasn't. A fix that turns a local number green proves nothing about a
number measured somewhere else.

## Work backwards from the number

What turned it round was arithmetic rather than another throttle setting.

A layout shift's score is roughly *how much of the screen moved* times *how far it moved*,
each as a fraction of the viewport. A font swap that nudges a button moves a small area a few
pixels and scores in the hundredths. A score near 0.5 on an element that fills the screen
means that element moved a long way. Whatever was happening, it wasn't a font nudge.

The second question was how PageSpeed's lab actually loads the page. Its default is
*simulated* throttling: Lighthouse loads the page at the machine's **full speed**, then
models how long it would have taken on a slow phone and network. Every one of my local
attempts had done the opposite: added real latency to the load. If the problem happened only
when the page loaded fast, slowing it down was hiding it.

So the next probe loaded the page with no throttling at all and recorded where `<main>` sat
on every frame. It found the shift at once. On the first painted frame, `<main>` sat 82 pixels
from the top, with no page header above it. The 137-pixel header arrived 90 to 150 ms later
and pushed everything down.

## The cause: one task between "created" and "rendered"

RangerTrak uses Angular's **zoneless** change detection. Without zone.js, Angular doesn't
re-render after every event; it schedules a render when something says it's needed.

When the router navigates, `RouterOutlet` creates the page component and then only *marks it
for check*. Creating the component builds its DOM, but the component's first **update** pass
(where every `@if` is evaluated and every binding gets its value) runs on the scheduler's next
tick, one task later.

The page header sits inside an `@if`. So for the length of one task the page exists with its
`<main>` but without its header. On the start page that update pass is a long task, about
130 ms, and a browser is free to paint a frame in the gap before it.

On my machines, the first paint always landed after the update pass. On PageSpeed's machine,
loading at full speed, it landed inside the gap. The header then appeared above a `<main>`
that had already been painted, and the whole page moved down.

Nothing was wrong with the page's code. The behaviour comes from the framework's scheduling,
and whether you see it depends on timing that a slower test load changes.

## The fix is three lines

The router outlet emits an `activate` event when it creates a page. Handling it by running
change detection straight away makes the first update pass happen in the same task that
created the page, before the browser can paint:

```html
<router-outlet (activate)="onRouteActivated()"></router-outlet>
```

```ts
private readonly appRef = inject(ApplicationRef)

onRouteActivated(): void {
  try { this.appRef.tick() } catch { /* already inside a tick: the scheduled one will do it */ }
}
```

Nothing is hidden and nothing is deferred. The same work runs before the first frame instead
of after it, so the first frame the user sees is the finished page.

Before trusting the fix, the probe had to show the problem on the old build: the "before" run
had to catch `<main>` without its header, or a clean "after" run would mean nothing.

The result, in version 0.99.26 on 6 October: **CLS 0.492 → 0.002**, Performance **50 → 75**,
and Total Blocking Time 300 → 170 ms.

## What I took from it

- **When a lab score won't reproduce, find out how the lab measures** before adding throttle
  settings. Here the lab ran fast and modelled slowness; my reproductions ran slow, and slowness
  was what hid the bug.
- **Work backwards from the number.** Ask what movement would produce that score. A score of
  0.49 ruled out the small fix I had already shipped.
- **Fixing what you can measure isn't fixing what was reported.** The font fix was real and
  worth shipping, and it wasn't the answer.
- **Prove the probe can fail.** A probe that has never shown the problem can't show it's gone.
- **Know what your framework does between "created" and "rendered".** With zoneless Angular,
  that's a task boundary, and a browser can paint across it.

This is the same idea as the first post in this series, at a smaller scale: don't trust a
check, or a measurement, until you've seen it go red.

---

*Numbers are as measured on the dates given; the code is in the public
[RangerTrak repository](https://github.com/SteadyEOC/RangerTrak). I worked through this with
Claude (Anthropic's AI model): it ran the reproductions, drove PageSpeed and the per-frame
probe, and wrote both fixes. The guidance and decisions are mine, and I reviewed every change.*
