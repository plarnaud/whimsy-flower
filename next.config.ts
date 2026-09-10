import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory otherwise makes Turbopack treat
  // the home folder as the workspace root.
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
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
