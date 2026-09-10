import { blurMap } from "@/data/blurMap";

/* Blurred preview for a public image path. Server-side only, so the map never
   ships to the browser; pass the result down as a blurDataURL prop. */
export function blurFor(src: string | undefined): string | undefined {
  if (!src || !src.startsWith("/")) return undefined;
  let key = src;
  try {
    key = decodeURIComponent(src);
  } catch {
    key = src;
  }
  return blurMap[key];
}
