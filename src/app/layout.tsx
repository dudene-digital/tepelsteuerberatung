import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
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
      className={`${inter.variable} ${manrope.variable} dark antialiased scroll-smooth`}
    >
      <head>
        <Script
          defer
          data-domain="tepel-steuerberatung.de"
          src="https://analytics.tepel-steuerberatung.de/js/script.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-primary selection:text-on-primary min-h-full flex flex-col overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">
          Zum Inhalt springen
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
