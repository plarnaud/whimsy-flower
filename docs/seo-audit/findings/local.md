# Local SEO Audit — Whimsy Flower, LLC
**URL audited:** https://whimsy-flower.vercel.app
**Date:** 2026-09-09
**Business:** Luxury wedding & event floral design studio, Hudson, NY (Columbia County). Hybrid/SAB — primary market: weddings across Hudson Valley/Catskills + NYC; secondary market: editorial/brand styling Albany–Manhattan.
**Client-confirmed unknowns (not invented):** street address, phone number, Google Business Profile status.

---

## Local SEO Score: 22 / 100

| Dimension | Weight | Score (0-100) | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 5 | 1.25 |
| Reviews & Reputation | 20% | 30 | 6.0 |
| Local On-Page SEO | 20% | 8 | 1.6 |
| NAP Consistency & Citations | 15% | 5 | 0.75 |
| Local Schema Markup | 10% | 0 | 0.0 |
| Local Link & Authority Signals | 10% | 20 | 2.0 |
| **Total** | | | **~22/100** |

Scoring rationale: the site has strong brand/editorial content and genuine testimonials, but is missing essentially every discoverable local signal — no NAP anywhere, zero location keywords, no schema, no map, no verifiable GBP or directory presence, and no outbound links at all (not even to credited photographers or social profiles).

---

## Business Type & Industry Vertical

- **Business type detected:** Cannot be determined from the site alone — no visible address, no "serving [area]" language, and no Maps embed anywhere (checked homepage, About, Weddings, Events, Brands, Inquire, and under forced Playwright render). Per brief, actual model is **hybrid/SAB** (home-based/studio + travels to venues across a defined region), but the site currently presents as **placeless** — it reads as though the business could be anywhere.
- **Industry vertical detected:** Wedding/event floral design (visual and content signals: bouquets, ceremony/reception installs, tablescapes, "creative director," bridal showers). The word "florist" is deliberately avoided per brand voice — noted throughout as a search-intent risk, addressed in recommendations below.

---

## NAP Consistency Audit

| Source | Name | Address | Phone | Email |
|---|---|---|---|---|
| Visible HTML (footer, all pages) | "Whimsy Flower, LLC" (copyright line only) | **Absent** | **Absent** | **Absent** |
| JSON-LD / Schema.org | N/A — **no structured data present anywhere on the site** (confirmed via static fetch and forced Playwright render of homepage) | — | — | — |
| Meta tags (title/description) | "Whimsy Flower" | Absent | Absent | Absent | 
| Inquire page (contact form) | — | Absent | Form field only (visitor's phone, not business's) | Form field only |

**Finding:** There is no NAP discrepancy to flag because there is no NAP at all — not even a city name — anywhere on the site, including the About page (Molly's bio), the Weddings page, or the footer. This is the single largest gap in the audit: search engines have no location entity to associate with the business, and it registers as "unknown location" rather than "Hudson, NY."

**Additional technical note (not a scoring dimension, flagged because it affects citation-URL consistency):** the site is currently hosted on a `*.vercel.app` preview subdomain, not a custom domain. If a custom domain is planned before launch, build GBP/directory citations against the final URL — rebuilding citations after a domain migration is costly. `robots.txt` and `sitemap.xml` both 404 (no sitemap submitted; robots.txt absent, so default crawl rules apply — not blocking, but no sitemap to aid discovery of the Weddings/Events/Brands landing pages).

---

## GBP Optimization Checklist

| Item | Status |
|---|---|
| GBP verified and live | **Unverified — not our access to confirm.** See "Off-site findings" below. |
| Maps embed on site | Missing |
| "Get Directions" / place link | Missing |
| Primary category set correctly | Cannot assess (no GBP access) — but this is the **#1 ranking factor and #1 negative factor if wrong** (Whitespark 2026, score 193/176). Flagging as top priority to verify with Molly. |
| Photos evidencing GBP activity | No photo-carousel/GBP-sourced imagery pattern detected; all imagery is site-native |
| Review widget/carousel pulling GBP reviews | Missing — testimonials are hardcoded site copy, not a live review feed |
| Posts indicator | Not assessable from site |
| Q&A / booking / services menu signals | Not assessable from site |

---

## Review Health Snapshot

- **On-site testimonials:** 5 named couples (Lindsey & Finn, Natalia & David, Talea & Erich, Shayna & Evan, Trisha & Jim) — genuine, specific, well-written social proof.
- **aggregateRating in schema:** None (no schema at all).
- **Third-party review presence (Google, Yelp, The Knot, WeddingWire, Zola):** **none found** (see off-site findings below) — so there is no numeric rating, review count, review velocity, or response-rate data to assess. Whitespark's "Magic 10" threshold and the "18-day velocity rule" cannot be evaluated because there is apparently no live review channel yet.
- **Risk:** on-site-only testimonials carry no weight for Google/Maps ranking and are invisible to AI assistants (ChatGPT/Perplexity source Yelp/BBB/Reddit/Bing index, not brand websites, for review sentiment).

---

## Off-Site Findings (GBP & Directory Search)

Performed via Bing web search (multiple queries) since Google/DuckDuckGo blocked automated queries with CAPTCHA/error pages during this session — results below reflect what a search-engine index surfaces today, not a guarantee of non-existence (a profile could exist unverified, unclaimed, or simply outranked by the common-word "whimsy").

| Query | Result |
|---|---|
| "Whimsy Flower" Hudson NY (+ wedding florist) | No matching business result; returned dictionary definitions of "whimsy" and unrelated businesses (Whimsy Fiction, Whimsy Clothing) |
| "Whimsy Flower" + brides.com | No Brides feature surfaced in search index, despite client-reported feature — likely indexed under a different article title/page not matching this exact phrase, or not yet indexed; **recommend Molly supply the direct Brides URL** so it can be linked/cited properly |
| "Whimsy Flower" + theknot.com / weddingwire.com / zola.com | No vendor profile found on any of the three |
| "whimsyflower" Instagram/TikTok | No profile surfaced — consistent with the on-site finding that the Instagram/TikTok icons in the footer currently link to empty `href=""` placeholders (not live URLs) |
| site:whimsy-flower.vercel.app | No indexed pages returned (expected: staging-style domain, no sitemap submitted) |
| Yelp / BBB direct listing search | Yelp search blocked the request (403); no independent confirmation possible without a paid/authenticated tool |

**Conclusion: no verifiable Google Business Profile, Yelp, BBB, The Knot, WeddingWire, Zola, Style Me Pretty, Hudson Valley Weddings, or social-media presence was found for "Whimsy Flower" in this session.** This should be confirmed directly with Molly — she may have an unclaimed/unverified GBP, a listing under a slightly different name, or profiles not yet indexed — but from an external-visibility standpoint, the studio currently presents as absent from every major wedding-industry and local-citation channel.

---

## Local Schema Validation

- **Present:** none.
- **Recommended type:** none of the generic `LocalBusiness` types map cleanly to "wedding floral design studio avoiding the word florist," but per `local-schema-types.md`, the closest correct Google-supported subtypes are `Florist` (Schema.org's actual vocabulary term; schema *type* names are machine-readable metadata, not visible copy, so using `Florist` in JSON-LD does not violate the brand's no-"florist"-in-copy voice) nested under `LocalBusiness`, combined with `Service` entries (Wedding Floral Design, Private Event Florals, Editorial & Brand Styling) via `makesOffer`/`hasOfferCatalog`.
- **Required properties missing:** `name`, `address` (PostalAddress) — both absent, blocking any rich-result eligibility.
- **Recommended properties missing:** `geo` (5-decimal precision), `openingHoursSpecification`, `telephone`, `url`, `aggregateRating`, `image`, `priceRange`.
- **SAB-specific:** `areaServed` — this is the highest-leverage single schema property for this business given the brief (weddings in Hudson Valley/Catskills/NYC, editorial Albany–Manhattan) and should list named places (Hudson, Catskill, Rhinebeck, Kingston, Beacon, Woodstock, Saugerties, Tivoli, Germantown, Millbrook, New Paltz, New York City) with `sameAs` links to Wikipedia/Wikidata entries where available.
- Schema is not a direct ranking factor, but its absence forfeits rich-result eligibility and weakens entity understanding for AI Overviews/AI search, where 3 of the top 5 AI-visibility factors are citation-related.

---

## Local On-Page SEO & Location Page Strategy

- **Location keywords in titles/H1s/body copy: zero**, confirmed across Home, Weddings, About, Brands, Events, Inquire (raw HTML and rendered-text audit; no instance of "Hudson," "Hudson Valley," "Catskill," "NYC," "New York," or any of the target towns anywhere on the site).
- Image `alt` text is well-written for accessibility/photo-credit purposes but contains zero geographic terms — a missed low-effort opportunity ("Wedding florals in the Hudson Valley," "Bride portrait at a Hudson Valley wedding, photographed by Zai Laffitte").
- Duplicate `<title>`/meta description: Home, About, and Inquire all share the exact same title tag and meta description ("Whimsy Flower — Floral Design Studio"). About and Inquire are natural places for location signal and are currently the weakest pages on-site.
- **Weddings page** is confirmed as the natural "wedding florist Hudson Valley" landing page (H1 "Weddings", dedicated title/meta) but currently carries no location content at all — a dedicated service page is the **#1 local-organic ranking factor and #2 AI-visibility factor** per Whitespark 2026, so this is high-leverage, low-risk work.
- **Should there be separate Catskills / NYC landing pages?** Not yet. Applying thin-content/doorway-page quality gates: a Catskills or NYC page built by swapping only the place-name on otherwise-identical Weddings-page copy would fail a doorway-page test (near-100% content overlap, same testimonials/imagery/CTA, no unique value for that specific audience) and risks a quality-signal penalty rather than a ranking gain. **Recommendation:** first add genuine `areaServed` breadth to the single Weddings page (schema + a "Serving Hudson Valley, the Catskills & NYC" line), and only spin off a dedicated NYC or Catskills page later if there is genuinely unique content to put on it (NYC-specific venue partnerships, travel/logistics FAQ, Catskills-specific styling portfolio) — not before.

---

## Local Link & Authority Signals

- Vendor credits exist in copy/alt text for Thalia Photography, Mackenzie Grace Creative, Gleb Freeman Photography, CJ Studios, and Zai Laffitte — but **none of these are hyperlinked**. Zero outbound links exist anywhere on the site (confirmed across all six crawled pages).
- This is a missed co-citation and reciprocal-linking opportunity: linking credited photographers/vendors by name (with their consent) is standard wedding-industry practice, often reciprocated, and builds the kind of topically-relevant local link Google associates with a genuine, embedded local business.
- Footer Instagram/TikTok icons point to empty `href=""` — not just unlinked, but broken placeholders. This should be fixed regardless of local SEO, since it currently reads as a bug to any visitor who clicks.
- Brides feature (client-reported) is not currently cited/linked anywhere on-site — a genuine press mention like this is a strong authority signal and should be surfaced (logo appears in `alt` text already: "Brides logo" — confirm this renders as a real linked press badge, not a static unlinked image).

---

## Top 10 Prioritized Actions

**Critical**
1. **Confirm GBP status with Molly and claim/verify a Google Business Profile** with primary category set correctly for a wedding floral design business (do not guess the category name — the wrong primary category is the #1 negative local ranking factor). This is the single highest-leverage action available and cannot be done without the owner.
2. **Add real NAP** (at minimum: service city "Hudson, NY," a business phone, and a contact email) to the site footer and About/Inquire pages, once Molly confirms what's safe to publish for a home-based/studio SAB model (a PO box or "by appointment" city-only listing is a common, safe pattern for SABs that don't want a public street address).

**High**
3. **Add `LocalBusiness`/`Florist` + `Service` + `areaServed` JSON-LD schema** to the Weddings, Events, and Brands pages, listing the named Hudson Valley/Catskills towns plus NYC — this is free, safe (schema type ≠ visible copy, so it doesn't conflict with the no-"florist" brand voice), and directly supports AI-search citation signals.
4. **Add location language to the Weddings page** (H1/subhead + a short "Serving Hudson Valley, the Catskills & New York City" line) without using the word "florist" in visible copy — e.g., "Wedding floral design for Hudson Valley, Catskills & NYC celebrations."
5. **Build citations on the highest-value wedding directories**: The Knot, Zola, WeddingWire, Style Me Pretty, and Hudson Valley Weddings, using identical NAP once step 2 is resolved. Confirm and properly cite/link the existing Brides feature.

**Medium**
6. **Hyperlink credited vendors** (Thalia Photography, Mackenzie Grace Creative, Gleb Freeman Photography, CJ Studios, Zai Laffitte) to their real sites/socials for co-citation value; fix the broken empty Instagram/TikTok footer links.
7. **Differentiate About/Inquire page titles and meta descriptions** from the homepage (currently identical), and use them to reinforce Molly's base location conversationally (e.g., "based in Hudson, NY, working throughout the Hudson Valley").
8. **Add geographic terms to select image alt text** on the Weddings/Events pages (e.g., name the venue region where accurate) for incremental local-image-search relevance.

**Low**
9. **Add `robots.txt` and `sitemap.xml`** to aid discovery/indexation of the Weddings/Events/Brands pages once a canonical (non-vercel.app) domain is finalized.
10. **Hold off on separate Catskills/NYC landing pages** until there is genuinely unique content for each (this is a "don't do yet" action, included to prevent a doorway-page mistake during future expansion).

---

## Limitations Disclaimer

- DataForSEO and other paid tools were **not available** in this session; no live GBP data, local-pack SERP positions, or verified review counts could be pulled.
- Google web search and DuckDuckGo returned CAPTCHA/error pages to automated fetches in this session; off-site findings rely on Bing search results only. Absence of a result is evidence of non-presence in Bing's current index, **not proof** that no GBP, Yelp, or directory listing exists — Molly should confirm directly (e.g., search "Whimsy Flower" while logged into Google Maps/Business Profile Manager).
- Proximity to searcher accounts for 55.2% of local ranking variance (Search Atlas ML study) and is outside the control of any on-page or content change — noted per methodology, not a site defect.
- Citation-consistency and review-response-rate analysis could not be performed beyond what is described above, since no third-party profiles were located to audit.
