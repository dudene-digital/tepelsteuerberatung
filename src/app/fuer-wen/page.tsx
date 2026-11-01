import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, LinkCard, PageHero, Section, type Crumb } from "@/components/ui";
import { fuerWenUebersicht, zielgruppen } from "@/content/zielgruppen";

export const metadata: Metadata = {
  title: fuerWenUebersicht.h1,
  description: fuerWenUebersicht.intro,
  alternates: { canonical: "/fuer-wen" },
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Für wen", href: "/fuer-wen" },
];

export default function FuerWenPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={fuerWenUebersicht.h1} intro={fuerWenUebersicht.intro} breadcrumbs={breadcrumbs} />
      <Section tone="low">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {zielgruppen.map((zielgruppe, index) => (
            /* Die erste Kachel ist der Schwerpunkt und füllt mit doppelter Breite die Reihe. */
            <div key={zielgruppe.slug} className={`grid ${index === 0 ? "md:col-span-2" : ""}`}>
              <LinkCard
                href={zielgruppe.href}
                title={zielgruppe.kachel.titel}
                text={zielgruppe.kachel.teaser}
                icon={zielgruppe.icon}
                headingLevel={2}
              />
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
