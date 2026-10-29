# Co-hosted blog: VashonSoftware.com, Cornelisons.com and GEDCOM Privacy Guard

**For:** the three Claude Code sessions below. **Status:** current state, rewritten as it changes.
**Updated:** 2026-10-29 (Claude Opus 5.5, from the Cornelisons.com session)
**Content plan (series A, B, C, cadence, LinkedIn):** `D:\Projects\VashonSoftware.com\VashonSoftware.com\blog-plan.md`
**Open questions:** `D:\Projects\VashonSoftware.com\VashonSoftware.com\Questions for John.md` (Q-VS-*)

| Session | Repo | Role |
|---|---|---|
| **VS** — VashonSoftware.com | `D:\Projects\VashonSoftware.com\VashonSoftware.com` | Host. Canonical home of every architecture/developer post. Owns `blog-plan.md` and this file. |
| **CC** — Cornelisons.com | `D:\Projects\Cornelisons.com` | Host and author. Genealogy posts for families and genealogists. Author of series B (the site build). Copies of series B and genealogy-facing C posts. |
| **GPG** — GEDCOM Privacy Guard | `D:\Projects\Genealogy\gedcom-privacy-guard` | Author. First source of posts (series C and the genealogists' post). Hosts nothing. |

## 1. Are we ready? (2026-10-29)

- **VS: ready to host, not yet live.** Content collection, `draft` and `series` fields, RSS,
  sitemap, archive, Cloudflare Pages. Production blog is empty until A1 (RangerTrak) is
  approved. `canonical` field done (2026-10-29): sets `<link rel="canonical">`, `og:url` and
  "First published on {host}"; post pages now also send `og:type=article`, date, author, image.
- **CC: not ready.** `/blog` (`src/pages/blog.astro`) is a placeholder with no posts, no
  collection and no RSS. Must be built first (section 4, CC tasks).
- **GPG: posts can be drafted now.** P0 safety work is done; the repo is still private. C2 and
  C3 make no safety claims and need no repo link. C1 waits until the repo is public (beta).
  Its `ROADMAP.md` "Blog posts" section is out of date (section 5).

## 2. Who publishes what (John, 2026-10-27 and 2026-10-29)

- **Architecture and developer posts → VS only** (canonical there). Includes series C (C1–C5).
- **Posts for genealogists (not architecture) → CC only.** First one: "What your family tree
  notes say about the living" (from the GPG ROADMAP; not on VS).
- **Family-facing story → CC only:** "How we checked our tree before putting it online."
  Mentions real family; John must approve before it goes live.
- **Series B, and C posts a genealogist would care about** (C2, C3 likely) → canonical on VS,
  copied to CC with a short intro for genealogists and a link back.
- dev.to copies, if any, also point their canonical at VS.
- **CC and VS coordinate directly on every other genealogy post** (GPG not involved): series B,
  site news, research how-tos, anything Cornelisons.com produces. Rule of thumb: about how the
  site or a tool is *built* → canonical on VS, copy on CC; about the *family or doing
  genealogy* → CC only. Unsure → ask John (one question, in CC's questions file).

## 3. Shared conventions (both hosts)

- **Same front matter on both sites**, so a post moves between them by copying the file:
  `title`, `description`, `pubDate`, `author` (default John Cornelison), `image`, `tags`,
  `draft`, `series { name, part }`, plus a new optional **`canonical`** (full URL of the original).
  When `canonical` is set, the page's `<link rel="canonical">` and `og:url` use it, and the
  post shows "First published on VashonSoftware.com" with the link. (VS: today `SEO.astro`
  always uses the page's own URL.)
- **Same slug on both sites** for a copy, e.g. `/blog/great-depression-is-not-a-diagnosis`.
- **Drafts live in the host repo** with `draft: true` (seen in `dev`, never in a build, RSS or
  tag page). The author session writes there; the host session owns layout and publishing.
- **Privacy:** examples use the GPG test fixture or invented people. No living relatives, no
  family circle names, real ancestors only where already on the public cornelisons.com. Never
  quote real export notes, even anonymized, without John's OK. CC posts go through CC's
  existing build checks (living names, EXIF/GPS) and appear only in the **public** build.
- **Numbers are dated** ("as of 2026-10-29") and re-measured if the publish date moves.
- **Publishing needs John:** a draft becomes live only after he reads it in `dev`. Copies go
  live the same day as, or after, the original.

## 4. Tasks by session

### VS

1. ✅ 2026-10-29 Optional `canonical` field in `src/content.config.ts`, wired through
   `BaseLayout.astro` into `SEO.astro`; post page shows "First published on {host}". CC can
   copy the same pattern.
2. Keep publishing order and cadence (`blog-plan.md` section 1): one post every 7–10 days
   across all series.
3. After John answers Q-VS-10, mark it ✅ there. (Still unanswered 2026-10-29.)

### CC

1. **Build the blog** (small, one session): a `blog` content collection with the shared front
   matter; `/blog` list replacing the placeholder; `/blog/<slug>` post page; RSS
   (`/rss.xml`); tags optional. Public build only (other circles may link to the public
   blog). Pagefind indexes posts. Add e2e checks: links resolve; a `draft` never builds.
2. Ask John: is `/blog` (genealogy posts, site news) the same thing as the `/stories` blog
   proposed in Q-AC-35 (family stories linked to person pages)? Recommendation: keep them
   separate: `/blog` for essays and how-tos, `/stories` for family stories.
3. Then host drafts from GPG (section 2) and copies from VS.
4. **Author series B** (B1, B2, B4 ready now; B3 after family.cornelisons.com is live;
   B5 after C1). Drafts go into VS's `src/content/blog/` with `draft: true` and
   `series: { name: "Building a family history site that keeps the living private", part: n }`;
   the CC copy is added when VS publishes. Sources and outline: `blog-plan.md` section 3.
5. **Own CC-only genealogy posts** (family stories aside, see task 2): draft in CC's
   `src/content/blog/`, tell VS in this file (section 4b) so the cadence stays one post every
   7–10 days across both sites.

### GPG

1. **Fix `ROADMAP.md` "Blog posts"** (Q-VS-10): item 3 goes to cornelisons.com, not
   vashonsoftware.com; item 1 is now series C on VS (point to `blog-plan.md` section 3b
   rather than restating it); item 2 stays on cornelisons.com. Also: "publish after 1.0"
   becomes "C2/C3 any time; C1 once the repo is public as a beta; launch post at 1.0".
   Ask John before changing the going-public timing in "Going public".
2. **Draft C2 and C3** straight into `D:\Projects\VashonSoftware.com\VashonSoftware.com\src\content\blog\`
   with `draft: true`, `series: { name: "A privacy tool that refuses to decide for you", part: n }`.
   No repo links yet ("the code goes public soon").
3. **Draft the genealogists' post** once CC's blog exists, into
   `D:\Projects\Cornelisons.com\src\content\blog\` with `draft: true`.
4. C1 after the repo is public; C4 when the web version is live; C5 when the LLM scanner exists.

## 4b. Genealogy post queue (CC and VS edit this list)

| Post | Author | Canonical | Copy | State |
|---|---|---|---|---|
| B1 Stories, not pedigrees | CC | VS | CC | not started |
| B2 Dead only on evidence | CC | VS | CC | not started |
| B4 Make the build refuse to leak | CC | VS | CC | not started |
| C2 The Great Depression is not a diagnosis | GPG | VS | CC | not started |
| C3 Fix it at the source | GPG | VS | CC | not started |
| What your family tree notes say about the living | GPG | CC | — | after CC blog exists |
| How we checked our tree before putting it online | CC | CC | — | needs John's OK (living family) |

## 5. Order

1. CC builds the blog; VS adds `canonical` (✅ done 2026-10-29).
2. GPG fixes its ROADMAP and drafts C2, C3; CC drafts B1 and B2.
3. John reviews A1, then B and C drafts in `dev`; VS publishes in the plan's order.
4. Copies to CC; the genealogists' post on CC.
5. Repo public → C1. 1.0 → launch post and outreach (GPG ROADMAP "Outreach").

## 6. Handing back

Each session updates its own lines in section 1 and its task list here when something changes,
and keeps this file under ~150 lines. Questions for John go in that repo's `Questions for John.md`
(GPG: the Genealogy vault's `D:\sys\john\docs\_Obsidian\Genealogy\Questions for John.md`), not here.
