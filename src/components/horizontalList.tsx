import Image from "next/image";

export type ImageItem = {
  src: string;
  alt: string;
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
        <li key={i} className="flex-none w-[434px] snap-center text-center">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
            ></Image>
          </div>
        </li>
      ))}
    </ul>
  );
}
