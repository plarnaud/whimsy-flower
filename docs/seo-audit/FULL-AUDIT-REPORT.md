# Whimsy Flower — Full SEO Audit

**Audited URL:** https://whimsy-flower.vercel.app (production deployment of this repo, commit 519e647)
**Date:** 2026-09-09
**Business type detected:** Local Service (luxury wedding & event floral design studio, service-area model) with an Agency/portfolio secondary profile
**Target market:** Weddings across the Hudson Valley, the Catskills, Hudson NY and New York City; editorial & brand florals for businesses from Albany to Manhattan
**Method:** claude-seo v2.2.5 — 10 specialist passes (technical, content, on-page, schema, sitemap, performance, visual, GEO/AI search, local, SXO, keyword clusters). Lab data only; no Google Search Console / CrUX / DataForSEO credentials were available.

---

## Executive summary

### SEO Health Score: **38 / 100** (live site, before the copy changes in this working tree)

| Category | Weight | Score | Verdict |
|---|---|---|---|
| Technical SEO | 22% | 48 | Strong SSR foundation, but no domain, robots, sitemap, canonicals |
| Content Quality | 23% | 28 | Thin, boilerplate-heavy; placeholder Lorem ipsum live on 6 URLs |
| On-Page SEO | 20% | 22 | Zero geographic signal anywhere; generic titles/H1s on 8 URLs |
| Schema / Structured Data | 10% | 5 | None |
| Performance (CWV, lab) | 10% | 90 | Desktop 100; mobile homepage LCP 4.4s (Poor) |
| AI Search Readiness (GEO) | 10% | 38 | Readable by crawlers, but no entity facts to cite |
| Images | 5% | 60 | 100% alt coverage; oversized files, lazy LCP, placeholder alts |
| *Local SEO (not weighted)* | — | 22 | No NAP, no GBP found, NAP conflict with old NJ listings |
| *Search Experience / SXO (not weighted)* | — | 31 | /weddings is a thin index page where a service page is needed |

**The one-sentence diagnosis:** the site is technically well-built and beautifully written, but it is *placeless* — no page says where the studio is or whom it serves — and it lives on a temporary host with no sitemap, no structured data, and no off-site identity pointing at it. Nothing about it tells Google "Hudson Valley wedding florals."

### Top 5 critical issues (live site)

1. **No custom domain.** `whimsyflower.com` has no DNS records; the only live host is `whimsy-flower.vercel.app`. Every citation, review, and backlink built now is built against a disposable subdomain.
2. **Zero location signal.** Before this session's edits, "Hudson", "Hudson Valley", "Catskills", "New York" appeared in no title, heading, paragraph, footer, or meta tag on any page.
3. **NAP conflict with the studio's own footprint.** The Knot and WeddingWire list *Whimsy Flower LLC* in **Hoboken, NJ** (studio Jersey City, phone +1 551-264-4181, 5.0 from 9 reviews, "starting at $3,000"); the current live site `whimsyflower.love` says "Jersey City and beyond." The new site will say Hudson, NY. Google will see two cities and two prices for one business.
4. **Placeholder content is indexable.** Six `/brands/{slug}` pages render fictional client names (Maison Lumière, Atelier Rosewood…), stock photos, templated testimonials and literal *Lorem ipsum* body copy (the PaletteSection default). Anyone, including Google, can load them.
5. **No robots.txt, sitemap.xml, canonical tags, Open Graph, or JSON-LD** anywhere.

### Top 5 quick wins

1. Deploy the location copy already changed in this working tree (12 files; see "Changes made in this session").
2. Add `app/robots.ts` + `app/sitemap.ts` (code drafted in `findings/sitemap.md`), excluding the placeholder brand pages.
3. Add the `Florist`/`LocalBusiness` + `WebSite` + `Person` + `Service` JSON-LD graph drafted in `findings/schema.md`.
4. Fix the four `href=""` social icons and the `href="#"` Brides logo (real URLs: Instagram `@whimsy_flower`, TikTok `@whimsyflower`; Brides article is the Julia McGuire "two-part wedding" exclusive).
5. Put "Inquire" in the mobile header and eager-load the first gallery photo (homepage mobile LCP 4.4s to under 2.5s).

### A brand-collision risk you should know about

A different business, **Whimsy Flowers** (whimsyflowers.com, Kerhonkson NY, Ulster County — a micro flower farm doing weddings, workshops and CSA bouquets), already ranks for "whimsy flowers hudson valley" queries. Google will conflate the two unless Whimsy Flower consistently ships **name + Hudson, NY + founder + sameAs** signals (Organization schema, GBP, matching social bios, matching directory listings). Every off-site profile should read exactly "Whimsy Flower" (singular), "Hudson, NY".

---

## Changes made in this session (working tree, not committed)

The user asked for location-fit copy changes. All are in the repo diff; `npx tsc` passes, `next build` prerenders all 22 routes, and the new strings are verified in the prerendered HTML.

| File | What changed |
|---|---|
| `src/app/layout.tsx` | Default title → "Whimsy Flower — Floral Design Studio in Hudson, NY"; description now names Hudson NY, Hudson Valley, Catskills, NYC |
| `src/app/page.tsx` | H1 → "Wedding & event floral design studio in Hudson, New York"; intro paragraph names Hudson Valley/Catskills/"Albany to Manhattan"; old tagline kept as the H3; hero background alt fixed |
| `src/app/weddings/page.tsx` | Title → "Hudson Valley Wedding Floral Design"; H1 → "Hudson Valley Weddings"; new intro block (kicker + 90-word service-area paragraph naming Columbia/Dutchess/Greene/Ulster counties, Manhattan, Brooklyn) |
| `src/app/events/page.tsx` | Title/description localized; intro paragraph names Hudson studio + Hudson Valley/Catskills/NYC |
| `src/app/brands/page.tsx` | Title → "Editorial & Brand Floral Design — Hudson Valley & NYC"; H1 and intro say "from the Hudson Valley to Manhattan" / "Albany to Manhattan" |
| `src/app/brands/[slug]/page.tsx` | Added `generateMetadata` (was inheriting the homepage title) |
| `src/app/about/page.tsx` | Removed unnecessary `"use client"` + dead imports; added page metadata naming Molly + Hudson, NY |
| `src/app/inquire/page.tsx` | Added page metadata; removed unused import |
| `src/app/galleries/[slug]/page.tsx` | Title includes the wedding's location when it is a real place (skips "2025"/empty) |
| `src/components/meetWhimsy.tsx` | Bio now says "a floral design studio in Hudson, New York" and "from the Hudson Valley and the Catskills to New York City" |
| `src/components/footer.tsx` | New line: "Hudson, New York · Serving the Hudson Valley, the Catskills & New York City" |
| `src/data/brandProjects.ts` | Placeholder locations Los Angeles/Chicago/Austin/Portland → Kingston, Albany, Rhinebeck, Beacon (all NY) |

**Deliberately not changed (needs your/Molly's input):**
- Gallery `location` fields showing "2025" (Lindsey & Finn, Natalia & David, Talea & Erich) and "" (Trisha & Jim). I don't know the real venues and won't invent them. Julia & Jackie (Pennsylvania) and Shayna & Evan (Waterloo Village, NJ) are real and were left alone.
- Phone/email in the footer — WeddingWire lists +1 551-264-4181, but that is a New Jersey number; confirm what should be public.
- Lorem ipsum on brand project pages — needs real project copy or a `noindex`.
- The brand-brief ban on the word "florist" — respected everywhere; see the tradeoff below.

---

## 1. Technical SEO — 48/100

**Works:** full server-side prerendering (no SPA gap), HTTPS + preload-eligible HSTS, clean kebab-case URLs with single-hop trailing-slash redirects, self-hosted fonts with `font-display: swap`, 100% image alt coverage, semantic HTML scored 100/100 by the agent-UX check, six responsive breakpoints.

**Critical**
- `whimsyflower.com` — no A/CNAME/NS records. Only `whimsy-flower.vercel.app` resolves.
- `/robots.txt`, `/sitemap.xml` (and all common fallbacks) → 404.
- No `<link rel="canonical">` on any page; no `metadataBase`. Risk: the vercel.app host stays indexed after the custom domain goes live.
- 8 URLs (`/about`, `/inquire`, six `/brands/{slug}`) rendered the homepage's generic title/description. *(Fixed in this working tree.)*

**High**
- No Open Graph / Twitter Card tags — link previews for a visual brand are blank.
- Zero JSON-LD.
- Footer link list omits `/brands`.
- Homepage hero LCP image lacks `fetchpriority="high"`; gallery LCP images are `loading="lazy"` behind client hydration.

**Medium:** no CSP / X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Permissions-Policy headers (only HSTS); 4× `href=""` social links + 1× `href="#"`; `access-control-allow-origin: *` on HTML responses.
**Low:** no `llms.txt`, no manifest/apple-touch-icon, case-variant URLs 404 without normalization, IndexNow not set up.

Details: `findings/technical.md`.

## 2. Content Quality — 28/100 · On-Page SEO — 22/100

- **Geographic signal: zero** on the live site. This was the single largest fix and is now done in the working tree.
- **Boilerplate ratio:** the identical 78-word "Meet the Creative Director" block appears on 6 of 7 page templates; `/weddings` had 116 words of prose, none unique to weddings; `/inquire` 39 words. The service-page floor for this skill is ~800 words. *(The new /weddings intro adds ~110 unique words; it still needs process, investment, FAQ and venue content — see Action Plan.)*
- **Placeholder content live:** six brand project pages with fictional brands, stock imagery, templated testimonials and Lorem ipsum. Trust and thin-content risk.
- **Duplicate titles/descriptions** on `/`, `/about`, `/inquire`, brand slugs. *(Fixed.)*
- **H1s carried no intent** ("Weddings", "About", "Product Launch"; `/inquire` had none). *(Fixed for home, weddings, brands; about/inquire H1s are template titles.)*
- Gallery cards show "2025" in the location slot (three galleries) — needs real venues.
- "Featured On: Brides" links to `#` — an unverifiable press claim. The article exists (Brides exclusive on Julia McGuire's two-part wedding; Whimsy Flower credited for the delphinium half-circle meadow; photos by Zai Laffitte). Link it.
- **What works:** the homepage intro and the Talea & Erich case study are genuinely strong editorial writing; brand-voice discipline is clean; founder-led positioning is a real E-E-A-T asset.

**The "florist" tradeoff.** Searchers type "wedding florist hudson valley"; the brief bans "florist" in copy. Google matches entities and synonyms, so "floral design studio in Hudson, New York" on the page will rank for that intent — but exact-match directories will out-rank on the token itself. Recommended compromise: keep the word out of visible H1/body copy, and let it live only in the `Florist` schema `@type`, the Google Business Profile category, image alt text, and (if Molly agrees) one FAQ question phrased in the searcher's voice. Decide this consciously; it is the largest remaining on-page lever.

Details: `findings/content.md`, `findings/cluster.md`.

## 3. Schema & Structured Data — 5/100

No JSON-LD, Microdata or RDFa anywhere (confirmed raw + rendered). Recommended, in priority order, all drafted as a single `@graph` in `findings/schema.md`:

1. `Florist` (a LocalBusiness subtype — invisible to visitors, so it does not conflict with the "design studio" voice) with `areaServed` for Hudson Valley / Catskills / NYC, `address` at city level, `sameAs` → Instagram, TikTok, The Knot, WeddingWire, Brides.
2. `Service` × 3 (wedding, private event, editorial/brand floral design).
3. `WebSite`.
4. `BreadcrumbList` on gallery and brand pages.
5. `ImageGallery` with photographer credit on gallery pages.
6. `Person` for Molly (founder, creative director).

Not recommended: `Review`/`AggregateRating` on self-hosted testimonials (self-serving reviews are ineligible), any schema on placeholder pages, `HowTo`, or `FAQPage` for SERP benefit.

## 4. Performance (Core Web Vitals, lab) — 90/100

Lighthouse 13.4.1 against production. CLS and INP proxy are excellent everywhere; LCP on mobile is the only problem.

| Page | Mobile LCP | Desktop LCP | CLS | TBT (INP proxy) | Mobile score |
|---|---|---|---|---|---|
| `/` | 4.4s (Poor) | 0.8s | 0.000 | 15ms | 81 |
| `/weddings` | 3.0s (Needs work) | 0.8s | 0.000 | 11ms | 94 |
| `/brands` | 2.4s | 0.6s | 0.000 | 12ms | 98 |
| `/galleries/talea-erich` | 3.8s (Needs work) | 0.7s | 0.000 | 13ms | 87 |

Fixes, ranked: (1) first 1–2 gallery photos eager, not lazy behind hydration (~1.1s of load delay); (2) `fetchpriority="high"` on the hero LCP image on `/` and `/brands`; (3) `whimsy-about-pic.webp` uses `sizes="100vw"` but renders at 364–546px; (4) `wf-logo.webp` is 256×413 for a 59–80px render, `brand02.webp` has ~22KB headroom; (5) `/brands` TTFB is 1.0s vs 0.2–0.4s elsewhere — check for a cold serverless path. Details: `findings/performance.md`.

## 5. Images — 60/100 (estimated from technical + performance passes)

100% alt coverage and modern formats (AVIF/WebP via next/image) are good. Against that: oversized sources listed above, the `Follow us` grid repeats `brand03.webp` five times with alt "Brand 03", gallery grid alts are generic ("Talea & Erich gallery image 7"), and no image carries location or photographer in its alt. Recommend descriptive alts naming flower, setting and (where known) venue/region, and real Instagram imagery in the Follow-us grid.

## 6. AI Search Readiness (GEO) — 38/100

Technically excellent for AI crawlers (SSR, no JS needed) but almost nothing to cite: no city, no service area, no founder bio facts, no structured data, no off-site corroboration (dead social links, no linked press, no directories pointing at this host). `findings/geo.md` contains five voice-compliant citable passages; the new homepage/weddings/about copy in this working tree already covers the first three (who, where, for whom). Add an optional `llms.txt` after the domain is live.

## 7. Local SEO — 22/100

On-site: no NAP, no map, no LocalBusiness schema, no location keywords (now partially fixed). Off-site, corrected against my own direct checks (the agent's Bing-only search missed them):

| Source | What it says today |
|---|---|
| WeddingWire | Whimsy Flower LLC, Hoboken NJ (studio Jersey City), +1 551-264-4181, 5.0 ★ (9 reviews), starting $3,000, service area Northern NJ & NY, woman-owned |
| The Knot | Listing exists under Hoboken, NJ (page blocked our fetch) |
| whimsyflower.love | Current live site: "Providing flowers for Jersey City and beyond", Instagram `@whimsy_flower`, TikTok `@whimsyflower`, "Now booking 2026 weddings" |
| Google Business Profile | Not found for Hudson, NY (verify in GBP Manager) |
| Brides | Feature exists (Julia McGuire exclusive) — not linked from the site |

**Consequence:** the studio has a real, well-reviewed identity — in the wrong city. Moving that identity to Hudson, NY (GBP, Knot, WeddingWire, Instagram bio, old site redirect) is the local ranking work, and it must happen against the final domain, not vercel.app. Also reconcile the public price signal: directories say "from $3,000", the brief says an $8k minimum.

Top 5 local actions and citation list: `findings/local.md`.

## 8. Search Experience (SXO) — 31/100

SERP-backwards analysis across 4 target queries: ~46% of ranking pages are individual studio *service pages* with a local overlay (process, disclosed minimums, explicit service area, FAQ, testimonials), ~24% directories, ~11% listicles. The benchmark competitor page (LE JARDIN's "/hudson-valley-wedding-florist") states an 80-mile service area, "$10k peak / $7k off-season, most couples invest $15k–$40k", a 4-step process, 8 FAQs, phone and email. Whimsy Flower's `/weddings` had none of these. Persona scores: engaged couple 36, planner 36, brand manager 50. The `/brands` page has the best structure on the site (a real 5-step "Our Approach") — port that pattern to `/weddings`. Details: `findings/sxo.md`.

## 9. Keyword clusters & architecture

Seven single-town queries (Rhinebeck, Kingston, Woodstock, New Paltz, Beacon, Millbrook, Albany) return directory-dominated SERPs with zero overlap with each other or with the Hudson Valley pillar — empirical confirmation that per-town pages would be doorway pages. Handle towns via `areaServed` schema and one FAQ block instead.

| Cluster | Primary keyword | Intent | Target page |
|---|---|---|---|
| Core weddings | hudson valley wedding floral design / florist | Local-transactional | `/weddings` (now localized; needs service-page depth) |
| Elopements & micro-weddings | elopement florist hudson valley | Transactional | New spoke under `/weddings` |
| Ceremony installations | wedding ceremony floral installation hudson valley | Transactional | New spoke under `/weddings` |
| Catskills | catskills wedding florist | Local | Conditional — only with genuinely distinct content |
| NYC / Brooklyn couples | nyc couples hudson valley wedding flowers | Local | Conditional — same rule |
| Investment (informational) | how much do wedding flowers cost hudson valley | Informational | Journal post → links to `/weddings` Investment section |
| Events | flower bar bridal shower hudson valley; floral workshop hudson valley | Transactional | `/events` + two journal guides |
| Editorial & brands | editorial florist new york; brand event florals hudson valley | Transactional | `/brands` (now localized) |

Top 5 priority targets: hudson valley wedding floral design · hudson valley wedding florist · how much do wedding flowers cost hudson valley · flower bar bridal shower hudson valley · elopement/micro wedding florist hudson valley. Full plan with internal-link matrix: `findings/cluster.md`.

---

## Artifacts

- `findings/*.md` — ten specialist reports (technical, content, schema, sitemap, performance, visual, geo, local, sxo, cluster)
- `screenshots/` — 14 captures (desktop 1920 + mobile 375) of home, weddings, events, brands, about, inquire, talea-erich
- `ACTION-PLAN.md` — sequenced, falsifiable plan
- `audit-data.json` — structured envelope for `claude-seo run google_report.py --type full`

## Limitations

No Google Search Console, CrUX, PageSpeed API, Moz/Bing or DataForSEO credentials, so: no field CWV, no indexation status, no real query data, no keyword volumes (cluster volumes are estimates), no backlink profile (moot — the custom domain has no history and vercel.app has none). Google and DuckDuckGo blocked automated queries during the local pass; off-site findings were corroborated manually via WeddingWire, The Knot and the current live site.
