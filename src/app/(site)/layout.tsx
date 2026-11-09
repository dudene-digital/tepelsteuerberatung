import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell, { Statistik } from "@/components/SiteShell";
import { gloock, schibsted } from "@/lib/fonts";
import { baseOpenGraph } from "@/lib/seo";

const siteUrl = "https://tepel-steuerberatung.de";

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Steuerberater Wiesbaden für Online-Händler & Unternehmer | Tepel",
    template: "%s | Tepel Steuerberatung",
  },
  description:
    "Digitale Steuerberatung in Wiesbaden: Buchhaltung, Lohn, Jahresabschluss und Steuern für E-Commerce, GmbH, Freiberufler und Vermieter. Fester Ansprechpartner, Antwort in 24 Stunden.",
  keywords: [
    "Steuerberater Wiesbaden",
    "Steuerberatung Wiesbaden",
    "digitale Steuerberatung",
    "Buchhaltung Wiesbaden",
    "Lohnabrechnung Wiesbaden",
    "Steuerberater für Online-Händler",
    "Fabian Tepel",
    "Tepel Steuerberatung",
    "Steuergestaltung",
    "Finanzberatung Wiesbaden",
  ],
  authors: [{ name: "Fabian Tepel" }],
  creator: "Tepel Steuerberatung",
  openGraph: baseOpenGraph,
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${gloock.variable} ${schibsted.variable} antialiased scroll-smooth`}
    >
      <head>
        <Statistik />
      </head>
      <body suppressHydrationWarning className="flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
