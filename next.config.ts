import type { NextConfig } from "next";

/* Content-Security-Policy, sent as Report-Only for now: browsers log what
   would be blocked without blocking anything. It allows what the site loads:
   Next.js inline bootstrap scripts and styles, Google Analytics 4
   (gtag.js plus its collect endpoints), Vercel Speed Insights, next/image
   (same origin, blur placeholders as data: URIs), Instagram feed thumbnails
   (loaded straight from Instagram's CDNs, see docs/INSTAGRAM.md) and the
   inquiry form, which posts to /api/inquire on this origin. Once the browser
   console stays clean in production, rename the header to
   Content-Security-Policy to enforce it. */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.cdninstagram.com https://*.fbcdn.net https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory otherwise makes Turbopack treat
  // the home folder as the workspace root.
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves the qualities listed here and rounds any other
    // `quality` prop to the nearest one. 50 is used by the low-opacity
    // background images (page heroes, sub-page headers, inquire form).
    qualities: [50, 75],
    // Instagram feed thumbnails (see docs/INSTAGRAM.md)
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // The production alias on vercel.app should not serve a second copy
      // of the site once the custom domain is live.
      {
        source: "/:path*",
        has: [{ type: "host", value: "whimsy-flower.vercel.app" }],
        destination: "https://www.whimsyflower.love/:path*",
        permanent: true,
      },
      // Retail pages from the previous site that search engines still know.
      { source: "/shop", destination: "/", permanent: true },
      { source: "/shop/:path*", destination: "/", permanent: true },
      { source: "/product/:path*", destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
