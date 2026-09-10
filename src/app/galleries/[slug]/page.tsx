import type { Metadata } from "next";
import MeetWhimsy from "@/components/meetWhimsy";
import PageScaffold from "@/components/pageScaffold";
import { InquireFormSection } from "@/components/inquireForm";
import SubPageHeader from "@/components/subPageHeader";
import { SmallTestimonialSection } from "@/components/testimonialsSection";
import GalleryGrid from "@/components/galleryGrid";
import PaletteSection from "@/components/paletteSection";
import { galleries, getGalleryBySlug } from "@/data/galleries";
import { getGalleryGridItems } from "@/lib/galleryAssets";
import { notFound } from "next/navigation";
import WhimsyImage from "@/components/whimsyImage";
import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";
import JsonLd from "@/components/jsonLd";
import { baseOpenGraph } from "@/lib/siteConfig";
import { galleryGraph } from "@/lib/structuredData";

/* Town and state for titles: "Venue, Town, ST" becomes "Town, ST". */
function galleryPlace(location: string) {
  if (!location || /^\d{4}$/.test(location)) return undefined;
  const parts = location.split(",").map((part) => part.trim());
  return parts.length >= 3 ? parts.slice(-2).join(", ") : location;
}

/* Written alt for a photo path, falling back to a generic line. */
function photoAlt(
  gallery: { photoAlts?: Record<string, string>; coupleNames: string },
  src: string | undefined,
) {
  if (!src) return undefined;
  const file = decodeURIComponent(src.split("/").pop() ?? "");
  return (
    gallery.photoAlts?.[file] ?? `${gallery.coupleNames}'s wedding florals`
  );
}

type GalleryPageProps = {
  params: Promise<{ slug: string }>;
};

/* Photos live under public/portfolio/<slug>; the Brides set keeps its own folder. */
const galleryAssetFolderBySlug: Record<string, string> = {
  "brides-feature": "Brides Feature",
};

function galleryAssetFolder(slug: string) {
  return galleryAssetFolderBySlug[slug] ?? `portfolio/${slug}`;
}

export function generateStaticParams() {
  return galleries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return {};

  const place = galleryPlace(gallery.location);
  const venue = place ? ` at ${gallery.location}` : "";
  const credit = gallery.photographer
    ? ` and photographed by ${gallery.photographer}`
    : "";
  return {
    title: place
      ? `${gallery.title} Wedding Florals in ${place}`
      : `${gallery.title} Wedding Florals`,
    description: `${gallery.coupleNames}'s wedding florals${venue}, designed by Whimsy Flower of Hudson, NY${credit}.`,
    openGraph: {
      ...baseOpenGraph,
      images: [{ url: gallery.coverImage, alt: gallery.coverAlt }],
    },
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery) {
    return notFound();
  }

  const testimonialTitle = "From the Couple";
  const testimonialText = gallery.testimonialText;
  const testimonialCoupleName =
    gallery.testimonialCoupleName ?? gallery.coupleNames;

  // Three other weddings, featured ones first, never the one being viewed
  const featuredGalleries: FeaturedGallery[] = [
    ...galleries.filter((g) => g.featured),
    ...galleries.filter((g) => !g.featured),
  ]
    .filter((other) => other.slug !== gallery.slug)
    .slice(0, 3)
    .map((other) => ({
      imgSrc: other.coverImage,
      imgAlt: other.coverAlt,
      coupleName: other.coupleNames,
      year: other.year,
      location: other.location,
      href: `/galleries/${other.slug}`,
    }));
  const galleryGridItems = await getGalleryGridItems(
    galleryAssetFolder(gallery.slug),
    gallery.title,
    {
      order: gallery.photoOrder,
      exclude: gallery.hiddenPhotos,
      alts: gallery.photoAlts,
      photographer: gallery.photographer,
    },
  );
  return (
    <PageScaffold>
      <JsonLd data={galleryGraph(gallery, galleryGridItems)} />
      <SubPageHeader
        title={gallery.title}
        imgSrc={gallery.coverImage}
        imgAlt={gallery.coverAlt}
      />

      <GalleryGrid items={galleryGridItems} photoCredit={gallery.photographer} />

      {/* Credit sits in the gap under the last photos, 8px above the next
          section, in that section's background color */}
      {gallery.photographer && galleryGridItems.length > 0 && (
        <p className="px-6 sm:px-12 lg:px-16 -mt-10 sm:-mt-14 mb-2 text-right text-[12px] uppercase tracking-[0.08em] text-[color-mix(in_srgb,var(--clover)_25%,var(--olive-petal))]">
          Photo by{" "}
          {gallery.photographerUrl ? (
            <a
              href={gallery.photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {gallery.photographer}
            </a>
          ) : (
            gallery.photographer
          )}
        </p>
      )}

      <PaletteSection colors={gallery.palette} text={gallery.paletteText} />

      {testimonialText && (
        <div className="relative overflow-hidden w-full py-16 px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center">
          <div className="absolute inset-0 -z-90 w-full h-full opacity-33 overflow-hidden">
            <WhimsyImage
              src="/home-lander-section-bg.webp"
              alt=""
              fill
              sizes="100vw"
              quality={50}
              className="absolute left-0 right-0 -z-100  object-cover"
            />
          </div>
          <SmallTestimonialSection
            title={testimonialTitle}
            text={testimonialText}
            coupleName={testimonialCoupleName}
            imgSrc={gallery.testimonialImage}
            imgAlt={photoAlt(gallery, gallery.testimonialImage)}
          />
        </div>
      )}

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
}
