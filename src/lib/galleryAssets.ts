import { readdir } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

export type GalleryGridItem = {
  id: string;
  imgSrc: string;
  imgAlt: string;
};

const galleryImageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

const fileNameSorter = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function encodePublicPath(pathValue: string) {
  return pathValue.split("/").map(encodeURIComponent).join("/");
}

export type GalleryPhotoArrangement = {
  /* File names to pin to the front, in display order; the rest follow sorted. */
  order?: string[];
  /* File names to leave out of the grid (e.g. used elsewhere on the page). */
  exclude?: string[];
  /* Written alt text per file name; files without one get a descriptive fallback. */
  alts?: Record<string, string>;
  /* Credited photographer, folded into the fallback alt text. */
  photographer?: string;
};

export async function getGalleryGridItems(
  assetFolder: string | undefined,
  title: string,
  arrangement?: GalleryPhotoArrangement,
): Promise<GalleryGridItem[]> {
  if (!assetFolder) {
    return [];
  }

  const folderPath = path.join(process.cwd(), "public", assetFolder);

  let entries: Dirent<string>[];
  try {
    entries = await readdir(folderPath, { encoding: "utf8", withFileTypes: true });
  } catch {
    return [];
  }

  const excluded = new Set(arrangement?.exclude ?? []);
  const orderIndex = new Map(
    (arrangement?.order ?? []).map((name, index) => [name, index]),
  );
  const alts = arrangement?.alts ?? {};
  const credit = arrangement?.photographer
    ? `, photographed by ${arrangement.photographer}`
    : "";

  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        galleryImageExtensions.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .filter((fileName) => !excluded.has(fileName))
    .sort((a, b) => {
      const aIndex = orderIndex.get(a);
      const bIndex = orderIndex.get(b);
      if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
      if (aIndex !== undefined) return -1;
      if (bIndex !== undefined) return 1;
      return fileNameSorter.compare(a, b);
    })
    .map((fileName, index) => ({
      id: `${assetFolder}/${fileName}`,
      imgSrc: `/${encodePublicPath(assetFolder)}/${encodeURIComponent(fileName)}`,
      imgAlt:
        alts[fileName] ??
        `${title} wedding florals by Whimsy Flower${credit}, photo ${index + 1}`,
    }));
}
