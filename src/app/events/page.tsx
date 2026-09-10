import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import PhotoStack, { StackPhoto } from "@/components/photoStack";
import PillButton from "@/components/pillButton";
import MeetWhimsy from "@/components/meetWhimsy";
import { InquireFormSection } from "@/components/inquireForm";
import JsonLd from "@/components/jsonLd";
import { breadcrumbGraph } from "@/lib/structuredData";
import { portfolioAlts } from "@/data/portfolioAlts";
import { blurFor } from "@/lib/blur";
import PageHero from "@/components/pageHero";

export const metadata: Metadata = {
  title: "Private Events & Flower Bars, Hudson Valley",
  description:
    "Floral design for private celebrations in the Hudson Valley and beyond: bridal showers, custom engagements, flower bars, and intimate gatherings.",
};

/* Every photo in a portfolio folder, with the chosen leads first. */
function stackPhotos(folder: string, lead: string[]): StackPhoto[] {
  const alts = portfolioAlts[folder] ?? {};
  const files = [...lead, ...Object.keys(alts).filter((f) => !lead.includes(f))];
  return files
    .filter((f) => alts[f])
    .map((f) => ({
      src: `/portfolio/${folder}/${f}`,
      alt: alts[f],
      blurDataURL: blurFor(`/portfolio/${folder}/${f}`),
    }));
}

export default function EventsPage() {
  return (
    <PageScaffold followUsModifiers="bg-(--clover)/25">
      <JsonLd data={breadcrumbGraph([{ name: "Events", path: "/events" }])} />
      <HeroSection />

      <ul id="celebrations" className="scroll-mt-24">
        <EventEntry
          title="Flower Bars"
          text="Share your palette and we’ll choose the best seasonal blooms. Enjoy watching guests compose their own bouquets to carry home. A favorite for bridal showers, birthdays, brand events, and gatherings that deserve a hands-on moment."
          buttonLabel="Schedule a Flower Bar"
          photos={stackPhotos("flower-bar", ["Image-7.webp", "Image-9.webp", "Image-12.webp"])}
          colorScheme={ColorScheme.CLOVER}
          reverse={false}
        />
        <EventEntry
          title="Custom Engagements"
          text="A proposal deserves more than a bouquet. We create custom floral environments that turn a meaningful location into something extraordinary, thoughtfully designed around your story, your setting, and the moment you’re about to share."
          buttonLabel="Design My Proposal"
          photos={stackPhotos("custom-engagement", ["Image-124.webp", "Image-10.webp", "Image-125.webp"])}
          colorScheme={ColorScheme.ROSE}
          reverse={true}
        />
        <EventEntry
          title="Bridal Showers, Rehearsal Dinners, and More!"
          text="Intimate celebrations deserve the same artistry as the main event. From sculptural tablescape to atmospheric installations, we create designs that feel unique, personal, and unmistakably yours."
          buttonLabel="Design My Event"
          photos={[
            { src: "/portfolio/bridal-showers/DSC03527.webp", alt: "Limelight hydrangea, white dahlias and bells of Ireland rise from a wooden crate, vine trailing across the dark tabletop" },
            { src: "/portfolio/bridal-showers/DSC03545.webp", alt: "Footed white vessel of blush lisianthus, cream ranunculus, sweet pea and dahlias beside a sage taper on white linen" },
            { src: "/portfolio/bridal-showers/DSC03531.webp", alt: "Bud vases of white dahlias, blush lisianthus and sweet pea run down a long white table between sage taper candles" },
            { src: "/portfolio/bridal-showers/DSC03539.webp", alt: "Limelight hydrangea and white lisianthus in a stone vessel beside a striped bar menu card and a small glass lamp" },
          ]}
          colorScheme={ColorScheme.OLIVE}
          reverse={false}
        />
      </ul>
      <InquireFormSection />
      <MeetWhimsy />
    </PageScaffold>
  );
}

function HeroSection() {
  return (
    <PageHero
      kicker="Showers, engagements, flower bars & every gathering in between"
      title="Private Events"
      scrollTo="#celebrations"
      scrollLabel="Scroll to celebrations"
      rule
    >
      <p>
        Not every celebration is a wedding, and the ones in between deserve
        the same artistry. From hands-on flower bars to intimate dinner
        parties, we bring composed, seasonal florals to the moments you gather
        the people you love, from our studio in Hudson, New York and beyond.
      </p>
    </PageHero>
  );
}

enum ColorScheme {
  CLOVER,
  ROSE,
  OLIVE,
}

type EventEntryProps = {
  title: string;
  text: string;
  buttonLabel: string;
  photos: StackPhoto[];
  colorScheme: ColorScheme;
  reverse: boolean;
};

function EventEntry({
  title,
  text,
  buttonLabel,
  photos,
  colorScheme,
  reverse = false,
}: EventEntryProps) {
  const titleColor =
    (
      {
        [ColorScheme.CLOVER]: "text-(--clover)",
        [ColorScheme.ROSE]: "text-(--rose)",
        [ColorScheme.OLIVE]: "text-(--olive)",
      } as const
    )[colorScheme] ?? "text-(--clover)";
  const textColor =
    (
      {
        [ColorScheme.CLOVER]: "text-(--dark-clover)",
        [ColorScheme.ROSE]: "text-(--dark-rose)",
        [ColorScheme.OLIVE]: "text-(--dark-olive)",
      } as const
    )[colorScheme] ?? "text-(--dark-clover)";

  const buttonColor =
    (
      {
        [ColorScheme.CLOVER]: "clover",
        [ColorScheme.ROSE]: "rose",
        [ColorScheme.OLIVE]: "olive",
      } as const
    )[colorScheme] ?? "green1";

  return (
    <li
      className={`flex flex-col items-center justify-center gap-2 lg:gap-16 xl:gap-28 px-6 md:px-12 lg:px-16 pt-8 pb-20 lg:py-12 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left gap-4 py-8 lg:py-12 w-full lg:w-auto lg:max-w-[560px]">
        <h2
          className={`font-title sm:text-[48px] sm:leading-16 text-[48px] leading-16 ${titleColor}`}
        >
          {title}
        </h2>
        <p className={`font-text text-[14px] leading-6 ${textColor}`}>
          {text}
        </p>
        <PillButton
          label={buttonLabel}
          color={buttonColor}
          href="#inquire"
          className="capitalize mt-4"
        />
      </div>
      <div className="w-full lg:w-auto flex justify-center py-6 shrink-0 order-first lg:order-none">
        <PhotoStack
          photos={photos.map((photo) => ({
            ...photo,
            blurDataURL: photo.blurDataURL ?? blurFor(photo.src),
          }))}
          className="w-full lg:w-[clamp(320px,34vw,480px)]"
        />
      </div>
    </li>
  );
}
