import type { PaletteColor } from "@/components/paletteSection";
import { portfolioAlts } from "@/data/portfolioAlts";

export type GalleryMeta = {
  slug: string;
  title: string;
  coupleNames: string;
  /* Shown top right on gallery cards. */
  year?: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  introSentence?: string;
  extraSentences?: string[];
  testimonialTitle?: string;
  testimonialText?: string;
  testimonialCoupleName?: string;
  testimonialImage?: string;
  /* Photographer credited under the gallery grid and in the modal. */
  photographer?: string;
  /* Photographer's website, linked from the credit. */
  photographerUrl?: string;
  /* Written alt text per photo file name (see public/<folder>). */
  photoAlts?: Record<string, string>;
  palette?: PaletteColor[];
  /* Paragraph shown above the palette colors on the gallery page. */
  paletteText?: string;
  /* Key flowers of the wedding (flowers section is currently hidden). */
  flowers?: string[];
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
    photoAlts: portfolioAlts["brides-feature"],
    title: "Julia & Jackie",
    year: "2025",
    coupleNames: "Julia & Jackie",
    location: "Private Residence, Doylestown, PA",
    photographer: "Zai Laffitte",
    photographerUrl: "https://www.zaitography.com/",
    coverImage: "/portfolio/brides-feature/02-julia-mcguire-exclusive-wedding-pennsylvania-new-york-bride-portrait-zai-laffitte-0625-da5c91133dbc4a80abbdd3c3a995dcb1.webp",
    coverAlt:
      "Julia leans on a split-rail fence in a strapless gown and veil, holding a bouquet of white calla lilies and green amaranthus",
    palette: [
      { name: "Bright White", mainColor: "#F0F0EF", borderColor: "#6E6E6C" },
      { name: "Poppy Green", mainColor: "#B0C08D", borderColor: "#4D5C33" },
      { name: "White Green", mainColor: "#E3E6AE", borderColor: "#6B6E3D" },
      {
        name: "Super White Green",
        mainColor: "#DADBC5",
        borderColor: "#63654F",
      },
    ],
    paletteText:
      "For Jackie and Julia’s intimate backyard celebration, flowers were approached as an essential part of the visual language of the day. Our intention was not simply to decorate the space, but to transform a familiar landscape into an immersive setting that felt refined, unexpected, and distinctly their own.\n\nThe ceremony began with a whimsical floral installation in the garden. Individual stems of towering delphinium, delicate sweet pea, and white ranunculus were planted directly into the ground, creating the illusion of a wild flowering garden emerging organically around the couple. The installation curved into a soft crescent, enveloping Jackie and Julia as they exchanged their vows and allowing the architecture of the flowers to become the altar.\n\nThat same level of consideration carried into the reception. Custom Whimsy Flower ceramics were created specifically for the celebration, becoming an extension of the floral compositions rather than simply vessels to hold them. Sculptural arrangements of calla lilies, ranunculus, sweet pea, and larkspur explored movement, negative space, and asymmetry through an ikebana inspired approach.\n\nRestrained to a palette of white and green, the design relied on texture, form, and thoughtful composition to create impact. Every floral element was considered as part of the larger environment, resulting in a celebration where flowers did more than adorn the space. They shaped it.",
    flowers: ["Delphinium", "Calla Lily", "Pon Pon Ranunculus", "Poppy Pods"],
  },
  {
    slug: "lindsey-fin",
    photoAlts: portfolioAlts["lindsey-fin"],
    coverImage: "/portfolio/lindsey-fin/L+FWeddingGallery-226.webp",
    coverAlt:
      "Lindsey stands centered before the front steps, white hydrangea massed like clouds along both sides",
    testimonialImage: "/portfolio/lindsey-fin/L+FWeddingGallery-210.webp",
    hiddenPhotos: ["L+FWeddingGallery-210.webp"],
    title: "Lindsey & Finn",
    year: "2025",
    coupleNames: "Lindsey & Finn",
    location: "Private Residence, Mantoloking, NJ",
    palette: [
      { name: "Blush", mainColor: "#E0C0B6", borderColor: "#6E4237" },
      { name: "Apple Green", mainColor: "#C8B947", borderColor: "#5A530F" },
      { name: "Dark Green", mainColor: "#706A29", borderColor: "#33300F" },
      { name: "White", mainColor: "#E1D9C8", borderColor: "#675E48" },
    ],
    paletteText:
      "Set at Lindsey’s family home, the design transformed a deeply familiar setting into something fresh, chic, and timeless. Inspired by her love of fashion, food, and hydrangea, we embraced the flower en masse, creating a ceremony entirely of white hydrangea that felt like clouds settling across the front steps.\n\nLindsey’s petite bouquet of white stars, tweedia, was finished with a silver cuff, echoing the family’s silver collection woven throughout the backyard. As guests moved from ceremony to reception, the palette shifted into blush and chartreuse, creating a sense of discovery. Cascading arrangements, statement florals, and individually composed ikebana centerpieces made flowers the main character. Every arrangement revealed a new combination to discover, yet together they formed one cohesive collection of exceptional blooms.",
    flowers: ["Limelight Hydrangea", "Sweet Pea", "Nerine", "Tweedia"],
    testimonialText:
      "Molly and the Whimsy team were an absolute dream to work with from start to finish! Molly completely understood my vision and executed it to perfection. Between the statement cascading ceremony install, thoughtful ikebana pieces, and focal point bar arrangement, the florals truly elevated all aspects of the day! I can’t recommend Whimsy enough to bring your dream florals to life!",
    featured: true,
  },
  {
    slug: "natalia-david",
    photoAlts: portfolioAlts["natalia-david"],
    coverImage: "/portfolio/natalia-david/natalia-david-wedding-193.webp",
    coverAlt:
      "Bride holds a green bouquet of anthurium, bells of Ireland, and trailing amaranthus beside the groom's anthurium boutonniere",
    testimonialImage: "/portfolio/natalia-david/natalia-david-wedding-197.webp",
    hiddenPhotos: ["natalia-david-wedding-197.webp"],
    title: "Natalia & David",
    year: "2025",
    coupleNames: "Natalia & David",
    location: "Perona Farms, Andover, NJ",
    photographer: "Thalia Photography",
    photographerUrl: "https://thaliacameraist.com/",
    palette: [
      { name: "Dark Green", mainColor: "#434D26", borderColor: "#20260F" },
      { name: "Light Green", mainColor: "#7B834B", borderColor: "#3A3F20" },
      { name: "Yellow Green", mainColor: "#BEAB70", borderColor: "#5A4E28" },
      { name: "Green White", mainColor: "#DFDCCD", borderColor: "#63604E" },
    ],
    paletteText:
      "A monochromatic green palette became an invitation to push beyond traditional greenery. We explored uncommon blooms and botanicals for their sculptural lines, unexpected textures, and sense of movement: Bells of Ireland for its fluid verticality, green amaranthus for timeless elegance, and Phylica pubescens for its extraordinary seeded texture.\n\nNatalia’s bridal bouquet became a floral sculpture in its own right, punctuated by two snake ball alliums dancing and intertwining through the blooms. Paired with deconstructed ceremony and sweetheart designs, the florals transformed the rustic setting into a lush, artful garden, balancing rustic charm with modern sensibility.",
    flowers: [
      "Anthurium",
      "Bells of Ireland",
      "Amaranthus",
      "Phylica pubescens",
    ],
    testimonialText:
      "Working with Molly was one of the most special parts of our wedding. From the very beginning, I knew I wanted to work with someone who was thoughtful and ethical about flower sourcing and who embraced wildflowers and blooms with texture, movement, and character. Molly understood that vision so completely and made it even more beautiful than I could have imagined.\n\nShe created the most extraordinary monochromatic green bouquet for me, along with a stunning bouquet for my maid of honor. When Molly handed me my bouquet before the ceremony, I genuinely almost started crying and had the chills. I had never seen anything so perfect. It felt like a piece of art that should be displayed at the MET. I swear. The bouquet brought my entire bridal look together, adding so much personality and dimension to it.\n\nEvery floral detail throughout the ceremony, cocktail hour, and reception was divine. The arrangements felt organic, sculptural, and thoughtfully composed, with ikebana-inspired pieces that were especially breathtaking. Everything felt so timeless rather than overly styled or trendy, and the flowers brought so much life to the entire day.\n\nMolly and her team have remarkable talent for creating florals that feel both beautifully instinctive yet intentional. They took what I had envisioned and brought it to life in a way that felt completely unique to us. I truly could not recommend Whimsy Flower enough!!",
    featured: true,
  },
  {
    slug: "talea-erich",
    photoAlts: portfolioAlts["talea-erich"],
    coverImage: "/portfolio/talea-erich/ErichTaleaWedding-819.webp",
    coverAlt:
      "Talea and Erich hold hands at the altar between arrangements on mirror plinths, delphinium and dahlias by the sea",
    testimonialImage: "/portfolio/talea-erich/TaleaErichWeddingSneakPeeks-142.webp",
    hiddenPhotos: ["TaleaErichWeddingSneakPeeks-142.webp"],
    title: "Talea & Erich",
    year: "2025",
    coupleNames: "Talea & Erich",
    location: "Parkers Garage, Beach Haven, NJ",
    photographer: "Mackenzie Grace Creative",
    photographerUrl: "https://www.mackenziegracecreative.com/",
    palette: [
      { name: "Orange", mainColor: "#C74F10", borderColor: "#4A1D06" },
      { name: "Blue", mainColor: "#95B3F6", borderColor: "#1F3B7A" },
      { name: "Gold", mainColor: "#F9BB4E", borderColor: "#84580B" },
      { name: "Lavender", mainColor: "#BEB3DD", borderColor: "#3E3172" },
    ],
    flowers: ["Dahlia", "Delphinium", "Sandersonia", "Clematis"],
    paletteText:
      "For Talea and Eric, the floral design was inspired by the meeting of three things: September’s seasonal blooms, the coastal setting, and the couple’s unmistakably joyful spirit. We wanted the flowers to feel refined and elevated, while still carrying a sense of movement, spontaneity, and fun.\n\nDeep blue-to-white delphinium echoed the frothy rhythm of the waves beyond the celebration, creating a sense of water and atmosphere within the arrangements. Playful flashes of orange from dahlias brought warmth and whimsy, while gestural textures of clematis, snowberry, and sandersonia introduced a more unexpected coastal language, like tiny orange jellyfish suspended among the flowers.\n\nThe result was a coastal palette interpreted through a more artful lens: sophisticated without feeling precious, playful without losing its elegance.",
    testimonialText:
      "Molly and her team at Whimsy were an absolute DREAM to work with. I first met Molly at a pop-up in Hoboken and knew that I needed her for my wedding. From the very first call, Molly was so detail-oriented, creative, and KIND. She carefully crafted up a beautiful proposal and brought my vision to life. I especially loved her ideas, that I would've never thought of myself, like the mirror plinths we used for the ceremony. I have truly never seen more beautiful arrangements than the ones made by Whimsy.\n\nShe communicated so well and arrived promptly on the day. She put a great deal of effort in to making sure the flowers stayed fresh and looked beautiful. She delivered personals, set up the ceremony, broke down the ceremony, set up the reception, and broke down the reception, all with a smile on her face.\n\nYou will not find a more thoughtful, creative, kind, dependable, or amazing florist. There are not enough positive words to say about Whimsy. Book with them!!",
    featured: true,
  },
  {
    slug: "shayna-evan",
    photoAlts: portfolioAlts["shayna-evan"],
    coverImage: "/portfolio/shayna-evan/shayna-evan-wedding-628.webp",
    coverAlt:
      "Shayna and Evan at the sweetheart table before a curtain of lights, bud vases and tapers on the runner, blooms massed below",
    testimonialImage: "/portfolio/shayna-evan/shayna-evan-wedding-361.webp",
    hiddenPhotos: ["shayna-evan-wedding-361.webp"],
    photographer: "Rachel Leiner Photography",
    photographerUrl: "https://rachelleiner.com/",
    title: "Shayna & Evan",
    year: "2025",
    coupleNames: "Shayna & Evan",
    location: "Waterloo Village, Stanhope, NJ",
    paletteText:
      "Set against the pastoral landscape and historic architecture of Waterloo Village, this wedding was designed as an extension of the natural world surrounding it. Guided by the couple’s love of nature and affinity for the color green, our approach was grounded, textural, and intentionally abundant, allowing the flowers to feel as though they belonged to the landscape rather than having simply been placed within it.\n\nFor the ceremony, lush and layered groupings of delphinium, allium, ranunculus, strawflower, and larkspur framed the aisle and gathered into a crescent shaped floral installation around the couple. A palette of sky blue, soft blush, buttery yellow, white, and a rich range of textural greens created a garden inspired composition that felt both romantic and untamed.\n\nInside the reception, the floral language shifted into something more sculptural and considered. Drawing from the principles of ikebana, arrangements explored asymmetry, movement, and negative space, while disconnected floral runners moved organically across the length of the tables. The result was a reception landscape that felt layered and immersive, with each composition contributing to a larger sense of place.\n\nThroughout the celebration, flowers were treated as an integral part of the environment, creating a seamless dialogue between the historic setting, the natural landscape, and the celebration unfolding within it.",
    flowers: ["Nigella", "Larkspur", "Spray Delphinium", "White Allium"],
    testimonialText:
      "The flowers looked incredible!!! You did outstanding, I couldn’t have asked for anything else and everyone who sees the photos raves about the florals every time!",
  },
  {
    slug: "trisha-jim",
    photoAlts: portfolioAlts["trisha-jim"],
    coverImage: "/portfolio/trisha-jim/DSC03415.webp",
    coverAlt:
      "Jim kisses Trisha's temple as she holds her bouquet of white peonies, sweet pea and lace flower tied with silk ribbon",
    testimonialImage: "/portfolio/trisha-jim/DSC03499.webp",
    hiddenPhotos: ["DSC03499.webp"],
    photographer: "Isabel Henry Photo",
    photographerUrl: "https://isabelhenryphoto.com/",
    title: "Trisha & Jim",
    year: "2024",
    coupleNames: "Trisha & Jim",
    location: "Valley Rock Inn, Sloatsburg, NY",
    paletteText:
      "For Trisha and Jim’s intimate celebration, we approached the reception table as the heart of the gathering. With their closest family and friends seated together at one long table, flowers became an opportunity to transform a single shared space into an abundant and immersive landscape for the evening.\n\nA sprawling, disconnected floral composition moved organically along the length of the table, bringing together spring’s most expressive blooms in a series of clustered bud vases and ikebana inspired vessels. Rather than creating one continuous runner, each arrangement was given space to breathe, allowing moments of negative space, shifting heights, and unexpected details to shape the composition. Baby peaches were woven throughout the tablescape, adding a playful sense of seasonality and texture amongst the flowers, while sculptural twisted candles brought warmth and atmosphere as daylight faded into evening.\n\nFor Trisha’s bouquet, we centered the design around her favorite flower, the peony, paired with delicate sweet pea in the softest shades of lavender and blush. Petite in scale yet rich in texture and movement, the bouquet echoed the same sense of seasonality and thoughtful composition carried throughout the celebration.\n\nThe result was an intimate gathering where every guest was immersed in the floral experience, proving that a smaller celebration can still make room for an ambitious and deeply considered design.",
    flowers: [
      "Ranunculus",
      "Foxglove",
      "Peonies",
      "Sweet Pea",
      "Baby Peaches",
      "Spirea",
    ],
    testimonialText:
      "I found Whimsy Flower and Molly on Instagram and knew she would be the right fit to carry out the wedding florals that I imagined with seasonal, airy designs. She deserves the highest accolades and recommendation!\n\nMolly has been an absolute pleasure to work with from the very beginning. She is quick to respond to emails, listened to my ideas and provided detailed proposals with transparent pricing, and followed through with the most beautiful floral and candle arrangement with her masterful touch of whimsy and magic. Molly is a true professional and artist.",
  },
];

export const featuredGalleries = galleries.filter(
  (gallery) => gallery.featured,
);

export function getGalleryBySlug(slug: string) {
  return galleries.find((gallery) => gallery.slug === slug);
}
