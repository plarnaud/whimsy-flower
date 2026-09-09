# Performance / Core Web Vitals Findings — whimsy-flower.vercel.app

**Data source: LAB DATA ONLY.** No Google API key is configured in this environment, so PageSpeed Insights and CrUX field data (28-day real-user 75th-percentile) were unavailable (`pagespeed_check.py` returned "PSI rate limit exceeded" with no field fallback; `lcp_subparts.py` returned "Google API key not configured"). All numbers below come from **Lighthouse 13.4.1** (CLI, insight-based audits, Node 24.4.1), run directly against the live production URL for each page × device. Mobile runs use Lighthouse's default simulated throttling (150ms RTT, ~1.6Mbps, 4x CPU slowdown — roughly a Slow 4G / Moto G Power device). Desktop runs use the desktop preset (40ms RTT, 10Mbps, no CPU slowdown). Real-world CrUX field results will differ (usually better than the throttled-mobile lab numbers, since most real visitors are on faster networks/devices than the simulated profile) — treat the mobile figures here as a stress-test ceiling, not a guarantee of the field 75th-percentile pass/fail. INP has no lab equivalent (it requires a real interaction trace); Total Blocking Time (TBT) and Max Potential First Input Delay are used as the INP proxy per Lighthouse convention. FID is not referenced anywhere in this report per current terminology.

## Performance score

| Page | Mobile score | Desktop score |
|---|---|---|
| `/` (home) | **81/100** | 100/100 |
| `/weddings` | 94/100 | 100/100 |
| `/brands` | 98/100 | 100/100 |
| `/galleries/talea-erich` | 87/100 | 100/100 |

Overall representative score: **~90/100 mobile, 100/100 desktop** (unweighted average). Desktop is effectively frictionless everywhere; mobile is the only place with real headroom, driven almost entirely by LCP.

## Core Web Vitals table (lab)

| Page | Device | LCP | LCP status | CLS | CLS status | TBT (INP proxy) | Max Potential FID (INP proxy) | INP-proxy status |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 4375 ms | **Poor** (>4.0s) | 0.000 | Good | 15 ms | 65 ms | Good |
| `/` | Desktop | 797 ms | Good | 0.001 | Good | 0 ms | 18 ms | Good |
| `/weddings` | Mobile | 2958 ms | Needs Improvement | 0.000 | Good | 10.5 ms | 71 ms | Good |
| `/weddings` | Desktop | 815 ms | Good | 0.000 | Good | 0 ms | 18 ms | Good |
| `/brands` | Mobile | 2430 ms | Good (borderline, 70ms under threshold) | 0.000 | Good | 12 ms | 74 ms | Good |
| `/brands` | Desktop | 565 ms | Good | 0.000 | Good | 0 ms | 18 ms | Good |
| `/galleries/talea-erich` | Mobile | 3816 ms | Needs Improvement | 0.000 | Good | 13 ms | 76 ms | Good |
| `/galleries/talea-erich` | Desktop | 654 ms | Good | 0.000 | Good | 0 ms | 17 ms | Good |

**Bottom line:** CLS and the INP proxy are excellent everywhere (self-hosted `next/font`, small first-party JS, only one long task >50ms seen across all runs — 65ms on home). LCP is the only metric at risk, and only under throttled-mobile conditions. Home is the worst offender (Poor), weddings and the gallery are Needs-Improvement, brands is a hair under Good.

## LCP subpart breakdown (mobile, simulated)

| Page | TTFB | Resource load delay | Resource load duration | Element render delay | Dominant cause |
|---|---|---|---|---|---|
| `/` | 197 ms | 23 ms | 194 ms | **1951 ms (45%)** | Render/hydration delay after image is already loaded |
| `/weddings` | 435 ms | — | — | **1106 ms** | Element render delay (image path collapsed to 2 subparts) |
| `/brands` | **1043 ms (43%)** | 6 ms | 158 ms | 28 ms | TTFB-bound (image renders almost immediately once network resolves) |
| `/galleries/talea-erich` | 306 ms | **1095 ms (29%)** | 64 ms | 985 ms | LCP image is discovered late + delayed render |

LCP elements identified:
- `/` (mobile): a home-carousel photo ("Natalia and David's wedding florals") — not one of the two `priority`-flagged images; `fetchpriority="high"` is **not** applied to it, and `priorityHinted: false` in Lighthouse's discovery insight.
- `/brands` (mobile): the full-bleed hero tablescape image (`home-lander-section-bg.webp`), `sizes="100vw"`, also missing `fetchpriority="high"`.
- `/galleries/talea-erich` (mobile): the first gallery photo has `loading="lazy"` and Lighthouse flags it as **not discoverable in the initial document** (`requestDiscoverable: false`, `eagerlyLoaded: false`) — i.e., it becomes the LCP element yet is being lazy-loaded / late-injected, which directly explains the 1095ms resource-load-delay subpart.

## Resource weight & image inventory

| Page | Device | Total transfer | Requests | Image bytes | # images | Font bytes | Script bytes |
|---|---|---|---|---|---|---|---|
| `/` | Mobile | 839 KB | 35 | 551 KB | 16 (20 incl. dupes) | 104 KB | 145 KB |
| `/` | Desktop | 1022 KB | 43 | 715 KB | 18 | 104 KB | 159 KB |
| `/weddings` | Mobile | 686 KB | 43 | 349 KB | 11 | 104 KB | 182 KB |
| `/weddings` | Desktop | 861 KB | 69 | 489 KB | 16 | 104 KB | 184 KB |
| `/brands` | Mobile | 611 KB | 31 | 307 KB | 10 | 104 KB | 161 KB |
| `/brands` | Desktop | 574 KB | 35 | 264 KB | 9 | 104 KB | 163 KB |
| `/galleries/talea-erich` | Mobile | 701 KB | 40 | 394 KB | 22 | 104 KB | 161 KB |
| `/galleries/talea-erich` | Desktop | 1003 KB | 52 | 678 KB | 25 | 104 KB | 175 KB |

No render-blocking JS was found on any page; the only render-blocking resource flagged everywhere is the single first-party stylesheet chunk (`b84b49318e33983c.css`, 8.7 KB, ~150ms). No third-party scripts or origins were detected on any page (`third-parties-insight` returned empty on all four; Vercel Speed Insights loads first-party/self-hosted and adds negligible weight). Fonts: 4 self-hosted `next/font` woff2 files (20–41 KB each, ~104 KB total, identical across pages), `font-display-insight` scored a clean 1.0 with zero estimated savings on every page — no FOIT/FOUT penalty detected.

### Largest individual images (transfer size, as actually served by next/image)

- `/whimsy-about-pic.webp` (via `_next/image`): **75 KB at w=750 (mobile)** but **192 KB at w=1920 (desktop)** — this is the "meet Whimsy" founder photo the brief flagged (~427KB raw source). Next.js image optimization already re-encodes it, but the `sizes="100vw"` attribute is wrong: the image only renders at 364×546–546px, so desktop requests a needlessly large 1920w variant. Lighthouse's `image-delivery-insight` flags 48 KB of wasted bytes on mobile alone from this one image.
- `bg-graphic.webp` (site-wide background decoration): 86 KB, loaded on every page.
- `brand02.webp` on `/brands`: 41.6 KB as actually transferred at w=640 (next/image already compresses the ~385KB raw source down substantially) — fine as delivered, but still the single largest brand-logo image and worth re-exporting at a lower source resolution/quality to shave the remaining ~22 KB `image-delivery-insight` flags as wasted (over-compression headroom).
- `wf-logo.webp` (nav logo) on the gallery page: 23 KB transferred for an 80×80 rendered logo (256×413 intrinsic) — `image-delivery-insight` flags 22 KB (96%) as wasted; this is a pure oversized-source problem, not a next/image resizing bug.
- Gallery photos (`/galleries/talea-erich`): 17–39 KB each at their served breakpoints — reasonably optimized once loaded, the issue there is *when* they load, not their size.

## Ranked optimizations (highest impact first)

1. **Fix the `/galleries/talea-erich` LCP image being lazy-loaded / late-discoverable.** The first visible gallery photo is the LCP element but ships with `loading="lazy"` and is not present/discoverable in the initial DOM at request time, adding ~1.1s of pure resource-load-delay (29% of mobile LCP). Render the first 1–2 above-the-fold gallery images eagerly (no `loading="lazy"`, ideally with `priority`/`fetchpriority="high"` on the very first one) and make sure they aren't gated behind client-side state/hydration. Expected impact: largest single LCP win on this page, likely enough to move it from Needs-Improvement into Good.

2. **Add `fetchpriority="high"` (Next.js `priority`) to whichever carousel image actually becomes the LCP element on `/`, and to the `/brands` hero image.** Both are already discoverable in the initial HTML and not lazy-loaded, but neither gets a priority hint, so the browser doesn't prioritize their fetch/decode. On `/`, the current `priority`-flagged images (the first two array items) may not match the image that actually paints as LCP depending on carousel scroll position — verify which slide is visible at paint time and prioritize that one specifically (or prioritize the first 2–3 visible slides, not just index 0–1).

3. **Fix the `sizes` attribute on `/whimsy-about-pic.webp`.** It's set to `sizes="100vw"` but the image only ever renders at ~364–546px wide (fixed-width card, not full-bleed). This pulls a needless 1920w/192KB variant on desktop and wastes ~48KB even on mobile per Lighthouse's own image-delivery-insight. Change to a real `sizes` value matching the rendered box (e.g. `sizes="(min-width: 1024px) 546px, 364px"`).

4. **Re-export `wf-logo.webp` and `brand02.webp` at resolutions closer to their display size / with tighter compression.** The logo wastes ~96% of its transferred bytes on a 59×95–80×80 render target from a 256×413 source; brand02 has ~22KB of extra headroom per Lighthouse's compression estimate. Low effort, small but "free" byte savings on every page (logo appears site-wide).

5. **Investigate `/brands` TTFB (~1.04s of its 2.43s mobile LCP, 43%).** This is notably higher than the other three pages (197–435ms). Confirm whether this route is served from a serverless function with a cold start or heavier data-fetching versus the static/ISR paths used elsewhere, and consider static generation or edge caching for this route specifically.

6. **(Low priority / already strong) Keep CLS and INP-proxy as-is.** CLS is ~0 on every page/device (all images already have explicit dimensions or `fill` inside sized containers) and TBT/Max-Potential-FID are well under the 200ms "Good" INP threshold everywhere (max observed: 76ms), with zero third-party scripts and only one main-thread task over 50ms across all 8 runs. No action needed here; just don't regress it when adding new client-side interactivity (e.g., the lightbox on the gallery page).

## Caveats

- No CrUX/PSI field data was available (no API key configured); all figures are single-run Lighthouse lab measurements and may vary run-to-run. Re-validate against real CrUX 75th-percentile data (via `pagespeed_check.py` or `crux_history.py` once a key is configured, or via CrUX Vis) before treating the mobile LCP figures as production-representative.
- Mobile lab LCP uses Lighthouse's default aggressive throttling (4x CPU, Slow-4G-like network); real users on modern phones/broadband will generally see better LCP than reported here, but the relative ranking of issues (gallery's lazy LCP image, missing fetchpriority, the `sizes="100vw"` bug, brands' TTFB) is throttling-independent and should be fixed regardless.
