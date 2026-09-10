import type { Metadata } from "next";
import MeetWhimsy from "@/components/meetWhimsy";
import PageScaffold from "@/components/pageScaffold";
import { InquireFormSection } from "@/components/inquireForm";
import SubPageHeader from "@/components/subPageHeader";
import { SmallTestimonialSection } from "@/components/testimonialsSection";
import GalleryGrid from "@/components/galleryGrid";
import PaletteSection from "@/components/paletteSection";
import { brandProjects, getBrandProjectBySlug } from "@/data/brandProjects";
import { getGalleryGridItems } from "@/lib/galleryAssets";
import { notFound } from "next/navigation";
import WhimsyImage from "@/components/whimsyImage";
import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";

type BrandProjectPageProps = {
  params: Promise<{ slug: string }>;
};


export function generateStaticParams() {
  return brandProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BrandProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getBrandProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.brandName}: ${project.title}`,
    description: `Florals by Whimsy Flower for ${project.brandName}'s ${project.title.toLowerCase()}${
      project.location ? ` in ${project.location}` : ""
    }: editorial floral design and styling from a studio in Hudson, NY.`,
  };
}

export default async function BrandProjectPage({
  params,
}: BrandProjectPageProps) {
  const { slug } = await params;
  const project = getBrandProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  const testimonialTitle =
    project.testimonialTitle ??
    `Design that told the ${project.brandName} story`;
  const testimonialText = project.testimonialText;
  const testimonialClientName =
    project.testimonialClientName ?? project.brandName;

  const moreProjects: FeaturedGallery[] = brandProjects
    .filter((other) => other.slug !== project.slug)
    .slice(0, 3)
    .map((other) => ({
      imgSrc: other.coverImage,
      imgAlt: other.coverAlt,
      coupleName: other.brandName,
      year: other.title,
      location: other.location,
      href: `/brands/${other.slug}`,
    }));
  const projectGridItems = await getGalleryGridItems(
    `portfolio/${project.slug}`,
    project.title,
    { alts: project.photoAlts, photographer: project.photographer },
  );

  return (
    <PageScaffold>
      <SubPageHeader
        title={project.title}
        imgSrc={project.coverImage}
        imgAlt={project.coverAlt}
      />

      <GalleryGrid items={projectGridItems} />

      <PaletteSection />

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
            coupleName={testimonialClientName}
          />
        </div>
      )}

      <MoreProjects projects={moreProjects} />

      <InquireFormSection />
      <MeetWhimsy className="bg-(--clover)/25" />
    </PageScaffold>
  );

  type MoreProjectsProps = { projects: FeaturedGallery[] };
  /* More Projects Section */
  function MoreProjects({ projects }: MoreProjectsProps) {
    return (
      <section id="more-projects">
        <div className="flex flex-col justify-stretch items-stretch text-center pt-16 pb-12 px-6 md:px-12 lg:px-16">
          <h2 className="py-6 font-title text-(--dark-olive) text-[clamp(48px,6vw,64px)] leading-[clamp(56px,7vw,72px)] tracking-[-0.04em] text-center lg:text-left">
            More Projects
          </h2>
          <ul className="flex flex-col sm:grid sm:grid-cols-3 pt-6 gap-12 sm:gap-6">
            {projects.map((item, i) => (
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
