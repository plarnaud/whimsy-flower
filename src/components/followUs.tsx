import BlurImage from "@/components/blurImage";
import { ImageItem } from "@/components/horizontalList";

type FollowUsSectionProps = {
  className?: string;
};

export default function FollowUsSection({ className = "" }: FollowUsSectionProps) {
  const followUsImages: ImageItem[] = [
    { src: "/brand01.jpg", alt: "Brand 01" },
    { src: "/brand02.jpg", alt: "Brand 02" },
    { src: "/brand03.jpg", alt: "Brand 03" },
    { src: "/brand03.jpg", alt: "Brand 03" },
    { src: "/brand03.jpg", alt: "Brand 03" },
    { src: "/brand03.jpg", alt: "Brand 03" },
    { src: "/brand03.jpg", alt: "Brand 03" },
    { src: "/brand03.jpg", alt: "Brand 03" },
  ];

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
              <BlurImage
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
