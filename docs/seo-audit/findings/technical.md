# Technical SEO Audit — Whimsy Flower (whimsy-flower.vercel.app)

Audit date: 2026-09-09
Scope: Next.js 16 App Router site on Vercel. Pages checked: `/`, `/weddings`, `/events`, `/brands`, `/about`, `/inquire`, all 6 `/galleries/{slug}`, all 6 `/brands/{slug}` project pages, `/api/inquire` (POST-only).

Tools used: `sitemap_discovery.py`, `render_page.py` (auto mode), `agent_ux_check.py`, `preload_check.py`, `pagespeed_check.py` (blocked — no `GOOGLE_API_KEY` configured, so no CrUX/PSI lab-and-field data; findings below are source-inspection based per the runbook), raw `curl` header/HTML inspection, `dig` for DNS.

**Technical SEO Score: 48 / 100**

Strong technical foundation (SSR, HTTPS/HSTS, clean URLs, accessible markup, responsive CSS) is undercut by critical crawlability/indexability gaps: no live production domain, no sitemap/robots.txt, zero canonical tags, and duplicate title/description tags on 8 of 19 known URLs.

---

## 1. Crawlability — FAIL

- `robots.txt` → HTTP 404 (confirmed via `curl` and `sitemap_discovery.py`; the tool's own warning: `"robots.txt returned HTTP 404"`). No stale declaration to validate against — the file simply does not exist.
- `sitemap.xml`, `sitemap_index.xml`, `sitemap-index.xml`, `wp-sitemap.xml` → all HTTP 404 (checked directly and via `sitemap_discovery.py --json`, `found: []`, `declared: []`).
- `llms.txt` → HTTP 404 (no AI-crawler guidance file).
- No `X-Robots-Tag` header on any page checked (home, weddings, brands, gallery, brand-project, api route) — nothing is being blocked at the header level, which is good, but there is also no sitemap to help crawlers discover the 19 known URLs efficiently.
- The custom production domain **whimsyflower.com has zero DNS records** (`dig +short whimsyflower.com A/NS` and `www CNAME` all empty; direct `curl` times out). The only live, crawlable host today is the disposable `whimsy-flower.vercel.app` subdomain.
- The Next.js default 404 page correctly serves `<meta name="robots" content="noindex">` — this part works as intended.

## 2. Indexability — FAIL

- **No `<link rel="canonical">` on any page checked** (home, weddings, brands, gallery detail, brand-project, about, inquire, events) — confirmed by grep across all raw HTML fetches.
- **No Open Graph tags** (`og:title`, `og:image`, `og:type`, etc.) anywhere on the site.
- **No Twitter Card tags** anywhere.
- **Zero JSON-LD structured data sitewide** — confirmed both by manual grep (`application/ld+json` absent in all 8 sampled page HTMLs) and by `render_page.py --json` reporting `"structured_data": {"block_count": 0, "processed_count": 0}` for the homepage.
- **Critical duplicate title/description**: `/about`, `/inquire`, and all 6 `/brands/{slug}` project pages (8 URLs total) render the exact same generic homepage tags — `<title>Whimsy Flower — Floral Design Studio</title>` and the same meta description — despite each page having unique, correctly rendered body content and H1s (e.g. brand project page has `<h1>Product Launch</h1>` with real "Maison Lumière" copy, but the `<head>` metadata never updates). Verified via `x-matched-path` headers confirming correct routing, ruling out a caching/redirect artifact.
- By contrast, `/`, `/weddings`, `/events`, `/brands` (hub), and all 6 `/galleries/{slug}` pages **do** have unique, well-written titles/descriptions (e.g. `Talea & Erich — Wedding Florals | Whimsy Flower`) — this pattern works well and should be extended to the 8 broken pages.
- No meta-robots noindex/nofollow found on any real content page (default index,follow) — not a blocker, but combined with zero canonicals this leaves duplicate-content resolution (preview deployments, future www/apex variants) entirely to Google's discretion.

## 3. Security — PARTIAL

- HTTPS enforced sitewide: `http://` requests return `308 Permanent Redirect` → `https://` (single hop, no chain).
- Strong HSTS present on every response: `strict-transport-security: max-age=63072000; includeSubDomains; preload` — preload-list eligible.
- **Missing on every page checked** (home, weddings, brands, gallery, brand-project, `/api/inquire`): `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- `access-control-allow-origin: *` is present on the **HTML document responses themselves** (not just static assets) — unusually open CORS scope for page markup; low real-world risk for a public marketing site but non-standard.
- `/api/inquire` correctly rejects `GET` with `405`; only accepts `POST` (as expected for a form-submission endpoint).

## 4. URL Structure — PASS (with one launch-blocking caveat)

- Clean, descriptive, kebab-case slugs throughout: `/galleries/talea-erich`, `/brands/maison-lumiere-launch` — human-readable and keyword-relevant.
- Trailing slash handled consistently: `/weddings/` → `308` → `/weddings` (single canonical form, no redirect chains or loops observed anywhere tested).
- Case sensitivity: `/Weddings` returns a hard `404` rather than a redirect/normalize to lowercase — minor risk (broken links from any case-variant external reference), not currently causing indexing harm since nothing links to it.
- **Caveat**: none of the above matters for the intended brand domain yet — `whimsyflower.com` has no DNS record at all (see §1), so there is no www/apex canonicalization strategy in place for production. All current URL-structure hygiene lives on a throwaway `*.vercel.app` host.

## 5. Mobile — PASS (largely unverified for touch-target sizing)

- Correct viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`.
- Responsive CSS confirmed: 6 `@media` breakpoints in the compiled stylesheet plus Tailwind responsive utility classes (`sm:`/`md:`/`lg:`) used throughout templates.
- `agent_ux_check.py` on the homepage scored **100/100**: real `<button>`/`<a>` elements (no div-onclick pseudo-widgets), 0 inputs without labels, 0 unnamed interactive nodes in the accessibility tree — reduces mobile interaction friction risk.
- No `manifest.json` or `apple-touch-icon` link (only `favicon.ico`) — minor polish gap for "add to home screen," not a ranking factor.
- Literal touch-target pixel sizing was not measured (no lab/emulator run in this audit) — flagged as unverified rather than pass/fail.

## 6. Core Web Vitals (source inspection only — no PSI/CrUX API key configured) — RISK: LCP

- **LCP risk (High)**: the homepage's full-viewport hero background image (`alt="Home Lander Background"`) is rendered with `loading="lazy"` and no `fetchpriority`/preload hint, despite being the likely LCP element. `preload_check.py --json` confirms this directly: `"preload_lcp_candidate": false, "fetchpriority_high": 0"`, overall preload score **50/100**, with the tool's own recommendation: *"Mark the LCP hero image with fetchpriority=\"high\" so the browser preloads it ahead of other resources."* Two other above-the-fold images (logo, first carousel image) do get `<link rel="preload">` treatment — the hero background is the outlier.
- **CLS (Low risk)**: `next/image` is used consistently with inline blur-up placeholders (base64 SVG) and explicit dimensions via `data-nimg`, which reserves layout space; the 33 inline `style` attributes found on the homepage are these image placeholders, not ad-hoc layout hacks.
- **Fonts**: `font-display: swap` confirmed in the compiled CSS, and font files are preloaded via `<link rel="preload" as="font">` — reduces invisible-text flash and font-swap layout shift. Good practice.
- **INP (Low risk from source inspection)**: no heavy client-side widget patterns detected; real semantic buttons/links used for interactive elements (see §5). Cannot confirm field INP without CrUX data.
- **Missed opportunity**: no Speculation Rules / prerender hints (`preload_check.py`: `"header_present": false, "prerender_links": 0`) — adding `<script type="speculationrules">` for common navigation paths (home → weddings/galleries) would improve perceived performance on subsequent page loads.
- **Limitation**: `pagespeed_check.py --crux-only` failed with `"CrUX API requires an API key"` — no field or lab Lighthouse data was obtainable in this audit; all CWV findings above are inferred from HTML/header inspection only.

## 7. Structured Data — FAIL

- Zero JSON-LD blocks found anywhere on the site (homepage, weddings, events, brands hub, gallery detail, brand-project detail) — confirmed by both manual grep and `render_page.py`'s structured-data extractor (`block_count: 0`).
- No `LocalBusiness`/`Florist` schema despite being a named local service business (Hudson, NY) targeting a defined geographic market (Hudson Valley/Catskills/NYC/Albany–Manhattan) — a clear missed opportunity for local-pack and knowledge-panel eligibility.
- No `Event`, `BreadcrumbList`, or `ImageObject`/`ImageGallery` schema on gallery or brand-project pages, which are inherently visual, portfolio-style content well suited to rich results.

## 8. JavaScript Rendering / SSR — PASS

- All pages confirmed server-rendered/statically prerendered by Next.js: `x-nextjs-prerender: 1` header present on every route tested (home, weddings, brands, gallery, brand-project).
- `render_page.py --mode auto` on the homepage did **not** invoke Playwright (`"is_spa": false, "mode_used": "raw"`) — the raw HTTP fetch already contained full, extractable body copy (trafilatura pulled real sentences like *"Timeless Floral Artistry... driven by thoughtful composition..."* directly from the raw HTML).
- No CSR/hydration gap: Googlebot (or any crawler) receives complete content without executing JavaScript. This is a clean pass and the strongest category in the audit.

## 9. IndexNow Protocol — NOT APPLICABLE / NOT IMPLEMENTED

- No evidence of IndexNow key file or submission integration. Given there is currently no live sitemap, no robots.txt, and no DNS for the intended production domain, IndexNow is moot until those foundational pieces (§1, §4) are in place. Low priority until launch.

---

## Prioritized Issues

### Critical
1. **Production domain has no DNS record.** `whimsyflower.com` (apex and `www`) returns no A/NS/CNAME records at all — the only crawlable, indexable host is the throwaway `whimsy-flower.vercel.app` subdomain. Nothing else in this audit matters for real-world ranking until this is fixed.
2. **No sitemap.xml and no robots.txt** (both 404, confirmed via `sitemap_discovery.py` and direct fetch on 4 common paths) — crawlers have no authoritative discovery path for the 19 known URLs.
3. **Duplicate `<title>`/`<meta description>` on 8 URLs** — `/about`, `/inquire`, and all 6 `/brands/{slug}` project pages silently inherit the homepage's generic metadata despite unique page content (verified via `x-matched-path` + body H1 checks).
4. **Zero canonical tags sitewide** — no self-referencing `<link rel="canonical">` on any of the 8+ page types checked, leaving duplicate-content signals (preview URLs, future domain migration) entirely unmanaged.

### High
5. **Homepage LCP hero image is lazy-loaded with no `fetchpriority`/preload** — `preload_check.py` confirms `preload_lcp_candidate: false`, score 50/100; likely delays LCP on the site's highest-traffic entry page.
6. **No Open Graph or Twitter Card tags anywhere** — a visually led wedding/editorial floral brand loses all social/press link-preview quality (Instagram, Pinterest, Facebook, press placements).
7. **Zero structured data (JSON-LD) sitewide** — no `LocalBusiness`, `Event`, `BreadcrumbList`, or `ImageObject` schema despite a strong local + visual-portfolio fit.
8. **Footer omits `/brands`** — sitewide footer link list is only Home/Weddings/Events/About/Inquire (confirmed via `<section id="footer">` extraction); the editorial/brand vertical and its 6 child project pages get no persistent internal-linking support.

### Medium
9. **Missing security headers** — no CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, or `Permissions-Policy` on any page (only HSTS present).
10. **Broken internal links**: 4× `href=""` nav anchors (social icons — "Instagram logo," "TikTok logo" alt text, appearing in both desktop and mobile nav) and 1× `href="#"` on the "Brides" featured-on logo — all dead links.
11. **`access-control-allow-origin: *` on HTML document responses**, not just static assets — unusually open CORS scope for page markup.
12. **No Speculation Rules/prerender hints** for faster subsequent navigations (recommended by `preload_check.py`).

### Low
13. **`llms.txt` returns 404** — no AI-crawler guidance file in place.
14. **Case-sensitive routing** returns a hard 404 for path variants (e.g. `/Weddings`) with no normalization redirect.
15. **No `manifest.json`/`apple-touch-icon`** (favicon.ico only) — minor mobile polish gap.
16. **IndexNow not implemented** — low priority until domain and sitemap exist.

---

## What Already Works

- Full server-side rendering/static prerendering confirmed (`x-nextjs-prerender: 1`, `is_spa: false`) — no JS-rendering risk for crawlers.
- HTTPS enforced everywhere with strong, preload-eligible HSTS.
- Clean, consistent, kebab-case URL structure; single-hop trailing-slash redirect with no chains/loops.
- Unique, well-optimized titles/descriptions on 11 of 19 pages (home, weddings, events, brands hub, all 6 galleries).
- 100% alt-text coverage on images sampled; `agent_ux_check.py` scored 100/100 for semantic HTML/accessibility (real buttons/links, 0 unlabeled inputs, 0 unnamed interactive nodes).
- Responsive design verified: correct viewport meta, 6 CSS breakpoints, Tailwind responsive classes throughout.
- Font loading follows best practice (`font-display: swap` + preloaded woff2), and Next/Image blur-placeholder pattern is used consistently — both reduce CLS/layout-shift risk.
