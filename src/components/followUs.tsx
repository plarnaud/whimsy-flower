import WhimsyImage from "@/components/whimsyImage";
import { ImageItem } from "@/components/horizontalList";
import { getGalleryBySlug } from "@/data/galleries";

type FollowUsSectionProps = {
  className?: string;
};

/* Gallery folder under /public for each wedding slug. */
const folderBySlug: Record<string, string> = {
  "brides-feature": "Brides Feature",
  "lindsey-fin": "Lindsey & Fin 2025",
  "natalia-david": "Natalia & David 2025 (Thalia Photography)",
  "talea-erich": "Talea & Erich 2025 folder (Mackenzie Grace Creative)",
};

/* Eight recent photos, two per wedding. */
const picks: Array<{ slug: string; file: string }> = [
  { slug: "talea-erich", file: "TaleaErichWeddingSneakPeeks-225 (1).webp" },
  { slug: "lindsey-fin", file: "Lindsey+FinnPreviews-90 (1).webp" },
  { slug: "natalia-david", file: "natalia-david-wedding-395.webp" },
  {
    slug: "brides-feature",
    file: "20-julia-mcguire-exclusive-wedding-pennsylvania-new-york-trailing-centerpiece-zai-laffitte-0625-936a387757864684a3edb0aa397d2a55.webp",
  },
  { slug: "talea-erich", file: "TaleaErichWeddingSneakPeeks-232 (1).webp" },
  { slug: "lindsey-fin", file: "Lindsey+FinnPreviews-62 (1).webp" },
  { slug: "natalia-david", file: "natalia-david-wedding-882.webp" },
  {
    slug: "brides-feature",
    file: "08-julia-mcguire-exclusive-wedding-pennsylvania-new-york-ceremony-aisle-zai-laffitte-0625-c55fbefaccfc4e68a668fa42b9003bdc.webp",
  },
];

export default function FollowUsSection({
  className = "",
}: FollowUsSectionProps) {
  const followUsImages: ImageItem[] = picks.map(({ slug, file }) => {
    const gallery = getGalleryBySlug(slug);
    return {
      src: `/${encodeURIComponent(folderBySlug[slug])}/${encodeURIComponent(file)}`,
      alt:
        gallery?.photoAlts?.[file] ??
        `${gallery?.coupleNames ?? "Wedding"} florals by Whimsy Flower`,
      creds: "",
    };
  });

  return (
    <section
      id="follow-us"
      className={`flex flex-col py-16 px-6 md:px-12 lg:px-16 gap-6 ${className}`}
    >
      <h2 className="font-title text-(--dark-olive) text-[48px] leading-16 tracking-[-0.04em]">
        Follow us
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {followUsImages.map((item, i) => (
          <li key={i}>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <WhimsyImage
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
