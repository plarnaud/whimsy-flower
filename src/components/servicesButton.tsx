import Link from "next/link";
import WhimsyImage from "@/components/whimsyImage";
import ArrowRight from "@/components/arrow";
import { blurFor } from "@/lib/blur";

interface ServicesButtonProps {
  label: string;
  imgSrc: string;
  imgAlt: string;
  href: string;
  className?: string;
}
export default function ServicesButton({
  label,
  imgSrc,
  imgAlt,
  href,
  className,
}: ServicesButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col item-center justify-center
      ${className}
      duration-200`}
    >
      {/* overflow-hidden doubles as a mask so the label bar never crosses
          the image's rounded corners */}
      <div className="relative w-full aspect-square sm:aspect-[0.8] rounded-lg overflow-hidden">
        <WhimsyImage
          src={imgSrc}
          alt={imgAlt}
          blurDataURL={blurFor(imgSrc)}
          fill
          sizes="(min-width: 640px) 33vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-background/85 backdrop-blur-sm group-hover:bg-(--dark-green) border-t border-(--clover) group-hover:border-transparent transition-colors duration-300 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-center sm:justify-between gap-3">
          <span className="italic uppercase text-[1rem] leading-5 text-center sm:text-left tracking-[-0.04em] text-(--dark-green) group-hover:text-background transition-colors duration-300">
            {label}
          </span>
          <span className="hidden sm:block shrink-0 text-(--dark-green) group-hover:text-background opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="h-4 w-6" />
          </span>
        </div>
      </div>
    </Link>
  );
}
