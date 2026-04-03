import type { Metadata } from "next";
import { Inter, Manrope, Great_Vibes } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const siteUrl = "https://tepel-steuerberatung.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fabian Tepel | Steuerberatung in Wiesbaden",
    template: "%s | Tepel Steuerberatung",
  },
  description:
    "Digitale & agile Steuerberatung in Wiesbaden. Fabian Tepel bietet maßgeschneiderte Lösungen für Unternehmer, Start-ups und Freiberufler – von Buchhaltung über Lohn & Gehalt bis zur strategischen Steuergestaltung.",
  keywords: [
    "Steuerberater Wiesbaden",
    "Steuerberatung Wiesbaden",
    "digitale Steuerberatung",
    "Buchhaltung Wiesbaden",
    "Lohnabrechnung Wiesbaden",
    "Steuerberater für Start-ups",
    "Fabian Tepel",
    "Tepel Steuerberatung",
    "Steuergestaltung",
    "Finanzberatung Wiesbaden",
  ],
  authors: [{ name: "Fabian Tepel" }],
  creator: "Tepel Steuerberatung",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Tepel Steuerberatung",
    title: "Fabian Tepel | Digitale Steuerberatung in Wiesbaden",
    description:
      "Maßgeschneiderte Steuerberatung für Unternehmer, Start-ups und Freiberufler. Digital, agil und persönlich betreut.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tepel Steuerberatung – Digitale & Agile Steuerberatung in Wiesbaden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabian Tepel | Digitale Steuerberatung in Wiesbaden",
    description:
      "Maßgeschneiderte Steuerberatung für Unternehmer, Start-ups und Freiberufler. Digital, agil und persönlich betreut.",
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
  alternates: {
    canonical: siteUrl,
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
      className={`${inter.variable} ${manrope.variable} ${greatVibes.variable} dark antialiased scroll-smooth`}
    >
      <body className="antialiased selection:bg-primary selection:text-on-primary min-h-full flex flex-col overflow-x-hidden">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
