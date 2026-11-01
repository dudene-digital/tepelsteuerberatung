import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "Tepel Steuerberatung in Wiesbaden" }],
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
        <Navbar />
        <main id="main-content" className="relative flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
