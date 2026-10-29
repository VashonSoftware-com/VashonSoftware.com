# LinkedIn posts for the blog series

**Written:** 2026-10-29 (Claude Opus 5.5) · **Status:** drafts for John's review
**Schedule:** `D:\Projects\VashonSoftware.com\VashonSoftware.com\blog-cohosting.md` section 4c.

**How to post** (from `D:\sys\john\docs\_Obsidian\JobSearch\Content Strategy\Content Strategy - Current State.md`, section 6):
1. Post the morning the blog post goes live, after checking the link opens (the daily rebuild
   must have run).
2. Paste the body as a native text post. **No link in the body.**
3. Straight away, add the "First comment" text as a comment on your own post.
4. Add the blog post to LinkedIn Featured.
5. A week later, check reach in `D:\Projects\VashonSoftware.com\LinkedinAnayltics\`.

**Re-measure on the day:** numbers marked ⟳ can drift. Check them against the blog post (and
the blog post against the repo) the morning you post.

---

## A1 · Tue 2026-11-03 · "No spaghetti" as a check, not a hope

⟳ 702 warnings, 44 domain files, 0 errors / 468 files, map component 1,521 lines.

**Body** (~330 words)

"Am I getting a pile of spaghetti code?"

I asked that about RangerTrak, an open-source, offline-first Angular app that CERT, search-and-rescue and ham radio volunteers use in the field. A month later I have an answer, with numbers.

The first look found:
• One question ("is this data real?") answered in three places, three different ways
• A decision log that had quietly stopped nine days earlier
• No linter at all: the lint script called tslint, deprecated in 2019 and not even installed
• A map component approaching 2,900 lines

The fix wasn't a rewrite, NgRx or a monorepo. It was one framework-free domain/ layer and two import-boundary rules in ESLint, done in this order:

1. Enforce first. The rules found 8 violations in 5 components, all fixed the same day. Probe files proved each rule could fail. Then the rules became errors that gate the deploy.

2. Then move. Business rules moved into domain/, 6 → 26 entries in a day. A move that leaked didn't build, so a risky refactor became a checked one.

3. Watch where new code lands. Five new features started as pure rule files in domain/, without anyone asking. That's the real test of a layer. Today: 44 files, and 0 boundary errors across 468 files.

What didn't work, because the numbers say so:
• Warnings grew from 616 to 702. A warning nobody is made to act on is decoration.
• The map component went 2,864 → 1,365 → 1,521 lines in two weeks. A cut is not a cure.

Both failures have the same shape as the original problem: a rule that lived in people's heads, not in the build. Next: a warning ratchet and a size budget.

What I'd tell anyone starting the same job: turn on enforcement before the refactor, and prove a check can fail before you trust it when it passes.

The full write-up, with the ESLint config, is in the first comment.

#SoftwareArchitecture #Angular #ESLint

**First comment**

The full post: https://vashonsoftware.com/blog/architecture-pass-rangertrak/
RangerTrak's code (AGPL): https://github.com/SteadyEOC/RangerTrak

---

## B1 · Tue 2026-11-10 · Stories, not pedigrees

⟳ 57 people on the public site.

**Body** (~290 words)

My family's genealogy file has been growing for decades. FamilySearch and Ancestry already do family trees, and do them very well. So why build my own family history site?

Because the tree isn't what my family cares about most. The stories are: a grandfather's first job, a transcribed interview, "family legend says she was born on the ship; the passenger list says otherwise." On the big sites, those end up as attachments nobody reads.

So I built cornelisons.com around three choices:

1. The genealogy program stays the master. Legacy → GEDCOM export → build script → static site. One way, never written back. A correction goes into Legacy, and the next export fixes the site. There's no second copy of a birth date to drift.

2. A static site, rebuilt on every push (Astro on Cloudflare Pages). No database, no admin login, no server holding family data. The build is the checkpoint: every privacy rule runs at build time, and a broken rule stops the deploy.

3. An ancestor floor. Everyone born since 1800 comes in; anyone older only if there's a real story about them. Today that's 57 people on the public site, every one long dead. Small on purpose. For the full pedigree, each page links out to FamilySearch, where cousins I've never met can add sources and correct me.

The lesson travels beyond genealogy: when the giants already do the core job well, build the narrow thing they don't, and link to them for the rest.

This is part 1 of a series on building a family history site that keeps the living private. Part 2: deciding who is alive, when the file can't tell you.

Link in the first comment.

#Genealogy #SoftwareArchitecture #Privacy

**First comment**

The full post: https://vashonsoftware.com/blog/stories-not-pedigrees/
The site itself: https://cornelisons.com

---

## C2 · Tue 2026-11-17 · The Great Depression is not a diagnosis

**Body** (~345 words)

My privacy scanner flagged the Great Depression as a mental-health finding.

GEDCOM Privacy Guard is a small open-source tool for genealogists. Before you share a family tree, it flags notes that shouldn't go along with it: illness, arrests, rumors, phone numbers. Harmless about someone who died in 1890. Not harmless about your living aunt.

It's a keyword scanner, and the first real export taught me its limits within a minute. "They lost the farm in the Great Depression." "He wrote home from WWII prison camps." Neither is about anyone's health or record. Both were flagged.

What helped, in order:
• Show enough context to judge. Wider snippets, with the match highlighted. Most false positives became a two-second "keep". It's the cheapest fix: accept the scanner will be wrong, and make being wrong cheap.
• Make the matcher less naive: whole words, wildcards, and exception phrases such as "prisoner of war".

Where word lists stop working:
• Exceptions go phrase by phrase, and English has an endless supply of the next phrase.
• Tightening one way loosens the other. A false positive costs a reviewer seconds. A false negative is the failure the tool exists to prevent.
• The worst disclosures have no keywords. "He was never the same after he came home, and the family stopped talking about it."

That last one is what a language model is good at. So I wrote down its constraints before writing any code: off by default (it sends text off the machine), its findings beside the keyword findings and never instead of them, the same interface as every other scanner, and the person still decides.

One more rule, for the report itself: the columns that say who a note is about are filled only from the file, never guessed. A guessed identity in a privacy report is a confident wrong answer about which living person a sensitive note describes.

If a person reviews your tool's output, a simple scanner with good context often beats a clever one without it.

Link in the first comment.

#Privacy #Genealogy #SoftwareArchitecture

**First comment**

The full post: https://vashonsoftware.com/blog/great-depression-is-not-a-diagnosis/
The code (open source, beta): https://github.com/VashonSoftware-com/gedcom-privacy-guard

---

## B2 · Tue 2026-11-24 · Dead only on evidence

⟳ 16 tests.

**Body** (~345 words)

Your great-great-grandmother with no death record is certainly dead. Your cousin with no death record is probably reading her email. A genealogy file looks the same for both.

Before my family history site could publish a single person page, it needed an answer to "who is alive?"

The common rule, "no death record and born less than 100 years ago means living", fails in the direction that matters. No birth date at all? A date of "after 1850"? A rule that treats "can't check" as "old" publishes a living person.

So I turned it around: dead only on evidence. No evidence means living.

Evidence is a death or burial record, or the person's own event more than 110 years ago, or a parent's more than 170, or a child's more than 95. That last one does a lot of work: if your child was christened in 1890, you aren't alive today.

Three details carry most of the safety:
• Every answer records why ("DEAT 1950", "child's event 1871", "no proof of death"). When a relative asks why someone is or isn't on the site, the answer is in the data.
• Dates are read pessimistically. A range takes its latest year, the one that makes the person youngest. Wrong in that direction hides someone; wrong in the other publishes someone who is alive.
• Deciding and checking are separate steps. The generator applies the rule; the build checks its output again on its own, and end-to-end tests fail if any living name appears on a public page or in the search index.

The rule is about a hundred lines, with 16 tests on a file of invented people (one of them passes in the current year, so the suite doesn't break on New Year's Day). The rules live in one document shared with a second tool, GEDCOM Privacy Guard, so the two can't quietly disagree.

For any privacy rule: choose the default that fails safe, and make every decision explain itself.

Part 2 of the series. Link in the first comment.

#Privacy #Genealogy #SoftwareArchitecture

**First comment**

The full post: https://vashonsoftware.com/blog/dead-only-on-evidence/
Part 1, on why I built the site: https://vashonsoftware.com/blog/stories-not-pedigrees/

---

## C3 · Tue 2026-12-01 · Fix it at the source

**Body** (~330 words)

The most useful thing my privacy tool does is tell you where to fix something, rather than fix it.

GEDCOM Privacy Guard scans a family-tree export for notes that shouldn't be shared. The obvious design is a filter: export, scan, clean, upload. It works, and the tool still does it. But the sensitive note is still in the master file, and the next export carries it again. Every destination, every year, until someone exports in a hurry. A privacy decision you have to remake every time isn't a decision.

So the main output is a worklist: which person, which note, which phrase, with enough context to find that record in Legacy Family Tree and mark it private there, once.

Three more choices came from treating the desktop program as the system of record:

• Don't automate the reimport. I checked how Legacy's GEDCOM import really works: it always lands in a separate file, with no update-by-ID. Automating it meant writing my own merge, and the likely failure is duplicate people, quietly, in the one file that matters most. The decision record says rejected, not deferred, and what would reopen it. "Later" gets re-proposed every few months; "rejected, because" doesn't.

• Avoid the button that skips the checkpoint. Legacy's one-click Upload to Ancestry sends the tree with no file to scan. The docs say: use File → Export instead. Sometimes the safe path is documentation, not code.

• Never "fix" what isn't yours. Legacy's automatic capitals turn "Pla de Manlleu" into "Pla DE Manlleu" (as in Delaware). The tool could tidy that. It doesn't: a fix in the copy is lost at the next export, and a tool that rewrites names can get a name wrong.

When your tool sits beside a system of record, its best output is often a precise pointer, not a corrected copy. Fix things where they live, write down the automation you rejected, and keep your own footprint small.

Link in the first comment.

#SoftwareArchitecture #Privacy #Genealogy

**First comment**

The full post: https://vashonsoftware.com/blog/fix-it-at-the-source/
The code (open source, beta): https://github.com/VashonSoftware-com/gedcom-privacy-guard
