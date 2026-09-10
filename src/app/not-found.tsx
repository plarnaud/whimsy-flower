import type { Metadata } from "next";
import Link from "next/link";
import PageScaffold from "@/components/pageScaffold";
import PillButton from "@/components/pillButton";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/* Plain block on the page background, sized to end near 75% of the viewport. */
export default function NotFound() {
  return (
    <PageScaffold>
      <section className="w-full">
        {/* Ends about three quarters down the viewport (navbar spacer is 8.5rem) */}
        <div className="w-full min-h-[calc(75dvh-8.5rem)] py-16 sm:py-24 px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-[18px] tracking-[-0.04em] uppercase">
            Page not found
          </h1>
          <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--olive)">
            Nothing Here Yet
          </h2>
          <p className="max-w-[644px] py-6 text-[14px] leading-6">
            The page you were looking for has moved, or never took root. Head
            back to the beginning, or wander through our recent weddings.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <PillButton label="Back to Home" href="/" />
            <Link
              href="/weddings"
              className="inline-flex items-center min-h-12 px-4 uppercase text-[14px] tracking-[-0.04em] text-(--dark-green) hover:text-(--darker-green) underline underline-offset-4"
            >
              Recent Weddings
            </Link>
          </div>
        </div>
      </section>
    </PageScaffold>
  );
}
