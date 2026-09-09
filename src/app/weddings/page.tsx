import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import WhimsyImage from "@/components/whimsyImage";
import ArrowRight from "@/components/arrow";
import SectionTitle from "@/components/sectionTitle";
import PillButton from "@/components/pillButton";
import { InquireFormSection } from "@/components/inquireForm";
import JsonLd from "@/components/jsonLd";
import { breadcrumbGraph } from "@/lib/structuredData";
import GallerySection from "./gallerySection";

export const metadata: Metadata = {
  title: "Hudson Valley Wedding Floral Design",
  description:
    "Bespoke wedding florals from our studio in Hudson, NY. Sculptural, seasonal designs for ceremonies and receptions across the Hudson Valley, the Catskills, and New York City.",
};

export default function WeddingsPage() {
  return (
    <PageScaffold>
      <JsonLd
        data={breadcrumbGraph([{ name: "Weddings", path: "/weddings" }])}
      />
      <HeroSection />

      <GallerySection />

      <ExperienceSection />

      <InvestmentSection />

      <FaqSection />

      <InquireFormSection />

      <div className="bg-(--pale-yellow)/25 py-8">
        <MeetWhimsy />
      </div>
    </PageScaffold>
  );
}

/* Same hero treatment as the Editorial & Brands page: centered text over
   the low-opacity tablescape image, with a link down to the galleries. */
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 -z-100 w-full h-full opacity-[.165]">
        <WhimsyImage
          src="/home-lander-section-bg.webp"
          alt="Long wooden table with bud vases of coral poppies, white spirea and sweet pea among taper candles, climbing roses behind"
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="absolute left-0 right-0 -z-100 object-cover object-center"
        />
      </div>

      <div className="w-full py-10 sm:py-12 px-6 lg:min-h-[480px] flex flex-col items-center text-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-[18px] tracking-[-0.04em] uppercase">
            Wedding floral design across the Hudson Valley, the Catskills & New
            York City
          </h1>
          <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--olive)">
            Hudson Valley Weddings
          </h2>
          <span className="max-w-[644px] py-6 text-[14px] leading-6">
            From our studio in Hudson, New York, we compose wedding florals for
            celebrations throughout the Hudson Valley and the Catskills:
            historic estates and barns in Columbia and Dutchess counties,
            mountain weddings in Greene and Ulster, and gatherings in Manhattan
            and Brooklyn. Each commission is designed from the ground up:
            sculptural ceremony installations, atmospheric reception
            tablescapes, and personal flowers composed around the season, the
            setting, and the two of you.
          </span>
        </div>
        <a
          href="#recent-weddings"
          className="mt-8 flex flex-col items-center gap-4 uppercase text-[16px] tracking-[-0.04em] text-(--dark-green) hover:text-(--darker-green) hover:underline underline-offset-4 transition-colors"
        >
          Explore Recent Weddings
          <ArrowRight className="h-4 w-6 rotate-90" />
        </a>
      </div>
    </section>
  );
}

const experienceSteps = [
  {
    title: "The Conversation",
    text: "It begins with a conversation about the two of you: the setting, the season, and the atmosphere you want your guests to step into. Molly leads every wedding personally, from the first call to the last stem placed.",
  },
  {
    title: "Creative Direction",
    text: "We translate that conversation into a bespoke design proposal: custom design boards, a seasonal palette, and sculptural forms drawn from your venue and your story, never from a template.",
  },
  {
    title: "Sourcing & Planning",
    text: "Seasonal sourcing, venue walkthroughs, and a detailed production plan coordinated with your planner and venue, so the design arrives exactly as imagined.",
  },
  {
    title: "Installation",
    text: "On the day, our team handles the complete installation: ceremony architecture, reception tablescapes, and personal flowers delivered to you before the first photograph.",
  },
  {
    title: "The Reveal & Breakdown",
    text: "You celebrate; we handle the rest. When the evening ends, a discreet breakdown returns the venue without a trace.",
  },
];

/* Same list treatment as the Editorial & Brands "Our Approach" section. */
function ExperienceSection() {
  return (
    <section className="bg-(--clover)/25 py-16 px-6 md:px-12 lg:px-16">
      <SectionTitle kicker="The experience" title="How We Work Together" />
      <ol className="max-w-[900px] mx-auto mt-4 sm:mt-0 divide-y divide-(--clover) border-y border-(--clover)">
        {experienceSteps.map((step, i) => (
          <li
            key={step.title}
            className="py-8 flex flex-col items-center gap-5 text-center sm:grid sm:grid-cols-[7rem_15rem_1fr] sm:gap-x-6 sm:items-center sm:text-left"
          >
            <div className="flex items-center justify-center gap-4 sm:contents">
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
    </section>
  );
}

function InvestmentSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-[644px] mx-auto flex flex-col items-center text-center">
        <SectionTitle kicker="Investment" title="A Note on Investment" />
        <p className="text-[14px] leading-6">
          Whimsy Flower takes on a limited number of weddings each season,
          which allows Molly to be hands-on from the first sketch to the final
          installation. Full-service wedding commissions begin at $8,000, with
          most celebrations investing more depending on scale, season, and
          location across the Hudson Valley, the Catskills, and New York City.
        </p>
        <p className="pt-6 text-[14px] leading-6">
          Every proposal is built for you and priced transparently, shaped
          around the moments that matter most: the ceremony, the tables your
          guests gather around, and the flowers you carry.
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

const faqs = [
  {
    question: "Where does Whimsy Flower design weddings?",
    answer:
      "Our studio is in Hudson, New York. We design weddings throughout the Hudson Valley and the Catskills, from Rhinebeck and Kingston to Catskill and Woodstock, across Columbia, Dutchess, Greene, and Ulster counties, and we travel to Manhattan, Brooklyn, and beyond for the right celebration.",
  },
  {
    question: "When should we reach out?",
    answer:
      "As soon as you have a date and a venue. We take on a limited number of weddings each season, and peak dates from May through October are reserved well in advance.",
  },
  {
    question: "What does a full-service commission include?",
    answer:
      "Ceremony installations, reception tablescapes, personal flowers for you and your wedding party, and every detail in between, along with creative direction, seasonal sourcing, delivery, installation, and breakdown.",
  },
  {
    question: "Is there a minimum?",
    answer:
      "Full-service wedding commissions begin at $8,000. Intimate celebrations are welcome; share your date and vision through the inquiry form and we will tell you honestly whether we are the right fit.",
  },
  {
    question: "Do you work with our planner, venue, and photographer?",
    answer:
      "Always. We coordinate directly with your planner and venue on timing and logistics, and with your photographer so the florals are in place before the first frame.",
  },
  {
    question: "How would you describe your approach to flowers?",
    answer:
      "Seasonal and sculptural. We favor blooms at their peak, composed with movement and negative space in an approach inspired by ikebana, so each arrangement feels connected to its setting rather than placed within it.",
  },
];

function FaqSection() {
  return (
    <section className="bg-(--blush)/25 py-16 px-6 md:px-12 lg:px-16">
      <SectionTitle kicker="FAQ" title="Good to Know" />
      <dl className="max-w-[900px] mx-auto mt-4 sm:mt-0 divide-y divide-(--clover) border-y border-(--clover)">
        {faqs.map(({ question, answer }) => (
          <div
            key={question}
            className="py-8 flex flex-col items-center gap-3 text-center sm:grid sm:grid-cols-[22rem_1fr] sm:gap-x-6 sm:items-start sm:text-left"
          >
            <dt className="italic uppercase text-[18px] leading-6 tracking-[-0.04em] text-(--dark-green)">
              {question}
            </dt>
            <dd className="text-[14px] leading-6">{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
