"use client";

import { useState } from "react";
import WhimsyImage from "@/components/whimsyImage";
import Lightbox from "@/components/lightbox";

type GalleryGridItem = {
  id: string;
  imgSrc: string;
  imgAlt: string;
};

type GalleryGridProps = {
  items: GalleryGridItem[];
  /* Rows of 3 squares after each big/small line on desktop (default 1). */
  squareRows?: number;
  /* Photographer credit shown in the modal's bottom-right corner. */
  photoCredit?: string;
};

function mobileCount(total: number): number {
  if (total < 1) return 0;
  // Pattern: big, 2-small, square (4 per cycle), always end on big
  return Math.floor((total - 1) / 4) * 4 + 1;
}

function desktopCount(total: number, cycleLength: number): number {
  // Pattern: cycleLength per cycle (4 in line1 + 3 per square row); galleries
  // smaller than one cycle render a partial cycle instead of nothing
  if (total < cycleLength) return total;
  return Math.floor(total / cycleLength) * cycleLength;
}

type ImageBoxProps = {
  item: GalleryGridItem;
  aspectRatio: string;
  sizes: string;
  className?: string;
  onOpen: () => void;
};

function ImageBox({
  item,
  aspectRatio,
  sizes,
  className = "",
  onOpen,
}: ImageBoxProps) {
  return (
    <button
      onClick={onOpen}
      aria-label={`View ${item.imgAlt} full screen`}
      className={`relative block w-full overflow-hidden rounded-lg cursor-pointer ${className}`}
      style={{ aspectRatio }}
    >
      <WhimsyImage
        src={item.imgSrc}
        alt={item.imgAlt}
        fill
        sizes={sizes}
        className="object-cover object-center"
      />
    </button>
  );
}

type LayoutProps = {
  items: GalleryGridItem[];
  onOpen: (index: number) => void;
};

function MobileLayout({ items, onOpen }: LayoutProps) {
  const count = mobileCount(items.length);
  if (count === 0) return null;
  const visible = items.slice(0, count);

  const rows: React.ReactNode[] = [];
  let i = 0;

  while (i < visible.length) {
    // Big
    const bigIndex = i;
    rows.push(
      <ImageBox
        key={visible[i].id}
        item={visible[i]}
        aspectRatio="1.5 / 1"
        sizes="calc(100vw - 48px)"
        onOpen={() => onOpen(bigIndex)}
      />
    );
    i++;
    if (i >= visible.length) break;

    // 2 Small side-by-side
    if (i + 1 < visible.length) {
      const firstSmall = i;
      rows.push(
        <div key={`pair-${visible[i].id}`} className="grid grid-cols-2 gap-6">
          <ImageBox
            item={visible[i]}
            aspectRatio="1.37 / 1"
            sizes="calc((100vw - 72px) / 2)"
            onOpen={() => onOpen(firstSmall)}
          />
          <ImageBox
            item={visible[i + 1]}
            aspectRatio="1.37 / 1"
            sizes="calc((100vw - 72px) / 2)"
            onOpen={() => onOpen(firstSmall + 1)}
          />
        </div>
      );
      i += 2;
    }
    if (i >= visible.length) break;

    // Square
    const squareIndex = i;
    rows.push(
      <ImageBox
        key={visible[i].id}
        item={visible[i]}
        aspectRatio="1 / 1"
        sizes="calc(100vw - 48px)"
        onOpen={() => onOpen(squareIndex)}
      />
    );
    i++;
  }

  return (
    <section className="px-6 py-12 sm:hidden">
      <div className="flex flex-col gap-6">{rows}</div>
    </section>
  );
}

function DesktopLayout({
  items,
  squareRows,
  onOpen,
}: LayoutProps & { squareRows: number }) {
  const cycleLength = 4 + 3 * squareRows;
  const count = desktopCount(items.length, cycleLength);
  if (count === 0) return null;
  const visible = items.slice(0, count);

  const cycles: React.ReactNode[] = [];

  for (let i = 0; i < visible.length; i += cycleLength) {
    const cycleStart = i;
    const chunk = visible.slice(cycleStart, cycleStart + cycleLength);
    const hasLine1 = chunk.length >= 4;
    const [big1, small1, small2, big2] = chunk;
    const squares = hasLine1 ? chunk.slice(4) : chunk;
    const squaresOffset = hasLine1 ? cycleStart + 4 : cycleStart;

    cycles.push(
      <div key={`cycle-${chunk[0].id}`} className="flex flex-col gap-6">
        {/* Line 1: Big + 2 Small stacked + Big */}
        {hasLine1 && (
          <div className="flex gap-6 items-stretch">
            {/* Big left */}
            <button
              onClick={() => onOpen(cycleStart)}
              aria-label={`View ${big1.imgAlt} full screen`}
              className="relative flex-[2.2] min-w-0 overflow-hidden rounded-lg cursor-pointer"
            >
              <WhimsyImage
                src={big1.imgSrc}
                alt={big1.imgAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 38vw"
                className="object-cover object-center"
              />
            </button>
            {/* Small column */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              <ImageBox
                item={small1}
                aspectRatio="1.37 / 1"
                sizes="(min-width: 1024px) 17vw, 17vw"
                onOpen={() => onOpen(cycleStart + 1)}
              />
              <ImageBox
                item={small2}
                aspectRatio="1.37 / 1"
                sizes="(min-width: 1024px) 17vw, 17vw"
                onOpen={() => onOpen(cycleStart + 2)}
              />
            </div>
            {/* Big right */}
            <button
              onClick={() => onOpen(cycleStart + 3)}
              aria-label={`View ${big2.imgAlt} full screen`}
              className="relative flex-[2.2] min-w-0 overflow-hidden rounded-lg cursor-pointer"
            >
              <WhimsyImage
                src={big2.imgSrc}
                alt={big2.imgAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 38vw"
                className="object-cover object-center"
              />
            </button>
          </div>
        )}

        {/* Square rows: 3 per row, wrapping via the grid */}
        {squares.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {squares.map((sq, sqIndex) => (
              <ImageBox
                key={sq.id}
                item={sq}
                aspectRatio="1 / 1"
                sizes="(min-width: 1024px) 30vw, 30vw"
                onOpen={() => onOpen(squaresOffset + sqIndex)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="hidden sm:block px-6 sm:px-12 lg:px-16 py-12 sm:py-16">
      <div className="flex flex-col gap-6">{cycles}</div>
    </section>
  );
}

export default function GalleryGrid({
  items,
  squareRows = 1,
  photoCredit,
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <MobileLayout items={items} onOpen={setOpenIndex} />
      <DesktopLayout items={items} squareRows={squareRows} onOpen={setOpenIndex} />
      <Lightbox
        items={items.map((item) => ({ src: item.imgSrc, alt: item.imgAlt }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
        credit={photoCredit}
      />
    </>
  );
}
