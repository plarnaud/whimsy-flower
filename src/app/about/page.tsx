"use client";

import PageScaffold from "@/components/pageScaffold";
import MeetWhimsy from "@/components/meetWhimsy";
import SubPageHeader from "@/components/subPageHeader";
import { useEffect, useMemo, useState } from "react";
import { InquireFormSection } from "@/components/inquireForm";

export default function AboutPage() {
  return (
    <PageScaffold>
      <SubPageHeader
        title="About"
        imgSrc="/home-lander-section-bg.webp"
        imgAlt="Wedding bouquet with white and blush roses and greenery"
      />

      <MeetWhimsy />

      <InquireFormSection />
    </PageScaffold>
  );
}
