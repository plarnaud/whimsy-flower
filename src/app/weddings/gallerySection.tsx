"use client";

import GalleryButton from "@/components/galleryButton";
import PillButton from "@/components/pillButton";
import { galleries } from "@/data/galleries";
import { useEffect, useMemo, useState } from "react";

export default function GallerySection() {
  const [step, setStep] = useState(6);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      const nextStep = mq.matches ? 9 : 6;
      setStep(nextStep);
      setVisibleCount(nextStep);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const visibleGalleries = useMemo(
    () => galleries.slice(0, visibleCount),
    [visibleCount],
  );

  return (
    <div
      id="recent-weddings"
      className="scroll-mt-24 py-12 lg:py-16 px-6 sm:px-12 lg:px-16"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-y-12 gap-x-6">
        {visibleGalleries.map((gallery) => (
          <li key={gallery.slug}>
            <GalleryButton
              gallery={{
                imgSrc: gallery.coverImage,
                imgAlt: gallery.coverAlt,
                coupleName: gallery.coupleNames,
                year: gallery.year,
                location: gallery.location,
                href: `/galleries/${gallery.slug}`,
              }}
            />
          </li>
        ))}
      </ul>
      {visibleCount < galleries.length && (
        <PillButton
          label="Load More"
          className="w-full mt-12 lg:mt-16"
          onClick={() =>
            setVisibleCount((c) => Math.min(c + step, galleries.length))
          }
        />
      )}
    </div>
  );
}
