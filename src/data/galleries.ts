import type { PaletteColor } from "@/components/paletteSection";

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
  testimonialImage?: string;
  palette?: PaletteColor[];
  /* Paragraph shown above the palette colors on the gallery page. */
  paletteText?: string;
  /* File names pinned to the front of the gallery grid, in display order. */
  photoOrder?: string[];
  /* File names kept out of the gallery grid (e.g. used elsewhere on the page). */
  hiddenPhotos?: string[];
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
    palette: [
      { name: "Peach", mainColor: "#C74F10", borderColor: "#4A1D06" },
      { name: "Blue", mainColor: "#95B3F6", borderColor: "#1F3B7A" },
      { name: "Gold", mainColor: "#F9BB4E", borderColor: "#84580B" },
      { name: "Lavender", mainColor: "#BEB3DD", borderColor: "#3E3172" },
    ],
    paletteText:
      "For Talea and Eric, the floral design was inspired by the meeting of three things: September’s seasonal blooms, the coastal setting, and the couple’s unmistakably joyful spirit. We wanted the flowers to feel refined and elevated, while still carrying a sense of movement, spontaneity, and fun.\n\nDeep blue-to-white delphinium echoed the frothy rhythm of the waves beyond the celebration, creating a sense of water and atmosphere within the arrangements. Playful flashes of orange from dahlias brought warmth and whimsy, while gestural textures of clematis, snowberry, and sandersonia introduced a more unexpected coastal language, like tiny orange jellyfish suspended among the flowers.\n\nThe result was a coastal palette interpreted through a more artful lens: sophisticated without feeling precious, playful without losing its elegance.",
    testimonialImage:
      "/Talea%20%26%20Erich%202025%20folder%20(Mackenzie%20Grace%20Creative)/TaleaErichWeddingSneakPeeks-140.webp",
    // Header photo leads the grid; -165 and -204 sit in the small windows;
    // the photos the small windows used to hold render large in both layouts.
    photoOrder: [
      "TaleaErichWeddingSneakPeeks-207 (1).webp",
      "TaleaErichWeddingSneakPeeks-165.webp",
      "TaleaErichWeddingSneakPeeks-204.webp",
      "TaleaErichWeddingSneakPeeks-147 (1).webp",
      "TaleaErichWeddingSneakPeeks-162.webp",
      "TaleaErichWeddingSneakPeeks-184 (2).webp",
      "TaleaErichWeddingSneakPeeks-194.webp",
      "TaleaErichWeddingSneakPeeks-210.webp",
      "TaleaErichWeddingSneakPeeks-199.webp",
      "TaleaErichWeddingSneakPeeks-216.webp",
      "TaleaErichWeddingSneakPeeks-223 (1).webp",
      "TaleaErichWeddingSneakPeeks-225 (1).webp",
      "TaleaErichWeddingSneakPeeks-230.webp",
      "TaleaErichWeddingSneakPeeks-232 (1).webp",
    ],
    hiddenPhotos: ["TaleaErichWeddingSneakPeeks-140.webp"],
    testimonialText:
      "Molly and her team at Whimsy were an absolute DREAM to work with. I first met Molly at a pop-up in Hoboken and knew that I needed her for my wedding. From the very first call, Molly was so detail-oriented, creative, and KIND. She carefully crafted up a beautiful proposal and brought my vision to life. I especially loved her ideas, that I would've never thought of myself, like the mirror plinths we used for the ceremony. I have truly never seen more beautiful arrangements than the ones made by Whimsy.\n\nShe communicated so well and arrived promptly on the day. She put a great deal of effort in to making sure the flowers stayed fresh and looked beautiful. She delivered personals, set up the ceremony, broke down the ceremony, set up the reception, and broke down the reception, all with a smile on her face.\n\nYou will not find a more thoughtful, creative, kind, dependable, or amazing florist. There are not enough positive words to say about Whimsy. Book with them!!",
    featured: true,
  },
];

export const featuredGalleries = galleries.filter(
  (gallery) => gallery.featured,
);

export function getGalleryBySlug(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}
