"use client";

import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";
import PillButton from "@/components/pillButton";
import { useEffect, useMemo, useState } from "react";

export default function GallerySection({ cards }: { cards: FeaturedGallery[] }) {
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
    () => cards.slice(0, visibleCount),
    [cards, visibleCount],
  );

  return (
    <div
      id="recent-weddings"
      className="scroll-mt-24 py-12 lg:py-16 px-6 sm:px-12 lg:px-16"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-y-12 gap-x-6">
        {visibleGalleries.map((card) => (
          <li key={card.href}>
            <GalleryButton gallery={card} />
          </li>
        ))}
      </ul>
      {visibleCount < cards.length && (
        <PillButton
          label="Load More"
          className="w-full mt-12 lg:mt-16"
          onClick={() =>
            setVisibleCount((c) => Math.min(c + step, cards.length))
          }
        />
      )}
    </div>
  );
}
