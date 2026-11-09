import type { Metadata } from "next";
import { connection } from "next/server";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { ArtikelListe } from "@/components/Ratgeber";
import { CtaBand, PageHero, Section, type Crumb } from "@/components/ui";
import { veroeffentlichteArtikel } from "@/lib/ratgeber";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ratgeber",
  description: "Artikel zu Steuern und Buchhaltung für Online-Händler, GmbHs, Freiberufler und Vermieter.",
  ...pageMeta("/wissen"),
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Ratgeber", href: "/wissen" },
];

export default async function RatgeberPage() {
  // Artikel kommen zur Laufzeit aus dem CMS, nicht aus dem Build.
  await connection();
  const artikel = await veroeffentlichteArtikel();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title="Ratgeber" breadcrumbs={breadcrumbs} />
      <Section labelledBy="artikel-heading">
        <h2 id="artikel-heading" className="sr-only">
          Artikel
        </h2>
        <div className="grid-12">
          <div className="col-content min-w-0">
            {artikel.length === 0 ? (
              <p className="text-lead text-muted">Hier erscheinen bald die ersten Artikel.</p>
            ) : (
              <ArtikelListe artikel={artikel} />
            )}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
