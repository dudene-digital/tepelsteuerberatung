import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { veroeffentlichteArtikel } from "@/lib/ratgeber";
import { site } from "@/lib/site";

type Eintrag = {
  path: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
};

/* Alle indexierbaren Seiten aus Phase 1. /willkommen fehlt absichtlich, die Seite ist noindex. */
const seiten: readonly Eintrag[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/leistungen", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/finanzbuchhaltung", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/lohn", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/jahresabschluss", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/gruendung", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/steuergestaltung", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cfo-as-a-service", changeFrequency: "monthly", priority: 0.9 },
  { path: "/fuer-wen", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fuer-wen/e-commerce", changeFrequency: "monthly", priority: 0.9 },
  { path: "/fuer-wen/gmbh", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fuer-wen/freiberufler", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fuer-wen/immobilien", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fuer-wen/gruender", changeFrequency: "monthly", priority: 0.8 },
  { path: "/so-arbeiten-wir", changeFrequency: "monthly", priority: 0.7 },
  { path: "/honorar", changeFrequency: "monthly", priority: 0.7 },
  { path: "/team", changeFrequency: "monthly", priority: 0.7 },
  { path: "/wissen", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.3 },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.3 },
  { path: "/barrierefreiheit", changeFrequency: "yearly", priority: 0.3 },
];

/* Statische Seiten ohne lastModified: Das Build-Datum wäre bei jedem Deploy neu und sagt nichts über echte Änderungen.
   Ratgeber-Artikel kommen zur Laufzeit dazu, mit ihrem tatsächlichen Änderungsdatum. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const statisch: MetadataRoute.Sitemap = seiten.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    changeFrequency,
    priority,
  }));
  try {
    const artikel = await veroeffentlichteArtikel();
    return [
      ...statisch,
      ...artikel.map((eintrag) => ({
        url: `${site.url}/wissen/${eintrag.slug}`,
        lastModified: eintrag.updatedAt,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ];
  } catch (error) {
    // Ist die Datenbank kurz nicht erreichbar, bleibt die Sitemap trotzdem gültig.
    console.error("[SITEMAP] Artikel nicht abrufbar:", error instanceof Error ? error.message : error);
    return statisch;
  }
}
