# VashonSoftware.com blog plan: the architecture series

**Status:** draft for John's review · **Updated:** 2026-10-29 (Claude Opus 5.5)
**Open questions:** `D:\Projects\VashonSoftware.com\VashonSoftware.com\Questions for John.md`
**Main source so far:** `D:\Projects\_SteadyEOC\Rangertrak\rangertrak-InternalDocs\VashonSoftware post - RangerTrak architecture pass - running notes.md`

---

## 0. Next session: start here (John said go, 2026-10-29)

Q-VS-2 to 7 are answered. Do these in order:
1. **Blog prep** (section 5, step 1): delete the five template posts in `src/content/blog/`; add
   `draft` and `series` fields to `src/content.config.ts` (drafts hidden from lists, RSS and the
   build); show "Part n of the series" in `src/layouts/ArticleLayout.astro`; default `author`
   to "John Cornelison". Build, and check that a draft post doesn't appear.
2. **Draft A1** as `src/content/blog/architecture-pass-rangertrak.md` with `draft: true`, from
   the post 1 outline (section 2) and the running notes. Name RangerTrak, link to rangertrak.com
   and to the public AGPL repo github.com/SteadyEOC/RangerTrak; code excerpts only from that repo.
   Re-measure every number on the day. End with a one-line note on how Claude helped.
3. John reviews the draft before it's published. Then the LinkedIn post (section 1).
Still open: Q-VS-8, Q-VS-9 (series C only; they don't block A1).

## 1. The blog scene: who publishes what

**The rule (John, 2026-10-27): all of John's software architecture posts go to VashonSoftware.com.**
Each other site keeps only its own subject.

| Blog | Owner | Its subject | Role in this plan |
|---|---|---|---|
| **VashonSoftware.com/blog** | this plan | **All software architecture posts**, whichever project they come from. John, first person, architect to architect | **Home of both series below.** Every post here is canonical. |
| **rangertrak.com Field Notes** | RangerTrak blog session (`D:\Projects\_SteadyEOC\Rangertrak\rangertrak-com-site\`) | **How RangerTrak works**, for CERT / SAR / ACS / ham users | Not ours. RangerTrak's architecture comes here. At most a link to our posts (Q-VS-2). |
| **eoc.online blog** | W4 (desktop chat; `D:\eoc.online\claude\blog\`) | **Generic EOC-focused software**, not RangerTrak, SteadyEOC or John's other products | Not ours and not a source. Never edit W4's files; route anything through John. |
| **Cornelisons.com/blog** | Cornelisons.com sessions | **Genealogy only**: the family and its stories | Not ours. How to build a genealogy site comes here (series B). |

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

**Timing:** the ROADMAP says to publish only after 1.0, with the repo public, so every link
works (Q-VS-9). C1–C3 can be drafted now and held as `draft: true`.

**Extra rule for series C:** examples use `sample_data\` or invented notes. Never quote a
real scan or a `review*.xlsx` (those are sealed); report counts only, like the performance
baseline.

**Not on this blog:** the ROADMAP's other post, for genealogists ("What your family tree notes
say about the living"), isn't architecture, so it doesn't belong here. Where it goes is Q-VS-8.

## 4. Publishing rules for all series

- **Nothing confidential crosses.** The running notes stay private. Code excerpts and screen
  captures appear only after John picks them (Q-VS-4).
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
   and its Access rules are checked. Series C slots in once GEDCOM Privacy Guard 1.0 is public:
   C1, C2, C3 in alternation with the others; C4 when the web version is live.
4. **For each post:** a LinkedIn post linking to it (the master plan's article → LinkedIn loop);
   check reach in `D:\Projects\VashonSoftware.com\LinkedinAnayltics\` after a week.
5. **RangerTrak sessions keep appending** dated notes to the running notes file; post A5 is
   written from those.
