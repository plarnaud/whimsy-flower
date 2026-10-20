import type { MetadataRoute } from "next";
import { galleries } from "@/data/galleries";
import { brandProjects } from "@/data/brandProjects";
import { getGalleryGridItems } from "@/lib/galleryAssets";
import { siteUrl } from "@/lib/siteConfig";

/* lastModified is the date each page's visible content last changed (from
   the git history), not the build time: update it when a page's copy or
   photos change. Gallery and brand-project dates live in their data files. */
const staticRoutes: Array<{
  path: string;
  updated: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", updated: "2026-09-10", priority: 1, changeFrequency: "monthly" },
  { path: "/weddings", updated: "2026-09-10", priority: 0.9, changeFrequency: "monthly" },
  { path: "/events", updated: "2026-09-10", priority: 0.7, changeFrequency: "monthly" },
  { path: "/brands", updated: "2026-09-10", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", updated: "2026-09-10", priority: 0.6, changeFrequency: "yearly" },
  { path: "/inquire", updated: "2026-09-14", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", updated: "2026-10-16", priority: 0.2, changeFrequency: "yearly" },
];

/* Absolute URLs of the photos shown on a portfolio page (image sitemap). */
async function portfolioImages(
  slug: string,
  title: string,
  exclude?: string[],
  order?: string[],
) {
  const items = await getGalleryGridItems(`portfolio/${slug}`, title, {
    exclude,
    order,
  });
  return items.map((item) => `${siteUrl}${item.imgSrc}`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleryEntries = await Promise.all(
    galleries.map(async (gallery) => ({
      url: `${siteUrl}/galleries/${gallery.slug}`,
      lastModified: gallery.updated,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: await portfolioImages(
        gallery.slug,
        gallery.title,
        gallery.hiddenPhotos,
        gallery.photoOrder,
      ),
    })),
  );

  const brandEntries = await Promise.all(
    brandProjects.map(async (project) => ({
      url: `${siteUrl}/brands/${project.slug}`,
      lastModified: project.updated,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      // The project page shows every photo in its folder.
      images: await portfolioImages(project.slug, project.title),
    })),
  );

  return [
    ...staticRoutes.map(({ path, updated, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified: updated,
      changeFrequency,
      priority,
    })),
    ...galleryEntries,
    ...brandEntries,
  ];
}
