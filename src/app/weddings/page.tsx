import type { Metadata } from "next";
import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import SubPageHeader from "@/components/subPageHeader";
import { InquireFormSection } from "@/components/inquireForm";
import GallerySection from "./gallerySection";

export const metadata: Metadata = {
  title: "Wedding Floral Design",
  description:
    "Bespoke wedding florals by Whimsy Flower — sculptural, seasonal designs composed for ceremonies, receptions, and every moment in between. Explore our wedding galleries.",
};

export default function WeddingsPage() {
  return (
    <PageScaffold>
      <SubPageHeader
        title="Weddings"
        imgSrc="/home-lander-section-bg.webp"
        imgAlt="Wedding bouquet with white and blush roses and greenery"
      />

      <GallerySection />

      <InquireFormSection />

      <div className="bg-(--pale-yellow)/25 py-8">
        <MeetWhimsy />
      </div>
    </PageScaffold>
  );
}
