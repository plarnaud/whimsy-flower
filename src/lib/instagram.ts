/* Latest posts from the studio's Instagram account via the Instagram Graph
   API. Requires a long-lived access token for a Professional account in the
   INSTAGRAM_ACCESS_TOKEN environment variable; without one this returns null
   and the Follow us section falls back to studio photos. Setup notes live in
   docs/INSTAGRAM.md. */

export type InstagramPost = {
  id: string;
  href: string;
  src: string;
  alt: string;
};

type ApiMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink";

function captionToAlt(caption: string | undefined) {
  if (!caption) return "Whimsy Flower on Instagram";
  const firstLine = caption.split("\n")[0].replace(/#\S+/g, "").trim();
  const text = firstLine || "Whimsy Flower on Instagram";
  return text.length > 125 ? `${text.slice(0, 122).trimEnd()}...` : text;
}

export async function getInstagramPosts(
  limit = 6,
): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", FIELDS);
  // Ask for a few extra so videos without a thumbnail can be skipped.
  url.searchParams.set("limit", String(limit + 4));
  url.searchParams.set("access_token", token);

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const json = (await response.json()) as { data?: ApiMedia[] };
    const posts = (json.data ?? [])
      .map((m) => ({
        id: m.id,
        href: m.permalink,
        src: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "",
        alt: captionToAlt(m.caption),
      }))
      .filter((p) => p.src && p.href)
      .slice(0, limit);
    return posts.length ? posts : null;
  } catch {
    return null;
  }
}
