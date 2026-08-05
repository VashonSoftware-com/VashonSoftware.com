# VashonSoftware.com — Website Refresh Spec

> **Purpose:** Align the site with John Cornelison's resume, surface his 30+ year background,
> attract local Vashon / small-business clients for temp and one-off projects,
> and position him for senior Health IT and Architecture Modernization engagements.
>
> **Stack:** Astro 6 · Svelte 5 · Tailwind CSS 4 · Cloudflare Pages
> **Repo:** https://github.com/VashonSoftware-com/VashonSoftware.com
> **Updated:** 2026-08-05 · Claude Sonnet 4.6 (added Health IT + Architecture Modernization section)

---

## 1. Navigation — add "About" page

**File:** `src/pages/about.astro` *(new file)*
**Also update:** `src/components/` navbar component (wherever nav links are defined)

Add an **About** link between "Services" and "Blog":
```
Home · Services · About · Blog · Contact
```

---

## 2. New Page: `src/pages/about.astro`

Create a personal "About John" page. This is the highest-priority missing piece —
local clients hire a *person*, not a brand.

### Hero section
```
# About John Cornelison

Software architect, emergency tech builder, and Vashon islander since 2005.
```

### Bio section (suggested copy)
```
I've been writing software professionally since 1992 — from porting Windows NT to PowerPC
at IBM's Kirkland Programming Center, to building healthcare information exchanges for
the U.S. Army at Madigan, to designing the Phuket Provincial Intelligent Operations
Center in Thailand.

Since 2010, I've run Vashon Software from the island — taking on everything from
modern static websites for local businesses to complex microservices architectures
for emergency operations centers.

I'm a full-stack developer, system architect, and longtime Vashon community member.
If you need something built — big or small — let's talk.
```

### Credentials grid (render as a simple card grid or table)
| | |
|---|---|
| **Founded Vashon Software** | 2010 |
| **IBM Kirkland** | NT/PowerPC team, 1993–1995 |
| **Madigan Army / WRMC** | Healthcare IT Architect, 2006–2010 |
| **HIMSS Member** | Healthcare IT professional community |
| **MS-HUG Member** | Microsoft Healthcare Users Group |
| **FEMA EMI Graduate** | 35+ courses, 2009–present |
| **FCC Licensed** | KE7KDQ General Class |
| **VashonBePrepared** | Founding President & CTO, 2005–2024 |
| **BA Mathematics** | The Colorado College, 1981 |

### Open Source Projects section
```
## Projects I've Built

These are open-source tools I've developed and maintain:
```

| Project | What it does |
|---|---|
| [EOC.online](https://eoc.online/) | Software for Emergency Operations Centers — cloud or on-prem |
| [VashonMesh / Mesh101](https://VashonMesh.org) | LoRa radio mesh network using LoRaWAN, MeshCore & Meshtastic |
| [RangerTrak](https://www.RangerTrak.org) | Angular PWA for Search & Rescue member tracking without cell/internet |
| [OpenFemaNgClient](https://github.com/eoconline/OpenFemaNgClient) | Angular + Google Maps tool for analyzing OpenFEMA APIs |

### CTA
```
[Hire Me for a Project →](/contact)   [View Services →](/services)
```

---

## 3. Home Page — `src/pages/index.astro`

### 3a. Add personal intro above or within the hero

Replace or augment the current hero tagline with a human voice:

**Current:**
> "Innovative solutions for your goals and mission."

**Suggested revision:**
> "I'm John Cornelison — a Vashon-based software architect with 30+ years of experience
> building websites, custom software, and emergency technology.
> Founded in 2002, Vashon Software is my one-person studio for projects of any size."

*(Keep the two CTAs: "Get in Touch" and "Our Services")*

### 3b. Add "Quick Projects Welcome" section

Add a new section **below** the existing "What we build" section and **above** "Ready to start?":

```
## Local & One-Off Projects Welcome

Not every project needs a big agency. I work with Vashon businesses, nonprofits,
and neighbors on:

- Website fixes, updates, and refreshes
- One-page sites and landing pages
- Small custom tools and automations
- Tech consulting and second opinions
- Helping you get unstuck on a project

Island rates. Quick turnaround. No overhead.

[Let's Talk →](/contact)
```

### 3c. Add a brief credentials line near the bottom hero or footer area

A single trust-building line, e.g.:
```
30+ years in software · IBM · U.S. Army · HIMSS · Founded 2002 · Vashon Island
```

---

## 4. Services Page — `src/pages/services.astro`

### 4a. NEW — Health IT & Architecture Modernization (primary section, top of Services)

This is the highest-signal section for the job search. Give it equal visual weight to the
existing three pillars (Websites / Crafted Software / Disaster Technology), or make it
the **lead** section given current job search focus.

---

#### Suggested section heading and intro

```
## Healthcare IT & Architecture Modernization

Thirty years of enterprise architecture experience — including hands-on work inside
federal health systems, health information exchanges, and clinical EHR integrations.
Available for senior consulting, staff augmentation, and architecture advisory roles.
```

---

#### Sub-section 1: Health IT & Interoperability

```
### Health IT & Interoperability

Deep, hands-on experience across the full health information exchange stack:

- **HIE Architecture & Leadership** — Technical lead for the South Sound Health
  Information Exchange (SSHIE); architecture, ONC onboarding compliance, partner
  communications, NHIN briefings, and use case specification.

- **EHR Integration** — Direct integration-layer work with Epic's gateway (via
  InterSystems HealthShare/MultiCare at Madigan), AHLTA, Essentris, CHCS, and
  GE Centricity PACS. Hands-on, not adjacent.

- **Clinical Interoperability Standards** — HL7, C32/CCD/C84/C62, NwHIN/NHIN Direct,
  CONNECT. Designed ED-specific document exchange use cases: C32 on patient arrival,
  C84/C62 on discharge.

- **SSO & Context Management** — Microsoft/Sentillion CCOW-compliant single sign-on
  across disconnected clinical systems; DoD CAC smart card integration (MiCARE PHR).

- **Federal & Regulated Environments** — DIACAP, SDL, DOJ SDLC, TATRC-funded projects.
  Comfortable in VA, DoD, and federal-adjacent health IT contexts.

HIMSS member · MS-HUG (Microsoft Healthcare Users Group) member · CONNECT-a-thon participant
```

---

#### Sub-section 2: Architecture Modernization

```
### Architecture Modernization

Experienced in the full socio-technical scope of modernization — not just the technology,
but the organizational alignment, domain modeling, and change management that make it stick.

**Modernization approaches I bring:**

- **Domain-Driven Design (DDD)** — Bounded contexts, domain events, and strategic design
  to decompose legacy monoliths into maintainable, independently deployable services.

- **EventStorming & Domain Discovery** — Collaborative workshops to surface domain models,
  identify boundaries, and build shared understanding across technical and business teams.

- **Team Topologies** — Aligning team structures and interaction modes with software
  architecture for sustainable delivery. Conway's Law applied intentionally.

- **Microservices & API Architecture** — MEAN/.NET stacks, Docker/Kubernetes, Azure/AWS/GCP.
  Enterprise integration patterns, BizTalk SOA message brokering, and modern API design.

- **Cloud Migration & Modernization** — Azure, AWS, and Google Cloud; CI/CD pipelines;
  Cloudflare Pages and Workers for modern edge-deployed architectures.

- **AI/LLM Integration** — Active, current experience evaluating and integrating Copilot,
  Claude, GPT, and Gemini into development and operational workflows. Early work on an
  emergency-management LLM ontology.

**Representative work:**
- Implemented Federal Health Architecture for Franciscan, MultiCare & Madigan Regional HIO
- Designed the MERIT message broker architecture for WRMC (BizTalk SOA)
- Contributed to the Phuket Provincial Intelligent Operations Center architecture
- Built and maintains EOC.online — open-source microservice platform for emergency operations
```

---

#### Sub-section 3: Engagement types CTA

```
### How to Engage

Available for:
- **Senior consulting & staff augmentation** — architecture advisory, technical lead,
  hands-on development
- **Architecture reviews & second opinions** — assess what you have, recommend a path
- **Short-term & project-based** — discovery sprints, proof-of-concept work, targeted fixes
- **Healthcare IT contract roles** — HIE, EHR integration, federal health systems

[Contact John →](/contact)
```

---

### 4b. Add intro attribution

Add a line to the opening paragraph:
```
John Cornelison, principal architect and developer, brings 30+ years of experience
across healthcare IT, emergency management, and commercial software to every engagement.
```

### 4c. Add "Small & Local Projects" section (new section at the top or bottom)

```
## Small & Local Projects

Need something smaller? I take on one-off and short-term engagements for local
businesses, nonprofits, and individuals:

- **Website refresh or fix** — update an existing site, fix what's broken
- **New small site** — one-page to five-page business or portfolio site
- **Tech consult** — an hour or two to get your project pointed in the right direction
- **Custom script or tool** — automate something that's wasting your time
- **Emergency / off-hours help** — when something breaks and you need it fixed fast

Reach out and describe what you need. Most small projects get a same-week response.

[Contact John →](/contact)
```

### 4d. Clarify "Crafted Software" with Healthcare IT subsection

Add a new subsection under Crafted Software:

```
### Healthcare IT

Deep experience in health information exchange, clinical systems integration,
and federal health architecture — including work with Epic's gateway (via
InterSystems HealthShare/MultiCare), CONNECT, HL7, C32/CCD, and AHLTA.
HIMSS and MS-HUG member.
```

---

## 5. Contact Page — `src/pages/contact.astro`

### Add a warm personal note above the form

```
You're reaching John directly — not a support queue. I typically respond within
one business day. For faster response, call or text: 206.914.3050.
```

---

## 6. Footer — update across all pages

**Current:** Only shows "Vashon Island, Washington" with no name or phone.

**Add:**
```
John Cornelison · Vashon Island, WA
206.914.3050 · John@VashonSoftware.com
```

This is especially important for local clients who may want to call.

---

## 7. Meta / SEO updates

Update `meta-description` on key pages:

**Home:**
```
John Cornelison · Vashon Software · Software architect and developer on Vashon Island, WA.
Websites, custom software, and emergency tech. Local projects welcome. Founded 2002.
```

**About (new):**
```
About John Cornelison — 30+ years in software, IBM, U.S. Army healthcare IT, HIMSS member,
FEMA graduate, and founding president of VashonBePrepared. Based on Vashon Island, WA.
```

**Services:**
```
Vashon Software services: websites, custom applications, disaster tech, and small local
projects. Serving Vashon Island and the greater Seattle area since 2002.
```

---

## 8. Priority Order for Implementation

1. **Services — Health IT & Architecture Modernization section (§4a)** — primary job search signal; directly supports senior role targeting
2. **About page (§2)** — completely missing today; local clients and recruiters both need it
3. **Home page personal intro + "Local Projects" section (§3)** — changes the first impression
4. **Footer phone/email (§6)** — quick win, every page
5. **Services "Small & Local" section (§4c)** — supports local gig goal
6. **Contact page personal note (§5)** — lowers barrier for small clients
7. **Meta descriptions (§7)** — SEO, lower urgency

---

## 9. Things to Gather / Decide

- [ ] **Photo of John** for the About page (headshot or candid)
- [ ] **Tone preference** — "I" (personal) vs "we" (company voice) — currently the site says "we"; About page should say "I"; rest TBD
- [ ] **Rate card or pricing language** — does "Island rates" / "economical" feel right, or something else?
- [ ] **Testimonials** — any client quotes available for the About or Home page?

---

*Spec drafted 2026-06-21 based on resume (Resume - John Cornelison.md) and live site review.*
*Paste this file into your VS Code / Copilot chat as context for implementing changes.*
