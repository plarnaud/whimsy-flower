import type { ReactNode } from "react";
import WhimsyImage from "@/components/whimsyImage";
import ArrowRight from "@/components/arrow";
import { blurFor } from "@/lib/blur";

const BACKGROUND = "/home-lander-section-bg.webp";
const BACKGROUND_ALT =
  "Long wooden table with bud vases of coral poppies, white spirea and sweet pea among taper candles, climbing roses behind";

type PageHeroProps = {
  /* All-caps line, the page's H1. */
  kicker: string;
  /* Script title beneath it. */
  title: string;
  /* Body copy: one or more <p> elements. */
  children: ReactNode;
  /* In-page anchor the arrow scrolls to. */
  scrollTo: string;
  /* Accessible name for the arrow when it has no visible text. */
  scrollLabel?: string;
  /* Optional visible text above the arrow. */
  scrollText?: string;
  /* Clover rule along the bottom edge. */
  rule?: boolean;
};

/* Shared hero for the service pages: centered text over the low-opacity
   tablescape image, with an arrow down to the page's first section. */
export default function PageHero({
  kicker,
  title,
  children,
  scrollTo,
  scrollLabel,
  scrollText,
  rule = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative w-full overflow-hidden ${
        rule ? "border-b-[1.5px] border-(--clover)" : ""
      }`}
    >
      <div className="absolute top-0 left-0 -z-100 w-full h-full opacity-[.165]">
        <WhimsyImage
          src={BACKGROUND}
          alt={BACKGROUND_ALT}
          blurDataURL={blurFor(BACKGROUND)}
          fill
          sizes="100vw"
          quality={50}
          priority
          fetchPriority="high"
          className="absolute left-0 right-0 -z-100 object-cover object-center"
        />
      </div>

      {/* The arrow anchors to the bottom padding; the text centers above it */}
      <div className="w-full pt-16 sm:pt-20 pb-10 sm:pb-12 px-6 lg:min-h-[480px] flex flex-col items-center text-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-[18px] tracking-[-0.04em] uppercase">{kicker}</h1>
          <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--olive)">
            {title}
          </h2>
          <div className="max-w-[644px] py-6 text-[14px] leading-6 flex flex-col gap-4">
            {children}
          </div>
        </div>
        <a
          href={scrollTo}
          aria-label={scrollText ? undefined : scrollLabel}
          className={`mt-8 flex flex-col items-center justify-center min-h-12 min-w-12 text-(--dark-green) hover:text-(--darker-green) transition-colors ${
            scrollText
              ? "gap-4 uppercase text-[16px] tracking-[-0.04em] hover:underline underline-offset-4"
              : ""
          }`}
        >
          {scrollText}
          <ArrowRight className="h-4 w-6 rotate-90" />
        </a>
      </div>
    </section>
  );
}
