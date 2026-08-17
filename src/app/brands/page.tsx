"use client";

import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import SubPageHeader from "@/components/subPageHeader";
import GalleryGrid from "@/components/galleryGrid";
import PillButton from "@/components/pillButton";
import { InquireFormSection } from "@/components/inquireForm";
import { brandGalleryPhotos, brandNames } from "@/data/brandProjects";
import { useMemo, useState } from "react";

export default function BrandsPage() {
  return (
    <PageScaffold>
      <SubPageHeader
        title="Editorial & Brands"
        imgSrc="/services/workshops.webp"
        imgAlt="Editorial floral styling by Whimsy Flower"
      />

      <IntroSection />

      <BrandScroller />

      <MixedGallerySection />

      <InquireFormSection />

      <div className="bg-(--pale-yellow)/25 py-8">
        <MeetWhimsy />
      </div>
    </PageScaffold>
  );
}

function IntroSection() {
  return (
    <section className="pt-12 lg:pt-16 px-6 flex flex-col items-center text-center">
      <p className="max-w-[644px] text-[14px] leading-6">
        Editorial and brand work is where our studio experiments most freely.
        We partner with creative teams on campaigns, launches, press moments,
        and shoots — building sculptural, atmospheric floral concepts composed
        to speak each brand&rsquo;s own language.
      </p>
    </section>
  );
}

/* Infinite marquee of brand names; the track holds two identical copies so
   the -50% translate loops seamlessly. */
function BrandScroller() {
  return (
    <section
      aria-label="Brands we have worked with"
      className="mt-12 lg:mt-16 py-8 border-y-[1.5px] border-(--clover) overflow-hidden"
    >
      <div className="brand-marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {brandNames.map((name) => (
              <li key={name} className="flex items-center whitespace-nowrap">
                <span className="italic uppercase text-[18px] tracking-[-0.04em] text-(--dark-green)">
                  {name}
                </span>
                <span aria-hidden className="mx-10 text-(--clover)">
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

const galleryItems = brandGalleryPhotos.map((photo, i) => ({
  id: `brand-photo-${i + 1}`,
  imgSrc: photo.src,
  imgAlt: photo.alt,
}));

// One desktop cycle of the grid: big/small line (4) + two rows of 3 squares.
const SHOW_MORE_STEP = 10;

function MixedGallerySection() {
  const [visibleCount, setVisibleCount] = useState(SHOW_MORE_STEP);

  const visibleItems = useMemo(
    () => galleryItems.slice(0, visibleCount),
    [visibleCount],
  );

  return (
    <div>
      <GalleryGrid items={visibleItems} squareRows={2} />
      {visibleCount < galleryItems.length && (
        <div className="px-6 sm:px-12 lg:px-16 pb-12 lg:pb-16">
          <PillButton
            label="Show More"
            className="w-full"
            onClick={() =>
              setVisibleCount((c) =>
                Math.min(c + SHOW_MORE_STEP, galleryItems.length),
              )
            }
          />
        </div>
      )}
    </div>
  );
}
