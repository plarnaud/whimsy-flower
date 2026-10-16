/**
 * Google Analytics 4 events, named and shaped as French Fry's shared spec
 * (French Fry Dash reads every customer site the same way).
 *
 * Never pass personal data: no names, emails, phone numbers, or anything a
 * visitor typed. Only labels we chose.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

/** Sends a GA4 event; does nothing where the tag isn't loaded (dev, staging). */
export function track(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

const SOCIAL_HOSTS: Record<string, string> = {
  "instagram.com": "instagram",
  "facebook.com": "facebook",
  "pinterest.com": "pinterest",
  "tiktok.com": "tiktok",
  "youtube.com": "youtube",
  "linkedin.com": "linkedin",
  "x.com": "x",
  "twitter.com": "x",
};

function socialNetwork(host: string): string | undefined {
  const bare = host.replace(/^www\./, "");
  return SOCIAL_HOSTS[bare];
}

/** Where on the page a click happened: the nearest labelled region. */
function locationOf(element: Element): string {
  const region = element.closest("[data-track-location], header, nav, footer, main section[id]");
  if (!region) return window.location.pathname;
  const label =
    region.getAttribute("data-track-location") ??
    (region.id ? `#${region.id}` : region.tagName.toLowerCase());
  return `${window.location.pathname} ${label}`;
}

/**
 * One delegated listener for every click worth counting:
 * - `[data-track]` elements: the event named by the attribute, with every
 *   `data-track-*` attribute as a parameter (`data-track-cta-text` → `cta_text`);
 * - `mailto:` / `tel:` links → `contact_click`;
 * - social profile links → `social_click`.
 * Other outbound links are already counted by Enhanced measurement.
 */
export function handleTrackedClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const tagged = target.closest<HTMLElement>("[data-track]");
  if (tagged) {
    const params: GtagParams = {};
    for (const { name, value } of Array.from(tagged.attributes)) {
      if (name.startsWith("data-track-") && name !== "data-track-location") {
        params[name.slice("data-track-".length).replace(/-/g, "_")] = value;
      }
    }
    if (!("cta_location" in params) && tagged.dataset.track === "cta_click") {
      params.cta_location = locationOf(tagged);
    }
    track(tagged.dataset.track as string, params);
    return;
  }

  const link = target.closest<HTMLAnchorElement>("a[href]");
  if (!link) return;
  const href = link.getAttribute("href") ?? "";

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    track("contact_click", {
      method: href.startsWith("mailto:") ? "email" : "phone",
      link_location: locationOf(link),
    });
    return;
  }

  let url: URL;
  try {
    url = new URL(link.href);
  } catch {
    return;
  }
  const network = socialNetwork(url.hostname);
  if (network) {
    track("social_click", { network, link_location: locationOf(link) });
  }
}
