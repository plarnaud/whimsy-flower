"use client";

import GalleryButton from "@/components/galleryButton";
import PageScaffold from "@/components/pageScaffold";
import { brandProjects } from "@/data/brandProjects";
import MeetWhimsy from "@/components/meetWhimsy";
import SubPageHeader from "@/components/subPageHeader";
import { useEffect, useMemo, useState } from "react";
import PillButton from "@/components/pillButton";
import { InquireFormSection } from "@/components/inquireForm";

export default function BrandsPage() {
  return (
    <PageScaffold>
      <SubPageHeader
        title="Editorial & Brands"
        imgSrc="/services/workshops.webp"
        imgAlt="Editorial floral styling by Whimsy Flower"
      />

      <ProjectsSection />

      <InquireFormSection />

      <div className="bg-(--pale-yellow)/25 py-8">
        <MeetWhimsy />
      </div>
    </PageScaffold>
  );
}

function ProjectsSection() {
  const [step, setStep] = useState(6);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      const nextStep = mq.matches ? 9 : 6;
      setStep(nextStep);
      setVisibleCount(nextStep);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const visibleProjects = useMemo(
    () => brandProjects.slice(0, visibleCount),
    [visibleCount],
  );

  return (
    <div className="py-12 lg:py-16 px-6 sm:px-12 lg:px-16 ">
      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-y-12 gap-x-6">
        {visibleProjects.map((project) => (
          <li key={project.slug}>
            <GalleryButton
              gallery={{
                imgSrc: project.coverImage,
                imgAlt: project.coverAlt,
                coupleName: project.brandName,
                galleryName: project.title,
                location: project.location,
                href: `/brands/${project.slug}`,
              }}
              showCTA={false}
            />
          </li>
        ))}
      </ul>
      {visibleCount < brandProjects.length && (
        <PillButton
          label="Load More"
          className="w-full mt-12 lg:mt-16"
          onClick={() =>
            setVisibleCount((c) => Math.min(c + step, brandProjects.length))
          }
        />
      )}
    </div>
  );
}
