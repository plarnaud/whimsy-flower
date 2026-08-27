import WhimsyImage from "@/components/whimsyImage";

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
            {/* First two items are above the fold — load them eagerly for LCP */}
            <WhimsyImage
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 434px, 326px"
              priority={i < 2}
              loading={i < 2 ? undefined : "lazy"}
              className="object-cover"
              creds={item.creds}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
