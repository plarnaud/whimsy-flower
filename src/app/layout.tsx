import type { Metadata } from "next";
import { Beth_Ellen, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
      </body>
    </html>
  );
}
