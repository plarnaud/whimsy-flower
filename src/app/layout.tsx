import type { Metadata } from "next";
import { Beth_Ellen, Libre_Baskerville } from "next/font/google";
import "./globals.css";

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

const libreBaskervilleBold = Libre_Baskerville({
  variable: "--font-libre-baskerville-bold",
  subsets: ["latin"],
  weight: "700",
});

const libreBaskervilleItalic = Libre_Baskerville({
  variable: "--font-libre-baskerville-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Whimsy Flower",
  description: "Beskope floral designer for weddings and events",
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
        {children}
      </body>
    </html>
  );
}
