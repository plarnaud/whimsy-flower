import Link from "next/link";
import BlurImage from "@/components/blurImage";

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
      className={`relative flex flex-col gap-6 item-center justify-center
      ${className}
      duration-200`}
    >
      <div className="relative w-full aspect-square sm:aspect-[0.8] rounded-lg overflow-hidden">
        <BlurImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width: 640px) 33vw, 90vw"
          className="object-cover"
        />
      </div>
      <span className="italic uppercase text-[18px] text-center tracking-[-0.04em]">
        {label}
      </span>
    </Link>
  );
}
