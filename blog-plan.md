# VashonSoftware.com blog plan: the architecture series

**Status:** draft for John's review · **Updated:** 2026-10-27 (Claude Opus 5.5)
**Open questions:** `D:\Projects\VashonSoftware.com\VashonSoftware.com\Questions for John.md`
**Main source so far:** `D:\Projects\_SteadyEOC\Rangertrak\rangertrak-InternalDocs\VashonSoftware post - RangerTrak architecture pass - running notes.md`

---

## 1. The blog scene: who publishes what

| Blog | Owner | Voice and audience | Role in this plan |
|---|---|---|---|
| **VashonSoftware.com/blog** | this plan | John, first person, architect to architect. Readers: hiring managers, senior engineers, possible clients (Health IT, civic tech) | **Home of the architecture series.** Every post here is canonical. |
| **rangertrak.com Field Notes** | RangerTrak blog session (`D:\Projects\_SteadyEOC\Rangertrak\rangertrak-com-site\`) | Practitioner to practitioner. CERT / SAR / ACS / ham | Not ours. At most a link to our posts, if John wants one (Q-VS-2). |
| **eoc.online blog** | W4 (desktop chat; `D:\eoc.online\claude\blog\`) | Neutral software review for EM professionals; names RangerTrak only under disclosure | Not ours, and not a fit for architecture posts. Never edit W4's files; route anything through John (`D:\Projects\_SteadyEOC\Rangertrak\BOUNDARY-eoc-online-blog.md`). The eoc.online *software* may still be a source (Q-VS-1). |
| **Cornelisons.com/blog** | Cornelisons.com sessions | "News about the site and how it is being built." Empty today | A short reader-facing note can link to our post about how the family sites are built (post 5). |

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

## 2. The series

**Working name:** *Architecture in practice*. Real systems, dated numbers, including what didn't
work. The thread through every post: **make the rule a check, not a hope.**

| # | Post | Source | Ready? | Length |
|---|---|---|---|---|
| 1 | **"No spaghetti" as a check, not a hope: an architecture pass on a live Angular app** | RangerTrak running notes (outline in its "Future ideas") | **Yes, now** | ~2,000 words |
| 2 | **The layout shift only PageSpeed could see** (zoneless Angular, `RouterOutlet`, CLS 0.492 → 0.002) | Running notes, E-171 | Yes, now | ~1,200 words |
| 3 | **Opus scopes, Sonnet builds, Haiku ships: model routing in a one-person practice** | Running notes (process notes), plus any session that tracks cost | Mostly; needs cost figures | ~1,200 words |
| 4 | **Copies of knowledge rot: derive them, or assert them in CI** | Running notes (10-02, 10-13) | Yes; short | ~800 words |
| 5 | **One build per audience: privacy by construction for a family history site** | `D:\Projects\Cornelisons.com\docs\adr\0001-family-sites.md`, plus the privacy guard's ADR-007/008 | After the family subdomain is live | ~1,200 words |
| 6 | **eoc.online / Delta platform architecture** (topic to be found) | `D:\Projects\_EOC.online\Delta\` | Needs John (Q-VS-1) and a source survey | — |
| 7 | **Follow-up: errors get obeyed, warnings get ignored** (does the warning ratchet work?) | Running notes, once the ratchet and size budget exist | Later (Dec–Jan) | ~800 words |

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
7. **What's next:** the warning ratchet and size budget (sets up post 7).

Posts 2 and 4 are pulled out of post 1 rather than run as sidebars: each is a complete story, and
post 2 (an Angular internals bug) will travel further among Angular developers on its own.

## 3. Publishing rules for this series

- **Nothing confidential crosses.** The running notes stay private. Code excerpts and screen
  captures appear only after John picks them (Q-VS-4).
- **Don't name the unreleased EOC product.** Same rule as W4 and Field Notes.
- **No people, places or dates from exercises** (as with Q39 on the RangerTrak side).
- **Cornelisons.com material is Private.** Post 5 covers the build architecture only: no family
  names, circle names beyond the public site, or relatives' details.
- **Re-measure on publish day.** Every number gets its date ("as of 2026-10-27"), and any figure
  that can drift (line counts, warning counts) is re-checked the day the post goes out.
- **Byline and AI use:** John's byline, first person; a one-line note on how Claude helped (Q-VS-5).

## 4. Order of work

1. **Prepare the blog** (one session, Sonnet can build it):
   - Delete the five template posts (after Q-VS-3).
   - Add `draft` (hidden from lists, RSS and the build) and `series` fields to the blog schema in
     `src/content.config.ts`; show "Part n of the series" on `src/layouts/ArticleLayout.astro`.
   - Default `author` to "John Cornelison" instead of "VashonSoftware Team".
2. **Draft post 1** as `src/content/blog/architecture-pass-rangertrak.md` with `draft: true`. John
   reviews; publish.
3. **Post 2**, one to two weeks later. Then 4, then 3.
4. **Post 5** once `family.cornelisons.com` is live and its Access rules are checked.
5. **For each post:** a LinkedIn post linking to it (the master plan's article → LinkedIn loop);
   check reach in `D:\Projects\VashonSoftware.com\LinkedinAnayltics\` after a week.
6. **RangerTrak sessions keep appending** dated notes to the running notes file; post 7 is
   written from those.
