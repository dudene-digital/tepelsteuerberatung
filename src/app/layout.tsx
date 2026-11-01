import type { Metadata, Viewport } from "next";
import { Gloock, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const gloock = Gloock({
  variable: "--font-gloock",
  weight: "400",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

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
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Tepel Steuerberatung",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Fabian Tepel Steuerberatung in Wiesbaden" }],
  },
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
        <Script
          defer
          data-domain="tepel-steuerberatung.de"
          src="https://analytics.tepel-steuerberatung.de/js/script.js"
        />
      </head>
      <body suppressHydrationWarning className="flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Zum Inhalt springen
        </a>
        <Navbar />
        <main id="main-content" className="frame flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
