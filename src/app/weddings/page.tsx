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
import { galleries } from "@/data/galleries";
import type { FeaturedGallery } from "@/components/galleryButton";
import { blurFor } from "@/lib/blur";

export const metadata: Metadata = {
  title: "Hudson Valley Wedding Floral Design",
  description:
    "Bespoke wedding florals from our studio in Hudson, NY: sculptural, seasonal designs for ceremonies and receptions across the Hudson Valley and beyond.",
};

export default function WeddingsPage() {
  const cards: FeaturedGallery[] = galleries.map((gallery) => ({
    imgSrc: gallery.coverImage,
    imgAlt: gallery.coverAlt,
    imgBlur: blurFor(gallery.coverImage),
    coupleName: gallery.coupleNames,
    year: gallery.year,
    location: gallery.location,
    href: `/galleries/${gallery.slug}`,
  }));

  return (
    <PageScaffold>
      <JsonLd
        data={breadcrumbGraph([{ name: "Weddings", path: "/weddings" }])}
      />
      <HeroSection />

      <GallerySection cards={cards} />

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
    <section className="relative w-full overflow-hidden border-b-[1.5px] border-(--clover)">
      <div className="absolute top-0 left-0 -z-100 w-full h-full opacity-[.165]">
        <WhimsyImage
          src="/home-lander-section-bg.webp"
            blurDataURL={blurFor("/home-lander-section-bg.webp")}
          alt="Long wooden table with bud vases of coral poppies, white spirea and sweet pea among taper candles, climbing roses behind"
          fill
          sizes="100vw"
          quality={50}
          priority
          fetchPriority="high"
          className="absolute left-0 right-0 -z-100 object-cover object-center"
        />
      </div>

      <div className="w-full py-10 sm:py-12 px-6 lg:min-h-[480px] flex flex-col items-center text-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-[18px] tracking-[-0.04em] uppercase">
            Wedding floral design across the Hudson Valley, the Catskills, New
            York City, and beyond
          </h1>
          <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--olive)">
            Hudson Valley Weddings
          </h2>
          <div className="max-w-[644px] py-6 text-[14px] leading-6 flex flex-col gap-4">
            <p>
              Your wedding should feel like an expression of you, not a
              collection of things you&apos;ve seen before.
            </p>
            <p>
              At Whimsy Flower, we create floral design with a point of view.
              We look beyond the bouquet and centerpiece to consider the entire
              visual experience, from the setting and architecture to the
              season, the way your guests move through the space, and the
              details that make the day unmistakably yours. We work closely
              with our couples to develop a floral vision that feels
              considered, unexpected, and completely personal.
            </p>
            <p>
              Our full service wedding work is for couples who care deeply
              about design and want more than beautiful flowers. We take on a
              limited number of celebrations each year so that every event
              receives our full creative attention, from the first conversation
              through installation. If you&apos;re looking for a floral designer
              who will bring a fresh perspective, push an idea a little
              further, and create something that could only belong to your
              wedding, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
        <a
          href="#recent-weddings"
          aria-label="Scroll to recent weddings"
          className="mt-8 flex flex-col items-center justify-center min-h-12 min-w-12 text-(--dark-green) hover:text-(--darker-green) transition-colors"
        >
          <ArrowRight className="h-4 w-6 rotate-90" />
        </a>
      </div>
    </section>
  );
}

const experienceSteps = [
  {
    title: "The Initial Consultation",
    text: "It begins with scheduling a phone call or video meeting to learn more about the two of you: the setting, the season, and the atmosphere you want your guests to step into. Molly leads every wedding personally, from the first call to the last stem placed.",
  },
  {
    title: "Creative Direction",
    text: "We translate that conversation into a “first draft” design proposal to give you a sense of what we could create for you. When you decide to move forward with Whimsy by submitting a deposit to book our services, we create an official design doc that includes: custom design boards, a seasonal floral palette, mock ups, and a detailed design plan drawn from your venue and your story, never from a template.",
  },
  {
    title: "Sourcing & Planning",
    text: "Seasonal sourcing from local growers, thoughtfully crafted and sourced hard-goods, venue walkthroughs, and a detailed production plan coordinated with your planner and venue, so the design feels uniquely yours.",
  },
  {
    title: "Final Design Meeting",
    text: "2 months prior to your wedding date we will schedule your final design meeting. This is where we review your design and make sure that it still aligns with how your planning has progressed. We make any necessary adjustments and finalize your design. It is after this meeting that your final payment is due.",
  },
  {
    title: "Day of Execution",
    text: "On the day, our team handles the complete installation: ceremony architecture, reception tablescape, and personal flowers delivered to you before the first photograph.",
  },
  {
    title: "The Reveal & Breakdown",
    text: "You celebrate; we handle the rest. When the evening ends, a discreet breakdown returns the venue without a trace. In our efforts to honor sustainability, all local grown blooms that you do not wish to take are composted to reduce waste and our hard-good rentals are picked up to eliminate single use items.",
  },
];

/* Same list treatment as the Editorial & Brands "Our Approach" section. */
function ExperienceSection() {
  return (
    <section className="bg-(--clover)/25 py-16 px-6 md:px-12 lg:px-16">
      <SectionTitle kicker="The experience" title="Whimsy's Process" />
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
    <section className="py-16 px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">
      {/* Title sits outside the 644px column so it holds one line on desktop */}
      <SectionTitle title="A Note on Investment" className="lg:whitespace-nowrap" />
      <div className="max-w-[644px] flex flex-col items-center text-center">
        <p className="text-[14px] leading-6">
          Whimsy Flower takes on a limited number of weddings each season,
          which allows our team to be hands-on from the first sketch to the
          final installation. Full-service wedding commissions begin at $8,000,
          with most celebrations investing more depending on scale, season, and
          location.
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
      "Our studio is in Hudson, New York. We design weddings throughout the Hudson Valley and beyond for the right celebration.",
  },
  {
    question: "When should we reach out?",
    answer:
      "As soon as you have a date and a venue. We take on a limited number of weddings each season, and peak dates from May through October are reserved well in advance.",
  },
  {
    question: "What does a full-service event mean?",
    answer:
      "Full service events are when Whimsy books that date outright for you. We arrive at the venue and are there with you all the way until clean up at the end of the night. These typically include personals, ceremony decor, cocktail hour, reception, installations, and more.",
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
      "Seasonal, artful and unique. We favor blooms at their peak, composed with movement and negative space in an approach inspired by nature, so each arrangement feels connected to its setting rather than placed within it.",
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
