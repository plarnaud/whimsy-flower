import MeetWhimsy from "@/components/meetWhimsy";
import PageScaffold from "@/components/pageScaffold";
import { InquireFormSection } from "@/components/inquireForm";
import SubPageHeader from "@/components/subPageHeader";
import { SmallTestimonialSection } from "@/components/testimonialsSection";
import GalleryGrid from "@/components/galleryGrid";
import PaletteSection from "@/components/paletteSection";
import {
  featuredGalleries as featuredGalleryData,
  galleries,
  getGalleryBySlug,
} from "@/data/galleries";
import { getGalleryGridItems } from "@/lib/galleryAssets";
import { notFound } from "next/navigation";
import WhimsyImage from "@/components/whimsyImage";
import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";

type GalleryPageProps = {
  params: Promise<{ slug: string }>;
};

const galleryAssetFolderBySlug: Record<string, string> = {
  "brides-feature": "Brides Feature",
  "lindsey-fin": "Lindsey & Fin 2025",
  "natalia-david": "Natalia & David 2025 (Thalia Photography)",
  "talea-erich": "Talea & Erich 2025 folder (Mackenzie Grace Creative)",
};

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

      <PaletteSection />

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
}
