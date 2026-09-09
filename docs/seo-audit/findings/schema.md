# Structured Data (Schema.org) Audit — Whimsy Flower

Site: https://whimsy-flower.vercel.app
Audited: 2026-09-09
Pages checked: `/`, `/weddings`, `/events`, `/brands`, `/about`, `/galleries/lindsey-fin`, `/brands/maison-lumiere-launch`

**Schema Score: 5 / 100**

The site has clean, well-organized copy and real content to hang schema off of (named couples, photographer credits, a defined service structure, a press mention), but **zero machine-readable structured data exists anywhere on the site today.** Every recommendation below is a net-new addition.

---

## 1. Detection Results

Every page was fetched with `render_page.py`. Homepage was checked twice — once `--mode auto` (resolved to raw fetch) and once forced `--mode always` (Playwright/Chromium render) — to rule out client-side-injected JSON-LD (React Helmet / next/head patterns). Results were identical.

| Page | Status | Render mode used | JSON-LD blocks | Microdata/RDFa (`itemscope`, `itemtype`, `vocab=`, `typeof=`) | `<title>` / meta description |
|---|---|---|---|---|---|
| `/` | 200 | raw (confirmed also under forced Playwright render) | 0 | none | page-specific |
| `/weddings` | 200 | raw | 0 | none | page-specific |
| `/events` | 200 | raw | 0 | none | page-specific |
| `/brands` | 200 | raw | 0 | none | page-specific |
| `/about` | 200 | raw | 0 | none | **inherits homepage default** (no page-level `generateMetadata`) |
| `/galleries/lindsey-fin` | 200 | raw | 0 | none | page-specific (via gallery `generateMetadata`) |
| `/brands/maison-lumiere-launch` | 200 | raw | 0 | none | **inherits homepage default** (no page-level `generateMetadata` on `brands/[slug]`) |

- `is_spa: false` on every page — this is a server-rendered Next.js App Router site (confirmed via source inspection: `src/app/layout.tsx`, `src/app/**/page.tsx`), not a client-shell SPA, so the raw-fetch result is trustworthy and not a false negative.
- No `og:*` or `twitter:*` meta tags found on any page, and no `<link rel="canonical">` on any page. These aren't JSON-LD, but they're adjacent metadata gaps worth flagging alongside a schema audit since they affect how the same entity/content is represented off-page.
- No deprecated types (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`) are present — there's simply nothing present at all.
- No `FAQPage` is present anywhere. Per current guidance, FAQPage should **not** be added for Google SERP benefit (Google retired FAQ rich results for all sites May 7, 2026); any genuine Q&A content on this site should use `QAPage` instead, not `FAQPage`.

---

## 2. Validation Results

Not applicable — there is no existing schema to validate. All findings below are "missing opportunity," not "broken implementation."

---

## 3. Missing Opportunities, Ranked by Severity

1. **Critical** — No `Organization` / `LocalBusiness` entity anywhere. A local, founder-led studio with a defined service area has no machine-readable business entity for Google to bind local-pack, Knowledge Panel, or entity-search signals to.
2. **Critical** — No `Service` markup for the three core offerings (wedding, private events, editorial/brand). These are the commercial core of the site and currently invisible to entity-based search.
3. **High** — No `WebSite` entity, so there's no canonical root node for `publisher` references from other types to point at.
4. **High** — No `BreadcrumbList` on deep pages (`/galleries/[slug]`, `/brands/[slug]`), so there's no breadcrumb trail eligible for the SERP breadcrumb rich result.
5. **High** — No `ImageGallery`/image-object credit markup on gallery pages. This is a visually-driven, photography-dependent business (Brides feature, five named photographers) with no structured image provenance/credit data at all.
6. **Medium** — No `Person` entity for Molly. Founder-led/creative-director brands benefit materially from an explicit Person node tied to the Organization (`founder`) for entity and E-E-A-T signals — especially relevant given the Brides press mention is inherently about her.
7. **Medium** — No Open Graph / Twitter Card tags and no canonical URLs sitewide (not JSON-LD, but flagged because it undermines the same off-page-representation goal).
8. **Medium** — `/about` and `/brands/[slug]` pages have no page-level `generateMetadata`, so they silently inherit the homepage's title/description. Confirmed directly: both pages served the homepage's exact `<title>Whimsy Flower — Floral Design Studio</title>` and homepage meta description in the fetched HTML.
9. **Info / content-readiness blocker** — `/brands/maison-lumiere-launch` (and its five sibling brand slugs — Atelier Rosewood, Verdant & Co., The Linen House, Studio Meridian, Fern + Field) render from `src/data/brandProjects.ts`, which is explicitly placeholder data: Lorem-ipsum body copy and a shared, cycling pool of three stock images (`brand01/02/03.webp`) reused across all six fictitious brand names. **Do not mark this page up with `CreativeWork`/`ImageGallery` schema until real client/project content replaces the placeholders** — publishing structured data that describes a placeholder as a real project would itself violate the "no placeholder text" quality gate and Google's structured-data honesty guidelines. A template is provided below for when real content lands.
10. **Info** — The Instagram and TikTok icons in `src/components/navbar.tsx` both have `href=""` (no real URL wired up yet). This blocks a real `sameAs` array — noted as TODO rather than invented.
11. **Info** — No street address or phone number is published anywhere on the site (confirmed — none in source, matches what we were told). Recommendations below use city/region only and explicitly omit (not fake) the unknown fields.
12. **Info** — Testimonials exist in `src/data/galleries.ts` (Lindsey & Finn, Natalia & David, Talea & Erich, Julia & Jackie, Shayna & Evan, Trisha & Jim) and are real, attributed client quotes — but see the Review/AggregateRating eligibility note in Section 7 before marking any of them up.

---

## 4. Organization / LocalBusiness — type discussion + generated JSON-LD

### `Florist` vs `LocalBusiness` vs `ProfessionalService`

The brand's copy deliberately avoids the word "florist" ("floral design studio," "creative director," never "florist shop"). The schema `@type` is invisible to users, so it can be chosen purely on categorization merit — but it should still match reality and, ideally, the business's actual Google Business Profile category.

| Type | Fit | Trade-off |
|---|---|---|
| **`Florist`** (schema.org `Store` → `LocalBusiness`) | Most specific type on the floral-industry ladder; strongest categorical signal for "florist"/"wedding florist" local search and Maps matching | Inherits `Store` semantics (retail storefront, implied walk-in purchase) that don't match a by-appointment, project-based design studio with no known street address |
| **`LocalBusiness`** (generic) | Safe, no retail connotation, still fully eligible for local entity signals via `areaServed` | Least specific — Google's own guidance is to use the most specific applicable subtype when one exists, so this under-signals the floral specialty |
| **`ProfessionalService`** (schema.org subtype of `LocalBusiness`) | Matches a bespoke, expertise/execution-led creative studio; aligns with the brand's own "design studio" language | Generic outside the floral vertical — needs `description`/`knowsAbout` to compensate for the lack of a floral-specific type |

**Recommendation:** use `Florist` as the declared `@type`. It already inherits every `LocalBusiness`/`Organization` property needed (no need to dual-type), it's the closest floral-specific node on the type tree, and choosing it doesn't change any visible copy — the site can keep saying "floral design studio" everywhere a human reads it. The one condition: **this should match whatever primary category is set on the actual Google Business Profile listing** (unconfirmed — TODO). If the GBP primary category is something non-floral (e.g., "Wedding planner" or "Event planner"), switch `@type` to `ProfessionalService` instead so the two stay consistent — consistency between GBP and on-site schema is a stronger signal than type specificity alone.

Since there is no known street address or phone number, the `PostalAddress` below intentionally omits `streetAddress`, `postalCode`, and `telephone` rather than filling them with placeholder text — a locality/region-only address is valid schema.org and is the correct pattern for a by-appointment, service-area business with no public storefront.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Florist",
      "@id": "https://whimsy-flower.vercel.app/#organization",
      "name": "Whimsy Flower",
      "legalName": "Whimsy Flower, LLC",
      "url": "https://whimsy-flower.vercel.app/",
      "logo": "https://whimsy-flower.vercel.app/wf-logo.webp",
      "image": "https://whimsy-flower.vercel.app/wf-logo.webp",
      "description": "Whimsy Flower is a bespoke floral design studio led by founder and creative director Molly, creating composed, sculptural florals for weddings, private events, and editorial/brand experiences across the Hudson Valley, the Catskills, and New York City.",
      "founder": { "@id": "https://whimsy-flower.vercel.app/about#molly" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hudson",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Hudson Valley, NY" },
        { "@type": "AdministrativeArea", "name": "Catskills, NY" },
        { "@type": "City", "name": "Hudson, NY" },
        { "@type": "City", "name": "New York City, NY" }
      ],
      "makesOffer": [
        { "@id": "https://whimsy-flower.vercel.app/weddings#service" },
        { "@id": "https://whimsy-flower.vercel.app/events#service" },
        { "@id": "https://whimsy-flower.vercel.app/brands#service" }
      ]
    }
  ]
}
```

**Deliberately omitted, with reasons (do not fill with placeholders):**
- `streetAddress`, `postalCode` — not public; add only if/when the studio publishes a real address.
- `telephone` — no public number on file.
- `sameAs` — Instagram/TikTok icons in the navbar currently link to `href=""`; add real profile URLs once wired up.
- `priceRange` — optional; add only once a real pricing tier/minimum is confirmed for public disclosure.
- Press mention (Brides feature) — best modeled as `subjectOf` pointing at the live Brides.com article (`Article`/`NewsArticle` with `publisher: "Brides"`), but the exact live URL/headline wasn't confirmed during this audit. Add it once you have the canonical URL rather than approximating it.

---

## 5. WebSite — generated JSON-LD

No on-site search exists, so `potentialAction`/`SearchAction` (sitelinks searchbox) is correctly omitted — adding one without a real search endpoint would be a fabricated capability.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://whimsy-flower.vercel.app/#website",
  "url": "https://whimsy-flower.vercel.app/",
  "name": "Whimsy Flower",
  "publisher": { "@id": "https://whimsy-flower.vercel.app/#organization" },
  "inLanguage": "en-US"
}
```

---

## 6. Person — Molly (founder & creative director)

Only a first name is published anywhere on the site ("I'm Molly, founder and creative director of Whimsy Flower" — appears verbatim on `/`, `/weddings`, `/about`, `/brands/[slug]`). Using just "Molly" here reflects the site's own copy, not a placeholder.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://whimsy-flower.vercel.app/about#molly",
  "name": "Molly",
  "jobTitle": "Founder & Creative Director",
  "worksFor": { "@id": "https://whimsy-flower.vercel.app/#organization" },
  "url": "https://whimsy-flower.vercel.app/about",
  "description": "Molly is the founder and creative director of Whimsy Flower, a bespoke floral design studio based in Hudson, NY, working hands-on with a select number of clients each year from concept through final installation."
}
```

---

## 7. Service entries — wedding, private events, editorial & brand

`Service` is not itself a rich-result-eligible type in Google Search, but it's the correct way to formally describe distinct offerings under the `Florist`/`LocalBusiness` node (via `makesOffer`) and strengthens topical/entity relevance for each offering's own page.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://whimsy-flower.vercel.app/weddings#service",
  "serviceType": "Wedding floral design",
  "name": "Wedding Floral Design",
  "provider": { "@id": "https://whimsy-flower.vercel.app/#organization" },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Hudson Valley, NY" },
    { "@type": "AdministrativeArea", "name": "Catskills, NY" },
    { "@type": "City", "name": "Hudson, NY" },
    { "@type": "City", "name": "New York City, NY" }
  ],
  "url": "https://whimsy-flower.vercel.app/weddings",
  "description": "Bespoke wedding florals — sculptural, seasonal designs composed for ceremonies, receptions, and every moment in between."
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://whimsy-flower.vercel.app/events#service",
  "serviceType": "Private event floral design",
  "name": "Private Events — Showers, Workshops & Flower Bars",
  "provider": { "@id": "https://whimsy-flower.vercel.app/#organization" },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Hudson Valley, NY" },
    { "@type": "AdministrativeArea", "name": "Catskills, NY" },
    { "@type": "City", "name": "Hudson, NY" }
  ],
  "url": "https://whimsy-flower.vercel.app/events",
  "description": "Bespoke floral design for private celebrations — bridal and baby showers, hands-on floral workshops, flower bars, and intimate gatherings.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Private Event Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flower Bars" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Whimsy Workshops" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bridal & Baby Showers" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Intimate Celebrations" } }
    ]
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://whimsy-flower.vercel.app/brands#service",
  "serviceType": "Editorial and brand floral styling",
  "name": "Editorial & Brand Floral Design",
  "provider": { "@id": "https://whimsy-flower.vercel.app/#organization" },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Hudson Valley, NY" },
    { "@type": "City", "name": "Manhattan, NY" }
  ],
  "url": "https://whimsy-flower.vercel.app/brands",
  "description": "Bespoke floral design for brands — campaigns, product launches, press dinners, and corporate events, styled around your brand's visual language."
}
```

Note: (events area assumed to mirror the Hudson Valley/Catskills/Hudson-NY market rather than extending to NYC, since the brief didn't specify a distinct geography for private events — confirm before shipping.)

---

## 8. BreadcrumbList — gallery and brand detail pages

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whimsy-flower.vercel.app/" },
    { "@type": "ListItem", "position": 2, "name": "Weddings", "item": "https://whimsy-flower.vercel.app/weddings" },
    { "@type": "ListItem", "position": 3, "name": "Lindsey & Finn", "item": "https://whimsy-flower.vercel.app/galleries/lindsey-fin" }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whimsy-flower.vercel.app/" },
    { "@type": "ListItem", "position": 2, "name": "Editorial & Brands", "item": "https://whimsy-flower.vercel.app/brands" },
    { "@type": "ListItem", "position": 3, "name": "Maison Lumière — Product Launch", "item": "https://whimsy-flower.vercel.app/brands/maison-lumiere-launch" }
  ]
}
```

(Gallery URLs live at `/galleries/[slug]`, not nested under `/weddings` — the breadcrumb trail models the conceptual parent category, which is fine for `BreadcrumbList`; it doesn't need to mirror the literal URL path.)

---

## 9. ImageGallery / CreativeWork — gallery pages with photographer credit

**`/galleries/lindsey-fin` has no photographer on file.** Checked directly against `src/data/galleries.ts`: unlike Natalia & David (`"Thalia Photography"`), Talea & Erich (`"Mackenzie Grace Creative"`), and Julia & Jackie (`"Zai Laffitte"`), the `lindsey-fin` entry has no `photographer` field at all — confirmed by both the data file and the rendered page text (no "Photo by…" credit line appears, whereas it does on the other three). Generated markup below reflects that honestly (no fabricated `creator`/`creditText`), with a second, credited example for a gallery that does have one.

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": "https://whimsy-flower.vercel.app/galleries/lindsey-fin#gallery",
  "name": "Lindsey & Finn — Wedding Florals",
  "url": "https://whimsy-flower.vercel.app/galleries/lindsey-fin",
  "about": { "@id": "https://whimsy-flower.vercel.app/weddings#service" },
  "description": "Set at Lindsey's family home, the design transformed a deeply familiar setting into something fresh, chic, and timeless — a ceremony entirely of white hydrangea, a petite bouquet of white stars and tweedia, and a reception palette that shifted into blush and chartreuse."
}
```

**Action item, not a schema fix:** populate `photographer` for the Lindsey & Finn gallery in `src/data/galleries.ts` so a credit can be added — both for the on-page credit line the template already supports (`GalleryGrid photoCredit={gallery.photographer}`) and for the schema example below.

Credited pattern (illustrative, using Natalia & David, which does have photographer data):

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": "https://whimsy-flower.vercel.app/galleries/natalia-david#gallery",
  "name": "Natalia & David — Wedding Florals",
  "url": "https://whimsy-flower.vercel.app/galleries/natalia-david",
  "about": { "@id": "https://whimsy-flower.vercel.app/weddings#service" },
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://whimsy-flower.vercel.app/Natalia%20%26%20David%202025%20(Thalia%20Photography)/natalia-david-wedding-193.webp",
      "creditText": "Thalia Photography",
      "creator": { "@type": "Organization", "name": "Thalia Photography" },
      "copyrightNotice": "© Thalia Photography"
    }
  ]
}
```

**Brand project pages — template only, do not ship yet:** `/brands/maison-lumiere-launch` and its five siblings render Lorem-ipsum copy and shared stock placeholder images (see Section 3, item 9). The shape below is correct for when real project content replaces the placeholders — publishing it against the current placeholder content would violate the "no placeholder text" quality gate.

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://whimsy-flower.vercel.app/brands/maison-lumiere-launch#project",
  "name": "Maison Lumière — Product Launch",
  "about": { "@id": "https://whimsy-flower.vercel.app/brands#service" },
  "creator": { "@id": "https://whimsy-flower.vercel.app/#organization" },
  "url": "https://whimsy-flower.vercel.app/brands/maison-lumiere-launch"
}
```

---

## 10. Review / AggregateRating — do not mark up (eligibility note)

`src/data/galleries.ts` contains real, attributed client testimonials (Lindsey & Finn, Natalia & David, Talea & Erich, Julia & Jackie, Shayna & Evan, Trisha & Jim). It is tempting to wrap these in `Review`/`AggregateRating` on the `Florist`/`LocalBusiness` node or on a project `CreativeWork`. **Do not.**

Google's structured-data guidelines explicitly disqualify **self-serving reviews** — reviews about your own business, hosted on your own site, that you mark up yourself — from the review-snippet rich result. This applies squarely here: these are testimonials the studio itself is publishing about its own work. Marking them up would:
- Produce no star-rating rich result (Google ignores it), and
- Carry structured-data-spam risk if it's read as an attempt to manufacture a rating rich result.

**Recommendation:**
- Keep testimonials as plain page content with no `Review`/`AggregateRating` markup — which is what the site already does correctly today.
- If star ratings in search are wanted, pursue them through genuinely third-party channels that Google trusts independently of this site: Google Business Profile reviews, The Knot, WeddingWire. Those platforms publish their own schema and aggregate independently; nothing on whimsy-flower.vercel.app needs to (or should) replicate that.

---

## 11. Next.js 16 App Router wiring (illustrative — no project files modified)

Site-wide singletons (`Florist`/`Organization` + `WebSite`) belong in the root layout, since they should appear on every page exactly once. Page-specific entities (`Service`, `Person`, `BreadcrumbList`, `ImageGallery`/`CreativeWork`) belong in their respective `page.tsx`. Because the root layout wraps every page, a JSON-LD node emitted in `layout.tsx` and a node emitted in a given `page.tsx` land in the **same HTML document** — so `@id` references between them (e.g. a `Service`'s `provider: { "@id": ".../#organization" }`) resolve correctly without duplicating the full Organization object on every page.

Next.js's own docs recommend the plain `<script type="application/ld+json">` + `dangerouslySetInnerHTML` pattern for JSON-LD in the App Router (not `next/script`, which is meant for external/behavioral scripts, not inline data).

```ts
// src/lib/schema.ts (proposed new file — not created by this audit)
export const organizationJsonLd = { /* Section 4 node */ };
export const websiteJsonLd = { /* Section 5 node */ };
export const buildBreadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});
```

```tsx
// src/app/layout.tsx — illustrative diff, NOT applied
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={/* unchanged */}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [organizationJsonLd, websiteJsonLd],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
```

```tsx
// src/app/galleries/[slug]/page.tsx — illustrative addition, NOT applied
// alongside the existing generateMetadata(), add the JSON-LD script to the
// returned JSX, built from the same `gallery` object already loaded via
// getGalleryBySlug(slug) — so schema and metadata never drift apart:

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        buildGalleryImageGalleryJsonLd(gallery), // Section 9
        buildBreadcrumbJsonLd([
          { name: "Home", url: "https://whimsy-flower.vercel.app/" },
          { name: "Weddings", url: "https://whimsy-flower.vercel.app/weddings" },
          { name: gallery.title, url: `https://whimsy-flower.vercel.app/galleries/${gallery.slug}` },
        ]),
      ],
    }),
  }}
/>
```

The same pattern applies to `src/app/brands/[slug]/page.tsx` (once real content replaces the placeholders — Section 9), `src/app/weddings/page.tsx`, `src/app/events/page.tsx`, `src/app/brands/page.tsx` (each emits its own `Service` node), and `src/app/about/page.tsx` (emits the `Person` node — and should also gain its own `generateMetadata`, since it currently inherits the homepage's title/description; see Section 3, item 8).

---

## Summary of what to add, in priority order

1. `Florist` (Organization/LocalBusiness) node in root layout
2. `Service` × 3 (weddings, events, brands pages)
3. `WebSite` node in root layout
4. `BreadcrumbList` on gallery + brand detail pages
5. `ImageGallery` on gallery pages (with photographer credit where data exists)
6. `Person` for Molly on `/about`
7. Do **not** add `Review`/`AggregateRating` — see Section 10
8. Do **not** add schema to `/brands/maison-lumiere-launch` (or siblings) until placeholder content is replaced — see Section 9
