"use client";

import { useState } from "react";
import WhimsyImage from "@/components/whimsyImage";
import Lightbox, { LightboxItem } from "@/components/lightbox";

export type CollageTile = {
  /* Who the work was for. */
  label: string;
  /* What the work was. */
  sublabel: string;
  cover: string;
  coverAlt: string;
  /* Full album opened in the modal gallery. */
  images: LightboxItem[];
};

type WorkCollageProps = {
  tiles: CollageTile[];
  className?: string;
};

/* Gallery-wall placement on a 13-column, gapless grid: paired tiles sit at
   columns 2-6 and 8-12, leaving exactly one column of space left, middle,
   and right: equal gaps that scale with the page width. Pairs stagger
   hard on Y, and every third row is a single larger landscape hung
   centered. */
const wallPattern = [
  { position: "lg:col-start-2 lg:col-span-5", offset: "lg:mt-0", aspect: "aspect-[0.8]" },
  { position: "lg:col-start-8 lg:col-span-5", offset: "lg:mt-28", aspect: "aspect-[0.85]" },
  { position: "lg:col-start-3 lg:col-span-9", offset: "lg:mt-16", aspect: "aspect-[1.7]" },
  { position: "lg:col-start-2 lg:col-span-5", offset: "lg:mt-12", aspect: "aspect-square" },
  { position: "lg:col-start-8 lg:col-span-5", offset: "lg:mt-32", aspect: "aspect-[0.8]" },
  { position: "lg:col-start-3 lg:col-span-9", offset: "lg:mt-16", aspect: "aspect-[1.7]" },
];

/* Cycle slots 0 and 3 open a left/right pair; a last tile landing there
   would hang alone, so it gets re-hung as a centered landscape instead. */
const pairOpeningSlots = new Set([0, 3]);

const centeredFinale = {
  position: "lg:col-start-3 lg:col-span-9",
  offset: "lg:mt-16",
  aspect: "aspect-[1.7]",
};

export default function WorkCollage({ tiles, className = "" }: WorkCollageProps) {
  const [open, setOpen] = useState<{ tile: number; index: number } | null>(
    null,
  );
  const openTile = open === null ? null : tiles[open.tile];

  return (
    <>
      <ul
        className={`grid grid-cols-1 lg:grid-cols-[repeat(13,1fr)] gap-y-16 lg:gap-y-8 ${className}`}
      >
        {tiles.map((tile, i) => {
          const isLast = i === tiles.length - 1;
          const slot = i % wallPattern.length;
          const wall =
            isLast && pairOpeningSlots.has(slot)
              ? centeredFinale
              : wallPattern[slot];
          return (
            <li
              key={`${tile.label}-${i}`}
              className={`${wall.position} ${wall.offset}`}
            >
              <figure className="group">
                <button
                  onClick={() => setOpen({ tile: i, index: 0 })}
                  aria-label={`View the ${tile.label} ${tile.sublabel} gallery`}
                  className="relative block w-full overflow-hidden rounded-lg cursor-pointer"
                >
                  {/* Below lg the photo keeps its natural aspect ratio */}
                  <WhimsyImage
                    src={tile.cover}
                    alt={tile.coverAlt}
                    width={1600}
                    height={1200}
                    sizes="calc(100vw - 48px)"
                    className="w-full h-auto lg:hidden"
                  />
                  {/* On the desktop wall the frame's pattern ratio crops it */}
                  <span className={`hidden lg:block relative w-full ${wall.aspect}`}>
                    <WhimsyImage
                      src={tile.cover}
                      alt={tile.coverAlt}
                      fill
                      sizes="45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                </button>
                <figcaption className="flex items-baseline justify-between gap-6 pt-4 pb-3 border-b border-(--clover)">
                  <span className="text-[18px] leading-6 text-(--dark-green)">
                    {tile.label}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] leading-4 text-(--dark-olive) text-right shrink-0">
                    {tile.sublabel}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {openTile && open && (
        <Lightbox
          items={openTile.images}
          index={open.index}
          onClose={() => setOpen(null)}
          onNavigate={(index) => setOpen({ tile: open.tile, index })}
        />
      )}
    </>
  );
}
