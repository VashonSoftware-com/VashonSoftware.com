# Website Evaluation Criteria

| Evaluation | Tool / Check |
|---|---|
| **Performance** | [PageSpeed Insights](https://pagespeed.web.dev) — LCP, FCP, TBT, CLS scores |
| **Security Headers** | [securityheaders.com](https://securityheaders.com) — CSP, HSTS, X-Frame-Options |
| **SSL/TLS** | [SSL Labs](https://ssllabs.com/ssltest) — certificate grade, cipher strength |
| **Accessibility** | [WAVE](https://wave.webaim.org) / Lighthouse — WCAG 2.1 compliance |
| **SEO** | Lighthouse SEO audit — meta tags, canonical, sitemap, robots.txt |
| **Versioned / Deployable** | Git history, tagged releases, CI/CD pipeline present |
| **Owner Editable** | CMS or structured content (e.g. Astro Content Collections, Decap, Sanity) |
| **Search / Discoverability** | Sitemap.xml, RSS feed, structured data (JSON-LD) |
| **Mobile Friendliness** | Responsive breakpoints, touch targets, viewport config |
| **Privacy / Compliance** | Cookie consent, privacy policy, GDPR/CCPA, no dark patterns |
| **Uptime / Reliability** | [UptimeRobot](https://uptimerobot.com) monitoring, CDN edge caching |
| **Dependency Health** | Outdated packages (`pnpm outdated`), known CVEs (`npm audit`) |
| **Carbon / Sustainability** | [websitecarbon.com](https://websitecarbon.com) — hosting efficiency |

---

## Automation Potential ("Test Your Website" page)

| Evaluation | Automatable? | Method |
|---|---|---|
| **Performance** | ✅ Full | [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) — free, returns LCP/FCP/CLS/TBT JSON |
| **Accessibility** | ✅ Full | Same PageSpeed API call — includes accessibility category |
| **SEO** | ✅ Full | Same PageSpeed API call — includes SEO category |
| **Mobile Friendliness** | ✅ Full | Same PageSpeed API call — mobile strategy |
| **Carbon / Sustainability** | ✅ Full | [websitecarbon.com API](https://api.websitecarbon.com/site?url=) — simple GET, no key needed |
| **Security Headers** | ✅ Partial | Fetch URL server-side, inspect response headers (CSP, HSTS, X-Frame) |
| **SSL/TLS** | ✅ Partial | [SSL Labs API](https://api.ssllabs.com/api/v3/) — free but slow (2–3 min), async polling |
| **Search / Discoverability** | ✅ Partial | Fetch `/sitemap.xml`, `/rss.xml`, `/robots.txt` — check 200; scan HTML for JSON-LD |
| **Uptime check** | ✅ Partial | HTTP HEAD request — check status code + response time |
| **Privacy / Compliance** | ⚠️ Shallow | Detect privacy policy link, cookie banner scripts in HTML — not full GDPR audit |
| **Versioned / Deployable** | ❌ No | Requires repo access |
| **Owner Editable** | ❌ No | Human judgment |
| **Dependency Health** | ❌ No | Requires `package.json` access |

### Implementation Notes

- **One API call covers 4 checks**: PageSpeed returns performance, accessibility, SEO, and mobile in a single request
- **CORS blocker**: Security headers, sitemap, and SSL checks must run through an Astro server endpoint (`src/pages/api/check.ts`) — browsers can't fetch arbitrary third-party URLs directly
- **Rate limits**: PageSpeed API is free up to 25,000 queries/day with an API key; websitecarbon.com is open with no key needed
- **SSL Labs is async**: Kicks off a scan, then polls — unsuitable for real-time UX unless results are cached
- **Realistic scope**: ~8 of 13 criteria can be automated with a single URL input and a few server-side API calls

---

## Existing Alternatives

### Closest All-in-One Tools

| Tool | Covers | Gaps |
|---|---|---|
| [web.dev/measure](https://web.dev/measure) (Google) | Performance, SEO, Accessibility, PWA via Lighthouse | No security headers, no carbon |
| [GTmetrix](https://gtmetrix.com) | Performance deep-dive, some SEO | Paid for full features, no security/carbon |
| [Nibbler](https://nibbler.silktide.com) | Accessibility, SEO, social, technology | Shallow on security/performance |
| [Seobility](https://seobility.net) | SEO-focused, some technical checks | No security headers, no carbon |

### Specialist Tools (single purpose)

| Tool | Covers |
|---|---|
| [securityheaders.com](https://securityheaders.com) | Security headers only |
| [websitecarbon.com](https://websitecarbon.com) | Carbon / sustainability only |
| [SSL Labs](https://ssllabs.com/ssltest) | SSL/TLS only |
| [Mozilla Observatory](https://observatory.mozilla.org) | Security only |

### The Gap / Opportunity

No free public tool combines **performance + security headers + SSL + carbon + discoverability + uptime** in a single scored report. Most all-in-one tools are SEO-centric and skip security and sustainability entirely.

A genuinely comprehensive "website health score" page would be distinctive — especially as a lead-gen tool for a web dev agency or consultancy.

### Also consider

- Google Rich Results Test (for schema validation).
- Facebook Sharing Debugger (for OG cache/preview).
- Twitter Card Validator (for large-image card preview). 