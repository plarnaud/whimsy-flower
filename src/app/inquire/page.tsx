import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import JsonLd from "@/components/jsonLd";
import { InquireFormSection } from "@/components/inquireForm";
import { breadcrumbGraph } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Inquire: Wedding & Event Florals, Hudson Valley",
  description:
    "Begin a conversation with Whimsy Flower about wedding, event, or brand florals across the Hudson Valley, the Catskills, and New York City. Studio in Hudson, NY.",
};

export default function InquirePage() {
  return (
    <PageScaffold followUsModifiers="bg-(--clover)/20">
      <JsonLd data={breadcrumbGraph([{ name: "Inquire", path: "/inquire" }])} />
      <InquireFormSection headingLevel="h1" />
    </PageScaffold>
  );
}
