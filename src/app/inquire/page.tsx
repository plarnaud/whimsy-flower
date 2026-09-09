import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import JsonLd from "@/components/jsonLd";
import { InquireFormSection } from "@/components/inquireForm";
import { breadcrumbGraph } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Inquire: Wedding & Event Florals, Hudson Valley & NYC",
  description:
    "Begin a conversation with Whimsy Flower about wedding, event, or brand florals across the Hudson Valley, the Catskills, and New York City. Studio in Hudson, NY.",
};

export default function InquirePage() {
  return (
    <PageScaffold followUsModifiers="bg-(--clover)/20">
      <JsonLd data={breadcrumbGraph([{ name: "Inquire", path: "/inquire" }])} />

      <section className="pt-16 px-6 flex flex-col items-center text-center">
        <h1 className="text-[18px] tracking-[-0.04em] uppercase">
          Begin the conversation
        </h1>
        <p className="max-w-[644px] py-6 text-[14px] leading-6">
          Tell us about the celebration you are imagining: the date, the
          setting, and the feeling you want to leave behind. Our studio in
          Hudson, New York takes on a limited number of commissions each season
          across the Hudson Valley, the Catskills, and New York City, and
          full-service wedding commissions begin at $8,000. Share what you know
          so far, and Molly will be in touch to arrange a conversation.
        </p>
      </section>

      <InquireFormSection />
    </PageScaffold>
  );
}
