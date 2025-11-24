export type GalleryMeta = {
  slug: string;
  title: string;
  coupleNames: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  featured?: boolean;
};

// Central place to register galleries so routes and listings stay in sync.
export const galleries: GalleryMeta[] = [
  {
    slug: "spring-wedding",
    title: "Spring Wedding",
    coupleNames: "Alice & Bob",
    location: "Napa Valley, CA",
    coverImage: "/brand01.jpg",
    coverAlt: "Pastel bouquet set against vineyard scenery",
    featured: true,
  },
  {
    slug: "coastal-ceremony",
    title: "Coastal Ceremony",
    coupleNames: "Jamie & Morgan",
    location: "Big Sur, CA",
    coverImage: "/brand02.jpg",
    coverAlt: "Lush coastal florals overlooking the ocean",
    featured: true,
  },
  {
    slug: "garden-party",
    title: "Garden Party",
    coupleNames: "Taylor & Riley",
    location: "Portland, OR",
    coverImage: "/brand03.jpg",
    coverAlt: "Garden-inspired tablescape with seasonal blooms",
    featured: true,
  },
];

export const featuredGalleries = galleries.filter((gallery) => gallery.featured);

export function getGalleryBySlug(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}
