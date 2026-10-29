# VashonSoftware.com blog plan: the architecture series

**Status:** draft for John's review · **Updated:** 2026-10-29 (Claude Opus 5.5)
**Open questions:** `D:\Projects\VashonSoftware.com\VashonSoftware.com\Questions for John.md`
**Co-hosting with Cornelisons.com and GEDCOM Privacy Guard (who hosts what, shared front matter, tasks per session):** `D:\Projects\VashonSoftware.com\VashonSoftware.com\blog-cohosting.md`
**Main source so far:** `D:\Projects\_SteadyEOC\Rangertrak\rangertrak-InternalDocs\VashonSoftware post - RangerTrak architecture pass - running notes.md`

---

## 0. Next session: start here

**Done 2026-10-29:** blog prep (template posts deleted; `draft` and `series` fields; drafts
show in `npm run dev` with a "Draft" banner but never in a build, RSS or tag pages, via
`src/lib/posts.ts`; "Part n of the series" on `src/pages/blog/[...slug].astro`; author
defaults to John Cornelison) and **A1 drafted** as
`src/content/blog/architecture-pass-rangertrak.md` (`draft: true`, pubDate 2026-11-03 as a
placeholder; numbers re-measured 2026-10-29: 0 boundary errors / 468 files, 702 warnings,
44 domain files, map component 1,521 lines).

**Done 2026-10-29 (later):** John approved A1, B1, B2, C2, C3. `draft` removed; weekly
schedule A1 11-03, B1 11-10, C2 11-17, B2 11-24, C3 12-01 (`blog-cohosting.md` section 4c).
Daily rebuild: `.github/workflows/scheduled-publish.yml` (needs secret `CF_PAGES_DEPLOY_HOOK`).

**Done 2026-10-29 (evening):** pushed; **LinkedIn posts** for A1, B1, C2, B2, C3 in
`linkedin-posts.md` (with how-to-post steps and numbers to re-check on the day); **A2 drafted**
as `src/content/blog/layout-shift-only-pagespeed-could-see.md` (`draft: true`, placeholder
pubDate 2026-12-15, ~1,200 words; fix code checked against RangerTrak commit `15c79379`).

Next:
1. **John:** create the Cloudflare Pages deploy hook (vashonsoftware, branch main) and save it as
   GitHub secret `CF_PAGES_DEPLOY_HOOK`; answer Q-VS-11 (series C order), Q-VS-12 (LinkedIn
   posts), Q-VS-13 (C2/C3 "goes public soon" line), Q-VS-14 (A2).
2. **2026-11-03 morning:** check the A1 link opens, re-measure the ⟳ numbers, post A1's LinkedIn post.
3. **Draft A4** ("Copies of knowledge rot", ~800 words) from the running notes (10-02, 10-13).

**Done 2026-10-29 (C1):** GPG P0 done and the repo is public (`0.4.0b1`), so **C1 drafted** as
`src/content/blog/never-auto-delete-always-auto-flag.md` (`draft: true`, placeholder pubDate
2026-12-08, ~1,390 words). Every code claim checked against the GPG repo (tests, `samefile`,
`--force`, line checks, action priority, sample note). Waiting on John: approval and Q-VS-11
(series order: C1 is part 1 but would publish after parts 2 and 3).

Note: the blog is empty in production until A1 goes live on 2026-11-03.
Still open: Q-VS-10 (a ROADMAP fix in the GEDCOM Privacy Guard repo; doesn't block anything here).

## 1. The blog scene: who publishes what

**The rule (John, 2026-10-27): all of John's software architecture posts go to VashonSoftware.com.**
Each other site keeps only its own subject.

| Blog | Owner | Its subject | Role in this plan |
|---|---|---|---|
| **VashonSoftware.com/blog** | this plan | **All software architecture posts**, whichever project they come from. John, first person, architect to architect | **Home of both series below.** Every post here is canonical. |
| **rangertrak.com Field Notes** | RangerTrak blog session (`D:\Projects\_SteadyEOC\Rangertrak\rangertrak-com-site\`) | **How RangerTrak works**, for CERT / SAR / ACS / ham users | Not ours. RangerTrak's architecture comes here. At most a link to our posts (Q-VS-2). |
| **eoc.online blog** | W4 (desktop chat; `D:\eoc.online\claude\blog\`) | **Generic EOC-focused software**, not RangerTrak, SteadyEOC or John's other products | Not ours and not a source. Never edit W4's files; route anything through John. |
| **Cornelisons.com/blog** | Cornelisons.com sessions | **Genealogy**: the family, its stories, and posts for genealogists | **Co-blog (John, 2026-10-29):** any genealogy post may be cross-posted there, or go only there. Series B and the genealogy-facing C posts are canonical here and cross-posted there, linking back; posts for genealogists (not architecture) go there only. |

**State of the VashonSoftware blog today** (`src/content/blog/`): five AstroDeck template posts,
all dated 2026-06-30. Two are joke posts ("Kraken Demands Better WiFi", "Medusa Starts Hair
Salon") and three are template how-tos ("Getting Started with Vashon Software" and so on). None
belong on a portfolio site that recruiters read. They must go before the first real post (Q-VS-3).

### Fit with the job-search content strategy

This blog already has a plan: `D:\sys\john\docs\_Obsidian\JobSearch\Content Strategy\Content Strategy - Current State.md`
(2026-10-19/20). It makes VashonSoftware.com the host for job-search posts: healthcare first,
under the frame **high-consequence systems**, two posts in eight weeks, LinkedIn-native. Its first
two posts (the interoperability retrospective and the evals post) are blocked on John's answers.

The architecture series fits that plan rather than competing with it:
- It is **"general argument, domain-specific evidence"**: the argument is architecture; the
  evidence is a field app for emergency responders (offline, encrypted, relied on in incidents),
  which is a high-consequence system.
- **Post 1 is not blocked.** It can be the first real post on the site while the healthcare posts
  wait for John's answers.
- **Shared cadence:** one post every 7–10 days across *both* plans, not each. Recommended order:
  architecture post 1, healthcare post H1 when unblocked, architecture post 2, H2, then the rest.
- **Same distribution:** the long post here; a 250–400-word native LinkedIn post with the link in
  the first comment; add it to LinkedIn Featured. Contact line: `John@VashonSoftware.com`.
- **Same kill criterion:** if two posts bring no inbound and no engagement from named contacts,
  stop the job-search framing; the architecture posts can still go out as a portfolio, but slower.

## 2. Series A: Architecture in practice (from RangerTrak)

**Working name:** *Architecture in practice*. Real systems, dated numbers, including what didn't
work. The thread through every post: **make the rule a check, not a hope.**

| # | Post | Source | Ready? | Length |
|---|---|---|---|---|
| 1 | **"No spaghetti" as a check, not a hope: an architecture pass on a live Angular app** | RangerTrak running notes (outline in its "Future ideas") | **Yes, now** | ~2,000 words |
| 2 | **The layout shift only PageSpeed could see** (zoneless Angular, `RouterOutlet`, CLS 0.492 → 0.002) | Running notes, E-171 | Yes, now | ~1,200 words |
| 3 | **Opus scopes, Sonnet builds, Haiku ships: model routing in a one-person practice** | Running notes (process notes), plus any session that tracks cost | Mostly; needs cost figures | ~1,200 words |
| 4 | **Copies of knowledge rot: derive them, or assert them in CI** | Running notes (10-02, 10-13) | Yes; short | ~800 words |
| 5 | **Follow-up: errors get obeyed, warnings get ignored** (does the warning ratchet work?) | Running notes, once the ratchet and size budget exist | Later (Dec–Jan) | ~800 words |

### Post 1 outline (from the running notes, tightened)

1. **The question that started it:** a product question ("is this data real?") turned up three
   answers to one question, a decision record that had silently stopped, and no linter at all
   (the tslint ghost).
2. **What was recommended, and what wasn't:** a framework-free `domain/` layer, enforced by
   import-boundary rules; no NgRx, no monorepo. Incremental and enforced, not a rewrite.
3. **Enforce first:** the boundary rules found 8 violations in 5 components, went clean the same
   day, became deploy-gating errors, and were proved able to fail with probe files.
4. **Then move:** the D-57 moves (6 → 26 domain entries in a day) were a checked refactor because
   each moved file had to pass the rules.
5. **The test of a layering:** new features (E-187 to E-222) started in `domain/` unasked. 44 files.
6. **What didn't work:** warnings 616 → 703; `mapLeaflet` 2,864 → 1,365 → 1,521. A cut is not a cure.
7. **What's next:** the warning ratchet and size budget (sets up post 5).

Posts 2 and 4 are pulled out of post 1 rather than run as sidebars: each is a complete story, and
post 2 (an Angular internals bug) will travel further among Angular developers on its own.

## 3. Series B: Building a genealogy site (from Cornelisons.com)

**Working name:** *Building a family history site that keeps the living private.* Five posts,
plus an optional sixth (John asked for 3–6). Same thread as series A: the privacy rules are code,
and the build fails when one breaks. Sources: `D:\Projects\Cornelisons.com\README.md`,
`D:\Projects\Cornelisons.com\docs\adr\0001-family-sites.md`,
`D:\Projects\Genealogy\gedcom-privacy-guard\docs\PRIVACY-RULES.md` (ADR-007/008) and
`D:\Projects\Genealogy\gedcom-privacy-guard\docs\ARCHITECTURE.md`.

| # | Post | Covers | Ready? |
|---|---|---|---|
| B1 | **Stories, not pedigrees: why build your own family site** | Legacy stays the master; GEDCOM export → Astro; link out to FamilySearch and Ancestry rather than rebuild them; the ancestor floor and "older only with a story" | Yes |
| B2 | **Dead only on evidence: the living-person rule as code** | The living/dead rules (110 years, a relative's events), recently deceased, `RESN`, what is never copied; one rules file shared by two tools; unit tests on a fixture GEDCOM | Yes |
| B3 | **One build per audience: privacy by construction** | `SITE_CIRCLE` builds, subdomains behind Cloudflare Access, per-build Pagefind search, closing `*.pages.dev`, nav filtered on the server | After family.cornelisons.com is live |
| B4 | **Make the build refuse to leak** | Build-failing checks: living names, family-only media in `dist/`, EXIF/GPS stripping, e2e "no living name in public search", `noindex` on family builds; public copies boxed out, never blurred | Yes |
| B5 | **Scan your GEDCOM before you share it** | Short pointer post: where the tool fits in the site workflow, linking to series C | After C1 is out |
| B6 (optional) | **From notes vault to website** | Obsidian story import, draft banners for review, `:::note` side notes by circle | If B1–B4 land well |

**Extra rule for series B:** examples use the test fixture or invented people. No living
relatives, no circle membership, and real ancestors only where they already appear on the public site.

## 3b. Series C: A privacy tool that refuses to decide for you (from GEDCOM Privacy Guard)

**Added 2026-10-29 (John asked for a short series).** Four short posts, plus an optional
fifth. They cover the design decisions behind the tool, not the family. The thread: **the
tool flags, the person decides, and the original is never touched.** Series B is about the
site build; series C is about the scanner, so B5 shrinks to a pointer. Sources, all in
`D:\Projects\Genealogy\gedcom-privacy-guard\`: `docs\ARCHITECTURE.md`, `docs\adr`–`008`,
`ROADMAP.md` (its "Goal 2" developer post becomes C1).

| # | Post | Covers | Ready? | Length |
|---|---|---|---|---|
| C1 | **Never auto-delete, always auto-flag** | ADR-001: flag, review, then write a *new* file; a spreadsheet as the review UI (CSV → XLSX with highlighted matches, ADR-006); `keep` / `redact` / `rewrite` / `privatize` actions; idempotent scans | Yes | ~1,200 words |
| C2 | **The Great Depression is not a diagnosis: the limits of keyword scanning** | Real false positives ("the Great Depression", "WWII prison camps"); the context columns that tell same-name relatives apart, filled only from the file and never guessed; why this argues for an LLM scanner with per-family sensitivity, and how its scores must sit beside the deterministic ones | Yes | ~1,000 words |
| C3 | **Fix it at the source: working with the desktop app, not around it** | ADR-002 (Legacy's `[[ ]]` privacy marker), ADR-003 (automated reimport rejected after checking how Legacy imports really work), the one-click upload button that skips the checkpoint, never "fixing" name casing | Yes | ~1,000 words |
| C4 | **One spec, two runtimes: a Python CLI and an in-browser app** | ADR-004/005: the platform goal (iPad and Android) as a constraint; the file never leaves the device; React + TS + Vite on Cloudflare Pages; the 154 MB / 192k-person baseline (10.1 s); one shared rules file with the Cornelisons build (ADR-007/008) | When the web version is live | ~1,200 words |
| C5 (optional) | **Evaluating an LLM privacy scanner** | Building the `LLMScanner`: a labelled fixture set, false positives and false negatives against the keyword baseline, sensitivity profiles | When it's built; could be the evals post (H2) evidence | ~1,200 words |

**Timing (revised 2026-10-29, Q-VS-9):** the ROADMAP said to wait for 1.0. Waiting for all of
1.0 buys little for *architecture* posts. What actually has to change first:
- **C1's claim must be true in code.** "The original is never touched" isn't enforced yet:
  `redact` doesn't refuse an `--out` that is the input (ROADMAP P0). Neither is spreadsheet
  formula escaping, which a "spreadsheet as the review UI" post invites readers to probe.
- **Links must work.** The repo is private (`github.com/VashonSoftware-com/gedcom-privacy-guard`),
  so any link 404s until the P0 history audit is done and it's made public.

Both are P0 (small, safety work). The rest of 1.0 (PyPI, fuzzing, the rules UI, the
15-minute exit test) matters to genealogists installing it, not to developers reading about
design. So:
- **C2 and C3** make no safety claims; they can go out any time, with no repo link (or "the
  code goes public soon").
- **C1** goes out once the P0 list is done and the repo is public (labelled beta).
- **Launch** (Show HN, r/Genealogy, the outreach list) still waits for 1.0, with a short
  "1.0 is out" post linking to C1–C3, so the posts build an audience before the one-shot launch.
- C4 when the web version is live; C5 when the LLM scanner is built.

**Extra rule for series C:** examples use `sample_data\` or invented notes. Never quote a
real scan or a `review*.xlsx` (those are sealed); report counts only, like the performance
baseline.

**Not on this blog:** the ROADMAP's other post, for genealogists ("What your family tree notes
say about the living"), isn't architecture. It goes on Cornelisons.com only (Q-VS-8), as a note for the
Cornelisons.com sessions, and links to C1.

## 4. Publishing rules for all series

- **Nothing confidential crosses.** The running notes and internal docs stay private. Code from
  the public AGPL repo and anything shown on the live rangertrak.com site may be quoted (Q-VS-4).
- **Don't name the unreleased EOC product.** Same rule as W4 and Field Notes.
- **No people, places or dates from exercises** (as with Q39 on the RangerTrak side).
- **Cornelisons.com material is Private.** Series B covers how the site is built, never the family
  (see its extra rule).
- **Re-measure on publish day.** Every number gets its date ("as of 2026-10-27"), and any figure
  that can drift (line counts, warning counts) is re-checked the day the post goes out.
- **Byline and AI use:** John's byline, first person; a one-line note on how Claude helped (Q-VS-5).

## 5. Order of work

1. **Prepare the blog** (one session, Sonnet can build it):
   - Delete the five template posts (after Q-VS-3).
   - Add `draft` (hidden from lists, RSS and the build) and `series` fields to the blog schema in
     `src/content.config.ts`; show "Part n of the series" on `src/layouts/ArticleLayout.astro`.
   - Default `author` to "John Cornelison" instead of "VashonSoftware Team".
2. **Draft post 1** as `src/content/blog/architecture-pass-rangertrak.md` with `draft: true`. John
   reviews; publish.
3. **Then alternate the two series**, one post every 7–10 days, with the healthcare posts slotted
   in when they're ready: A2, B1, A4, B2, A3, B4. B3 waits until `family.cornelisons.com` is live
   and its Access rules are checked. Series C: C2 and C3 can slot in any time; C1 once the
   GEDCOM Privacy Guard P0 list is done and the repo is public; C4 when the web version is live.
4. **For each post:** a LinkedIn post linking to it (the master plan's article → LinkedIn loop);
   check reach in `D:\Projects\VashonSoftware.com\LinkedinAnayltics\` after a week.
5. **RangerTrak sessions keep appending** dated notes to the running notes file; post A5 is
   written from those.
