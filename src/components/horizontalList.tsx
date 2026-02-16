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
            <WhimsyImage
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              className="object-cover"
              creds={item.creds}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
