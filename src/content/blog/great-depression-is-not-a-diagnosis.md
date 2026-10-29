---
title: "The Great Depression is not a diagnosis: the limits of keyword scanning"
description: "A family-tree privacy scanner flagged the Great Depression as a mental-health finding. Fixing that taught me where word lists stop working, why the report must never guess who someone is, and what an AI scanner would have to respect."
# pubDate is a placeholder; VS sets it when the post is scheduled (blog-plan.md section 5).
pubDate: 2026-11-17
tags: ["architecture", "privacy", "genealogy", "python", "gedcom-privacy-guard"]
series: { name: "A privacy tool that refuses to decide for you", part: 2 }
draft: true
---

GEDCOM Privacy Guard is a small open-source tool I'm building for genealogists. Before you
share a family tree (with Ancestry, a cousin, a family website), it reads the GEDCOM export
and flags text that shouldn't go along with it: mental illness, addiction, arrests, rumors,
phone numbers. That kind of thing ends up in the free-text notes of a tree that's been
built up over decades. It's harmless about someone who died in 1890. It isn't harmless about
your living aunt.

The tool doesn't delete anything. It lists every hit in a review spreadsheet, a person
decides what to keep, and then it writes a cleaned *copy*. (Part 1 of this series covers that
design. This post covers the scanner.)

The scanner is a keyword scanner, and the first real export I ran it on taught me its limits
within a minute.

## The first false positives

The mental-health list includes `depression`. The crime list includes `prison`. In a family
tree, those words turn up constantly in notes like these (invented, but typical):

> They lost the farm in the Great Depression and moved to town.
>
> He wrote home from WWII prison camps in Germany.

Neither note is about anyone's health or criminal record. The first version matched terms as
plain substrings, so it flagged both, along with every *prisoner of war*. In a real export,
those harmless hits were a large share of the report. A report full of noise teaches the
reviewer to skim, and a reviewer who skims misses the one note that matters.

## Fix 1: show enough context to judge

The cheapest fix wasn't in the matcher at all. The review spreadsheet had a short snippet
around each match, too short to tell "the Great Depression" from "her depression" without
opening the original file. Version 0.1.2 widened it to 100 characters on each side, moved the
snippet next to the matched term, and later the spreadsheet started highlighting the match
itself. Most false positives became a two-second "keep" instead of a hunt through the source.

That's the cheapest fix because it accepts the scanner will be wrong and makes being wrong
cheap. It's a good first move for any tool where a person reviews the output.

## Fix 2: make the matcher less naive

The next release (ADR-009, unreleased as of 2026-10-29) changes how terms match:

| In the rules | Matches | Doesn't match |
|---|---|---|
| `depression` | the whole word *depression* | *depressions*, *depressed* |
| `alcoholi*` | *alcoholism*, *alcoholic* | *alcohol* |
| `*ssn*` | *ssn* anywhere, even inside a word | |

It also adds **exceptions**: phrases whose span cancels any hit inside them. The built-in
mental-health category has `Great Depression` and `economic depression` as exceptions; the
crime category has `prisoner of war`, `prison camp` and `POW camp`. "They lost the farm in the
Great Depression" now produces no finding at all, and a test pins that down.

## Where word lists stop working

Each fix is real, and each one shows the ceiling. As of 2026-10-29:

- **Exceptions are phrase-by-phrase.** "He was held in a prison camp" is clean. "He wrote home
  from WWII prison camps" still flags `prison`, because the plural isn't the exception
  phrase. One more rule fixes that sentence; English has an endless supply of the next one.
- **Tightening one way loosens the other.** Whole-word matching stopped *depression* firing
  inside harmless words, but it also means "his depressions came later" isn't flagged. A
  false positive costs the reviewer a few seconds. A false negative is the failure the tool
  exists to prevent. For a privacy tool that's the worse error, so the defaults lean toward
  flagging.
- **The worst disclosures have no keywords.** "He was never the same after he came home, and
  the family stopped talking about it" names no diagnosis, crime or scandal. Every family
  reading it knows what it means. A word list can't.

So the keyword scanner is a floor, not a ceiling. It's fast (a scan of a large export takes
seconds), deterministic, offline and explainable: every hit shows which rule fired and why.
Those properties matter enough that it will stay the default. But it can't read.

## Who is this note about?

A finding is useless if the reviewer can't tell whose note it is. Family trees are full of
same-named people: three generations of Robert Smith, two cousins called Mary Ann. The
tool's own sample file has two unrelated Robert Smiths on purpose, one of them with a note
about an anxiety disorder.

So each row of the report carries context columns: birth and death, parents, spouses, and the
person's FamilySearch and Find a Grave IDs (with links) when the file has them. That's enough
to tell the Robert Smith born in 1968 from the one born in 1932, and to open the right person in
the desktop program to fix the note.

One rule governs those columns: **they're filled only from the file, never guessed.** If the
export has no FamilySearch ID, the column is empty. The tool doesn't look anyone up, match
names against an online tree, or "fix" a name or place that looks wrong. Names, dates and
places pass through unchanged. A guessed identity in a privacy report is worse than a blank:
it's a confident wrong answer about which living person a sensitive note describes, and the
reviewer has no way to tell it was a guess.

## Why this argues for an AI scanner, and what it must respect

The "never the same after he came home" note is exactly what a language model is good at. A
model can read for meaning: implied illness, implied scandal, the euphemisms families
actually use. Families also draw the line in different places. The tool already has three
presets (`open`, `standard`, `cautious`) because one family considers an adoption ordinary and
another considers it nobody's business. A model could take a sensitivity profile written in
plain words, which is more natural than a word list.

It isn't built, and I've written down the constraints before writing any code:

1. **Optional and off by default.** The keyword scanner runs offline. A hosted model means
   sending note text off the machine, which is the opposite of what a privacy tool promises.
   The user turns it on knowingly or it doesn't run.
2. **Beside, not instead of.** The keyword findings stay as the floor. Model findings go in
   their own rows with their own score, so the reviewer can see which scanner said what. A
   deterministic hit is never hidden because a model scored it low.
3. **Same contract.** Every scanner implements the same `scan(text, location)` method and
   returns the same findings, so a new scanner adds rows to the report and changes nothing
   else.
4. **The person still decides.** A model's judgment is one more flag in the spreadsheet, not a
   deletion.

How its scores combine with keyword severities, and where a family's profile lives, needs
its own decision record before anything is built. It also needs a labelled set of invented
notes to measure it against the keyword baseline, which is a post of its own.

## The general lesson

If your tool's output is reviewed by a person, a less clever scanner with good context often
beats a cleverer one without it. Make the wrong answers cheap to dismiss, never fill a gap by
guessing, and when you add the clever scanner, put its answers next to the simple ones, not in
place of them.

The code goes public soon.

---

*Examples are invented or taken from the tool's sample file; no real family notes are quoted.
Behaviour described is as of 2026-10-29. I worked through this with Claude (Anthropic's AI
model) as a pair: it helped write the matcher, the tests and drafts of this post. The design
decisions are mine, and I reviewed every change.*
