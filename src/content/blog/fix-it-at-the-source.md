---
title: "Fix it at the source: working with the desktop app, not around it"
description: "A privacy tool for family trees could clean every export forever, or point you at the one note to fix in the program you already use. Why I chose the second, rejected automatic reimport after checking how the import really works, and never 'fix' a name."
pubDate: 2026-12-08
tags: ["architecture", "privacy", "genealogy", "adr", "gedcom-privacy-guard"]
series: { name: "A privacy tool that refuses to decide for you", part: 3 }
---

GEDCOM Privacy Guard scans a family-tree export (a GEDCOM file) for notes that shouldn't be
shared: a living cousin's diagnosis, an arrest, a rumor written down as fact. It lists every
hit for a person to review, then writes a cleaned copy. The tool reads any GEDCOM, but it
started with Legacy Family Tree, a free Windows desktop program where many genealogists keep
decades of research.

This post is about a decision that sounds minor and shaped most of the design: **the
genealogy program is the system of record, and the tool works with it, not around it.**
There are four parts to that: where the fix goes, what I refused to automate, which button to
avoid, and what the tool never touches.

## The treadmill: cleaning every export

The obvious design is a filter. Export, scan, clean, upload the clean copy. It works, and the
tool still does it.

But the sensitive note is still in the master file. The next export (to FamilySearch, for a
cousin, for a printed book) carries it again, and has to be cleaned again. Every destination,
every year. Sooner or later someone exports in a hurry and skips the step. A filter on the way
out is a treadmill, and a privacy decision that has to be remade every time isn't really a
decision.

## Fix 1: privatize at the source (ADR-002)

Legacy already has a privacy convention. Highlight text in any field, press Ctrl-P, and Legacy
wraps it in double square brackets, `[[like this]]`. Bracketed text can be left out of
Legacy's reports and exports. Mark a phrase once and every future export respects it.

So the main path in GEDCOM Privacy Guard isn't "clean this file." It's a **worklist**: each row
of the review spreadsheet says which person, which note and which phrase, with enough context
(dates, parents, spouses, record IDs) to find exactly that record in Legacy. The person makes
the edit there. The tool's job is to point at it.

The cleaned-copy path stays, as a second net. Some shares should be stricter than the master
file's default: a fully public tree can drop more than a private family share does.

There's also a `privatize` action that writes the same `[[ ]]` markers Ctrl-P writes, so a
privatized note means the same thing to Legacy as one marked by hand. Building it surfaced the
catch that shapes the rest of this post: **the marker only means something inside Legacy.**
Ancestry and FamilySearch don't honor it. A privatized file uploaded straight to them shows
the "private" phrase in plain text, now with brackets round it. So the tool prints a warning
whenever it privatizes anything, the docs describe the two paths separately (upload a redacted
file, or bring a privatized one back into Legacy), and the scanner itself flags text that's
already marked private (`[[ ]]` in Legacy, `{ }` in RootsMagic), because to an upload site
that text is just text.

## Fix 2: don't automate the reimport (ADR-003)

That raises the tempting next step. If the tool can produce a corrected file, why not import
it back into Legacy automatically and skip the manual edits?

Before deciding, I checked how Legacy's GEDCOM import actually works. It always lands in a
**separate, temporary family file**. Legacy doesn't match incoming people to existing ones by
ID and update them in place. You drag people from the temporary file into your main one
yourself. There's no "update existing records" mode.

So automating the reimport would mean writing my own matching and merging on top of a program
that doesn't support it. The realistic failure is duplicate people across a tree of a few
hundred, quietly, in the one file that matters most. That's worse than the problem it solves.

The ADR records this as **rejected, not deferred**. That distinction matters. "Later" items get
re-proposed every few months by anyone, including me, who hasn't read the reasoning. A
rejected record says why, and what new information would reopen it: if Legacy ever ships a
real update-by-ID import, the ADR is superseded.

Rejecting the automation didn't mean rejecting help. Legacy's own **Find Duplicates** and
**Manual Merge** can bring cleaned notes back: import the cleaned file as a separate database,
match it against the master, and pick the corrected note field by field, side by side. It's
still a person clicking, which is the point. As of 2026-10-29 I haven't verified that path end
to end on a real file, so the docs describe it and the ADR marks it unverified.

## Fix 3: avoid the button that skips the checkpoint

Legacy's toolbar has a one-click **Upload to Ancestry** button. It's convenient, and it sends
the tree straight to Ancestry with no file in between. There's nothing to scan.

The manual route (File → Export → GEDCOM File, with *Ancestry Online Family Tree* as the
export type) still gets Ancestry's formatting and produces a `.ged` file the tool can check
first. So the docs say plainly: use the export, not the button.

Legacy's export dialog also has its own Privacy options. They can hide living people and
bracketed text, but they don't read the notes. They're a useful layer to use alongside the
tool, not instead of it. Finding the safe path through a program you don't control is part of
the tool's job, even when the answer is documentation rather than code.

## Fix 4: never "fix" what isn't yours

Exports carry odd things. A common one comes from Legacy's automatic capitalization: set to
*Initial Caps*, it capitalizes short words that look like state codes, so a Catalan place
called `Pla de Manlleu` becomes `Pla DE Manlleu` (Delaware), and `la` becomes `LA`.

It would be easy for the tool to tidy that up. It doesn't. **Names, dates and places pass
through unchanged**; they're read only to help the reviewer tell people apart. There are two
reasons:

- A fix in the copy is lost at the next export, and the copy now disagrees with the master.
  That's the treadmill again.
- A tool that rewrites names is a tool that can get a name wrong, in a file that's about to be
  shared. The tool's promise is narrow on purpose: it changes only what the reviewer approved.

Instead, the docs explain the cause and the one-place fix in Legacy (View → Master Lists →
Location), which corrects every record using that place at once.

## The general lesson

When your tool sits beside a system of record, its best output is often a precise pointer,
not a corrected copy. Fix things where they live, so the fix lasts. Check how the other
program really behaves before automating against it, and write down the automation you
rejected, with the reason, so nobody builds it by accident later. Then make your own tool's
footprint as small as you can: change only what the person approved, and leave the rest
exactly as you found it.

The code is at [github.com/VashonSoftware-com/gedcom-privacy-guard](https://github.com/VashonSoftware-com/gedcom-privacy-guard),
MIT-licensed, and in beta.

---

*Behaviour described is as of 2026-10-29; Legacy's menus and features are described in my own
words, from its help center. No real family notes are quoted. I worked through this with
Claude (Anthropic's AI model) as a pair: it helped research Legacy's import behavior, and write
the decision records. The guidance and decisions are mine, and I reviewed every change.*
