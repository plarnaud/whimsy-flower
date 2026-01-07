import type { ReactNode } from "react";

import Footer from "@/components/footer";
import FollowUsSection from "@/components/followUs";
import Navbar from "@/components/navbar";

type PageScaffoldProps = {
  children?: ReactNode;
  followUsModifiers?: string;
};

// Shared shell for simple pages while real content is built out.
export default function PageScaffold({
  children,
  followUsModifiers,
}: PageScaffoldProps) {
  return (
    <main>
      <Navbar />
      <div className="h-34" />
      {children}
      <FollowUsSection className={followUsModifiers} />
      <Footer />
    </main>
  );
}
