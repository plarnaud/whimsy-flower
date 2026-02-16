import PageScaffold from "@/components/pageScaffold";
import SubPageHeader from "@/components/subPageHeader";
import WhimsyImage from "@/components/whimsyImage";
import { ScheduleEventButton, eventType } from "@/components/pillButton";
import MeetWhimsy from "@/components/meetWhimsy";
import { InquireFormSection } from "@/components/inquireForm";

export default function EventsPage() {
  return (
    <PageScaffold followUsModifiers="bg-(--clover)/25">
      <SubPageHeader
        title="Events"
        imgSrc="/home-lander-section-bg.webp"
        imgAlt="Wedding bouquet with white and blush roses and greenery"
      />

      <ul>
        <EventEntry
          title="Flower Bars"
          text="Choose your vibe, budget, and colors, and watch as guests create bouquets, capturing memorable moments. Perfect for bridal showers, birthdays, and events, our Flower Bars elevate any space with fresh blooms."
          buttonLabel="Schedule a Flower Bar"
          eventType={eventType.FLOWER_BAR}
          imgSrc="/brand02.webp"
          imgAlt="Flower bar with various flowers and greenery"
          colorScheme={ColorScheme.CLOVER}
          reverse={false}
        />
        <EventEntry
          title="Whimsy Workshop"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non congue augue. Proin vestibulum, magna eget placerat scelerisque, ante neque dapibus nisl, at mattis lorem neque eget ipsum. Nulla ut libero tincidunt, mattis nibh et, fringilla nisi."
          buttonLabel="Schedule a Workshop"
          eventType={eventType.WORKSHOP}
          imgSrc="/brand02.webp"
          imgAlt="Workshop with participants creating floral arrangements"
          colorScheme={ColorScheme.ROSE}
          reverse={true}
        />
        <EventEntry
          title="Corporate Event"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non congue augue. Proin vestibulum, magna eget placerat scelerisque, ante neque dapibus nisl, at mattis lorem neque eget ipsum. Nulla ut libero tincidunt, mattis nibh et, fringilla nisi."
          buttonLabel="Schedule a Corporate Event"
          eventType={eventType.CORPORATE}
          imgSrc="/brand02.webp"
          imgAlt="Corporate event with elegant floral arrangements"
          colorScheme={ColorScheme.OLIVE}
          reverse={false}
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
  eventType: eventType;
  imgSrc: string;
  imgAlt: string;
  colorScheme: ColorScheme;
  reverse: boolean;
};

function EventEntry({
  title,
  text,
  buttonLabel,
  eventType,
  imgSrc,
  imgAlt,
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
    <li className="sm:grid sm:grid-cols-2 flex flex-col w-full items-center">
      <div
        className={`flex flex-col justify-start gap-4 sm:pl-16 sm:pr-12 px-6 sm:py-36 py-16 ${
          reverse ? "sm:order-2" : "sm:order-1"
        }`}
      >
        <h2
          className={`font-title sm:text-[48px] sm:leading-16 text-[48px] leading-16 ${titleColor}`}
        >
          {title}
        </h2>
        <span className={`font-text text-[14px] leading-6 ${textColor}`}>
          {text}
        </span>
        <ScheduleEventButton
          label={buttonLabel}
          color={buttonColor}
          eventType={eventType}
          className="capitalize mt-4"
        />
      </div>
      <div
        className={`w-full sm:h-full h-[400px] relative ${
          reverse ? "sm:order-1" : "sm:order-2"
        }`}
      >
        <WhimsyImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes=""
          className="h-full object-cover"
        />
      </div>
    </li>
  );
}
