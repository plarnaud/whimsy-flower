import type { GalleryMeta } from "@/data/galleries";
import type { GalleryGridItem } from "@/lib/galleryAssets";
import { siteConfig, siteUrl } from "@/lib/siteConfig";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const founderId = `${siteUrl}/#founder`;

const areaServed = siteConfig.serviceArea.map((name) => ({
  "@type": "Place",
  name,
}));

/* Site-wide graph rendered once from the root layout: the studio as a
   Florist (a LocalBusiness subtype; the schema type is invisible to readers,
   so it does not touch the "design studio" voice), the website, the founder,
   and the three services. Street address, phone and email are intentionally
   absent until the studio decides what is public. */
export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Florist",
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteUrl,
        logo: `${siteUrl}/wf-logo.webp`,
        image: `${siteUrl}${siteConfig.ogImage.url}`,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.locality,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        areaServed,
        founder: { "@id": founderId },
        sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteConfig.name,
        inLanguage: "en-US",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.jobTitle,
        worksFor: { "@id": organizationId },
        url: `${siteUrl}/about`,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/weddings#service`,
        name: "Wedding Floral Design",
        serviceType: "Wedding floral design",
        url: `${siteUrl}/weddings`,
        description:
          "Bespoke wedding florals: sculptural ceremony installations, reception tablescapes, and personal flowers, designed from a studio in Hudson, NY for celebrations across the Hudson Valley, the Catskills, and New York City.",
        provider: { "@id": organizationId },
        areaServed,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 8000,
            priceCurrency: "USD",
            description: "Full-service wedding commissions begin at $8,000.",
          },
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/events#service`,
        name: "Private Event Floral Design",
        serviceType: "Event floral design",
        url: `${siteUrl}/events`,
        description:
          "Floral design for private celebrations: bridal and baby showers, hands-on floral workshops, flower bars, and intimate gatherings across the Hudson Valley and New York City.",
        provider: { "@id": organizationId },
        areaServed,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/brands#service`,
        name: "Editorial & Brand Floral Design",
        serviceType: "Editorial and brand floral styling",
        url: `${siteUrl}/brands`,
        description:
          "Editorial floral styling for shops, brands, and businesses from the Hudson Valley to Manhattan: campaigns, product launches, press dinners, and corporate events.",
        provider: { "@id": organizationId },
        areaServed,
      },
    ],
  };
}

type Crumb = { name: string; path: string };

/* Breadcrumb trail for a top-level page (Home is prepended automatically). */
export function breadcrumbGraph(crumbs: Crumb[]) {
  const trail: Crumb[] = [{ name: "Home", path: "" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

/* The About page as a profile of the founder. */
export function aboutGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbGraph([{ name: "About", path: "/about" }]),
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/about#profile`,
        url: `${siteUrl}/about`,
        name: "About Molly, founder and creative director of Whimsy Flower",
        mainEntity: { "@id": founderId },
        about: { "@id": organizationId },
      },
    ],
  };
}

/* Per-gallery graph: breadcrumb trail plus an ImageGallery crediting the
   photographer on every image. */
export function galleryGraph(gallery: GalleryMeta, items: GalleryGridItem[]) {
  const url = `${siteUrl}/galleries/${gallery.slug}`;
  const photographer = gallery.photographer
    ? {
        "@type": "Organization",
        name: gallery.photographer,
        ...(gallery.photographerUrl ? { url: gallery.photographerUrl } : {}),
      }
    : undefined;
  const hasPlace = Boolean(
    gallery.location && !/^\d{4}$/.test(gallery.location),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbGraph([
        { name: "Weddings", path: "/weddings" },
        { name: gallery.title, path: `/galleries/${gallery.slug}` },
      ]),
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        url,
        name: `${gallery.title} Wedding Florals by Whimsy Flower`,
        description: gallery.paletteText?.split(/(?<=\.)\s/)[0],
        creator: { "@id": organizationId },
        ...(hasPlace
          ? { contentLocation: { "@type": "Place", name: gallery.location } }
          : {}),
        image: items.map((item) => ({
          "@type": "ImageObject",
          contentUrl: `${siteUrl}${item.imgSrc}`,
          description: item.imgAlt,
          ...(photographer
            ? { creditText: gallery.photographer, creator: photographer }
            : {}),
        })),
      },
    ],
  };
}
