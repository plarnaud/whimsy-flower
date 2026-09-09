import type { MetadataRoute } from "next";
import { galleries } from "@/data/galleries";
import { siteUrl } from "@/lib/siteConfig";

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/weddings", priority: 0.9, changeFrequency: "monthly" },
  { path: "/events", priority: 0.7, changeFrequency: "monthly" },
  { path: "/brands", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/inquire", priority: 0.6, changeFrequency: "yearly" },
];

// Brand project pages (/brands/[slug]) stay out of the sitemap, and carry
// noindex, until real client work replaces the placeholder projects.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...galleries.map((gallery) => ({
      url: `${siteUrl}/galleries/${gallery.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
