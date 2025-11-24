import Link from "next/link";
import BlurImage from "@/components/blurImage";
import PillButton from "./pillButton";

export type FeaturedGallery = {
  imgSrc: string;
  imgAlt: string;
  coupleName: string;
  galleryName: string;
  location: string;
  href: string;
};

type GalleryButtonProps = {
  className?: string;
  gallery: FeaturedGallery;
  showCTA?: boolean;
};

export default function GalleryButton({
  className,
  gallery,
  showCTA = true,
}: GalleryButtonProps) {
  return (
    <Link
      href={gallery.href}
      className={`relative flex flex-col gap-6 items-center text-center text-(--dark-green) w-full cursor-pointer
      ${className}
      duration-200`}
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <BlurImage
          src={gallery.imgSrc}
          alt={gallery.imgAlt}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <span className="text-[14px] tracking-[-0.04em] text-[#a1a280]">
        {gallery.coupleName}
      </span>
      <div className="flex flex-col gap-3">
        <span className="italic text-[18px] tracking-[-0.04em] uppercase">
          {gallery.galleryName}
        </span>
        <span className="text-[14px] leading-6">{gallery.location}</span>
      </div>
      {showCTA && <PillButton label={"View Gallery"} />}
    </Link>
  );
}
