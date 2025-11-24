import type { ReactNode } from "react";

import Footer from "@/components/footer";
import FollowUsSection from "@/components/followUs";
import Navbar from "@/components/navbar";

type PageScaffoldProps = {
  title: string;
  children?: ReactNode;
  fullHeightHero?: boolean;
  sectionClassName?: string;
};

// Shared shell for simple pages while real content is built out.
export default function PageScaffold({
  title,
  children,
  fullHeightHero = true,
  sectionClassName,
}: PageScaffoldProps) {
  const sectionClasses =
    sectionClassName ?? "flex flex-col pt-40 px-6 md:px-12 lg:px-16";

  return (
    <main>
      <Navbar />
      <section className={sectionClasses}>
        <div
          className={`flex-1 flex items-center justify-center text-center ${
            fullHeightHero ? "min-h-screen" : "min-h-[40vh]"
          }`}
        >
          <h1 className="font-title text-[clamp(48px,6vw,72px)] leading-[clamp(64px,7vw,84px)] text-(--dark-olive)">
            {title}
          </h1>
        </div>
        {children}
      </section>
      <FollowUsSection />
      <Footer />
    </main>
  );
}
