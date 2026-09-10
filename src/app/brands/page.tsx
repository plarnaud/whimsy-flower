import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import SectionTitle from "@/components/sectionTitle";
import WorkCollage, { CollageTile } from "@/components/workCollage";
import PillButton from "@/components/pillButton";
import { InquireFormSection } from "@/components/inquireForm";
import JsonLd from "@/components/jsonLd";
import { breadcrumbGraph } from "@/lib/structuredData";
import { brandNames, brandProjects } from "@/data/brandProjects";
import { blurFor } from "@/lib/blur";
import PageHero from "@/components/pageHero";

export const metadata: Metadata = {
  title: "Editorial & Brand Florals, Hudson Valley to NYC",
  description:
    "Editorial and brand floral styling for shops, brands, and businesses from the Hudson Valley to Manhattan: launches, press dinners, campaigns, and events.",
};

export default function BrandsPage() {
  return (
    <PageScaffold>
      <JsonLd
        data={breadcrumbGraph([{ name: "Editorial & Brands", path: "/brands" }])}
      />
      <HeroSection />

      <BrandScroller />

      <SelectedWorkSection />

      <ApproachSection />

      <MeetWhimsy />

      <InquireFormSection />
    </PageScaffold>
  );
}

function HeroSection() {
  return (
    <PageHero
      kicker="Floral design for brands, campaigns & corporate events"
      title="Editorial & Brands"
      scrollTo="#selected-work"
      scrollText="Explore Selected Work"
    >
      <p>
        Every brand has a visual language: a palette, a mood, a point of view.
        From our studio in Hudson, New York, we translate your voice into
        flowers for shops, brands, and businesses: sculptural installations,
        atmospheric set design, and editorial styling composed around your
        identity and the story your moment needs to tell. Product launches,
        press dinners, campaign shoots, corporate gatherings, and more. Each
        one is designed as a bespoke collaboration, where we create something
        that becomes uniquely yours.
      </p>
    </PageHero>
  );
}

/* Infinite marquee of brand names. Each half repeats the list three times so
   it stays wider than the viewport; the -50% translate loops seamlessly. */
function BrandScroller() {
  const marqueeRun = [...brandNames, ...brandNames, ...brandNames];

  return (
    <section aria-label="Brands we have worked with">
      <div className="py-8 border-y-[1.5px] border-(--clover) overflow-hidden">
        <div className="brand-marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center"
            >
              {marqueeRun.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex items-center whitespace-nowrap"
                >
                  <span className="italic uppercase text-[18px] tracking-[-0.04em] text-(--dark-green)">
                    {name}
                  </span>
                  <span aria-hidden className="mx-10 text-(--clover)">
                    ·
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedWorkSection() {
  const tiles: CollageTile[] = brandProjects.map((project) => ({
    label: project.brandName,
    sublabel: project.title,
    cover: project.coverImage,
    coverAlt: project.coverAlt,
    coverBlur: blurFor(project.coverImage),
    images: (project.images ?? [project.coverImage]).map((src, i) => ({
      src,
      alt:
        project.photoAlts?.[decodeURIComponent(src.split("/").pop() ?? "")] ??
        `${project.brandName} ${project.title}, photo ${i + 1}`,
      blurDataURL: blurFor(src),
    })),
  }));

  return (
    <section
      id="selected-work"
      className="scroll-mt-24 px-6 md:px-12 lg:px-16 pt-6 lg:pt-10 pb-16"
    >
      <SectionTitle title="Recent Collaborations" />
      <WorkCollage tiles={tiles} className="pt-6" />
    </section>
  );
}

const approachSteps = [
  {
    title: "The Conversation",
    text: "Every project begins with a conversation about atmosphere, brand identity, and the experience you want your audience to remember. Molly leads each commission personally, from the first call to the final installation.",
  },
  {
    title: "Creative Direction",
    text: "We translate your brief into a bespoke floral concept: custom design boards, sculptural forms, and a seasonal palette drawn directly from your brand's visual language.",
  },
  {
    title: "Sourcing & Planning",
    text: "Seasonal floral sourcing, venue walkthroughs, and detailed production planning ensure the design arrives exactly as imagined, on schedule and without surprises.",
  },
  {
    title: "Installation & Styling",
    text: "Our team handles the complete installation and on-set styling: composed, editorial arrangements made to be photographed, filmed, and remembered.",
  },
  {
    title: "The Reveal & Breakdown",
    text: "You host; we handle the rest. When the moment has passed, a discreet breakdown returns the space without a trace. The flowers simply appear, then gracefully exit.",
  },
];

function ApproachSection() {
  return (
    <section className="bg-(--clover)/25 py-16 px-6 md:px-12 lg:px-16">
      <SectionTitle kicker="The experience" title="Our Approach" />
      <ol className="max-w-[900px] mx-auto mt-4 sm:mt-0 divide-y divide-(--clover) border-y border-(--clover)">
        {approachSteps.map((step, i) => (
          <li
            key={step.title}
            className="py-8 flex flex-col items-center gap-5 text-center sm:grid sm:grid-cols-[7rem_15rem_1fr] sm:gap-x-6 sm:items-center sm:text-left"
          >
            {/* Mobile: number + title as one centered row; sm:contents
                dissolves the wrapper so both become grid cells on desktop */}
            <div className="flex items-center justify-center gap-4 sm:contents">
              {/* Beth Ellen digits sit low in their em box; the small upward
                  nudge optically centers them against the row */}
              <span
                aria-hidden
                className="font-title text-[48px] sm:text-[56px] leading-none -translate-y-2 text-(--dark-olive)"
              >
                0{i + 1}
              </span>
              <h4 className="italic uppercase text-[18px] tracking-[-0.04em] text-(--dark-green)">
                {step.title}
              </h4>
            </div>
            <p className="text-[14px] leading-6">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="flex justify-center pt-12">
        <PillButton label="Get in Touch" href="#inquire" />
      </div>
    </section>
  );
}
