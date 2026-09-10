"use client";

import { useRef, useState } from "react";
import WhimsyImage from "@/components/whimsyImage";
import Lightbox from "@/components/lightbox";

export type StackPhoto = {
  src: string;
  alt: string;
};

type PhotoStackProps = {
  photos: StackPhoto[];
  className?: string;
};

/* Offsets for each depth in the deck: top card sits straight, the ones
   behind peek out slightly rotated. */
const depthStyles = [
  "z-30 rotate-0 translate-x-0 translate-y-0",
  "z-20 rotate-[2.5deg] translate-x-3 translate-y-2",
  "z-10 rotate-[-2deg] -translate-x-3 translate-y-3",
];

/* A stack of photos styled like a pile of prints. Swipe or use the arrows to
   send the top photo to the back; tap the top photo to open the full set in
   the modal gallery. Only the three visible cards are rendered, so a long
   album stays light. */
export default function PhotoStack({ photos, className = "" }: PhotoStackProps) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const count = photos.length;

  const advance = (step: number) =>
    setCurrent((c) => (c + step + count) % count);

  if (count === 0) return null;

  const visible = [0, 1, 2]
    .filter((depth) => depth < count)
    .map((depth) => (current + depth) % count);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div
        className="relative w-full aspect-[0.8]"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (delta < -40) advance(1);
          if (delta > 40) advance(-1);
        }}
      >
        {visible.map((index, depth) => {
          const photo = photos[index];
          return (
            <button
              key={photo.src}
              onClick={() => (depth === 0 ? setOpen(index) : advance(depth))}
              aria-label={
                depth === 0 ? `${photo.alt}. Open full size` : photo.alt
              }
              tabIndex={depth === 0 ? 0 : -1}
              className={`absolute inset-0 rounded-lg overflow-hidden bg-background p-1.5 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer ${depthStyles[depth]}`}
            >
              <span className="relative block w-full h-full rounded-[0.375rem] overflow-hidden">
                <WhimsyImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 400px, 80vw"
                  className="object-cover"
                />
              </span>
            </button>
          );
        })}
      </div>

      {count > 1 && (
        <div className="z-40 flex items-center gap-2 text-(--dark-green)">
          <button
            aria-label="Previous photo"
            onClick={() => advance(-1)}
            className="flex items-center justify-center min-w-12 min-h-12 text-[22px] leading-none cursor-pointer hover:text-(--darker-green) transition-colors"
          >
            &lsaquo;
          </button>
          <span className="text-[12px] tracking-[0.08em]">
            {current + 1} / {count}
          </span>
          <button
            aria-label="Next photo"
            onClick={() => advance(1)}
            className="flex items-center justify-center min-w-12 min-h-12 text-[22px] leading-none cursor-pointer hover:text-(--darker-green) transition-colors"
          >
            &rsaquo;
          </button>
        </div>
      )}

      <Lightbox
        items={photos}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={(index) => {
          setOpen(index);
          setCurrent(index);
        }}
      />
    </div>
  );
}
