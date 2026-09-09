import type { Metadata } from "next";
import Image from "next/image";
import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import SubPageHeader from "@/components/subPageHeader";
import JsonLd from "@/components/jsonLd";
import { InquireFormSection } from "@/components/inquireForm";
import { aboutGraph } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "About Molly, Floral Designer in Hudson, NY",
  description:
    "Meet Molly, founder and creative director of Whimsy Flower, a bespoke floral design studio in Hudson, New York composing weddings, events, and brand florals across the Hudson Valley, the Catskills, and New York City.",
};

export default function AboutPage() {
  return (
    <PageScaffold>
      <JsonLd data={aboutGraph()} />
      <SubPageHeader
        title="About"
        imgSrc="/home-lander-section-bg.webp"
        imgAlt="Long wooden table with bud vases of coral poppies, white spirea and sweet pea among taper candles, climbing roses behind"
      />

      <MeetWhimsy />

      <StudioSection />

      <InquireFormSection />
    </PageScaffold>
  );
}

/* Mirror of "Meet the Creative Director": same layout, image on the right on
   desktop, stacked the same way on mobile, on a tinted background. */
function StudioSection() {
  return (
    <section id="the-studio" className="bg-(--clover)/25">
      <div className="py-16 sm:py-12 lg:sm-16 flex flex-col md:flex-row-reverse gap-6 justify-center items-center px-6 sm:px-12">
        <div className="relative aspect-square md:aspect-auto md:h-[686px] w-full sm:w-[477px] flex justify-center items-center">
          <Image
            src="/services/workshops.webp"
            alt="A woman in white lifts a tall stem of cream foxglove beside buckets of white delphinium, sheltered under a willow tree"
            fill
            sizes="(min-width: 640px) 477px, 100vw"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="w-full sm:w-[477px] justify-center text-center md:text-left">
          <h2 className="text-[18px] tracking-[-0.04em] uppercase">
            The studio
          </h2>
          <h3 className="py-6 font-title text-[clamp(48px,6vw,64px)] leading-[clamp(64px,7vw,72px)] text-(--olive)">
            Rooted in Hudson, New York
          </h3>
          <p className="max-w-[477px] pt-6 text-[14px] leading-6">
            Whimsy Flower is a floral design studio in Hudson, New York,
            working across the Hudson Valley, the Catskills, and New York City.
            The studio takes on a select number of weddings, private
            celebrations, and editorial projects each year, so that every
            commission receives Molly&apos;s full attention from the first
            conversation to the final installation.
          </p>
          <p className="max-w-[477px] pt-6 text-[14px] leading-6">
            Our approach is seasonal and sculptural. We favor blooms at their
            peak and compose them with movement and negative space, an approach
            inspired by ikebana, so that each arrangement feels connected to
            its setting rather than placed within it. Our work has been
            featured in Brides, and we collaborate closely with planners,
            venues, and photographers throughout the region.
          </p>
        </div>
      </div>
    </section>
  );
}
