"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { defaultBlurDataURL } from "@/lib/blurDataUrl";

export type LightboxItem = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  /* Photographer credit shown in the bottom-right corner. */
  credit?: string;
};

/* Full-screen modal gallery: arrow keys / on-screen arrows / swipe to move
   through the album, Escape or backdrop click to close. */
export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
  credit,
}: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null && index >= 0 && index < items.length;

  const goTo = useCallback(
    (next: number) => {
      if (items.length === 0) return;
      onNavigate((next + items.length) % items.length);
    },
    [items.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo((index ?? 0) + 1);
      if (event.key === "ArrowLeft") goTo((index ?? 0) - 1);
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, index, goTo, onClose]);

  if (!isOpen) return null;
  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}`}
      className="fixed inset-x-0 top-[8.5rem] bottom-0 z-[100] bg-(--darker-green)/95 flex flex-col"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (delta < -50) goTo(index + 1);
        if (delta > 50) goTo(index - 1);
      }}
    >
      <div className="flex justify-end p-4">
        <button
          aria-label="Close gallery"
          onClick={onClose}
          className="flex items-center justify-center min-w-12 min-h-12 text-background/80 hover:text-background text-[28px] leading-none cursor-pointer transition-colors"
        >
          &times;
        </button>
      </div>

      <div className="relative flex-1 min-h-0 mx-4 sm:mx-16">
        <div
          className="relative w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={item.blurDataURL ?? defaultBlurDataURL}
            className="object-contain"
          />
        </div>

        {items.length > 1 && (
          <>
            <button
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index - 1);
              }}
              className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 text-background/80 hover:text-background text-[36px] px-3 py-6 cursor-pointer transition-colors"
            >
              &lsaquo;
            </button>
            <button
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index + 1);
              }}
              className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 text-background/80 hover:text-background text-[36px] px-3 py-6 cursor-pointer transition-colors"
            >
              &rsaquo;
            </button>
          </>
        )}
      </div>

      <div className="relative py-4 text-center text-background/80 text-[14px] tracking-[0.08em]">
        {index + 1} / {items.length}
        {credit && (
          <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-background text-[12px] uppercase tracking-[0.08em]">
            Photo by {credit}
          </span>
        )}
      </div>
    </div>
  );
}
