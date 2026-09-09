# Whimsy Flower — SEO Action Plan

Goal: rank at the top for wedding-floral searches across the Hudson Valley, the Catskills, Hudson NY and New York City; secondarily for editorial & brand florals from Albany to Manhattan.

Each item carries the observation it rests on, what it unblocks or depends on, a check that would prove it failed, and a leading indicator to watch without re-running the audit. Priorities: **Critical** blocks indexing/identity · **High** materially affects rankings · **Medium** optimization · **Low** backlog.

---

## Phase 1 — Critical fixes (Week 1)

### 1.1 Go live on `whimsyflower.com` — Critical
- **Observation:** the domain has no DNS; the only host is `whimsy-flower.vercel.app`. Every citation/review built today points at a disposable URL.
- **Do:** add the domain in Vercel, set it as the production domain, let Vercel 308-redirect the vercel.app host; set `metadataBase: new URL("https://whimsyflower.com")` and `alternates.canonical` in `layout.tsx`; verify the property in Google Search Console.
- **Depends on / unblocks:** depends on nothing; unblocks 1.3, 1.5, 2.1, 3.x (all citations).
- **Failed if:** `dig whimsyflower.com` returns nothing after 48h, or `curl -I https://whimsy-flower.vercel.app/` still returns 200 instead of a redirect.
- **Leading indicator:** GSC "Pages → Indexed" count climbs to ~12 within 2–3 weeks; vercel.app URLs drop from `site:` results.

### 1.2 Ship the location copy already in the working tree — Critical
- **Observation:** the live site had zero mentions of Hudson / Hudson Valley / Catskills / New York. Twelve files now carry them (titles, H1s, intros, footer, bio, metadata for about/inquire/brand pages).
- **Do:** review the diff (`git diff`), confirm the H1 "Hudson Valley Weddings" and the footer service-area line read right to Molly, commit, deploy.
- **Failed if:** the deployed `/weddings` HTML does not contain "Hudson Valley" in `<title>` and `<h1>`.
- **Leading indicator:** GSC queries containing "hudson" begin to register impressions within 2–4 weeks of indexing.

### 1.3 robots.txt + sitemap.xml — Critical
- **Observation:** both 404. Six brand project pages are orphaned (no internal link) and contain placeholders.
- **Do:** `app/robots.ts` (allow all, disallow `/api/`, `Sitemap:` on the custom domain) and `app/sitemap.ts` importing `galleries` from `@/data/galleries`; keep `brandProjects` out until real content lands. Code in `findings/sitemap.md`. Submit in GSC.
- **Depends on:** 1.1 for the base URL.
- **Failed if:** `curl https://whimsyflower.com/sitemap.xml` is not `200` with 12 `<loc>` entries.
- **Leading indicator:** GSC Sitemaps report shows "Success", discovered URLs = submitted.

### 1.4 Quarantine placeholder brand pages — Critical (trust)
- **Observation:** `/brands/{6 slugs}` render fictional brands, stock photos, templated testimonials and Lorem ipsum (PaletteSection default text).
- **Do (Molly's call):** either `robots: { index: false }` in `generateMetadata` for those routes until real projects exist, or delete the routes and keep the `/brands` lightbox only. Also decide whether the fake brand marquee stays live.
- **Failed if:** `site:whimsyflower.com/brands/` returns any placeholder URL after indexing.
- **Leading indicator:** none needed — binary.

### 1.5 Resolve the NAP conflict and claim Google Business Profile — Critical (local)
- **Observation:** WeddingWire and The Knot say Hoboken, NJ / Jersey City, phone +1 551-264-4181, "from $3,000"; `whimsyflower.love` says "Jersey City and beyond"; the new site says Hudson, NY. A differently owned "Whimsy Flowers" (Kerhonkson, NY) already occupies the name in the target market.
- **Do:** (a) claim or move the GBP to Hudson, NY as a service-area business (hide the street address if home-based), primary category *Florist*, secondary *Wedding service* / *Event planner*; (b) update The Knot, WeddingWire, Instagram and TikTok bios to "Whimsy Flower · Hudson, NY"; (c) point `whimsyflower.love` at the new domain with a 301 once 1.1 is done; (d) reconcile the public price signal ("from $3,000" vs the brief's $8k minimum); (e) decide which phone/email is public and add it to the footer alongside the new service-area line.
- **Depends on:** 1.1.
- **Failed if:** a search for "Whimsy Flower Hudson NY" three weeks later still shows Hoboken on the Knot/WeddingWire cards, or GBP is unverified.
- **Leading indicator:** GBP Insights "Searches" > 0 and the profile appears in the map pack for "wedding florist hudson ny".

### 1.6 Fix dead links — Critical (crawl + E-E-A-T)
- **Observation:** four social icons have `href=""`, the "Featured On: Brides" logo has `href="#"`, and the "See more testimonials" button does nothing.
- **Do:** Instagram → `https://www.instagram.com/whimsy_flower/`, TikTok → `https://www.tiktok.com/@whimsyflower`, Brides → the canonical brides.com URL of the Julia McGuire two-part-wedding exclusive (find it from Molly's press folder or the Brides TikTok post; the Yahoo syndication has since 404'd). Wire "See more testimonials" to the WeddingWire/Knot reviews or remove it.
- **Failed if:** any `<a href="">` or `href="#"` remains in the rendered footer/nav.
- **Leading indicator:** referral sessions from instagram.com appear in analytics.

## Phase 2 — High-impact improvements (Weeks 2–3)

### 2.1 Structured data — High
- **Observation:** zero JSON-LD. Schema type is invisible to readers, so `Florist` does not violate the brand voice.
- **Do:** add the `@graph` from `findings/schema.md` to `layout.tsx` (Florist/LocalBusiness with `areaServed`, `sameAs`, `founder` Person; WebSite; three Service nodes) and per-page `BreadcrumbList` + `ImageGallery` (with photographer) on gallery pages. Fill address/phone only after 1.5 decides what is public.
- **Depends on:** 1.1 (URLs), 1.5 (NAP values).
- **Failed if:** Google's Rich Results Test reports errors or the Search Console "Enhancements" panel never lists Breadcrumbs.
- **Leading indicator:** GSC → Enhancements → Breadcrumbs shows valid items; Knowledge panel-style entity appears for "Whimsy Flower Hudson".

### 2.2 Open Graph / Twitter cards — High
- **Do:** `openGraph` + `twitter` in root metadata with a 1200×630 image (a real wedding photo, credited), per-page overrides on weddings/brands/galleries.
- **Failed if:** pasting a URL into iMessage/Slack/Instagram DM shows no preview image.

### 2.3 Turn `/weddings` into a real service page — High
- **Observation:** ranking pages for the target queries are service pages with process, disclosed minimums, service area, FAQ and testimonials; `/weddings` was a header + grid + form (116 words). The new intro helps but is ~110 words.
- **Do:** add (a) "The Experience" — port the 5-step "Our Approach" pattern from `/brands`, rewritten for weddings; (b) "Investment" — the brief's minimum, stated plainly ("Wedding commissions begin at $8,000; most couples invest $X–$Y"), reconciled with the directories; (c) a short FAQ block written in the searcher's voice (service radius, travel, seasonality, lead time, whether the studio does personal flowers only) — content only, no FAQPage schema for SERP purposes; (d) a venues/regions paragraph naming counties and a handful of real venues Molly has worked; (e) link photographer credits to their sites (co-citation).
- **Depends on:** Molly for investment numbers and venues.
- **Failed if:** `/weddings` prose stays under ~600 unique words or still has no stated minimum.
- **Leading indicator:** GSC average position for "hudson valley wedding floral design" / "wedding florist hudson valley" improves month over month; inquiry form submissions mentioning Hudson Valley venues rise.

### 2.4 Mobile conversion + LCP — High
- **Observation:** no "Inquire" CTA in the mobile header; homepage mobile LCP 4.4s, galleries 3.8s; the LCP gallery image is lazy-loaded behind hydration; `whimsy-about-pic.webp` uses `sizes="100vw"`; logo source is 4× its render size.
- **Do:** show a compact "Inquire" pill in the mobile nav row; `priority`/`fetchpriority="high"` on the first hero and first gallery image; fix `sizes` on the about photo; downscale `wf-logo.webp`; check `/brands` TTFB (1.0s).
- **Failed if:** Lighthouse mobile LCP on `/` stays above 2.5s after deploy.
- **Leading indicator:** Vercel Speed Insights p75 LCP mobile < 2.5s; later, CrUX "Good" once traffic exists.

### 2.5 Internal linking — High
- **Do:** add "Editorial & Brands" to the footer link list; link gallery cards' location text once real venues exist; add a "See our weddings" text link in the homepage services section; make `/brands` collage tiles link to project pages *only* after placeholders are replaced.
- **Failed if:** `/brands` still has zero inbound links from the footer.

### 2.6 Fill real gallery locations — High (Molly)
- **Observation:** three galleries show "2025" in the location slot and one is blank; location is the strongest local signal a portfolio can carry.
- **Do:** replace with "Venue, Town, NY" for Lindsey & Finn, Natalia & David, Talea & Erich, Trisha & Jim; then the gallery `<title>` already picks the place up automatically (logic added this session). Feature NY-area weddings first on the homepage.
- **Failed if:** any gallery card still shows a bare year.

### 2.7 Security headers — Medium
- **Do:** `headers()` in `next.config.ts`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or a CSP `frame-ancestors`), `Permissions-Policy`. Drop `Access-Control-Allow-Origin: *` on HTML.

## Phase 3 — Content & authority (Month 2)

### 3.1 Journal (four posts) — High for informational reach
- Wedding flower investment in the Hudson Valley (targets the cost query; links to the Investment section) · Seasonal, garden-style wedding flowers by month · A guide to hosting a flower bar for a bridal shower · What to expect at a Whimsy workshop. Each 900–1,400 words, one real photo set, author = Molly (Person schema), internal links per the matrix in `findings/cluster.md`.
- **Failed if:** posts do not earn impressions for their informational query within 8 weeks.

### 3.2 Two `/weddings` spokes — Medium
- Elopements & micro-weddings; ceremony installations. Real differentiation, no doorway risk. Catskills and NYC pages only if genuinely distinct content exists.

### 3.3 Citations & co-citations — High (local)
- Update Knot/WeddingWire (1.5), add Zola, Style Me Pretty vendor guide, Hudson Valley Weddings, Hudson Valley Magazine wedding directory; ask credited photographers (Thalia Photography, Mackenzie Grace Creative, Gleb Freeman, CJ Studios, Zai Laffitte) and venues for vendor-credit links; link the Brides feature.
- **Leading indicator:** GSC "Links → Top linking sites" gains 5+ relevant domains.

### 3.4 Reviews — Medium
- Ask the five on-site testimonial couples to post to the new Hudson GBP; embed a link to Knot/WeddingWire reviews instead of the dead "See more testimonials" button.

### 3.5 Entity disambiguation — Medium
- Consistent "Whimsy Flower" (singular) + "Hudson, NY" + Molly across GBP, socials, directories, schema `sameAs`, and the footer, to separate from "Whimsy Flowers" (Kerhonkson).

## Phase 4 — Monitoring (ongoing)

- Capture a drift baseline once deployed: `/seo drift baseline https://whimsyflower.com`, re-run `compare` after each deploy.
- Configure a Google API key + GSC OAuth in `~/.config/claude-seo/` so the next audit has field CWV, indexation and query data.
- Monthly: GSC queries containing "hudson"/"catskill"/"nyc"; GBP calls/direction requests; inquiry form volume by occasion.
- Quarterly: add a new gallery with venue/location; refresh the Investment section.

---

## Open questions for Molly / the owner

1. Which phone and email should be public on the site and GBP?
2. Real venues/towns for Lindsey & Finn, Natalia & David, Talea & Erich, Trisha & Jim.
3. Is the studio address in Hudson a public storefront or home-based (affects GBP setup and schema `address`)?
4. Is "from $3,000" (directories) or "$8,000 minimum" (brief) the number to publish?
5. Canonical URL of the Brides feature.
6. May the word "florist" appear in `<title>`/meta/alt/one FAQ question (invisible or near-invisible to the brand voice), or is the ban absolute?
7. Keep, noindex, or remove the six placeholder brand project pages and the fictional brand marquee?

---

## Implementation status — 2026-09-09 (same session, working tree, uncommitted)

| Item | Status | Where |
|---|---|---|
| 1.1 Custom domain live | **Owner action** — DNS/Vercel settings. Code is ready: `siteUrl` follows `NEXT_PUBLIC_SITE_URL`, else Vercel's production URL, so canonicals/sitemap/schema switch to whimsyflower.com automatically once the domain is attached. | `src/lib/siteConfig.ts` |
| 1.2 Location copy | **Done** | titles, H1s, intros, footer, bio, per-page metadata |
| 1.3 robots.txt + sitemap.xml | **Done** — 12 URLs, brand placeholders excluded, `/api/` disallowed | `src/app/robots.ts`, `src/app/sitemap.ts` |
| 1.4 Placeholder brand pages | **Done (reversible)** — `noindex, follow`; Lorem ipsum default removed from PaletteSection | `src/app/brands/[slug]/page.tsx`, `src/components/paletteSection.tsx` |
| 1.5 NAP / GBP / directories | **Owner action** — off-site. Site now states Hudson, NY in footer, copy, schema. Phone/email still withheld pending decision. | — |
| 1.6 Dead links | **Done** — Instagram/TikTok wired (`@whimsy_flower`, `@whimsyflower`), Brides logo → gallery (swap for article URL in `siteConfig.bridesFeatureUrl`), "See more testimonials" → /weddings, hero "Contact us!" → /inquire (was a console.log) | navbar, page, testimonialsSection, pillButton |
| 2.1 Structured data | **Done** — Florist + WebSite + Person + 3 Service in layout; BreadcrumbList + ImageGallery (photographer credit) on gallery pages | `src/lib/structuredData.ts`, `src/components/jsonLd.tsx` |
| 2.2 Open Graph / Twitter | **Done** — site-wide 1100×576 `og-image.jpg`; gallery pages use their cover | layout, galleries/[slug] |
| Canonical + metadataBase | **Done** — per-page self-referencing canonical | layout |
| 2.3 /weddings service page | **Done** — Experience (5 steps), Investment ($8,000 minimum from the brief — confirm), FAQ (6, content only) → ~818 visible words | `src/app/weddings/page.tsx` |
| 2.4 Mobile CTA + LCP | **Done** — "Inquire" pill in mobile header; `fetchPriority="high"` on hero, sub-page headers and first gallery photo; `sizes` fixed on the founder portrait | navbar, horizontalList, galleryGrid, subPageHeader, meetWhimsy |
| 2.5 Internal linking | **Done** — footer links Editorial & Brands | footer |
| 2.6 Gallery locations | **Partial** — Julia & Jackie → "Doylestown, PA" (public record). Three galleries still show "2025", one blank: needs Molly. | `src/data/galleries.ts` |
| 2.7 Security headers | **Done** — nosniff, DENY, Referrer-Policy, Permissions-Policy | `next.config.ts` |
| Speed Insights | **Done** — component was imported but never rendered; now mounted | layout |
| Copyright year | **Done** — 2026 via `siteConfig.copyrightYear` | footer, navbar |
| Phase 3 & 4 | Not started (content, citations, reviews, monitoring) | — |

## Implementation status, round 2 (same day)

| Item | Status | Where |
|---|---|---|
| Alt text | **Done**: 55 gallery photos plus 16 home/services/portrait/placeholder images described from the actual frames (flowers, setting, moment), in the studio voice, no banned words, no em dashes. Gallery covers and testimonial photos reuse the same alts. Purely decorative low-opacity backgrounds now carry an empty alt. | `src/data/galleries.ts` (`photoAlts`), `src/app/page.tsx`, events, brandProjects, meetWhimsy, testimonialsSection |
| Follow us grid | **Done**: five copies of a stock photo replaced with eight real wedding photos linking to their galleries, plus an Instagram link | `src/components/followUs.tsx` |
| About page | **Done**: "Rooted in Hudson, New York" studio section (service area, approach, Brides feature, collaborators), header subtitle, ProfilePage + breadcrumb schema | `src/app/about/page.tsx` |
| Inquire page | **Done**: H1 and intro stating service area and the $8,000 minimum; breadcrumb schema | `src/app/inquire/page.tsx` |
| Gallery pages | **Done**: header subtitle with location and photographer, photographer credit linked (Zai Laffitte, Thalia Photography, Mackenzie Grace Creative), "View All Weddings" link, titles without em dashes | `src/app/galleries/[slug]/page.tsx`, `src/components/subPageHeader.tsx` |
| Home | **Done**: services intro sentence naming Hudson NY and the service area; testimonial alt from data | `src/app/page.tsx` |
| Schema | **Done**: Offer with $8,000 minimum on the wedding Service; BreadcrumbList on weddings, events, brands, about, inquire; photographer URLs in ImageGallery | `src/lib/structuredData.ts` |
| llms.txt | **Done**: generated from site config and gallery data | `src/app/llms.txt/route.ts` |
| Footer | **Done**: Instagram and TikTok text links | `src/components/footer.tsx` |
| Apple touch icon | **Done**: 180px icon from the logo | `src/app/apple-icon.png` |
| Titles | **Done**: no em dashes; pattern "Page, qualifier | Whimsy Flower" | all pages |
| Still owner-side | Domain DNS, Google Business Profile, Knot/WeddingWire city update, public phone/email, three gallery venues, Brides article URL, CJ Studios website (ambiguous, left unlinked). Home carousel credits "Photo by Lindsey Finn" and "Photo by Chelsea Jessica" look like couple names rather than photographers; confirm. | |

## Round 3 corrections (same day)

Per the owner: content rewrites stay, layout additions do not. Reverted from round 2: the Inquire intro block, gallery header subtitles and the "View All Weddings" button, the mobile header Inquire pill, the Follow-us Instagram link and tile links (the real wedding photos stay), the footer Instagram and TikTok text links, and the home services sentence. Kept: the About studio section, restructured to mirror "Meet the Creative Director" with the image on the right; the weddings page process, Investment and FAQ sections (kicker renamed FAQ); the footer location line, now on two lines; photographer credits linked in place under each gallery. The weddings page now opens with the same hero treatment as Editorial & Brands. All em dashes were removed from site copy, including the original gallery stories.
