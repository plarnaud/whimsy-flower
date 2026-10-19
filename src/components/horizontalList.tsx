import WhimsyImage from "@/components/whimsyImage";
import { blurFor } from "@/lib/blur";

export type ImageItem = {
  src: string;
  alt: string;
  creds: string;
};

type HorizontalListProps = {
  className?: string;
  items: ImageItem[]; // <-- explicit
};

export default function HorizontalList({
  className,
  items,
}: HorizontalListProps) {
  return (
    <ul
      className={`flex overflow-x-auto scroll-smooth snap-x snap-proximity horizontal-scroll
      ${className}`}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="flex-none lg:w-[434px] w-[326px] snap-center text-center"
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {/* The first slide is the LCP element: preload it with high fetch
                priority. Every other slide is lazy. Even the second one, which
                only peeks in on mobile, must not be eager: React 19 turns any
                non-lazy <img> in the server HTML into a <link rel="preload">,
                which would compete with the LCP image for bandwidth. Lazy
                slides already in view still load right after first layout. */}
            <WhimsyImage
              src={item.src}
              alt={item.alt}
              blurDataURL={blurFor(item.src)}
              fill
              sizes="(min-width: 1024px) 434px, 326px"
              preload={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? undefined : "lazy"}
              className="object-cover"
              creds={item.creds}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
