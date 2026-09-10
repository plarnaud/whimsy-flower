// Central site identity shared by metadata, structured data, robots and the
// sitemap. Keep facts here so copy, schema and directories stay consistent.

const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
// Vercel exposes the shortest production domain here (the custom domain once
// one is attached, the *.vercel.app host until then).
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  envUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Whimsy Flower",
  legalName: "Whimsy Flower, LLC",
  url: siteUrl,
  title: "Floral Design Studio in Hudson, NY | Whimsy Flower",
  description:
    "A bespoke floral design studio in Hudson, NY. Sculptural, seasonal florals for weddings, events, and brands across the Hudson Valley and beyond.",
  founder: {
    name: "Molly",
    jobTitle: "Founder & Creative Director",
  },
  location: {
    locality: "Hudson",
    region: "NY",
    country: "US",
  },
  serviceArea: [
    "Hudson Valley",
    "Catskills",
    "New York City",
    "Columbia County, NY",
    "Dutchess County, NY",
    "Greene County, NY",
    "Ulster County, NY",
  ],
  social: {
    instagram: "https://www.instagram.com/whimsy_flower/",
  },
  // Brides exclusive on Julia & Jackie's two-part wedding (florals by the studio).
  bridesFeatureUrl:
    "https://www.brides.com/influencer-julia-mcguire-pennsylvania-new-york-two-part-wedding-zai-laffitte-11760249",
  ogImage: {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Whimsy Flower logo and wordmark, a floral design studio in Hudson, New York",
  },
  copyrightYear: 2026,
};

// Shared Open Graph base. Page-level `openGraph` objects replace the layout's
// wholesale, so spread this wherever a page overrides images.
export const baseOpenGraph = {
  type: "website",
  siteName: siteConfig.name,
  locale: "en_US",
  url: "./",
} as const;
