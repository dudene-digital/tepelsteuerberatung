import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, LeadIndex, PageHero, Section, type Crumb } from "@/components/ui";
import { fuerWenUebersicht, zielgruppen } from "@/content/zielgruppen";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: fuerWenUebersicht.h1,
  description: fuerWenUebersicht.intro,
  ...pageMeta("/fuer-wen"),
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Für wen", href: "/fuer-wen" },
];

export default function FuerWenPage() {
  const [schwerpunkt, ...weitere] = zielgruppen;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={fuerWenUebersicht.h1} intro={fuerWenUebersicht.intro} breadcrumbs={breadcrumbs} />
      <Section>
        <LeadIndex
          headingLevel={2}
          lead={{ title: schwerpunkt.kachel.titel, text: schwerpunkt.kachel.teaser, href: schwerpunkt.href }}
          items={weitere.map((zielgruppe) => ({
            title: zielgruppe.kachel.titel,
            text: zielgruppe.kachel.teaser,
            href: zielgruppe.href,
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
