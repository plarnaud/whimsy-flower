import MeetWhimsy from "@/components/meetWhimsy";
import PageScaffold from "@/components/pageScaffold";
import { InquireFormSection } from "@/components/inquireForm";
import SubPageHeader from "@/components/subPageHeader";
import { SmallTestimonialSection } from "@/components/testimonialsSection";
import GalleryGrid from "@/components/galleryGrid";
import {
  featuredGalleries as featuredGalleryData,
  galleries,
  getGalleryBySlug,
} from "@/data/galleries";
import { notFound } from "next/navigation";
import WhimsyImage from "@/components/whimsyImage";
import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";
import { readdir } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

type GalleryPageProps = {
  params: Promise<{ slug: string }>;
};

type GalleryGridItem = {
  id: string;
  imgSrc: string;
  imgAlt: string;
};

const galleryAssetFolderBySlug: Record<string, string> = {
  "spring-wedding": "Lindsey & Fin 2025",
  "coastal-ceremony": "Natalia & David 2025 (Thalia Photography)",
  "garden-party": "Talea & Erich 2025 folder (Mackenzie Grace Creative)",
  "autumn-soiree": "Brides Feature",
};

const galleryImageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

const fileNameSorter = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function encodePublicPath(pathValue: string) {
  return pathValue.split("/").map(encodeURIComponent).join("/");
}

async function getGalleryGridItems(
  assetFolder: string | undefined,
  title: string,
): Promise<GalleryGridItem[]> {
  if (!assetFolder) {
    return [];
  }

  const folderPath = path.join(process.cwd(), "public", assetFolder);

  let entries: Dirent<string>[];
  try {
    entries = await readdir(folderPath, { encoding: "utf8", withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        galleryImageExtensions.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort((a, b) => fileNameSorter.compare(a, b))
    .map((fileName, index) => ({
      id: `${assetFolder}/${fileName}`,
      imgSrc: `/${encodePublicPath(assetFolder)}/${encodeURIComponent(fileName)}`,
      imgAlt: `${title} gallery image ${index + 1}`,
    }));
}

export function generateStaticParams() {
  return galleries.map(({ slug }) => ({ slug }));
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery) {
    return notFound();
  }

  const testimonialTitle =
    gallery.testimonialTitle ??
    `Design that felt true to ${gallery.coupleNames}`;
  const testimonialText =
    gallery.testimonialText ??
    `Whimsy Flower brought ${gallery.coupleNames}'s vision to life in ${gallery.location} with thoughtful details and seamless execution from concept to install.`;
  const testimonialCoupleName =
    gallery.testimonialCoupleName ?? gallery.coupleNames;

  const featuredGalleries: FeaturedGallery[] = featuredGalleryData.map(
    (gallery) => ({
      imgSrc: gallery.coverImage,
      imgAlt: gallery.coverAlt,
      coupleName: gallery.coupleNames,
      galleryName: gallery.title,
      location: gallery.location,
      href: `/galleries/${gallery.slug}`,
    }),
  );
  const galleryGridItems = await getGalleryGridItems(
    galleryAssetFolderBySlug[gallery.slug],
    gallery.title,
  );

  return (
    <PageScaffold>
      <SubPageHeader
        title={gallery.title}
        imgSrc={gallery.coverImage}
        imgAlt={gallery.coverAlt}
      />

      <GalleryGrid items={galleryGridItems} />

      <section className="bg-(--clover)/25 px-6 md:px-12 lg:px-16 py-16 gap-16 flex flex-col justify-center items-center">
        <div className=" w-full grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Object.entries({
            Olive: { mainColor: "(--olive)", borderColor: "--dark-green" },
            Clover: { mainColor: "(--clover)", borderColor: "--dark-clover" },
            Rose: { mainColor: "[#D8A48F]", borderColor: "#612E19" },
            Peach: { mainColor: "[#BB8588]", borderColor: "#4F1219" },
          }).map(([name, { mainColor, borderColor }]) => (
            <ColorPreview
              key={name}
              name={name}
              mainColor={mainColor}
              borderColor={borderColor}
            />
          ))}
        </div>

        <p className="text-center text-[14px] leading-6 w-full lg:max-w-[644px] sm:max-w-[610px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          pellentesque sapien diam, eu dictum justo hendrerit eget. Aliquam
          elementum mattis felis sit amet mattis. Quisque dui neque, iaculis
          porta mauris at, ultrices commodo diam. Pellentesque sit amet odio a
          quam vulputate feugiat. Etiam vitae porta arcu, id dignissim leo.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full ">
          {Object.entries({
            Eucalyptus: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/brand01.webp",
              imgAlt: "Olive flower",
            },
            Eucalyptus2: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/brand01.webp",
              imgAlt: "Olive flower",
            },
            Eucalyptus3: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/brand01.webp",
              imgAlt: "Olive flower",
            },
            Eucalyptus4: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/brand01.webp",
              imgAlt: "Olive flower",
            },
          }).map(([name, { subname, imgSrc, imgAlt }]) => (
            <FlowerPreview
              key={name}
              name={name}
              subName={subname}
              imgSrc={imgSrc}
              imgAlt={imgAlt}
            />
          ))}
        </div>
      </section>

      <div className="relative overflow-hidden w-full py-16 px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center">
        <div className="absolute inset-0 -z-90 w-full h-full opacity-33 overflow-hidden">
          <WhimsyImage
            src="/home-lander-section-bg.webp"
            alt="decorative background image of a flower wedding tablescape"
            fill
            sizes=""
            className="absolute left-0 right-0 -z-100  object-cover"
          />
        </div>
        <SmallTestimonialSection
          title={testimonialTitle}
          text={testimonialText}
          coupleName={testimonialCoupleName}
        />
      </div>

      <FeaturedGalleries galleries={featuredGalleries} />

      <InquireFormSection />
      <MeetWhimsy className="bg-(--clover)/25" />
    </PageScaffold>
  );

  type FeaturesGalleriesProps = { galleries: FeaturedGallery[] };
  /* Featured Galleries Section */
  function FeaturedGalleries({ galleries }: FeaturesGalleriesProps) {
    return (
      <section id="featured-galleries">
        <div className="flex flex-col justify-stretch items-stretch text-center pt-16 pb-12 px-6 md:px-12 lg:px-16">
          <h2 className="py-6 font-title text-(--dark-olive) text-[clamp(48px,6vw,64px)] leading-[clamp(56px,7vw,72px)] tracking-[-0.04em] text-center lg:text-left">
            More Weddings
          </h2>
          <ul className="flex flex-col sm:grid sm:grid-cols-3 pt-6 gap-12 sm:gap-6">
            {galleries.map((item, i) => (
              <li key={i}>
                <GalleryButton gallery={item} className=""></GalleryButton>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  type ColorPreviewProps = {
    name: string;
    mainColor: string;
    borderColor: string;
  };
  function ColorPreview({ name, mainColor, borderColor }: ColorPreviewProps) {
    const resolveColor = (value: string) => {
      const trimmed = value.trim();

      if (trimmed.startsWith("var(")) {
        return trimmed;
      }

      if (trimmed.startsWith("--")) {
        return `var(${trimmed})`;
      }

      if (trimmed.startsWith("(--") && trimmed.endsWith(")")) {
        return `var(${trimmed.slice(1, -1)})`;
      }

      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        return trimmed.slice(1, -1);
      }

      return trimmed;
    };

    const resolvedMainColor = resolveColor(mainColor);
    const resolvedBorderColor = resolveColor(borderColor);

    return (
      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <div
          className="w-full max-w-[155px] h-full max-h-[155px] rounded-full p-1 border"
          style={{
            backgroundColor: resolvedMainColor,
            borderColor: resolvedBorderColor,
          }}
        >
          <svg className="" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={resolvedBorderColor}
              strokeWidth=".5"
              strokeDasharray="6 4"
            />
          </svg>
        </div>
        <span className="text-[18px] uppercase text-(--dark-green) tracking-[-0.04em] text-center w-full">
          {name}
        </span>
      </div>
    );
  }

  type FlowerPreviewProps = {
    name: string;
    subName: string;
    imgSrc: string;
    imgAlt: string;
  };
  function FlowerPreview({
    name,
    subName,
    imgSrc,
    imgAlt,
  }: FlowerPreviewProps) {
    return (
      <div className="flex flex-col gap-6 w-full md:w-[214px] lg:w-[25%] ">
        <div className="relative aspect-square lg:aspect-9/16 rounded-lg overflow-hidden">
          <WhimsyImage
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="310px, 214px, 380px"
            className="object-cover object-center"
          />
        </div>
        <div className="w-full flex flex-col text-center">
          <span className="text-[18px] uppercase tracking-[-0.04em]">
            {name}
          </span>
          <span className="text-[14px] italic leading-6">{subName}</span>
        </div>
      </div>
    );
  }
}
