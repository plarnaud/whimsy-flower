import type { Metadata } from "next";
import Link from "next/link";

import PageScaffold from "@/components/pageScaffold";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} handles what you share on this website: the inquiry form, Google Analytics with every advertising feature off, and your choices.`,
};

const UPDATED = "October 16, 2026";

/** Accurate to what the site actually collects: keep it in step with the code. */
export default function PrivacyPage() {
  return (
    <PageScaffold>
      <article className="mx-auto max-w-3xl px-6 py-16 text-(--dark-green) flex flex-col gap-6 text-[16px] leading-7">
        <h1 className="text-[48px] leading-16 text-(--dark-olive) font-title">Privacy Policy</h1>
        <p className="italic">Last updated {UPDATED}</p>

        <p>
          This policy explains what {siteConfig.legalName} (&ldquo;we&rdquo;) collects when you use{" "}
          {siteConfig.url.replace(/^https?:\/\//, "")}, and what we do with it. We don&rsquo;t sell
          your information, and we don&rsquo;t use it for advertising.
        </p>

        <h2 className="text-[28px] text-(--dark-olive) font-title">What you send us</h2>
        <p>
          When you use the inquiry form, you give us your name, email address, the occasion,
          location, date and budget of your event, and anything else you choose to add. It reaches
          us by email (sent through our email provider, Resend) and we use it only to reply to you
          and plan your florals. We keep it as long as we need it for that, and you can ask us to
          delete it at any time.
        </p>

        <h2 className="text-[28px] text-(--dark-olive) font-title">Analytics</h2>
        <p>
          We use Google Analytics to understand how the site is used: which pages are visited, how
          visitors arrived (for example from a search or from Instagram), the kind of device and
          browser, the approximate location (city or country, never your exact address), and
          actions such as opening a photo or sending an inquiry. We never send Google your name,
          email address, or anything you type into the form.
        </p>
        <p>
          Google Analytics sets cookies named <code>_ga</code> and <code>_ga_*</code> to tell
          returning visits apart. If you visit from the European Economic Area, the United Kingdom or
          Switzerland, those cookies are not set and visits are measured without them. Google
          signals and every advertising feature are turned off. Google processes this data on our
          behalf; see{" "}
          <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Google&rsquo;s privacy policy
          </a>
          . You can opt out of Google Analytics on every website with Google&rsquo;s{" "}
          <a className="underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
            opt-out browser add-on
          </a>
          , or by blocking cookies in your browser.
        </p>
        <p>
          We also use Vercel Speed Insights, which measures how fast pages load. It doesn&rsquo;t use
          cookies and doesn&rsquo;t identify you.
        </p>

        <h2 className="text-[28px] text-(--dark-olive) font-title">Your choices</h2>
        <p>
          You can ask what we hold about you, ask us to correct or delete it, or ask any question
          about this policy through our{" "}
          <Link className="underline" href="/inquire">
            inquiry form
          </Link>
          . Depending on where you live (for example California, or the EU), you may have further
          rights under local law, and we will honour them.
        </p>

        <h2 className="text-[28px] text-(--dark-olive) font-title">Changes</h2>
        <p>
          If we change what we collect, we will update this page and the date at the top.
        </p>
      </article>
    </PageScaffold>
  );
}
