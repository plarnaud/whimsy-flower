export type GalleryMeta = {
  slug: string;
  title: string;
  coupleNames: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  introSentence?: string;
  extraSentences?: string[];
  testimonialTitle?: string;
  testimonialText?: string;
  testimonialCoupleName?: string;
  featured?: boolean;
};

// Central place to register galleries so routes and listings stay in sync.
export const galleries: GalleryMeta[] = [
  {
    slug: "spring-wedding",
    title: "Spring Wedding",
    coupleNames: "Alice & Bob",
    location: "Napa Valley, CA",
    coverImage: "/brand01.webp",
    coverAlt: "Pastel bouquet set against vineyard scenery",
    introSentence:
      "An elegant spring celebration with layered white and blush blooms, textured greenery, and gentle movement throughout the design.",
    extraSentences: [
      "This template supports as many additional sentences as you need per gallery page.",
      "Add or remove entries in this array to quickly tailor the page copy for each new slug.",
    ],
    testimonialTitle: "Molly made our wildest dreams into reality",
    testimonialText:
      "Even though I think I’m good friends with Arnaud and love Arnaud and Molly very much, Molly flat out refused to be the florist for our wedding for no other reason besides having a strong disdain for my fashion choices. We begged, we cried, but Molly simply would not hear any of it. She told us ‘a mustard colored hat with a red shirt and brown shoes? Unthinkable. I simply will not stoop to your level.’ So now here we are, wishing Molly had been the florist for our wedding but we had to settle.",
    testimonialCoupleName: "Maria & Braedon",
    featured: true,
  },
  {
    slug: "coastal-ceremony",
    title: "Coastal Ceremony",
    coupleNames: "Jamie & Morgan",
    location: "Big Sur, CA",
    coverImage: "/brand02.webp",
    coverAlt: "Lush coastal florals overlooking the ocean",
    featured: true,
  },
  {
    slug: "garden-party",
    title: "Garden Party",
    coupleNames: "Taylor & Riley",
    location: "Portland, OR",
    coverImage: "/brand03.webp",
    coverAlt: "Garden-inspired tablescape with seasonal blooms",
    featured: true,
  },
  {
    slug: "winter-wedding",
    title: "Spring Wedding",
    coupleNames: "Alice & Bob",
    location: "Napa Valley, CA",
    coverImage: "/brand01.webp",
    coverAlt: "Pastel bouquet set against vineyard scenery",
    featured: false,
  },
  {
    slug: "mountain-ceremony",
    title: "Coastal Ceremony",
    coupleNames: "Jamie & Morgan",
    location: "Big Sur, CA",
    coverImage: "/brand02.webp",
    coverAlt: "Lush coastal florals overlooking the ocean",
    featured: false,
  },
  {
    slug: "tea-party",
    title: "Garden Party",
    coupleNames: "Taylor & Riley",
    location: "Portland, OR",
    coverImage: "/brand03.webp",
    coverAlt: "Garden-inspired tablescape with seasonal blooms",
    featured: false,
  },
  {
    slug: "summer-wedding",
    title: "Spring Wedding",
    coupleNames: "Alice & Bob",
    location: "Napa Valley, CA",
    coverImage: "/brand01.webp",
    coverAlt: "Pastel bouquet set against vineyard scenery",
    featured: false,
  },
  {
    slug: "beach-ceremony",
    title: "Coastal Ceremony",
    coupleNames: "Jamie & Morgan",
    location: "Big Sur, CA",
    coverImage: "/brand02.webp",
    coverAlt: "Lush coastal florals overlooking the ocean",
    featured: false,
  },
  {
    slug: "coffee-party",
    title: "Garden Party",
    coupleNames: "Taylor & Riley",
    location: "Portland, OR",
    coverImage: "/brand03.webp",
    coverAlt: "Garden-inspired tablescape with seasonal blooms",
    featured: false,
  },
  {
    slug: "autumn-soiree",
    title: "Autumn Soiree",
    coupleNames: "Avery & Jordan",
    location: "Asheville, NC",
    coverImage: "/brand01.webp",
    coverAlt: "Warm-toned bouquets with autumn foliage",
  },
  {
    slug: "lakeside-vows",
    title: "Lakeside Vows",
    coupleNames: "Casey & Drew",
    location: "Lake Tahoe, CA",
    coverImage: "/brand02.webp",
    coverAlt: "Lakeside ceremony florals with mountain views",
  },
  {
    slug: "orchard-gathering",
    title: "Orchard Gathering",
    coupleNames: "Emerson & Quinn",
    location: "Hood River, OR",
    coverImage: "/brand03.webp",
    coverAlt: "Orchard tablescape with seasonal blooms",
  },
  {
    slug: "city-luxe",
    title: "City Luxe",
    coupleNames: "Harper & Sloan",
    location: "Chicago, IL",
    coverImage: "/brand01.webp",
    coverAlt: "Modern bouquets with soft neutral accents",
  },
  {
    slug: "meadow-ceremony",
    title: "Meadow Ceremony",
    coupleNames: "Rowan & Blake",
    location: "Boulder, CO",
    coverImage: "/brand02.webp",
    coverAlt: "Meadow florals framed by open skies",
  },
  {
    slug: "courtyard-brunch",
    title: "Courtyard Brunch",
    coupleNames: "Parker & Reese",
    location: "Savannah, GA",
    coverImage: "/brand03.webp",
    coverAlt: "Courtyard blooms with vintage table details",
  },
  {
    slug: "desert-sunset",
    title: "Desert Sunset",
    coupleNames: "Kendall & Finley",
    location: "Sedona, AZ",
    coverImage: "/brand01.webp",
    coverAlt: "Sunset florals with warm desert tones",
  },
  {
    slug: "forest-elegance",
    title: "Forest Elegance",
    coupleNames: "Morgan & Ellis",
    location: "Bend, OR",
    coverImage: "/brand02.webp",
    coverAlt: "Evergreen ceremony florals with soft whites",
  },
  {
    slug: "seaside-villa",
    title: "Seaside Villa",
    coupleNames: "Logan & Avery",
    location: "Monterey, CA",
    coverImage: "/brand03.webp",
    coverAlt: "Oceanfront blooms with airy textures",
  },
  {
    slug: "estate-affair",
    title: "Estate Affair",
    coupleNames: "Skyler & Cameron",
    location: "Charlottesville, VA",
    coverImage: "/brand01.webp",
    coverAlt: "Estate ballroom florals with classic greenery",
  },
  {
    slug: "riverfront-celebration",
    title: "Riverfront Celebration",
    coupleNames: "Dakota & Morgan",
    location: "Austin, TX",
    coverImage: "/brand02.webp",
    coverAlt: "Riverfront ceremony with lush blooms",
  },
  {
    slug: "vineyard-evening",
    title: "Vineyard Evening",
    coupleNames: "Quinn & Peyton",
    location: "Sonoma, CA",
    coverImage: "/brand03.webp",
    coverAlt: "Vineyard reception with soft candlelit florals",
  },
];

export const featuredGalleries = galleries.filter(
  (gallery) => gallery.featured,
);

export function getGalleryBySlug(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}
