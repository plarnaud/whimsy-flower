export type BrandProjectMeta = {
  slug: string;
  title: string;
  brandName: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  /* Full album shown in the modal gallery; falls back to [coverImage]. */
  images?: string[];
  testimonialTitle?: string;
  testimonialText?: string;
  testimonialClientName?: string;
  featured?: boolean;
};

// Placeholder albums cycling the three brand photos until real project
// imagery lands; each project's album starts on its own cover.
const placeholderAlbum = (cover: string) => {
  const all = ["/brand01.webp", "/brand02.webp", "/brand03.webp"];
  return [cover, ...all.filter((src) => src !== cover)];
};

// Central place to register brand projects so routes and listings stay in sync.
export const brandProjects: BrandProjectMeta[] = [
  {
    slug: "maison-lumiere-launch",
    title: "Product Launch",
    brandName: "Maison Lumière",
    location: "New York, NY",
    coverImage: "/brand01.webp",
    coverAlt: "Two women in white linen laugh in a tall-grass meadow, holding armfuls of white scabiosa and veronica against hazy hills",
    images: placeholderAlbum("/brand01.webp"),
    testimonialTitle: "An installation our guests still talk about",
    testimonialText:
      "Whimsy Flower translated our brand into a floral concept that felt entirely our own: composed, atmospheric, and executed without a single detail out of place.",
    testimonialClientName: "Maison Lumière",
    featured: true,
  },
  {
    slug: "atelier-rosewood-editorial",
    title: "Editorial Shoot",
    brandName: "Atelier Rosewood",
    location: "Kingston, NY",
    coverImage: "/brand02.webp",
    coverAlt: "A woman with long auburn hair reaches up to hang stems of white delphinium suspended by fine wire from a willow branch",
    images: placeholderAlbum("/brand02.webp"),
    featured: true,
  },
  {
    slug: "verdant-press-dinner",
    title: "Press Dinner",
    brandName: "Verdant & Co.",
    location: "Albany, NY",
    coverImage: "/brand03.webp",
    coverAlt: "Two women glance back beside a river, each holding a small bouquet of white daisies tied with long trailing silk ribbons",
    images: placeholderAlbum("/brand03.webp"),
    featured: true,
  },
  {
    slug: "linen-house-lookbook",
    title: "Autumn Lookbook",
    brandName: "The Linen House",
    location: "Hudson, NY",
    coverImage: "/brand01.webp",
    coverAlt: "Two women in white linen laugh in a tall-grass meadow, holding armfuls of white scabiosa and veronica against hazy hills",
    images: placeholderAlbum("/brand01.webp"),
  },
  {
    slug: "studio-meridian-opening",
    title: "Boutique Opening",
    brandName: "Studio Meridian",
    location: "Rhinebeck, NY",
    coverImage: "/brand02.webp",
    coverAlt: "A woman with long auburn hair reaches up to hang stems of white delphinium suspended by fine wire from a willow branch",
    images: placeholderAlbum("/brand02.webp"),
  },
  {
    slug: "fern-field-campaign",
    title: "Spring Campaign",
    brandName: "Fern + Field",
    location: "Beacon, NY",
    coverImage: "/brand03.webp",
    coverAlt: "Two women glance back beside a river, each holding a small bouquet of white daisies tied with long trailing silk ribbons",
    images: placeholderAlbum("/brand03.webp"),
  },
];

// Brands shown in the scroller on the Editorial & Brands page: placeholder
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

// Selected work on the Editorial & Brands page: the few brand photos we
// have; add entries as real project imagery lands.
export const brandGalleryPhotos: BrandGalleryPhoto[] = [
  {
    src: "/brand01.webp",
    alt: "Two women in white linen laugh in a tall-grass meadow, holding armfuls of white scabiosa and veronica against hazy hills",
  },
  {
    src: "/brand02.webp",
    alt: "A woman with long auburn hair reaches up to hang stems of white delphinium suspended by fine wire from a willow branch",
  },
  {
    src: "/brand03.webp",
    alt: "Two women glance back beside a river, each holding a small bouquet of white daisies tied with long trailing silk ribbons",
  },
];

export const featuredBrandProjects = brandProjects.filter(
  (project) => project.featured,
);

export function getBrandProjectBySlug(slug: string) {
  return brandProjects.find((project) => project.slug === slug);
}
