import Link from "next/link";
import WhimsyImage from "@/components/whimsyImage";

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
      className={`group flex flex-col w-full cursor-pointer ${className}`}
    >
      <div className="relative w-full">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <WhimsyImage
            src={gallery.imgSrc}
            alt={gallery.imgAlt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        {/* Overlay card centered on the image's bottom edge. Outer box is
            24px radius with 6px padding (the navbar double-rule gap); inner
            radius = 24 - 6 = 18px so the corners stay concentric. */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[80%] group-hover:w-[95%] transition-all duration-300 rounded-3xl bg-background p-1.5">
          <div className="rounded-[18px] bg-(--dark-green) text-background px-6 py-4 text-left">
            <div className="flex justify-between items-baseline gap-3">
              <span className="italic text-[18px] tracking-[-0.04em] uppercase">
                {gallery.galleryName}
              </span>
              <span className="text-[14px] text-right shrink-0">
                {gallery.location}
              </span>
            </div>
            <span className="block text-[14px] tracking-[-0.04em] text-background/70">
              {gallery.coupleName}
            </span>
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
              <div className="overflow-hidden">
                <span className="block pt-3 italic text-[14px] tracking-[-0.04em] uppercase text-(--clover)">
                  View Gallery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reserve room for the half of the card that hangs below the image */}
      <div className="h-16" />
    </Link>
  );
}
