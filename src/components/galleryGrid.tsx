import WhimsyImage from "@/components/whimsyImage";

type GalleryGridItem = {
  id: string;
  imgSrc: string;
  imgAlt: string;
};

type GalleryGridProps = {
  items: GalleryGridItem[];
  /* Rows of 3 squares after each big/small line on desktop (default 1). */
  squareRows?: number;
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
};

function ImageBox({ item, aspectRatio, sizes, className = "" }: ImageBoxProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ aspectRatio }}
    >
      <WhimsyImage
        src={item.imgSrc}
        alt={item.imgAlt}
        fill
        sizes={sizes}
        className="object-cover object-center"
      />
    </div>
  );
}

function MobileLayout({ items }: { items: GalleryGridItem[] }) {
  const count = mobileCount(items.length);
  if (count === 0) return null;
  const visible = items.slice(0, count);

  const rows: React.ReactNode[] = [];
  let i = 0;

  while (i < visible.length) {
    // Big
    rows.push(
      <ImageBox
        key={visible[i].id}
        item={visible[i]}
        aspectRatio="1.5 / 1"
        sizes="calc(100vw - 48px)"
      />
    );
    i++;
    if (i >= visible.length) break;

    // 2 Small side-by-side
    if (i + 1 < visible.length) {
      rows.push(
        <div key={`pair-${visible[i].id}`} className="grid grid-cols-2 gap-6">
          <ImageBox
            item={visible[i]}
            aspectRatio="1.37 / 1"
            sizes="calc((100vw - 72px) / 2)"
          />
          <ImageBox
            item={visible[i + 1]}
            aspectRatio="1.37 / 1"
            sizes="calc((100vw - 72px) / 2)"
          />
        </div>
      );
      i += 2;
    }
    if (i >= visible.length) break;

    // Square
    rows.push(
      <ImageBox
        key={visible[i].id}
        item={visible[i]}
        aspectRatio="1 / 1"
        sizes="calc(100vw - 48px)"
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
}: {
  items: GalleryGridItem[];
  squareRows: number;
}) {
  const cycleLength = 4 + 3 * squareRows;
  const count = desktopCount(items.length, cycleLength);
  if (count === 0) return null;
  const visible = items.slice(0, count);

  const cycles: React.ReactNode[] = [];

  for (let i = 0; i < visible.length; i += cycleLength) {
    const chunk = visible.slice(i, i + cycleLength);
    const hasLine1 = chunk.length >= 4;
    const [big1, small1, small2, big2] = chunk;
    const squares = hasLine1 ? chunk.slice(4) : chunk;

    cycles.push(
      <div key={`cycle-${chunk[0].id}`} className="flex flex-col gap-6">
        {/* Line 1: Big + 2 Small stacked + Big */}
        {hasLine1 && (
          <div className="flex gap-6 items-stretch">
            {/* Big left */}
            <div className="relative flex-[2.2] min-w-0 overflow-hidden rounded-lg">
              <WhimsyImage
                src={big1.imgSrc}
                alt={big1.imgAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 38vw"
                className="object-cover object-center"
              />
            </div>
            {/* Small column */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              <ImageBox
                item={small1}
                aspectRatio="1.37 / 1"
                sizes="(min-width: 1024px) 17vw, 17vw"
              />
              <ImageBox
                item={small2}
                aspectRatio="1.37 / 1"
                sizes="(min-width: 1024px) 17vw, 17vw"
              />
            </div>
            {/* Big right */}
            <div className="relative flex-[2.2] min-w-0 overflow-hidden rounded-lg">
              <WhimsyImage
                src={big2.imgSrc}
                alt={big2.imgAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 38vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Square rows: 3 per row, wrapping via the grid */}
        {squares.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {squares.map((sq) => (
              <ImageBox
                key={sq.id}
                item={sq}
                aspectRatio="1 / 1"
                sizes="(min-width: 1024px) 30vw, 30vw"
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

export default function GalleryGrid({ items, squareRows = 1 }: GalleryGridProps) {
  if (items.length === 0) return null;

  return (
    <>
      <MobileLayout items={items} />
      <DesktopLayout items={items} squareRows={squareRows} />
    </>
  );
}
