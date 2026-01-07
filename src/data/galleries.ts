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
  {
    slug: "winter-wedding",
    title: "Spring Wedding",
    coupleNames: "Alice & Bob",
    location: "Napa Valley, CA",
    coverImage: "/brand01.jpg",
    coverAlt: "Pastel bouquet set against vineyard scenery",
    featured: false,
  },
  {
    slug: "mountain-ceremony",
    title: "Coastal Ceremony",
    coupleNames: "Jamie & Morgan",
    location: "Big Sur, CA",
    coverImage: "/brand02.jpg",
    coverAlt: "Lush coastal florals overlooking the ocean",
    featured: false,
  },
  {
    slug: "tea-party",
    title: "Garden Party",
    coupleNames: "Taylor & Riley",
    location: "Portland, OR",
    coverImage: "/brand03.jpg",
    coverAlt: "Garden-inspired tablescape with seasonal blooms",
    featured: false,
  },
  {
    slug: "summer-wedding",
    title: "Spring Wedding",
    coupleNames: "Alice & Bob",
    location: "Napa Valley, CA",
    coverImage: "/brand01.jpg",
    coverAlt: "Pastel bouquet set against vineyard scenery",
    featured: false,
  },
  {
    slug: "beach-ceremony",
    title: "Coastal Ceremony",
    coupleNames: "Jamie & Morgan",
    location: "Big Sur, CA",
    coverImage: "/brand02.jpg",
    coverAlt: "Lush coastal florals overlooking the ocean",
    featured: false,
  },
  {
    slug: "coffee-party",
    title: "Garden Party",
    coupleNames: "Taylor & Riley",
    location: "Portland, OR",
    coverImage: "/brand03.jpg",
    coverAlt: "Garden-inspired tablescape with seasonal blooms",
    featured: false,
  },
  {
    slug: "autumn-soiree",
    title: "Autumn Soiree",
    coupleNames: "Avery & Jordan",
    location: "Asheville, NC",
    coverImage: "/brand01.jpg",
    coverAlt: "Warm-toned bouquets with autumn foliage",
  },
  {
    slug: "lakeside-vows",
    title: "Lakeside Vows",
    coupleNames: "Casey & Drew",
    location: "Lake Tahoe, CA",
    coverImage: "/brand02.jpg",
    coverAlt: "Lakeside ceremony florals with mountain views",
  },
  {
    slug: "orchard-gathering",
    title: "Orchard Gathering",
    coupleNames: "Emerson & Quinn",
    location: "Hood River, OR",
    coverImage: "/brand03.jpg",
    coverAlt: "Orchard tablescape with seasonal blooms",
  },
  {
    slug: "city-luxe",
    title: "City Luxe",
    coupleNames: "Harper & Sloan",
    location: "Chicago, IL",
    coverImage: "/brand01.jpg",
    coverAlt: "Modern bouquets with soft neutral accents",
  },
  {
    slug: "meadow-ceremony",
    title: "Meadow Ceremony",
    coupleNames: "Rowan & Blake",
    location: "Boulder, CO",
    coverImage: "/brand02.jpg",
    coverAlt: "Meadow florals framed by open skies",
  },
  {
    slug: "courtyard-brunch",
    title: "Courtyard Brunch",
    coupleNames: "Parker & Reese",
    location: "Savannah, GA",
    coverImage: "/brand03.jpg",
    coverAlt: "Courtyard blooms with vintage table details",
  },
  {
    slug: "desert-sunset",
    title: "Desert Sunset",
    coupleNames: "Kendall & Finley",
    location: "Sedona, AZ",
    coverImage: "/brand01.jpg",
    coverAlt: "Sunset florals with warm desert tones",
  },
  {
    slug: "forest-elegance",
    title: "Forest Elegance",
    coupleNames: "Morgan & Ellis",
    location: "Bend, OR",
    coverImage: "/brand02.jpg",
    coverAlt: "Evergreen ceremony florals with soft whites",
  },
  {
    slug: "seaside-villa",
    title: "Seaside Villa",
    coupleNames: "Logan & Avery",
    location: "Monterey, CA",
    coverImage: "/brand03.jpg",
    coverAlt: "Oceanfront blooms with airy textures",
  },
  {
    slug: "estate-affair",
    title: "Estate Affair",
    coupleNames: "Skyler & Cameron",
    location: "Charlottesville, VA",
    coverImage: "/brand01.jpg",
    coverAlt: "Estate ballroom florals with classic greenery",
  },
  {
    slug: "riverfront-celebration",
    title: "Riverfront Celebration",
    coupleNames: "Dakota & Morgan",
    location: "Austin, TX",
    coverImage: "/brand02.jpg",
    coverAlt: "Riverfront ceremony with lush blooms",
  },
  {
    slug: "vineyard-evening",
    title: "Vineyard Evening",
    coupleNames: "Quinn & Peyton",
    location: "Sonoma, CA",
    coverImage: "/brand03.jpg",
    coverAlt: "Vineyard reception with soft candlelit florals",
  },
];

export const featuredGalleries = galleries.filter(
  (gallery) => gallery.featured
);

export function getGalleryBySlug(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}
