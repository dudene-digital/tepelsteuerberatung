import type { Metadata } from "next";

/* Open-Graph-Grundwerte für alle Seiten. Next führt Metadaten nur flach zusammen: Setzt eine Seite openGraph,
   ersetzt sie den Block aus dem Layout ganz. Deshalb bauen Layout und Seiten ihn aus derselben Quelle. */
export const baseOpenGraph = {
  type: "website",
  locale: "de_DE",
  siteName: "Tepel Steuerberatung",
  images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Fabian Tepel Steuerberatung in Wiesbaden" }],
} satisfies Metadata["openGraph"];

/** Canonical und og:url einer Seite, beide relativ zu metadataBase. */
export function pageMeta(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return { alternates: { canonical: path }, openGraph: { ...baseOpenGraph, url: path } };
}
