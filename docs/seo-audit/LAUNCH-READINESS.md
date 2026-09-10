# Launch readiness, 2026-09-10

Audited against a production build (`next build` + `next start`) of the current tree, every URL in the sitemap on desktop (1440) and mobile (390), plus Lighthouse on nine templates in both form factors. Content and design were treated as approved and left alone; only alt text, SEO, and technical defects were changed.

## Verdict

The site is ready to deploy. Every page returns 200, has a unique title and description within snippet length, one H1, a self-referencing canonical, Open Graph and Twitter tags, valid JSON-LD, and no console errors that will occur on Vercel. All internal and external links resolve. Accessibility and SEO score 100 on every page in Lighthouse. What remains is owner-side configuration (domain, email, Instagram token) and a short list of items that need a design or content decision.

## Lighthouse (production build, local)

| Page | Perf desktop | Perf mobile | A11y | Best practices | SEO | LCP mobile |
|---|---|---|---|---|---|---|
| Home | 100 | 85 | 100 | 96* | 100 | 4.4s |
| Weddings | 99 | 88 | 100 | 96* | 100 | 3.9s |
| Events | 99 | 84 | 100 | 96* | 100 | 4.6s |
| Editorial & Brands | 99 | 88 | 100 | 96* | 100 | 4.0s |
| About | 99 | 89 | 100 | 96* | 100 | 3.8s |
| Inquire | 100 | 89 | 100 | 96* | 100 | 3.8s |
| Gallery (Talea & Erich) | 99 | 87 | 100 | 96* | 100 | 4.1s |
| Gallery (Chelsea & Jessica) | 92 | 84 | 100 | 96* | 100 | 4.6s |
| Brand project (Sail to Sable) | 97 | 83 | 100 | 96* | 100 | 4.7s |

\* The single Best Practices deduction on every page is a console error for `/_vercel/speed-insights/script.js`, which only exists once the site runs on Vercel. It will not occur in production. CLS is 0.000 and total blocking time is under 15ms everywhere. Mobile LCP figures are under Lighthouse's simulated slow 4G with 4x CPU throttling; the LCP element is the prioritized hero image on every page, so the remaining time is simulated network. Desktop LCP is 0.8 to 1.9s.

## Crawl results (21 URLs, desktop and mobile)

- HTTP 200 on all sitemap URLs; the 404 page returns 404 with a title.
- Titles 43 to 81 characters, descriptions 71 to 161 characters, none duplicated.
- One H1 per page; heading levels descend without gaps.
- JSON-LD parses on every page: Florist organization, WebSite, Person, three Services with the $8,000 offer, breadcrumbs, and per-gallery ImageGallery with photographer credits.
- Every image has an alt attribute; zero broken images after lazy loads settle; no image served at more than 2.6x its display width.
- 19 internal link targets and 9 external (photographers, Instagram, Brides) all return 200. No empty or `#` links. All external links open in a new tab with `noopener`.
- Security headers present: nosniff, frame DENY, referrer policy, permissions policy. Vercel adds HSTS.
- Inquiry API: honeypot returns 200 without sending; empty body, malformed JSON, and invalid email return 400; GET returns 405.
- robots.txt, sitemap.xml (21 URLs), llms.txt all serve.
- No em dashes, no placeholder text, no leftover template assets.

## Fixed during the audit

- Inquire page had no H1; the form's "Get in touch!" heading is now the H1 on that page and stays an H2 elsewhere. No visual change.
- Gallery quote card heading jumped from H1 to H3; now H2 with identical styling.
- Six titles or descriptions exceeded snippet length (about, brands, events, weddings, inquire, brand projects); all now fit, and gallery descriptions follow one template naming couple, venue, studio, and photographer.
- Mobile horizontal overflow of 16px on the brands page and 8px on brand project pages, caused by two non-shrinking labels; they now wrap.
- Turbopack was treating your home directory as the project root because of a stray `~/package-lock.json`; the root is now pinned in `next.config.ts`.
- Faded hero and section backgrounds (shown at 16 to 33 percent opacity) are encoded at quality 50 instead of 75.
- The About "studio" section is hidden behind a flag for v2.

## Needs your decision (not changed)

1. **Tap targets under 24px.** Footer text links, the photographer credit under galleries, and the header Instagram icon measure under 24px tall. WCAG 2.2 AA (2.5.8) asks for 24px. Fix is padding, which is a design change.
2. **Default 404 page.** Not-found URLs show Next's unstyled page. A branded one is content and design.
3. **Brand-voice words in approved copy.** "beautiful" and "centerpiece" appear in the weddings hero you supplied, and "centerpieces" in Molly's Lindsey & Finn story. Left as written.
4. **Missing card data.** No year or location yet for Chelsea & Jessica, Dan & Sabrina, Erica & Alex, Julia & Matt, Sarah & Dan; no location for any brand project.
5. **Dan & Sabrina** includes a few casual phone snapshots alongside the professional set.
6. **Stray lockfile** at `~/package-lock.json`. Harmless now that the root is pinned, but worth deleting.

## Before or at launch (owner)

1. **Domain.** Attach whimsyflower.com in Vercel. Canonicals, sitemap, schema, and llms.txt switch automatically. Redirect whimsyflower.love to it.
2. **Inquiry email.** On Vercel set `INQUIRE_TO_EMAIL` to Molly's inbox and `INQUIRE_FROM_EMAIL` to an address on a Resend-verified domain. The local setup uses Resend's test sender, which only delivers to your own account email. Send one real test inquiry after deploy.
3. **Instagram feed.** Create the Meta app and paste `INSTAGRAM_ACCESS_TOKEN` into Vercel per `docs/INSTAGRAM.md`; the section shows wedding covers until then.
4. **Search Console.** Verify the domain and submit `/sitemap.xml`.
5. **Google Business Profile** for Hudson, NY (category Florist), and update The Knot and WeddingWire from Hoboken to Hudson so the NAP matches.
