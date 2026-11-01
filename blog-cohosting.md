# Co-hosted blog: VashonSoftware.com, Cornelisons.com and GEDCOM Privacy Guard

**For:** the three Claude Code sessions below. **Status:** current state, rewritten as it changes.
**Updated:** 2026-10-29 (Claude Opus 5.5, from the VS session)
**Content plan (series A, B, C, cadence, LinkedIn):** `D:\Projects\VashonSoftware.com\VashonSoftware.com\blog-plan.md`
**Open questions:** `D:\Projects\VashonSoftware.com\VashonSoftware.com\Questions for John.md` (Q-VS-*)

| Session | Repo | Role |
|---|---|---|
| **VS** — VashonSoftware.com | `D:\Projects\VashonSoftware.com\VashonSoftware.com` | Host. Canonical home of every architecture/developer post. Owns `blog-plan.md` and this file. |
| **CC** — Cornelisons.com | `D:\Projects\Cornelisons.com` | Host and author. Genealogy posts for families and genealogists. Author of series B (the site build). Copies of series B and genealogy-facing C posts. |
| **GPG** — GEDCOM Privacy Guard | `D:\Projects\Genealogy\gedcom-privacy-guard` | Author. First source of posts (series C and the genealogists' post). Hosts nothing. |

## 0. CC to-do before the first copy (CC update, 2026-10-30)

VS goes live 2026-11-03 (deploy hook secret is set). CC status:
- ✅ v0.2.42 **pushed** 2026-10-30: cornelisons.com/blog is live (empty).
- ✅ `scheduled-publish.yml` added (v0.2.43, pushed 2026-10-30; the drafts stay hidden). **Still missing:
  `CF_PAGES_DEPLOY_HOOK`** (John, Q-AC-60), so a future-dated copy won't appear on its date yet.
- ✅ B1 and B2 copies in CC's `src/content/blog/` with `draft: true`, `canonical` to VS and a
  short intro (v0.2.43). John reads them in `dev` (Q-AC-60); then CC drops `draft` and pushes.

| By | CC does | Waits on |
|---|---|---|
| 2026-11-07 | ✅ Push v0.2.42; ✅ add the workflow (v0.2.43); John adds the hook (public Pages project only) | John: the hook (Q-AC-60) |
| 2026-11-07 | ✅ B1 copy (pubDate 2026-11-10) and B2 copy (2026-11-24) as drafts, `canonical` to VS, short intro | John reads both in `dev` (Q-AC-60) |
| 2026-11-14 | C2 and C3 copies | Q-VS-11 (dates may move) and Q-VS-13 (repo-link line) |

## 1. Are we ready? (2026-10-29)

- **VS: scheduled (2026-10-29).** John approved A1, B1, B2, C2, C3; `draft` removed, pubDates
  set (section 4c). Future-dated posts build only after their date, so
  `.github/workflows/scheduled-publish.yml` POSTs a Cloudflare Pages deploy hook daily at
  14:00 UTC (needs repo secret `CF_PAGES_DEPLOY_HOOK`; John creates it). `canonical` field done (2026-10-29): sets `<link rel="canonical">`, `og:url` and
  "First published on {host}"; post pages now also send `og:type=article`, date, author, image.
- **CC: ready to host, not yet live** (2026-10-29, v0.2.42, committed, not pushed). `blog`
  collection with the shared front matter (incl. `canonical`), `/blog`, `/blog/<slug>`,
  `/rss.xml`, Pagefind; public build only (family sites' Blog link goes to cornelisons.com/blog).
  Drafts and future-dated posts show in `dev` only; e2e tests prove neither builds. Empty until
  the first copy or CC post. **B1, B2 drafted** in VS's `src/content/blog/` (see 4b).
  John 2026-10-29: `/blog` and `/stories` (Q-AC-35) stay **separate**.
- **GPG: C2 and C3 drafted** (2026-10-29, `draft: true` in VS's `src/content/blog/`:
  `great-depression-is-not-a-diagnosis.md`, `fix-it-at-the-source.md`); approved and
  scheduled by VS 2026-10-29. ROADMAP "Blog posts" fixed. John 2026-10-29 (Q-VS-10, Q-PG-07):
  go public after P0, as a beta. GPG must update "Going public"; C1 can follow once public.

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
  post shows "First published on {host}" with the link. (VS: done 2026-10-29.)
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
3. ✅ 2026-10-29 Q-VS-10 answered and marked (also marked Q-PG-07 in the Genealogy vault).

### CC

1. ✅ 2026-10-29 **Build the blog** (small, one session): a `blog` content collection with the shared front
   matter; `/blog` list replacing the placeholder; `/blog/<slug>` post page; RSS
   (`/rss.xml`); tags optional. Public build only (other circles may link to the public
   blog). Pagefind indexes posts. Add e2e checks: links resolve; a `draft` never builds.
2. ✅ 2026-10-29 (John: keep separate) Ask John: is `/blog` (genealogy posts, site news) the same thing as the `/stories` blog
   proposed in Q-AC-35 (family stories linked to person pages)? Recommendation: keep them
   separate: `/blog` for essays and how-tos, `/stories` for family stories.
3. Then host drafts from GPG (section 2) and copies from VS.
4. **Author series B** (✅ B1, B2 drafted 2026-10-29; B4 next; B3 ready too now that
   family.cornelisons.com is live, John only;
   B5 after C1). Drafts go into VS's `src/content/blog/` with `draft: true` and
   `series: { name: "Building a family history site that keeps the living private", part: n }`;
   the CC copy is added when VS publishes. Sources and outline: `blog-plan.md` section 3.
5. **Own CC-only genealogy posts** (family stories aside, see task 2): draft in CC's
   `src/content/blog/`, tell VS in this file (section 4b) so the cadence stays one post every
   7–10 days across both sites.
6. **Daily deploy (new, John 2026-10-29).** CC's blog also hides future-dated posts until a
   rebuild, and copies are future-dated too. Copy VS's `.github/workflows/scheduled-publish.yml`
   (daily cron that POSTs a Cloudflare Pages deploy hook; skips if the secret is missing) and ask
   John to create a deploy hook for the **public** Pages project only (circle projects don't
   carry the blog) and save it as repo secret `CF_PAGES_DEPLOY_HOOK`.
7. **Add the copies** of B1, B2, C2, C3 (section 4c): same slug, same `pubDate` as VS (or later),
   `canonical: https://vashonsoftware.com/blog/<slug>`, a short intro for genealogists.

### GPG

1. ✅ 2026-10-29 **Fix `ROADMAP.md` "Blog posts"** (Q-VS-10; no local path given, since the
   ROADMAP goes public): item 3 goes to cornelisons.com, not
   vashonsoftware.com; item 1 is now series C on VS (point to `blog-plan.md` section 3b
   rather than restating it); item 2 stays on cornelisons.com. Also: "publish after 1.0"
   becomes "C2/C3 any time; C1 once the repo is public as a beta; launch post at 1.0".
   **New (John, 2026-10-29):** change "Going public" to: public as a beta after the P0 safety
   work (done), 1.0 once tested. Then the testers page works as written, and C1 can be drafted.
2. ✅ 2026-10-29 (John to review in `dev`) **Draft C2 and C3** straight into `D:\Projects\VashonSoftware.com\VashonSoftware.com\src\content\blog\`
   with `draft: true`, `series: { name: "A privacy tool that refuses to decide for you", part: n }`.
   No repo links yet ("the code goes public soon").
3. **Draft the genealogists' post** once CC's blog exists, into
   `D:\Projects\Cornelisons.com\src\content\blog\` with `draft: true`.
4. C1 after the repo is public; C4 when the web version is live; C5 when the LLM scanner exists.

## 4b. Genealogy post queue (CC and VS edit this list)

| Post | Author | Canonical | Copy | State |
|---|---|---|---|---|
| B1 Stories, not pedigrees | CC | VS | CC | approved; VS 2026-11-10; CC copy drafted (v0.2.43) |
| B2 Dead only on evidence | CC | VS | CC | approved; VS 2026-11-24 (after C2, which it links to); CC copy drafted (v0.2.43; C2 link points to VS for now) |
| B4 Make the build refuse to leak | CC | VS | CC | not started |
| C2 The Great Depression is not a diagnosis | GPG | VS | CC | approved; VS 2026-11-17; CC copy to add |
| C3 Fix it at the source | GPG | VS | CC | approved; VS 2026-12-01; CC copy to add |
| What your family tree notes say about the living | GPG | CC | — | CC blog ready: GPG may draft |
| How we checked our tree before putting it online | CC | CC | — | needs John's OK (living family) |

## 4c. Publishing schedule (VS, weekly; each with a LinkedIn post that day)

| Date | Post | Slug |
|---|---|---|
| 2026-11-01 (Sun) | A1 "No spaghetti" as a check | `architecture-pass-rangertrak` |
| 2026-11-10 | B1 Stories, not pedigrees | `stories-not-pedigrees` |
| 2026-11-17 | C1 Never auto-delete, always auto-flag | `never-auto-delete-always-auto-flag` |
| 2026-11-24 | B2 Dead only on evidence | `dead-only-on-evidence` |
| 2026-12-01 | C2 The Great Depression is not a diagnosis | `great-depression-is-not-a-diagnosis` |
| 2026-12-08 | C3 Fix it at the source | `fix-it-at-the-source` |
| 2026-12-15 | A2 The layout shift only PageSpeed could see | `layout-shift-only-pagespeed-could-see` |

2026-10-31 (John, Q-VS-11/14): series C reordered so it reads in order; A2 and C1 approved; A1 moved up to 11-01.

## 5. Order

1. CC builds the blog; VS adds `canonical` (✅ done 2026-10-29).
2. GPG fixes its ROADMAP and drafts C2, C3; CC drafts B1 and B2.
3. ✅ 2026-10-29 John approved A1, B1, B2, C2, C3; VS scheduled them (section 4c).
4. Copies to CC; the genealogists' post on CC.
5. Repo public → C1. 1.0 → launch post and outreach (GPG ROADMAP "Outreach").

## 6. Handing back

Each session updates its own lines in section 1 and its task list here when something changes,
and keeps this file under ~150 lines. Questions for John go in that repo's `Questions for John.md`
(GPG: the Genealogy vault's `D:\sys\john\docs\_Obsidian\Genealogy\Questions for John.md`), not here.
