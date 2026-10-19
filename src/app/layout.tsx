import type { Metadata } from "next";
import Script from "next/script";
import { Beth_Ellen, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AnalyticsClicks from "@/components/analyticsClicks";
import JsonLd from "@/components/jsonLd";
import { baseOpenGraph, siteConfig, siteUrl } from "@/lib/siteConfig";
import { organizationGraph } from "@/lib/structuredData";

const bethEllen = Beth_Ellen({
  variable: "--font-beth-ellen",
  subsets: ["latin"],
  weight: "400",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Whimsy Flower",
  },
  description: siteConfig.description,
  // "./" resolves against each page's own path, so every route gets a
  // self-referencing canonical on the production host.
  alternates: { canonical: "./" },
  openGraph: {
    ...baseOpenGraph,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.ogImage.url],
  },
  robots: { index: true, follow: true },
};

// Google Analytics 4 (also feeds French Fry Dash). Production only, so the
// staging site's visits stay out of the numbers. Enhanced measurement counts
// client-side route changes from browser history events.
//
// Consent Mode v2: visitors in the EEA, the UK and Switzerland are measured
// without cookies (analytics_storage denied there); everyone else normally.
// No advertising features, ever: ad storage off, Google signals off,
// ad-personalisation off, ad data redacted.
const GA_MEASUREMENT_ID = "G-ML3SEK0K5V";
const isProduction = process.env.VERCEL_ENV === "production";
const EEA_UK_CH = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
];
const GA_BOOTSTRAP = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("consent", "default", {ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", region: ${JSON.stringify(EEA_UK_CH)}, wait_for_update: 500});
gtag("consent", "default", {ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted"});
gtag("set", "ads_data_redaction", true);
gtag("js", new Date());
gtag("config", "${GA_MEASUREMENT_ID}", {allow_google_signals: false, allow_ad_personalization_signals: false});`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bethEllen.variable} ${libreBaskerville.variable} antialiased`}
      >
        <JsonLd data={organizationGraph()} />
        {children}
        <SpeedInsights />
        {isProduction ? (
          <>
            <Script id="ga4" strategy="afterInteractive">
              {GA_BOOTSTRAP}
            </Script>
            {/* lazyOnload: afterInteractive makes Next emit a high-priority
                <link rel="preload"> for this ~180 KB script in <head>, where
                it competes with the hero image and adds main-thread work
                before LCP. The bootstrap above already queues the config in
                dataLayer, so nothing is lost by loading the library later. */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <AnalyticsClicks />
          </>
        ) : null}
      </body>
    </html>
  );
}
