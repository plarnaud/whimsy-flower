import Link from "next/link";
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
};

export default function GalleryButton({
  className,
  gallery,
}: GalleryButtonProps) {
  return (
    <Link
      href={gallery.href}
      className={`relative flex flex-col gap-6 items-center text-center text-(--dark-green)
      ${className}
      duration-200`}
    >
      <img
        src={gallery.imgSrc}
        alt={gallery.imgAlt}
        className="rounded-lg aspect-square object-cover"
      />

      <span className="text-[14px] tracking-[-0.04em] text-[#a1a280]">
        {gallery.coupleName}
      </span>
      <div className="flex flex-col gap-3">
        <span className="italic text-[18px] tracking-[-0.04em] uppercase">
          {gallery.galleryName}
        </span>
        <span className="text-[14px] leading-6">{gallery.location}</span>
      </div>
      <PillButton label={"View Gallery"} />
    </Link>
  );
}
