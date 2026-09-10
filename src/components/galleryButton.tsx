import Link from "next/link";
import WhimsyImage from "@/components/whimsyImage";

export type FeaturedGallery = {
  imgSrc: string;
  imgAlt: string;
  /* Top left: the couple, or the brand on project cards. */
  coupleName: string;
  /* Top right: the year, or the project type on brand cards. */
  year?: string;
  /* Bottom left. */
  location?: string;
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
      className={`group relative flex flex-col w-full cursor-pointer group-hover:z-10 hover:z-10 ${className}`}
    >
      <div className="relative w-full transition-transform duration-300 group-hover:scale-105">
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
            1.5rem radius with 0.375rem padding (the navbar double-rule gap);
            inner radius = 1.5 - 0.375 = 1.125rem so the corners stay
            concentric. */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] group-hover:w-full group-hover:shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.2)] transition-all duration-300 rounded-t-3xl rounded-b-[0.5rem] bg-background p-1.5">
          <div className="rounded-t-[1.125rem] rounded-b-[0.125rem] border-[0.09375rem] border-(--olive) text-(--dark-green) group-hover:text-(--darker-green) transition-colors duration-300 p-3 flex flex-col gap-4 text-left">
            <div className="flex justify-between items-baseline gap-3">
              <span className="italic text-[1.125rem] tracking-[-0.04em] uppercase">
                {gallery.coupleName}
              </span>
              <span className="text-[0.875rem] text-right shrink min-w-0">
                {gallery.year}
              </span>
            </div>
            <div className="flex justify-between items-baseline gap-3 min-h-[1.25rem]">
              <span className="text-[0.875rem] tracking-[-0.04em] text-[#a1a280] group-hover:text-(--darker-green) transition-colors duration-300">
                {gallery.location}
              </span>
              <span className="italic text-[0.875rem] tracking-[-0.04em] uppercase shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Gallery <span className="not-italic">&gt;</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reserve room for the half of the card that hangs below the image */}
      <div className="h-16" />
    </Link>
  );
}
