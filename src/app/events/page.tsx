import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import SubPageHeader from "@/components/subPageHeader";
import PhotoStack, { StackPhoto } from "@/components/photoStack";
import PillButton from "@/components/pillButton";
import MeetWhimsy from "@/components/meetWhimsy";
import { InquireFormSection } from "@/components/inquireForm";
import JsonLd from "@/components/jsonLd";
import { breadcrumbGraph } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Private Events & Floral Workshops, Hudson Valley",
  description:
    "Bespoke floral design for private celebrations across the Hudson Valley and New York City: bridal and baby showers, hands-on floral workshops, flower bars, and intimate gatherings, composed by Whimsy Flower in Hudson, NY.",
};

export default function EventsPage() {
  return (
    <PageScaffold followUsModifiers="bg-(--clover)/25">
      <JsonLd data={breadcrumbGraph([{ name: "Events", path: "/events" }])} />
      <SubPageHeader
        title="Private Events"
        imgSrc="/home-lander-section-bg.webp"
        imgAlt="Long wooden table with bud vases of coral poppies, white spirea and sweet pea among taper candles, climbing roses behind"
        subtitle="Showers, workshops & flower bars across the Hudson Valley and New York City"
      />

      <section className="pt-16 px-6 flex flex-col items-center text-center">
        <h2 className="text-[18px] tracking-[-0.04em] uppercase">
          Showers, workshops, flower bars & every gathering in between
        </h2>
        <p className="max-w-[644px] py-6 text-[14px] leading-6">
          Not every celebration is a wedding, and the ones in between deserve
          the same artistry. From hands-on flower bars to intimate dinner
          parties, we bring composed, seasonal florals to the moments you
          gather the people you love, from our studio in Hudson, New York to
          celebrations across the Hudson Valley, the Catskills, and New York
          City.
        </p>
      </section>

      <ul>
        <EventEntry
          title="Flower Bars"
          text="Choose your palette and seasonal blooms, and watch guests compose their own bouquets to carry home. A favorite for bridal showers, birthdays, and gatherings that deserve a hands-on moment. Our flower bars turn any room into a working studio."
          buttonLabel="Schedule a Flower Bar"
          photos={[
            { src: "/brand02.webp", alt: "A woman with long auburn hair reaches up to hang stems of white delphinium suspended by fine wire from a willow branch" },
            { src: "/brand03.webp", alt: "Two women glance back beside a river, each holding a small bouquet of white daisies tied with long trailing silk ribbons" },
            { src: "/brand01.webp", alt: "Two women in white linen laugh in a tall-grass meadow, holding armfuls of white scabiosa and veronica against hazy hills" },
          ]}
          colorScheme={ColorScheme.CLOVER}
          reverse={false}
        />
        <EventEntry
          title="Whimsy Workshops"
          text="Gather your people around a table of seasonal stems. Molly guides each session personally, teaching composition, movement, and texture while everyone builds an arrangement of their own. No experience needed; curiosity encouraged."
          buttonLabel="Schedule a Workshop"
          photos={[
            { src: "/services/workshops.webp", alt: "A woman in white lifts a tall stem of cream foxglove beside buckets of white delphinium, sheltered under a willow tree" },
            { src: "/brand01.webp", alt: "Two women in white linen laugh in a tall-grass meadow, holding armfuls of white scabiosa and veronica against hazy hills" },
            { src: "/brand03.webp", alt: "Two women glance back beside a river, each holding a small bouquet of white daisies tied with long trailing silk ribbons" },
          ]}
          colorScheme={ColorScheme.ROSE}
          reverse={true}
        />
        <EventEntry
          title="Bridal & Baby Showers"
          text="Intimate celebrations deserve the same artistry as the main event. From sculptural tablescapes to atmospheric installations, we design showers that feel collected, personal, and unmistakably yours."
          buttonLabel="Design My Shower"
          photos={[
            { src: "/brand01.webp", alt: "Two women in white linen laugh in a tall-grass meadow, holding armfuls of white scabiosa and veronica against hazy hills" },
            { src: "/services/events.webp", alt: "Two women arrange white cosmos, daisies and yarrow in fluted white vessels on a plywood flower stand beneath orchard trees" },
            { src: "/brand02.webp", alt: "A woman with long auburn hair reaches up to hang stems of white delphinium suspended by fine wire from a willow branch" },
          ]}
          colorScheme={ColorScheme.OLIVE}
          reverse={false}
        />
        <EventEntry
          title="Intimate Celebrations"
          text="Birthdays, anniversaries, dinner parties, and every milestone in between: bespoke florals scaled to your space and your occasion, composed to make the evening feel remembered."
          buttonLabel="Plan a Celebration"
          photos={[
            { src: "/services/events.webp", alt: "Two women arrange white cosmos, daisies and yarrow in fluted white vessels on a plywood flower stand beneath orchard trees" },
            { src: "/brand03.webp", alt: "Two women glance back beside a river, each holding a small bouquet of white daisies tied with long trailing silk ribbons" },
            { src: "/brand02.webp", alt: "A woman with long auburn hair reaches up to hang stems of white delphinium suspended by fine wire from a willow branch" },
          ]}
          colorScheme={ColorScheme.CLOVER}
          reverse={true}
        />
      </ul>
      <InquireFormSection />
      <MeetWhimsy />
    </PageScaffold>
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
          photos={photos}
          className="w-full lg:w-[clamp(320px,34vw,480px)]"
        />
      </div>
    </li>
  );
}
