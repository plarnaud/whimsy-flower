import Image from "next/image";
import Link from "next/link";

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
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-full aspect-square sm:aspect-[0.8] object-cover rounded-lg"
      />
      <span className="italic uppercase text-[18px] text-center tracking-[-0.04em]">
        {label}
      </span>
    </Link>
  );
}
