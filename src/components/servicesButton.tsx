import Link from "next/link";
import WhimsyImage from "@/components/whimsyImage";
import ArrowRight from "@/components/arrow";

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
      {/* overflow-hidden doubles as a mask so the label box never crosses
          the image's rounded corners */}
      <div className="relative w-full aspect-square sm:aspect-[0.8] rounded-lg overflow-hidden">
        <WhimsyImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width: 640px) 33vw, 90vw"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full max-w-[45%] group-hover:max-w-full min-h-[4.625rem] rounded-tr-3xl bg-background/80 group-hover:bg-(--dark-green) border border-(--clover) group-hover:border-transparent transition-all duration-300 pl-6 pr-8 py-1.5 flex items-center justify-between">
          <span className="italic uppercase text-[1rem] leading-5 text-left tracking-[-0.04em] text-(--dark-green) group-hover:text-background transition-colors duration-300">
            {label}
          </span>
          <span className="overflow-hidden shrink-0 max-w-0 opacity-0 group-hover:max-w-[3rem] group-hover:opacity-100 group-hover:ml-4 text-background transition-all duration-300">
            <ArrowRight className="h-4 w-6" />
          </span>
        </div>
      </div>
    </Link>
  );
}
