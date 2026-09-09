import type { ReactNode } from "react";
import WhimsyImage from "./whimsyImage";

type SubPageHeaderProps = {
  title: string;
  imgSrc: string;
  imgAlt: string;
  /* Optional line under the title (location, photographer credit). */
  subtitle?: ReactNode;
};

export default function SubPageHeader({
  title,
  imgSrc,
  imgAlt,
  subtitle,
}: SubPageHeaderProps) {
  return (
    <section
      id="hero"
      className="w-full h-52 lg:h-82 relative flex flex-col items-center justify-center border-b-[1.5px] border-(--clover) mb-2"
    >
      <div className="absolute top-0 left-0 -z-90 w-full h-full opacity-33 overflow-hidden">
        <WhimsyImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="absolute left-0 right-0 -translate-y-2 -z-100  object-cover"
        />
      </div>
      <h1 className="font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--dark-olive) text-center">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 px-6 text-center text-[12px] sm:text-[14px] uppercase tracking-[0.08em] text-(--dark-green)">
          {subtitle}
        </p>
      )}
    </section>
  );
}
