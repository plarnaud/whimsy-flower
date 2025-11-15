import Link from "next/link";
import { ImageItem } from "@/components/horizontalList";

export default function FollowUsSection() {
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
      className="flex flex-col py-16 px-6 md:px-12 lg:px-16 bg-(--pale-yellow)/25 gap-6"
    >
      <h2 className="font-title text-(--dark-olive) text-[48px] leading-16 tracking-[-0.04em]">
        Follow us
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {followUsImages.map((item, i) => (
          <li key={i}>
            <img
              src={item.src}
              alt={item.alt}
              className="object-cover aspect-square rounded-lg"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
