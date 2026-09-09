# Sitemap & Crawl Coverage Audit — Whimsy Flower

Target: https://whimsy-flower.vercel.app (Next.js 16, App Router, deployed on Vercel)
Audit date: 2026-09-09
Note: the production domain will eventually move to whimsyflower.com (not live yet). All findings below apply to the current preview host; the sitemap recommendation is written to be host-agnostic via `VERCEL_URL` / a future `NEXT_PUBLIC_SITE_URL`.

## Method

1. Ran `claude-seo run sitemap_discovery.py https://whimsy-flower.vercel.app --json` (via the pinned Python 3.12 interpreter). Result: no declared sitemap, `found: []`, `checked` shows 404 on `/sitemap.xml`, `/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml`; warning `robots.txt returned HTTP 404`.
2. Cross-checked the codebase (`src/app/**`, `src/components/navbar.tsx`, `footer.tsx`, `workCollage.tsx`, `gallerySection.tsx`) against live HTTP responses (`curl`) to confirm routing, link graph, and status codes.

## Validation Report

| Check | Result |
|---|---|
| `/sitemap.xml` present | **FAIL** — 404 |
| `/robots.txt` present | **FAIL** — 404 |
| XML validity | N/A — no sitemap exists to validate |
| URL status codes (18 discovered routes) | **PASS** — all 18 return 200; invalid slugs correctly 404 via `notFound()` |
| Deprecated tags (`priority`, `changefreq`) | N/A — no sitemap exists yet; recommendation below omits reliance on them |
| `lastmod` accuracy | N/A — no sitemap exists yet |
| Per-file URL/size limits (50k URLs / 50MB, 1k for `news:`) | N/A — 18 URLs total, far under any threshold |
| Meta robots / canonical tags | **FAIL (gap)** — no `<meta name="robots">` and no `<link rel="canonical">` on any page (checked home and a brand page). Not currently harmful (nothing is noindexed), but leaves no defense against the `.vercel.app` preview host getting indexed once the custom domain goes live. |

## Discovered URLs — 18 total, all HTTP 200

**Static routes (6)** — linked from navbar on every page (`Navbar` is rendered by `PageScaffold`, which wraps all pages):
`/`, `/weddings`, `/events`, `/brands`, `/about`, `/inquire`

**Gallery pages (6)** — `src/app/galleries/[slug]/page.tsx`, `generateStaticParams()` over `src/data/galleries.ts`:
`/galleries/brides-feature`, `/galleries/lindsey-fin`, `/galleries/natalia-david`, `/galleries/talea-erich`, `/galleries/shayna-evan`, `/galleries/trisha-jim`

**Brand project pages (6)** — `src/app/brands/[slug]/page.tsx`, `generateStaticParams()` over `src/data/brandProjects.ts`:
`/brands/maison-lumiere-launch`, `/brands/atelier-rosewood-editorial`, `/brands/verdant-press-dinner`, `/brands/linen-house-lookbook`, `/brands/studio-meridian-opening`, `/brands/fern-field-campaign`

**Not a page**: `/api/inquire` (POST-only route handler; correctly excluded from any sitemap; should be blocked in robots.txt as a courtesy, not an indexing risk).

## Orphan / Unlinked Pages — HIGH severity

All 6 `/brands/{slug}` project pages are **statically pre-rendered and publicly reachable (confirmed 200, `x-nextjs-prerender: 1`), but have zero internal links anywhere in the site.**

- `/brands` renders `SelectedWorkSection` → `WorkCollage`, whose tiles are `<button onClick={() => setOpen(...)}>` elements that open a client-side `Lightbox` modal — not `<Link href="/brands/[slug]">`. Confirmed by grepping the live HTML: `grep -o 'brands/[a-z-]*'` on the rendered `/brands` page returns **zero matches**.
- No other component (`workCollage.tsx`, `lightbox.tsx`, navbar, footer, any gallery page) links to `/brands/{slug}` anywhere in `src/`.
- Net effect: these 6 pages exist in the deployed build and are directly fetchable by URL, but a crawler following only internal links (and Google's own link graph, absent a sitemap) has no path to discover them. They are true orphans today.
- Compounding factor: all 6 pages currently use placeholder content — the same 3 stock photos (`/brand01.webp`, `/brand02.webp`, `/brand03.webp`) cycled via `placeholderAlbum()`, and fabricated brand names/locations/testimonials per `src/data/brandProjects.ts` (per project memory, this is known placeholder data awaiting real client work). If these were added to a sitemap as-is, they'd read to Google as near-duplicate thin pages sharing one photo pool — the same doorway-page pattern flagged for location pages, just triggered by brand slugs instead. **Recommendation: do not add `/brands/{slug}` to the sitemap (or add `noindex`) until each page has a real, unique client project — real photos and non-generic copy.**

## Latent Risk (not currently triggered) — LOW/INFO severity

`src/app/weddings/gallerySection.tsx` slices the gallery list to `visibleCount` (6 on mobile, 9 on desktop) and only reveals more via a client-only "Load More" button (`setVisibleCount`, no URL change, no `<Link>`). **Today this does not hide anything** — `src/data/galleries.ts` contains exactly 6 galleries, so `visibleCount < galleries.length` is always false and the Load More button never renders; confirmed live by grepping the server-rendered `/weddings` HTML, which contains all 6 `/galleries/{slug}` hrefs.
Flagging as a forward-looking risk: the day a 7th gallery is added to `galleries.ts`, it will render only behind a real button click. Googlebot's rendering pass does not click buttons, so that gallery would silently drop out of internal-link discovery (it would still 200 by direct URL/sitemap). **Recommend converting Load More to a real paginated route or query param (e.g. `?page=2`) with an `<a>`/`<Link>` fallback, or simply keep it a `<Link>`-based reveal, before the roster grows past 6.**

## Missing Pages (in a hypothetical crawl but not in any current sitemap)

N/A in the "crawl vs. sitemap" sense since no sitemap exists at all — that itself is the top-line finding. Once the sitemap below ships, all 18 live routes should be enumerated; nothing should be "missing" relative to it except the intentionally-excluded `/brands/{slug}` placeholders and the `/api/*` route.

## Extra Pages (404 or redirected)

None found. No dead/redirected URLs were discovered in the current 18-route set; invalid slugs correctly return 404 via Next's `notFound()`.

## Quality Gates — Location Pages

Not applicable. Whimsy Flower has no location/city-swap pages (`/locations/*`, `/[city]`, etc.) in `src/app` or `src/data`. Neither the 30-page WARNING nor the 50-page HARD STOP threshold is triggered. Note this in case future "service area" pages (e.g. per-Hudson-Valley-town landing pages) are planned — that pattern would need real per-page content (60%+ unique) before scaling past 30 pages, per this agent's standing quality gate.

## Severity-Ranked Summary

| Severity | Finding |
|---|---|
| High | No `/sitemap.xml` exists (404) |
| High | No `/robots.txt` exists (404) |
| High | 6 `/brands/{slug}` pages are fully built, live, and 200 — but orphaned with zero internal links, and currently hold placeholder/fabricated content that would read as near-duplicate thin pages if indexed as-is |
| Low | No canonical tags / meta robots anywhere — no safeguard against the `.vercel.app` host being indexed once `whimsyflower.com` goes live |
| Info | Load More on `/weddings` is a latent (not yet active) crawl-discovery risk once the gallery count exceeds 6 |
| Info | `/api/inquire` route handler should be disallowed in robots.txt as housekeeping (not an indexing risk — it's POST-only) |

## Recommended `robots.txt`

Place at `public/robots.txt` (Next.js serves anything in `public/` at the root; this is simpler than an `app/robots.ts` generator for a file this static, though either works). Point it at the **future production domain**, not the vercel.app preview host:

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://whimsyflower.com/sitemap.xml
```

If `whimsyflower.com` is not yet live at ship time, keep the file pointed at whatever the current canonical production host is (i.e. update this the day the domain cutover happens — don't ship a robots.txt that permanently points at a domain that isn't serving yet).

## Recommended Sitemap — `app/sitemap.ts` (`MetadataRoute.Sitemap`)

Use the native App Router convention rather than a static XML file or a third-party package, since Next.js will auto-serve this at `/sitemap.xml` and it stays in sync with `src/data/*` automatically as galleries/brand projects are added.

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { galleries } from "@/data/galleries";
// brandProjects intentionally NOT imported yet — see note below.
// import { brandProjects } from "@/data/brandProjects";

// Swap to the production domain the day whimsyflower.com goes live.
// Until then this MUST NOT be the vercel.app preview host.
const BASE_URL = "https://whimsyflower.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/events`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/inquire`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const galleryRoutes: MetadataRoute.Sitemap = galleries.map((gallery) => ({
    url: `${BASE_URL}/galleries/${gallery.slug}`,
    // Swap `now` for a real per-gallery lastmod once galleries.ts carries a
    // dateAdded/updatedAt field — do not fake a rotating date.
    lastModified: now,
    changeFrequency: "yearly",
    priority: gallery.featured ? 0.8 : 0.6,
  }));

  // brands/{slug} pages are excluded until they hold real client content —
  // see "Orphan / Unlinked Pages" above. Re-enable this block (and the
  // brandProjects import) once placeholder photos/testimonials are
  // replaced with real projects:
  //
  // const brandRoutes: MetadataRoute.Sitemap = brandProjects.map((project) => ({
  //   url: `${BASE_URL}/brands/${project.slug}`,
  //   lastModified: now,
  //   changeFrequency: "yearly",
  //   priority: project.featured ? 0.7 : 0.5,
  // }));

  return [...staticRoutes, ...galleryRoutes];
}
```

Notes on the approach:
- `priority` and `changeFrequency` are included for completeness/tooling compatibility, but per Google's own guidance both are ignored for ranking/crawl-rate purposes — don't spend effort tuning them beyond "reasonable."
- `lastModified` should reflect genuine content changes (e.g. when a gallery's copy/photos are edited), not a build timestamp that changes on every deploy — using `now` at build time on every deploy is a common anti-pattern (it makes every URL look "just updated" on every push, which Google explicitly discounts). Recommend adding an `updatedAt` field to `GalleryMeta`/`BrandProjectMeta` in `src/data/*` once this ships, and passing that through instead.
- Total URL count today: 12 (6 static + 6 galleries), or 18 if/when brand pages are re-enabled — nowhere near the 50,000-URL / 50MB single-file cap; no index-of-sitemaps split is needed.
- Base URL must be the eventual `whimsyflower.com`, never `whimsy-flower.vercel.app` — shipping the vercel.app host in a live sitemap would get that preview domain indexed instead of (or alongside) the real domain, causing duplicate-content/canonicalization issues down the line. If this sitemap needs to go live before the domain cutover, gate `BASE_URL` behind an environment variable (e.g. `process.env.NEXT_PUBLIC_SITE_URL`) so it can be flipped in one place at cutover.

## Files Referenced

- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/app/brands/[slug]/page.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/app/brands/page.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/components/workCollage.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/app/weddings/gallerySection.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/data/galleries.ts`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/data/brandProjects.ts`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/components/navbar.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/components/footer.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/src/app/layout.tsx`
- `/Users/plarnaud/Developer/French Fry/whimsy-flower/next.config.ts`
