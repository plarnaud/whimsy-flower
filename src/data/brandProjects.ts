export type BrandProjectMeta = {
  slug: string;
  title: string;
  brandName: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  testimonialTitle?: string;
  testimonialText?: string;
  testimonialClientName?: string;
  featured?: boolean;
};

// Central place to register brand projects so routes and listings stay in sync.
export const brandProjects: BrandProjectMeta[] = [
  {
    slug: "maison-lumiere-launch",
    title: "Product Launch",
    brandName: "Maison Lumière",
    location: "New York, NY",
    coverImage: "/brand01.webp",
    coverAlt: "Sculptural florals styled for a product launch",
    testimonialTitle: "An installation our guests still talk about",
    testimonialText:
      "Whimsy Flower translated our brand into a floral concept that felt entirely our own — composed, atmospheric, and executed without a single detail out of place.",
    testimonialClientName: "Maison Lumière",
    featured: true,
  },
  {
    slug: "atelier-rosewood-editorial",
    title: "Editorial Shoot",
    brandName: "Atelier Rosewood",
    location: "Los Angeles, CA",
    coverImage: "/brand02.webp",
    coverAlt: "Editorial floral composition with layered seasonal blooms",
    featured: true,
  },
  {
    slug: "verdant-press-dinner",
    title: "Press Dinner",
    brandName: "Verdant & Co.",
    location: "Chicago, IL",
    coverImage: "/brand03.webp",
    coverAlt: "Tablescape florals styled for an intimate press dinner",
    featured: true,
  },
  {
    slug: "linen-house-lookbook",
    title: "Autumn Lookbook",
    brandName: "The Linen House",
    location: "Hudson, NY",
    coverImage: "/brand01.webp",
    coverAlt: "Warm-toned florals styled for a seasonal lookbook",
  },
  {
    slug: "studio-meridian-opening",
    title: "Boutique Opening",
    brandName: "Studio Meridian",
    location: "Austin, TX",
    coverImage: "/brand02.webp",
    coverAlt: "Architectural entrance installation with seasonal blooms",
  },
  {
    slug: "fern-field-campaign",
    title: "Spring Campaign",
    brandName: "Fern + Field",
    location: "Portland, OR",
    coverImage: "/brand03.webp",
    coverAlt: "Campaign styling with textured spring florals",
  },
];

// Brands shown in the scroller on the Editorial & Brands page — placeholder
// names awaiting the real client list.
export const brandNames = [
  "Maison Lumière",
  "Atelier Rosewood",
  "Verdant & Co.",
  "The Linen House",
  "Studio Meridian",
  "Fern + Field",
];

export type BrandGalleryPhoto = {
  src: string;
  alt: string;
};

// Mixed gallery on the Editorial & Brands page — placeholder photos cycling
// the three brand images until real project imagery lands.
export const brandGalleryPhotos: BrandGalleryPhoto[] = Array.from(
  { length: 20 },
  (_, i) => ({
    src: `/brand0${(i % 3) + 1}.webp`,
    alt: `Editorial and brand floral styling by Whimsy Flower, photo ${i + 1}`,
  }),
);

export const featuredBrandProjects = brandProjects.filter(
  (project) => project.featured,
);

export function getBrandProjectBySlug(slug: string) {
  return brandProjects.find((project) => project.slug === slug);
}
