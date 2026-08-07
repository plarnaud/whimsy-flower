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
    slug: "brides-feature",
    title: "Brides Feature",
    coupleNames: "Julia McGuire",
    location: "Pennsylvania",
    coverImage:
      "/Brides%20Feature/02-julia-mcguire-exclusive-wedding-pennsylvania-new-york-bride-portrait-zai-laffitte-0625-da5c91133dbc4a80abbdd3c3a995dcb1.webp",
    coverAlt: "Bride portrait with cascading bouquet, photographed by Zai Laffitte",
  },
  {
    slug: "lindsey-fin",
    title: "Lindsey & Fin",
    coupleNames: "Lindsey & Fin",
    location: "2025",
    coverImage: "/Lindsey%20%26%20Fin%202025/Lindsey%2BFinnPreviews-39.webp",
    coverAlt: "Lindsey and Fin's wedding florals",
    featured: true,
  },
  {
    slug: "natalia-david",
    title: "Natalia & David",
    coupleNames: "Natalia & David",
    location: "2025",
    coverImage:
      "/Natalia%20%26%20David%202025%20(Thalia%20Photography)/natalia-david-wedding-193.webp",
    coverAlt: "Natalia and David's wedding florals, photographed by Thalia Photography",
    featured: true,
  },
  {
    slug: "talea-erich",
    title: "Talea & Erich",
    coupleNames: "Talea & Erich",
    location: "2025",
    coverImage:
      "/Talea%20%26%20Erich%202025%20folder%20(Mackenzie%20Grace%20Creative)/TaleaErichWeddingSneakPeeks-207%20(1).webp",
    coverAlt: "Talea and Erich's wedding florals, photographed by Mackenzie Grace Creative",
    featured: true,
  },
];

export const featuredGalleries = galleries.filter(
  (gallery) => gallery.featured,
);

export function getGalleryBySlug(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}
