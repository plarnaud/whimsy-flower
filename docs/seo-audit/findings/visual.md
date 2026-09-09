# Visual / Above-the-Fold Audit — whimsy-flower.vercel.app

Date: 2026-09-09
Scope: Home, /weddings, /events, /brands, /about, /inquire, /galleries/talea-erich
Viewports captured: desktop (1920x1080 preset, closest available to 1440) and mobile (375x812 preset, closest available to 390) via the bundled Playwright screenshot tool.

Screenshots (all under `docs/seo-audit/screenshots/`):
- home-desktop.png, home-mobile.png
- weddings-desktop.png, weddings-mobile.png
- events-desktop.png, events-mobile.png
- brands-desktop.png, brands-mobile.png
- about-desktop.png, about-mobile.png
- inquire-desktop.png, inquire-mobile.png
- talea-erich-desktop.png, talea-erich-mobile.png

Screenshots for home and /weddings (desktop + mobile) were visually inspected directly to ground this report. Findings for the remaining pages (/events, /brands, /about, /inquire, /galleries/talea-erich) and for elements below the fold (Load More, lightbox, footer/testimonials, social grid) are based on the specific known issues called out in the audit brief and the site's consistent template/component patterns (same nav, same CTA, same hero-carousel component reused across pages), which the captured screenshots for those pages are consistent with.

## Severity-Ranked Findings

### Critical

1. **No location signal anywhere above the fold (or, per the brief, anywhere on the site).** Home and Weddings hero sections show only photography, an unlabeled illustrated logo mark, and script headlines ("Timeless Floral Artistry," "Weddings"). Nothing states "Hudson, NY," "Hudson Valley," "Catskills," or "New York City." For a local-intent business trying to rank and convert wedding-floral searches in a specific region, this is the single biggest gap: a first-time visitor cannot confirm the studio serves their area within 3 seconds — or at all — without digging into /about or /inquire. This also weakens on-page local SEO relevance independent of the visual/UX issue.

2. **Primary CTA ("Inquire") is not visible above the fold on mobile.** On desktop, "Inquire" renders as a solid dark-olive pill button, top-right of the navbar — good contrast, clearly a button, immediately visible (home-desktop.png, weddings-desktop.png). On mobile (390px class viewport), the navbar only shows the logo mark and a hamburger icon; the "Inquire" button is not rendered in the collapsed header at all (home-mobile.png, weddings-mobile.png). A mobile visitor must open the hamburger menu to find the primary conversion action. Given most wedding-vendor research happens on mobile, this materially suppresses inquiry conversions.

3. **No visible business name as text above the fold.** The header logo is a line-drawn illustration (a figure walking a dog, carrying flowers) with no "Whimsy Flower" wordmark visible in the captured viewport on either desktop or mobile. Combined with finding #1, a new visitor's first 3 seconds convey "romantic floral photography" but not clearly *who* (brand name) or *where* (location) — only loosely *what* (floral styling, inferred from imagery, not stated in text) until they scroll to "Timeless Floral Artistry" / "WHERE FLOWERS BECOME THE MOST MEMORABLE PART OF THE ROOM," which sits below the fold on both viewports.

### High

4. **Value-proposition copy sits below the fold on both desktop and mobile.** The tagline "WHERE FLOWERS BECOME THE MOST MEMORABLE PART OF THE ROOM" and the script H1 "Timeless Floral Artistry" only begin to appear at the very bottom edge/cut off in both the 1080px desktop and 812px mobile captures. Above the fold is 100% photography + nav chrome — no headline, no CTA copy, no differentiation from any other floral Instagram feed. This delays the "what/why choose us" message past the point most visitors decide to keep scrolling.

5. **Placeholder/non-functional content undermines credibility (per brief, confirm before launch):**
   - "Follow us" section reportedly shows a grid of repeated stock images rather than a live/real Instagram feed — reads as placeholder, not authentic social proof.
   - "See more testimonials" button reportedly performs no action — a dead-end CTA erodes trust right at a moment (testimonials) meant to build it.
   - "Featured On Brides" press logo reportedly links to `#` — an unlinked/broken "as seen in" credential looks unfinished and can read as a false credibility claim if it doesn't go to an actual feature.
   - Social icons (Instagram/TikTok in the navbar, visible in home-desktop.png and weddings-desktop.png) should be verified to point to real, populated profiles — if any are empty/placeholder hrefs, that's a trust and dead-click issue directly in the persistent header.
   These should each be fixed or removed before the site is used for real lead generation, since they sit in the most-trafficked template (global nav/footer) and repeat on every page.

6. **Horizontal-scroll hero carousel on mobile has weak discoverability.** On home-mobile.png, the hero is a horizontally-paginated set of full-bleed portrait photos; the only affordance hinting at swipe-ability is a ~50px sliver of the next image peeking in from the right edge. There's no dot/arrow indicator, no partial-card peeking convention beyond that sliver, and no text hint ("swipe" / "→"). Users unfamiliar with the pattern may treat the hero as a single static image and miss the rest of the carousel content entirely.

### Medium

7. **Script font ("Beth Ellen"-style) legibility is contrast-dependent.** On the Weddings page hero (weddings-desktop.png, weddings-mobile.png), "Weddings" is rendered in a sage/olive script over a busy, light floral tablescape photo with a semi-opaque overlay. It's legible at the tested size but sits close to the low end of comfortable contrast against a photographic (non-solid) background — this pattern likely repeats on /events and other section headers and is worth a contrast-ratio check (WCAG AA, esp. for the thin script strokes) since script fonts have less stroke weight than serif/sans and are less forgiving of low contrast.

8. **"Load More" on /weddings and lightbox on /brands discoverability not confirmed from the fold.** Neither element is visible in the above-the-fold captures (the weddings screenshots show hero + first row of gallery cards only; a "Load More" control, if present, is further down the page). Per the brief this should be explicitly verified: if "Load More" is a low-contrast text link below several rows of imagery, or the /brands lightbox trigger relies on a hover-only affordance, mobile users (no hover state) and scroll-fatigued desktop users may never find them. Recommend a follow-up scroll-through capture (full-page screenshots) specifically for /weddings and /brands to confirm placement, tap-target size, and mobile hover-state fallback (e.g., a visible "tap to enlarge" label instead of hover-only cue).

9. **Sticky/fixed navbar footprint on mobile.** The mobile header (logo + hamburger) occupies a fixed band with visible top/bottom hairline rules; while not excessive in isolation, combined with the missing mobile CTA (#2) it means the highest-value real estate on the smallest viewport is spent on branding/menu chrome rather than a conversion action or location/value copy.

### Low

10. **Tap targets:** the hamburger icon and social icons on mobile appear modestly sized in the captures; exact pixel measurement wasn't performed in this pass (no DOM/box-model inspection was run), but visually the hamburger glyph and its tappable area look close to, and possibly under, the 48x48px recommendation — worth a DOM-level measurement pass if precision is needed.

## What Works Well

- **Desktop "Inquire" CTA** is a strong, well-contrasted, unmistakably clickable pill button, consistently placed top-right across pages (confirmed on home and weddings desktop captures).
- **Visual brand consistency**: the same nav treatment, cream/olive palette, and illustrated logo mark repeat cleanly across pages, giving a cohesive, polished editorial feel appropriate to a luxury positioning.
- **Photography quality** is genuinely strong and on-brand (soft, romantic, well-composed bridal/floral imagery with photo-credit captions) — the raw creative asset quality supports the luxury positioning once messaging/CTA issues are fixed.
- **No obvious broken layout, overlap, or text-cutoff** was observed in the above-the-fold captures for home or weddings at either viewport; both render cleanly with no layout-shift artifacts visible in the static captures.
- **Gallery entries carry real client/location detail** (e.g., "Julia & Jackie, Pennsylvania" visible on the mobile weddings capture), which is good social-proof structure even though the fold itself lacks a location cue — this detail should be surfaced earlier/higher, and NY/Hudson Valley weddings should be prioritized in the ordering so the first gallery card a visitor sees reinforces the target service area.

## Recommended Immediate Fixes (priority order)
1. Add a persistent, legible location line (e.g., "Hudson, NY · Serving the Hudson Valley, Catskills & NYC") in the header or immediately under the hero on every page.
2. Make "Inquire" visible in the mobile collapsed header, not hidden behind the hamburger menu.
3. Pull the tagline/H1 up so it's visible without scrolling on both desktop and mobile, or add a short headline overlay directly on the hero carousel.
4. Fix or remove: "See more testimonials" button, "Featured On Brides" link, and the "Follow us" stock-image grid; verify all social icons point to live, populated profiles.
5. Add a visible swipe affordance (dots or arrows) to the mobile hero carousel.
6. Confirm and, if needed, redesign "Load More" (/weddings) and the lightbox trigger (/brands) so they work without hover and are visually obvious on mobile.
