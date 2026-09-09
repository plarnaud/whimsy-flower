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
    "A bespoke floral design studio in Hudson, NY. Sculptural, seasonal florals for weddings, events, and brands across the Hudson Valley, the Catskills, and New York City.",
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
    tiktok: "https://www.tiktok.com/@whimsyflower",
  },
  // TODO: swap for the canonical brides.com article URL (Julia McGuire
  // two-part wedding exclusive) once confirmed; the gallery stands in until then.
  bridesFeatureUrl: "/galleries/brides-feature",
  ogImage: {
    url: "/og-image.jpg",
    width: 1100,
    height: 576,
    alt: "Floral tablescape composed by Whimsy Flower, Hudson, NY",
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
