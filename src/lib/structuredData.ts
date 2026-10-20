import type { BrandProjectMeta } from "@/data/brandProjects";
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
   and the three services. Every property mirrors something the site itself
   shows: no street address, phone or email is published on the site, so none
   appears here. */
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
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          url: `${siteUrl}${siteConfig.logo.url}`,
          contentUrl: `${siteUrl}${siteConfig.logo.url}`,
          width: siteConfig.logo.width,
          height: siteConfig.logo.height,
          caption: siteConfig.name,
        },
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
        // The Brides feature linked from the home page ("Featured On").
        subjectOf: {
          "@type": "Article",
          url: siteConfig.bridesFeatureUrl,
          publisher: { "@type": "Organization", name: "Brides" },
        },
        sameAs: [siteConfig.social.instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.jobTitle,
        image: `${siteUrl}${siteConfig.founder.image}`,
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
          "Full-service wedding floral design from a studio in Hudson, NY: ceremony architecture, reception tablescapes, and personal flowers, across the Hudson Valley, the Catskills, New York City, and beyond.",
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
          "Floral design for private celebrations: flower bars, custom engagements, bridal showers, rehearsal dinners, and intimate dinner parties, from a studio in Hudson, New York and beyond.",
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
          "Editorial floral styling for shops, brands, and businesses from Albany to Manhattan: product launches, press dinners, campaign shoots, and corporate gatherings.",
        provider: { "@id": organizationId },
        areaServed,
      },
    ],
  };
}

type Crumb = { name: string; path: string };

/* Breadcrumb trail for a page (Home is prepended automatically). */
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

function imageObjects(
  items: GalleryGridItem[],
  photographer?: { name: string; url?: string },
) {
  const creator = photographer
    ? {
        "@type": "Organization",
        name: photographer.name,
        ...(photographer.url ? { url: photographer.url } : {}),
      }
    : undefined;
  return items.map((item) => ({
    "@type": "ImageObject",
    contentUrl: `${siteUrl}${item.imgSrc}`,
    description: item.imgAlt,
    ...(creator ? { creditText: photographer?.name, creator } : {}),
  }));
}

/* Per-gallery graph: breadcrumb trail plus an ImageGallery crediting the
   photographer on every image. */
export function galleryGraph(gallery: GalleryMeta, items: GalleryGridItem[]) {
  const url = `${siteUrl}/galleries/${gallery.slug}`;
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
        isPartOf: { "@id": websiteId },
        ...(hasPlace
          ? { contentLocation: { "@type": "Place", name: gallery.location } }
          : {}),
        image: imageObjects(
          items,
          gallery.photographer
            ? { name: gallery.photographer, url: gallery.photographerUrl }
            : undefined,
        ),
      },
    ],
  };
}

/* The brands a project was made for: "A x B" names two collaborators. */
function brandOrganizations(project: BrandProjectMeta) {
  return project.brandName
    .split(/\s+x\s+/)
    .map((name) => ({ "@type": "Organization", name: name.trim() }));
}

/* Per brand case study: breadcrumb trail plus an ImageGallery of the work,
   about the brand(s) it was made for. */
export function brandProjectGraph(
  project: BrandProjectMeta,
  items: GalleryGridItem[],
) {
  const url = `${siteUrl}/brands/${project.slug}`;
  const name = `${project.brandName}: ${project.title}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbGraph([
        { name: "Editorial & Brands", path: "/brands" },
        { name, path: `/brands/${project.slug}` },
      ]),
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        url,
        name: `${name}, florals by Whimsy Flower`,
        description: project.metaDescription,
        creator: { "@id": organizationId },
        isPartOf: { "@id": websiteId },
        about: brandOrganizations(project),
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `${siteUrl}${project.coverImage}`,
          description: project.coverAlt,
        },
        image: imageObjects(
          items,
          project.photographer
            ? { name: project.photographer, url: project.photographerUrl }
            : undefined,
        ),
      },
    ],
  };
}

/* The Editorial & Brands hub: breadcrumb plus the case studies it links to. */
export function brandsHubGraph(projects: BrandProjectMeta[]) {
  const url = `${siteUrl}/brands`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbGraph([{ name: "Editorial & Brands", path: "/brands" }]),
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: "Editorial & Brands",
        isPartOf: { "@id": websiteId },
        about: { "@id": `${url}#service` },
        hasPart: projects.map((project) => ({
          "@type": "ImageGallery",
          "@id": `${siteUrl}/brands/${project.slug}#gallery`,
          name: `${project.brandName}: ${project.title}`,
          url: `${siteUrl}/brands/${project.slug}`,
          image: `${siteUrl}${project.coverImage}`,
          creator: { "@id": organizationId },
        })),
      },
    ],
  };
}
