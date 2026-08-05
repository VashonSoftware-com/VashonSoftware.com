# John Cornelison — Master Plan
## Job Search · Website · Study (Aug–Oct 2026)

> **Three coordinated tracks:** Website refresh (VashonSoftware.com), active job search
> (Cambia Health + SEI + pipeline), and study plan (AI Engineering + AWS SAA-C03).
> All three reinforce each other — the website is a live portfolio, the study plan feeds
> the job search narrative, and every interview teaches you something worth publishing.
>
> **Generated:** 2026-08-05 · Claude Sonnet 4.6
> **Detail docs:** `website-refresh-spec.md` · `Resume - John Cornelison.md` · `Health_IT_Skills_Reference.md`

---

## The Narrative Thread

Everything points to the same story: **senior architect with deep Health IT roots,
modernization experience, and current AI/LLM fluency** — available for enterprise roles
(Cambia, SEI) and serious local/contract engagements (VashonSoftware.com).

The website, resume, LinkedIn, and study outputs should all reinforce this same positioning.

---

## Track 1 — Website (VashonSoftware.com)

**Goal:** Position the site as a credible portfolio for senior Health IT / architecture
roles *and* a clear path for local small business work.

**Full detail:** `website-refresh-spec.md`

### Phase 1 — High-signal pages (this week)

| Task | File | Notes |
|---|---|---|
| Health IT & Architecture Modernization section | `src/pages/services.astro` | §4a in spec — primary job search signal |
| About page (new) | `src/pages/about.astro` | bio, credentials, open source projects |
| Nav update | navbar component | add "About" link |

### Phase 2 — Conversion & local outreach (next 2 weeks)

| Task | File | Notes |
|---|---|---|
| Home page personal intro | `src/pages/index.astro` | humanize the hero |
| "Local Projects Welcome" section | `src/pages/index.astro` | Vashon small-biz CTA |
| Footer — add phone & email | layout/footer component | every page |
| Contact page personal note | `src/pages/contact.astro` | "you reach John directly" |

### Phase 3 — Polish (before any recruiter/hiring manager looks at it)

| Task | File | Notes |
|---|---|---|
| Meta descriptions | all pages | SEO |
| Photo on About page | `public/` + about.astro | need a headshot |
| Testimonials (if available) | About or Home | ask former clients |

### Open decisions
- [ ] Photo — do you have a current headshot?
- [ ] Tone — "I" on About page, "we" elsewhere, or fully personal throughout?
- [ ] Testimonials — any clients you could ask?
- [ ] Rate language — "island rates" / "economical" or something else?

---

## Track 2 — Job Search

**Goal:** Land a senior Health IT or architecture role with a nonprofit/humanitarian mission
and strong compensation. Ferry commute constraints mean remote/hybrid preference.

### Active targets

| Company | Role | Status | Next step |
|---|---|---|---|
| **Cambia Health Solutions** | Solutions Architect I/II (R-6624) | Recruiter screen done | Schedule interview; Van Crozier outreach pending |
| **SEI** | AI & Technology Consultant | Active | Confirm remote/hybrid expectations |

### Cambia — immediate next steps

- [ ] Schedule interview (coordinate around travel constraints)
- [ ] Reach out to Van Crozier (1st-degree LinkedIn, ArchiMate/HIMSS overlap)
- [ ] Continue FHIR/Da Vinci prep — CRD/DTR/PAS production APIs
- [ ] Review Cambia modernization stack: SAP S/4 HANA, Coupa, Beeline, ServiceNow, Informatica, AWS
- [ ] Frame C32/CCD/NwHIN/CONNECT as direct experiential continuity with their standards evolution

### SEI — next steps

- [ ] Confirm remote/hybrid/travel expectations
- [ ] Update JobVault note with any new intel
- [ ] Tailor cover letter: lead with AI evaluation + civic leadership + enterprise architecture

### Pipeline — ongoing

- [ ] Identify 3–5 additional target companies (Health IT, civic tech, federal adjacent)
- [ ] Create tailored cover letter templates (per `Resume` tailoring notes: Architect, Health IT, Civic/Emergency)
- [ ] Set up jobs tracking board in Obsidian (`Jobs Board` note)
- [ ] Review LinkedIn weekly; update headline/about if positioning shifts

### Resume — pending updates

- [ ] Add Seeed Studio Ranger credential (already in updated resume)
- [ ] Consider three tailored variants: (1) Senior Architect/Engineering, (2) Health IT, (3) Civic/Emergency Tech
- [ ] Fold new study plan outputs (AI Engineering, AWS cert) into resume once earned

---

## Track 3 — Study Plan (Jul–Oct 2026)

**Goal:** Deepen AI Engineering capability; earn AWS SAA-C03; publish original content.
All outputs should be usable in interviews and on the website.

### Current focus

| Topic | Status | Notes |
|---|---|---|
| AI Engineering (Chip Huyen) | In progress | Pivoting toward AI Engineering direction merged with architecture background |
| AWS SAA-C03 | Scheduled | Keeping as planned despite AI pivot |
| AI agent build | Planned | TypeScript (Node/Svelte background); Python at reading-level only |
| Original article | Pivoted | Ford/Richards synthesis scrapped; writing original piece using them as cited lens |

### Milestones

- [ ] Finish Huyen — note key takeaways applicable to Health IT and enterprise architecture
- [ ] AWS SAA-C03 exam — schedule date now so it has a deadline
- [ ] Ship a working AI agent prototype in TypeScript — can become a portfolio piece on the website
- [ ] Publish article — target a real outlet (HIMSS, InfoQ, or personal site first)

### Study → Job Search loop

Each study output should feed back into the job search:
- AWS cert → add to resume + LinkedIn immediately upon passing
- AI agent → add to open source projects section of website
- Article → share on LinkedIn; reference in interviews as a thought leadership signal
- Modernization reading (Nick Tune, Ford/Richards) → frame in Cambia/SEI interviews as current practice awareness

---

## Weekly Rhythm (suggested)

| Day | Focus |
|---|---|
| Mon | Job search: applications, outreach, interview prep |
| Tue–Wed | Study: Huyen / AWS / agent build |
| Thu | Website: implement one spec item in VS Code |
| Fri | Review & plan: what moved, what's next, update Obsidian |

---

## Cross-Track Dependencies

```
Study (AI Engineering) ──→ Website (AI section on Services) ──→ Job Search (interview signal)
Study (AWS cert) ──────────→ Resume update ──────────────────→ LinkedIn + applications
Website (About + Services) → Job Search (recruiters/hiring managers review it)
Job Search (interviews) ───→ Study (gaps surface; adjust focus)
```

---

## What to Work on This Week

Given the Cambia interview is the most time-sensitive item:

1. **Cambia:** Schedule the interview. Reach out to Van Crozier on LinkedIn.
2. **Website:** Implement the Health IT & Architecture Modernization section (§4a) — it's both a portfolio signal and interview prep (articulating your story for the site sharpens how you tell it in the room).
3. **Study:** One focused session on FHIR/Da Vinci CRD/DTR/PAS — directly applicable to Cambia.

Everything else can follow in the rhythm above.

---

*Save this file to your JobVault or repo docs folder. Review and update weekly.*
*For website implementation details, see `website-refresh-spec.md`.*
