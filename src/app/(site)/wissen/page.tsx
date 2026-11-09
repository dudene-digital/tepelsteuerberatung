import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, Section, type Crumb } from "@/components/ui";
import { formatDatum, veroeffentlichteArtikel } from "@/lib/ratgeber";
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
              <ul className="border-t border-rule">
                {artikel.map((eintrag) => (
                  <li key={eintrag.id} className="border-b border-rule">
                    <Link href={`/wissen/${eintrag.slug}`} className="group block py-5 lg:py-7">
                      <p className="text-base text-muted">
                        {eintrag.kategorie.name}
                        {eintrag.veroeffentlichtAm && <> · {formatDatum(eintrag.veroeffentlichtAm)}</>}
                      </p>
                      <h3 className="mt-1 font-display text-h2 text-balance decoration-1 underline-offset-[0.14em] group-hover:underline touch:underline">
                        {eintrag.titel}
                      </h3>
                      <p className="mt-2 max-w-[46rem] text-muted text-pretty">{eintrag.teaser}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
