# Content Quality & E-E-A-T Audit — whimsy-flower.vercel.app

**Date:** 2026-09-09
**Method:** Rendered fetch (render_page.py, mode=auto) of `/`, `/weddings`, `/brands`, `/about`, `/inquire`, `/galleries/talea-erich`, `/brands/maison-lumiere-launch`. Analysis run against `extracted_text` (trafilatura-cleaned) plus raw HTML for heading/title/schema checks. Turn budget did not permit fetching `/events`, `/galleries/lindsey-fin`, `/galleries/natalia-david`, `/galleries/brides-feature` in this pass; findings below are annotated where they extrapolate from the fetched sample (all fetched pages share the exact same global template, so the pattern is very likely to repeat on the unfetched pages too).

## Scores

| Score | Value |
|---|---|
| **Content Quality (0-100)** | **28 / 100** |
| **On-Page SEO (0-100)** | **22 / 100** |

### E-E-A-T breakdown (this skill's internal weighting, not Google's)

| Factor | Weight | Score | Why |
|---|---|---|---|
| Experience | 20% | 40/100 | One genuine first-hand case study (Talea & Erich: delphinium/dahlia/clematis/snowberry/sandersonia detail, "met Molly at a pop-up in Hoboken"). Isolated — the hub pages (`/weddings`, `/brands`) and `/about` carry zero first-hand narrative. |
| Expertise | 25% | 35/100 | Molly is named and positioned as sole creative lead, but no credentials, years-in-business, training, or named techniques beyond the one case study. |
| Authoritativeness | 25% | 20/100 | "Featured On: Brides" logo exists on homepage but the `<a>` wraps `href="#"` — a dead link, not a citation to a real article. No other press, awards, or backlinks referenced. |
| Trustworthiness | 30% | 15/100 | No phone number, no `mailto:`/`tel:` link, no address or service-area statement anywhere in fetched HTML. The inquiry form's phone field placeholder is the literal test string `(555) 123-4567`. Brand case-study page runs live Lorem Ipsum body copy behind a fictional client name. |
| **Weighted E-E-A-T** | | **~26/100** | |

Content Quality (28/100) is slightly above the raw E-E-A-T average because the Talea & Erich case study and homepage intro paragraph are genuinely well-written, on-brand prose — they just don't scale across the site.

## Critical findings

1. **Zero geographic/location signal anywhere in fetched copy.** Exact string search across all 7 pages for "Hudson," "Catskill," "New York," "Albany," "Manhattan," "NY" → **0 matches on every single page**, including the homepage and the `/weddings` page that must carry the "wedding florist hudson valley" intent. The business goal is to rank across Hudson Valley / Catskills / Hudson NY / NYC, but nothing on the indexed pages tells Google (or an LLM) where the studio operates. This is the single highest-leverage fix available — bigger than any word-count or banned-word issue.

2. **The entire site is templated boilerplate with almost no unique per-page prose.** The identical 78-word "Meet the Creative Director" block (verbatim, word-for-word) appears on `/`, `/weddings`, `/about`, `/brands`, `/galleries/talea-erich`, and `/brands/maison-lumiere-launch`. Combined with the repeated inquiry form and footer, unique content per page is:
   - `/weddings`: **116 words total**, and of those, 0 are unique to weddings — it's the H1 "Weddings" + the shared bio block + form. No prose about weddings, timelines, venues, or the Hudson Valley/Catskills at all.
   - `/about`: **116 words**, identical structure to `/weddings` (H1 "About" + same shared bio block). No unique founder story, no credentials, no timeline.
   - `/inquire`: **39 words**, 100% form labels/footer, zero prose.
   - `/brands/maison-lumiere-launch`: **201 words**, of which the "unique" section is Lorem Ipsum placeholder text (see #3).
   Against this skill's page-type minimums (Service page 800w, Homepage 500w), `/weddings` (a page that must carry the primary commercial keyword) is at **~15% of the service-page floor**, and even the homepage (298 words) is at **~60% of the homepage floor** — and most of that 298 is the same shared bio + testimonial blocks reused elsewhere.

3. **Live placeholder/fake content on a real, indexable case-study URL.** `/brands/maison-lumiere-launch` renders literal `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sapien diam...` as body copy under the heading "Product Launch," attached to a fictional brand name ("Maison Lumière") with a templated testimonial ("Whimsy Flower translated our brand into a floral concept that felt entirely our own — composed, atmospheric, and executed without a single detail out of place."). The `/brands` hub lists six clients — Maison Lumière, Atelier Rosewood, Verdant & Co., The Linen House, Studio Meridian, Fern + Field — that read as invented placeholder names, not real clients. Presenting fabricated client work as real is a direct trust/authenticity risk (E-E-A-T "Trust" factor) if this ships to production as-is, independent of any SEO concern.

4. **No structured data (schema.org/JSON-LD) on any fetched page.** `structured_data.block_count = 0` on all 7 pages. There is no `LocalBusiness`/`Florist` entity, no service-area markup, no `Review`/`AggregateRating` despite real testimonial content existing, no `Person` markup for Molly, no `BreadcrumbList`. This is a hard blocker for AI-citation readiness (Google AI Overviews, ChatGPT/Perplexity-style answer engines lean heavily on entity + schema signals when no clear location text exists in prose either — see #1).

## High findings

5. **Duplicate `<title>`/meta description across distinct URLs.** `/`, `/about`, `/inquire`, and `/brands/maison-lumiere-launch` all ship the identical title `Whimsy Flower — Floral Design Studio` and identical meta description. A dedicated case-study page (`/brands/maison-lumiere-launch`) and the About page having no unique `<title>` is a basic on-page SEO miss and risks Google collapsing/deprioritizing one of the duplicated URLs in search.

6. **H1s don't carry search intent.** `/weddings` H1 is literally `"Weddings"` (no location, no service framing) on the one page that most needs to rank for "wedding florist/floral design [Hudson Valley]." `/about` H1 is `"About"`. `/brands/maison-lumiere-launch` H1 is the generic `"Product Launch"` — the brand name "Maison Lumière" never appears in any heading tag on its own page, only as plain body text. `/inquire` has **no H1 at all** (empty).

7. **Gallery cards show the wrong data in the location slot.** Each gallery card on `/weddings` renders a two-line layout (`couple name` + `year`, then `couple name` again + a hover-reveal label). The slot where a venue/location string ("Hudson, NY," "Catskills," etc.) would logically go instead just repeats `2025`. Across all three visible cards (Lindsey & Finn, Natalia & David, Talea & Erich) there is no venue or location text anywhere in the card markup — a missed opportunity to reinforce geographic relevance site-wide, and consistent with finding #1.

8. **"Featured On: Brides" is an unverifiable claim.** The press logo bar exists and looks credible, but the anchor is `href="#"` — it doesn't link to the actual Brides.com feature. For AI-citation and authoritativeness purposes, an unlinked claim is worth much less than a citable URL, and a rater/crawler that checks the link will find nothing.

## Medium findings

9. **No visible contact information anywhere.** No phone number, no email address (`mailto:`), no street address or service-area sentence on any page — only a contact form. Luxury/service-business trust signals (a real phone number, a stated service area, a way to reach a human without filling out a form) are absent. The only phone-shaped string on the site is the form's placeholder text `(555) 123-4567`.

10. **Readability is stylistically fine but monotone across the site because it's the same paragraph repeated.** The shared bio block averages ~24 words/sentence with abstract, editorial diction ("allowing each design to feel deeply connected to its setting rather than simply placed within it") — appropriate tone for the luxury positioning, but because it's the *only* prose block appearing on 6 of 7 pages, there's no readability variation to assess per page, and no page-specific keyword-relevant sentences at all.

11. **Testimonial voice occasionally contradicts the banned-word list, inside real customer quotes.** The Talea & Erich testimonial (real, first-person, user-generated) contains "beautiful" (×3) and "florist" (×1) — e.g., "You will not find a more thoughtful, creative, kind, dependable, or amazing florist." This is authentic customer language, not Molly's copy, so it isn't a brand-voice violation the way it would be if written in-house — but if it's ever edited/paraphrased for the site, watch for the ban being applied to real quotes and stripping their authenticity.

## Low findings

12. **`publication_date` is a flat `2025-01-01` placeholder on every page** (checked in the render metadata for all 7 pages) — no real freshness/last-updated signal, though for a mostly-static marketing site this matters less than for a blog.

13. **No blog or long-form editorial content found** on the fetched pages, meaning there's no natural home for the location-rich, informational content (e.g., "Planning a wedding in the Catskills," "Hudson Valley wedding venues we love") that would organically absorb the target keywords without touching the banned-word list.

## Banned-word vs. high-volume-keyword conflict

The brief bans: affordable, packages, beautiful, dream wedding, perfect, florist, centerpieces, bouquets (except describing services). The highest-intent commercial queries in this market are literally "wedding florist hudson valley," "florist hudson ny," "wedding florist catskills." Two things worth separating:

- **The ban is not actually the binding constraint right now.** Even ignoring "florist" entirely, the site currently uses **zero** location words and **zero** synonyms for "wedding floral design + place" in visible copy. Google's ranking systems match entities/synonyms, not just exact phrases — a sentence like *"Bespoke, sculptural wedding floral design for Hudson Valley and Catskills celebrations"* can absolutely compete for "wedding florist hudson valley" without ever saying the word "florist," provided the location + "wedding" + "floral design" entities are actually present somewhere. Fix #1 (add location copy) matters far more than resolving the word-ban conflict.
- **Where the ban genuinely costs something:** the literal string "florist" still has real, separate search volume from "floral design studio" (people searching a plain-language local-service query, not an editorial one). Workarounds that respect the brief's voice ban on visible body copy while still capturing that volume:
  - Use "florist"/"wedding florist" in **`<title>` tags and meta descriptions** (e.g., `Wedding Floral Design & Hudson Valley Florist | Whimsy Flower`) — these are metadata, not on-page voice, and Google/users read them differently than body prose.
  - Use it in **schema.org markup** (`"@type": "Florist"` / `additionalType`) — invisible to readers, read by machines.
  - Use it in **image alt text** for gallery photos ("Hudson Valley wedding florist arrangement, ceremony install") — again metadata, not prose voice.
  - If an FAQ section is ever added, frame one question in the *searcher's* voice rather than the studio's: `"Looking for a wedding florist in the Hudson Valley?"` as the Q, answered in on-brand vocabulary — the banned word appears in a quoted user query, not as Molly's own descriptive language.
  - "Centerpieces"/"bouquets" are already explicitly exempted by the brief "when describing services" — use them plainly in a services/schema list (`Service` names, footer service list) even while avoiding them in narrative paragraphs.

## What already works

- The homepage intro paragraph and the Talea & Erich case study are genuinely good, distinctive, on-brand editorial writing — when the site does write original prose, it's well above generic AI-content quality (specific botanical detail, sensory language, no filler).
- Voice discipline is strong in Molly's own copy: zero instances of "affordable," "packages," "dream wedding," "centerpieces," or "bouquets" found anywhere in the fetched pages, and "perfect"/"beautiful"/"florist" appear only once each outside of a direct customer quote.
- Meta descriptions that do exist (home, weddings, brands, gal-talea) are well-written, appropriately scoped, and not keyword-stuffed.
- The founder-led, single-point-of-contact positioning ("Molly leads each commission personally") is a genuine, defensible experience/expertise signal if it's built out with real credentials and case studies rather than left as a repeated boilerplate block.
- Real, specific testimonial content exists (Talea & Erich) and reads as authentic rather than manufactured — a good foundation for `Review`/`AggregateRating` schema once real client names are confirmed for reuse.
