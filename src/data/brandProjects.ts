import { portfolioAlts } from "@/data/portfolioAlts";

export type BrandProjectMeta = {
  slug: string;
  title: string;
  brandName: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  /* Album shown in the modal gallery on the Editorial & Brands page. */
  images?: string[];
  /* Written alt text per photo file name under public/portfolio/<slug>. */
  photoAlts?: Record<string, string>;
  /* Photographer credited on the project page. */
  photographer?: string;
  photographerUrl?: string;
  /* Files kept out of the project page grid. */
  hiddenPhotos?: string[];
  testimonialTitle?: string;
  testimonialText?: string;
  testimonialClientName?: string;
  featured?: boolean;
};

// Central place to register brand projects so routes and listings stay in sync.
export const brandProjects: BrandProjectMeta[] = [
  {
    slug: "mackenzie-childs-gray-malin",
    title: "Collection Launch Party",
    brandName: "MacKenzie-Childs x Gray Malin",
    location: "",
    coverImage: "/portfolio/mackenzie-childs-gray-malin/J72A6802_websize.webp",
    coverAlt:
      "A cascading arrangement of anemones, delphinium and trailing greenery spills from the corner of the branded cocktail bar",
    images: [
      "/portfolio/mackenzie-childs-gray-malin/J72A6707_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A6726_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A6778_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A6802_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A6968_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A7556_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A7398_websize.webp",
      "/portfolio/mackenzie-childs-gray-malin/J72A7271_websize.webp",
    ],
    photoAlts: portfolioAlts["mackenzie-childs-gray-malin"],
    photographer: "Phillip Van Nostrand",
    photographerUrl: "https://phillipvn.com/",
    featured: true,
  },
  {
    slug: "printfresh-mackenzie-childs",
    title: "Collaboration Launch Party",
    brandName: "Printfresh x MacKenzie-Childs",
    location: "",
    coverImage: "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-50.webp",
    coverAlt:
      "Guests in Printfresh pajamas talk by a rolling rack as a loose arrangement of ranunculus and cosmos fills the foreground",
    images: [
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-7.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-192.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-9.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-5.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-50.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-13.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-11.webp",
      "/portfolio/printfresh-mackenzie-childs/MacKenziexPrintfresh_11.05.25-14.webp",
    ],
    photoAlts: portfolioAlts["printfresh-mackenzie-childs"],
    photographer: "Kaitlyn Schnorbus",
    photographerUrl: "https://www.instagram.com/kait.schnorbus/",
    featured: true,
  },
  {
    slug: "sail-to-sable",
    title: "Collaboration Launch Brunch",
    brandName: "Sail to Sable",
    location: "",
    coverImage: "/portfolio/sail-to-sable/IMG_8059.webp",
    coverAlt:
      "Vine and white rose canopy trails over pendant lamps above a long brunch table set with bud vases of calla lilies and tulips",
    images: [
      "/portfolio/sail-to-sable/IMG_8059.webp",
      "/portfolio/sail-to-sable/IMG_8060.webp",
      "/portfolio/sail-to-sable/IMG_8065.webp",
      "/portfolio/sail-to-sable/IMG_8062.webp",
      "/portfolio/sail-to-sable/IMG_8063.webp",
      "/portfolio/sail-to-sable/IMG_8066.webp",
    ],
    photoAlts: portfolioAlts["sail-to-sable"],
    hiddenPhotos: ["IMG_8061.webp", "IMG_8064.webp"],
    featured: true,
  },
  {
    slug: "some-shelly-chandelier-cocktail-courier",
    title: "Styled Editorial Shoot",
    brandName: "Some Shelly x Chandelier Cocktail Courier",
    location: "",
    coverImage: "/portfolio/some-shelly-chandelier-cocktail-courier/Image-41.webp",
    coverAlt:
      "White ranunculus, tulips, stock and calla lilies rest on a marble vanity beside a lemon twist martini and two rings",
    images: [
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-41.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-47.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-49.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-59.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-65.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-69.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-82.webp",
      "/portfolio/some-shelly-chandelier-cocktail-courier/Image-24.webp",
    ],
    photoAlts: portfolioAlts["some-shelly-chandelier-cocktail-courier"],
    featured: true,
  },
];

// Brands shown in the scroller on the Editorial & Brands page.
export const brandNames = [
  "MacKenzie-Childs",
  "Gray Malin",
  "Printfresh",
  "Sail to Sable",
  "Some Shelly",
  "Chandelier Cocktail Courier",
];

export type BrandGalleryPhoto = {
  src: string;
  alt: string;
};

// Covers of the brand projects, for compact listings.
export const brandGalleryPhotos: BrandGalleryPhoto[] = brandProjects.map(
  (project) => ({ src: project.coverImage, alt: project.coverAlt }),
);

export const featuredBrandProjects = brandProjects.filter(
  (project) => project.featured,
);

export function getBrandProjectBySlug(slug: string) {
  return brandProjects.find((project) => project.slug === slug);
}
