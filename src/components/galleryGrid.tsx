import WhimsyImage from "@/components/whimsyImage";

type GalleryGridItem = {
  id: string;
  imgSrc: string;
  imgAlt: string;
};

type GalleryGridProps = {
  items: GalleryGridItem[];
};

function mobileCount(total: number): number {
  if (total < 1) return 0;
  // Pattern: big, 2-small, square (4 per cycle), always end on big
  return Math.floor((total - 1) / 4) * 4 + 1;
}

function desktopCount(total: number): number {
  // Pattern: 7 per cycle (4 in line1 + 3 in line2)
  return Math.floor(total / 7) * 7;
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
    <section className="px-6 py-16 sm:hidden">
      <div className="flex flex-col gap-6">{rows}</div>
    </section>
  );
}

function DesktopLayout({ items }: { items: GalleryGridItem[] }) {
  const count = desktopCount(items.length);
  if (count === 0) return null;
  const visible = items.slice(0, count);

  const cycles: React.ReactNode[] = [];

  for (let i = 0; i < visible.length; i += 7) {
    const big1 = visible[i];
    const small1 = visible[i + 1];
    const small2 = visible[i + 2];
    const big2 = visible[i + 3];
    const sq1 = visible[i + 4];
    const sq2 = visible[i + 5];
    const sq3 = visible[i + 6];

    cycles.push(
      <div key={`cycle-${big1.id}`} className="flex flex-col gap-6">
        {/* Line 1: Big + 2 Small stacked + Big */}
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

        {/* Line 2: 3 Squares */}
        <div className="grid grid-cols-3 gap-6">
          <ImageBox
            item={sq1}
            aspectRatio="1 / 1"
            sizes="(min-width: 1024px) 30vw, 30vw"
          />
          <ImageBox
            item={sq2}
            aspectRatio="1 / 1"
            sizes="(min-width: 1024px) 30vw, 30vw"
          />
          <ImageBox
            item={sq3}
            aspectRatio="1 / 1"
            sizes="(min-width: 1024px) 30vw, 30vw"
          />
        </div>
      </div>
    );
  }

  return (
    <section className="hidden sm:block px-6 sm:px-12 lg:px-16 py-16">
      <div className="flex flex-col gap-6">{cycles}</div>
    </section>
  );
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) return null;

  return (
    <>
      <MobileLayout items={items} />
      <DesktopLayout items={items} />
    </>
  );
}
