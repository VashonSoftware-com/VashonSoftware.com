---
title: "Stories, not pedigrees: why build your own family history site"
description: "FamilySearch and Ancestry already hold the family tree. What they don't hold is the stories. Here is why I built a small static site for those instead, with the genealogy program kept as the one master copy of the facts."
# pubDate is a placeholder; VS sets it when the post is scheduled (blog-plan.md section 5).
pubDate: 2026-11-10
tags: ["architecture", "genealogy", "astro", "privacy", "cornelisons-com"]
series: { name: "Building a family history site that keeps the living private", part: 1 }
draft: true
---

My family has a genealogy program file that has been growing for decades, boxes of letters, a
few hours of recorded interviews, and a lot of stories that only exist in the heads of people
who are getting older. When I set out to put some of it online, the obvious first question was:
why build anything? FamilySearch and Ancestry already do family trees, and do them well.

This series is about the site I built instead, [cornelisons.com](https://cornelisons.com), and
the engineering behind it. The thread through all of it: **the privacy rules are code, and the
build fails when one breaks.** This first post is about the decision to build at all, and the
three choices that shaped everything after it.

## What the big sites already do well

FamilySearch and Ancestry are very good at the pedigree: who begat whom, with dates, places and
sources, searchable and linked across millions of other trees. They have record collections I
will never match. Rebuilding a pedigree browser would be a hobby project competing with two
giants, and losing.

What they are not built for is the part my family actually cares about:

- **Stories.** A paragraph about a grandfather's first job, a transcribed interview, a letter
  with the context that makes it make sense. On the big sites these end up as attachments or
  notes, hard to read and harder to find.
- **Commentary and speculation.** "Family legend says she was born on the ship; the passenger
  list says otherwise." That kind of labelled uncertainty is valuable to the next generation,
  and it doesn't fit a field that wants one date.
- **Control over who sees what.** A family history is full of living people. I want the family
  to see a lot and the public to see much less, and I want to decide exactly where that line is.

So the goal became narrow: **a site whose value is the stories**, showing facts only as far as
a story needs them, and linking out to FamilySearch and Ancestry for the rest.

## Choice 1: the genealogy program stays the master

The facts live in one place: a desktop genealogy program (Legacy Family Tree, in my case),
where I and the people helping me already do the research. The website never edits facts and
never writes back.

The pipeline is one way:

```text
Legacy  →  GEDCOM export  →  build script  →  people.json  →  static site
```

GEDCOM is the decades-old plain-text interchange format every genealogy program can export. A
Node script reads the export, works out who may be shown (the subject of the next post), and
writes a JSON file of people, families and events. The site build reads that JSON.

What this buys:

- **One source of truth.** A correction goes into Legacy, and the next export fixes the site.
  There is no second copy of a birth date to drift out of step.
- **Corrections have a home.** When I or a relative spots a mistake on the site, it goes on a
  list of Legacy fixes, which I apply in batches. The site waits for the next export.
- **The generator can be strict.** Because it never has to preserve hand edits, it can throw
  away anything it isn't sure about and regenerate from scratch every time.

The hand-written parts (the stories) are separate Markdown files keyed by a person's slug. The
generator never touches them, and the build refuses to publish a story that has no matching
person.

## Choice 2: a static site, rebuilt on every push

The site is [Astro](https://astro.build) with a little Svelte for interactive bits (a family
tree chart, the menus), hosted on Cloudflare Pages. Pushing to `main` rebuilds and redeploys it
in about a minute. Search is [Pagefind](https://pagefind.app), which indexes the built HTML.

For a site like this, static is the right default:

- **Nothing to attack at runtime.** No database, no admin login, no server code holding family
  data. What is published is exactly the files in the build output, which I can inspect and
  test.
- **The build is the checkpoint.** Every privacy rule can run at build time, and a broken rule
  stops the deploy. Later posts in this series lean on that heavily.
- **It's cheap and it lasts.** A folder of HTML will still open in twenty years. The family's
  kids should be able to save a copy and read it without any of my infrastructure.

## Choice 3: an ancestor floor, and "older only with a story"

The GEDCOM export holds thousands of people. Most of them are names and dates with nothing to
say. Publishing all of them would turn the site back into the pedigree browser I decided not
to build.

So the generator starts from two root people and walks up the tree with a floor: every
ancestor born in or after 1800 comes in, plus the first few generations regardless. Older than
the floor, a person comes in **only if there is a real story about them**: they are listed by
ID in the config, or a story file exists for them. The generations between that older ancestor
and the rest of the tree stay out; their page shows a short "line of descent" instead.

```json
{
  "roots": ["@I1@", "@I2@"],
  "ancestorBirthYearFloor": 1800,
  "olderWithStories": ["@I9@"]
}
```

(IDs invented for this post.) As of 2026-10-29 that gives 57 people on the public site, every
one of them long dead. The number is small on purpose. Each person page shows their facts with
sources, their place in a small family tree, and links to their FamilySearch record. The story,
if there is one, comes first.

## What the big sites are still for

Linking out is not a fallback; it's the design. Each person page links to their record on
FamilySearch, where cousins I have never met can add sources and correct me. Anyone who wants
the full pedigree, back to the 1600s, can go there. My site doesn't need to carry it.

## What's next

The interesting engineering starts when you decide who may appear on a public page at all.
Genealogy files are full of people with no death date who are very much alive. Part 2 covers
the rule I use for that, "dead only on evidence", and how it became a small, tested function
shared with a second tool.

---

*Examples use invented people and IDs; no living relatives are named. Figures are as of
2026-10-29. I worked through this with Claude (Anthropic's AI model) as a pair: it helped write
the generator, the tests and drafts of this post. The design decisions are mine, and I
reviewed every change.*
