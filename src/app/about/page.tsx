import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import SubPageHeader from "@/components/subPageHeader";
import SectionTitle from "@/components/sectionTitle";
import PillButton from "@/components/pillButton";
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
        subtitle="A floral design studio in Hudson, New York"
      />

      <MeetWhimsy />

      <StudioSection />

      <InquireFormSection />
    </PageScaffold>
  );
}

function StudioSection() {
  return (
    <section className="bg-(--clover)/25 py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-[644px] mx-auto flex flex-col items-center text-center">
        <SectionTitle kicker="The studio" title="Rooted in Hudson, New York" />
        <p className="text-[14px] leading-6">
          Whimsy Flower is a floral design studio in Hudson, New York, working
          across the Hudson Valley, the Catskills, and New York City. The
          studio takes on a select number of weddings, private celebrations,
          and editorial projects each year, so that every commission receives
          Molly&apos;s full attention from the first conversation to the final
          installation.
        </p>
        <p className="pt-6 text-[14px] leading-6">
          Our approach is seasonal and sculptural. We favor blooms at their
          peak and compose them with movement and negative space, an approach
          inspired by ikebana, so that each arrangement feels connected to its
          setting rather than placed within it. The result is floral work that
          is composed, atmospheric, and unmistakably yours.
        </p>
        <p className="pt-6 text-[14px] leading-6">
          Our work has been featured in Brides, and we collaborate closely with
          planners, venues, and photographers throughout the region, from
          historic estates in Columbia and Dutchess counties to lofts and
          galleries in Manhattan and Brooklyn.
        </p>
        <PillButton
          label="Begin the Conversation"
          href="#inquire"
          className="mt-10"
        />
      </div>
    </section>
  );
}
