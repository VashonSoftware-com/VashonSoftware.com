---
title: "Dead only on evidence: the living-person rule as code"
description: "A family tree is full of people with no death date, and many of them are alive. The rule that keeps them off a public website is about a hundred lines of JavaScript, written down once and shared by two tools."
# pubDate is a placeholder; VS sets it when the post is scheduled (blog-plan.md section 5).
pubDate: 2026-11-24
tags: ["architecture", "privacy", "genealogy", "testing", "cornelisons-com"]
series: { name: "Building a family history site that keeps the living private", part: 2 }
draft: true
---

Part 1 of this series explained why I built a small static site for my family's stories, with
the genealogy program as the one master copy of the facts. Before a single person page could go
public, I needed an answer to a harder question: **who is alive?**

A genealogy file doesn't know. It has death records for some people, and for everyone else it
has nothing, which is not the same as "alive" and not the same as "dead". Your great-great-
grandmother with no death record is certainly dead. Your cousin with no death record is
probably reading her email. The file looks the same for both.

## The tempting rule, and why it leaks

The easy rule is "no death record and born less than 100 years ago means living; everyone else
is dead". Most tools do something like that. It fails in the direction that matters:

- **No birth date at all.** Plenty of records have a name and a marriage, nothing else. "Born
  less than 100 years ago" can't be checked, and a rule that treats "can't check" as "old" will
  publish a living person.
- **"After" dates.** `AFT 1850` is a date in the file, but it proves nothing about when someone
  was born; they could have been born last year.
- **Living people on someone else's page.** Even if a living person gets no page of their own,
  they turn up as a child in their parents' family list, or a spouse in a marriage.

So I turned it around: **a person is dead only on evidence. No evidence means living.**

## The rule

Evidence of death is any one of:

1. A death, burial or cremation record (even one with no date).
2. Any event of their own (birth, christening, census, marriage) more than **110 years** ago.
3. A **parent's** event more than 170 years ago, or a **child's** event more than 95 years ago.

Rule 3 matters more than it looks. Many people in older generations have no dates of their own
at all; the only dates near them are their children's baptisms. If someone's child was
christened in 1890, that person isn't alive today.

The idea of using relatives' dates isn't mine; open-source genealogy software such as
[webtrees](https://webtrees.net) does the same. The numbers are my choice, on the cautious side:
the parent and child offsets are the 110-year cut-off shifted by a generation either way.

Two more rules sit on top:

- **Recently deceased.** Someone who died within the last year gets no facts page on the public
  site, only their name and a hand-written story if there is one. The year after a death is when
  relatives are most affected. A person known to be dead but with no death year counts as
  recent too, unless their own events are old enough, or a child's event is more than 130 years
  old.
- **The program's own privacy flags win.** GEDCOM has a `RESN` tag. `RESN confidential` on a
  person leaves them out of every build; on a single event, it drops just that event (and that
  event can't count as evidence). `RESN privacy` keeps the person to the immediate-family
  site.

And some things are never copied off the program at all, for anyone: free-text notes, media,
addresses, phone numbers and email.

## The code

The whole thing is one module, about a hundred lines. The heart of it:

```js
function status(id) {
  const indi = ged.get(id);
  if (!indi) return { status: 'living', evidence: 'no record' };
  if (isConfidential(indi)) return { status: 'excluded', evidence: 'RESN confidential' };

  const death = deathEvidence(indi);          // DEAT, BURI or CREM, not confidential
  const early = earliestYear(indi);           // their earliest dated event
  let evidence = death?.evidence ?? null;
  if (!evidence && early !== null && early < cutoff) evidence = `event ${early}`;
  if (!evidence) { /* a parent's event before cutoff - 60 */ }
  if (!evidence) { /* a child's event before cutoff + 15 */ }

  if (!evidence) return { status: 'living', evidence: 'no proof of death' };
  // ... then deceased or recent, then RESN privacy
}
```

Three details carry most of the safety:

**Every answer records why.** The result isn't just `living` or `deceased`; it carries the
evidence (`DEAT 1950`, `child's event 1871`, `no proof of death`). When a relative asks why
someone is or isn't on the site, the answer is in the data.

**Dates are read pessimistically.** One small function decides what year a date *proves*:

```js
// "Aft 1850" proves nothing; "Bef 1850", "Bet 1840 and 1850", "Abt 1850" and "1850" prove 1850.
export function provenYear(date) {
  if (!date) return null;
  const d = date.trim().toUpperCase();
  if (/^(AFT|FROM\s+\S+$)/.test(d) && !/\bTO\b/.test(d)) return null;
  const years = [...d.matchAll(/\b(\d{3,4})(?:\/\d{1,2})?\b/g)].map((m) => Number(m[1]));
  return years.length ? Math.max(...years) : null;
}
```

Where a date is a range, it takes the *latest* year, the one that makes the person youngest.
Guessing wrong in that direction hides someone who could have been shown. Guessing wrong in
the other direction publishes someone who is alive.

**The build enforces it.** The generator uses the module to decide who goes into the public
`people.json`, and then the site build checks that file again on its own: it fails if anyone in
it isn't cleared by the rule, if a living relative appears even as a name in someone else's
family list, or if a recently deceased person has facts. Living children are counted ("2 living
children") but never named. Deciding and checking are separate steps, so a bug in one is caught
by the other.

## Tests on an invented family

The rule is tested against a small GEDCOM file of invented people, each one a case:

```text
0 @I1@ INDI
1 NAME No /Evidence/
0 @I12@ INDI
1 NAME Born /After Only/
1 BIRT
2 DATE AFT 1850
0 @I9@ INDI
1 NAME Hidden /Confidential/
1 RESN confidential
```

"No Evidence" must come out living. "Born After Only" must come out living too: `AFT 1850`
proves nothing. "Hidden Confidential" must be excluded entirely. As of 2026-10-29 there are 16
of these tests, one per rule and edge, including the year `now` is passed in, so the tests
don't start failing on New Year's Day.

The site's end-to-end tests then check the result from the outside: they build the public site,
collect every name the import marked as living, and fail if any of them appears in any public
page's text or in the public search index.

## One rules file, two tools

I'm also building [GEDCOM Privacy Guard](/blog/great-depression-is-not-a-diagnosis), a scanner
that flags sensitive notes in a GEDCOM file before you share it. It needs the same answer to
"who is alive?". Rather than let the two drift apart, the rules and their reasons live in one
document in that repo, and both tools follow it. A change goes into that document first, then
into the code, then into the site's plain-English privacy page.

The document holds the reasons as well as the numbers, because the reasons are what another
family needs in order to change a number sensibly. It also defines presets (`open`,
`standard`, `cautious`), so a family that wants FamilySearch's behaviour (no recently-deceased
window) can pick it instead of rewriting the rules. A shared rules *file* that both tools read
directly is the next step; for now each keeps its own copy of the numbers, checked against the
document.

## What's next

Deciding who is alive is half of it. The other half is making sure a page for the wrong
audience can't end up on the public site even if someone gets a rule wrong. A later part covers
how the site is built once per audience, so the family-only pages simply aren't in the public
deployment.

---

*Examples use the test file's invented people; no living relatives are named. Figures and
behaviour are as of 2026-10-29. I worked through this with Claude (Anthropic's AI model) as a
pair: it helped write the rule module, the tests and drafts of this post. The design decisions
are mine, and I reviewed every change.*
