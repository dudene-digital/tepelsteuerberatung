import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, EntryList, PageHero, Section, type Crumb } from "@/components/ui";
import { leistungen, leistungenUebersicht } from "@/content/leistungen";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: leistungenUebersicht.title,
  description: leistungenUebersicht.description,
  ...pageMeta("/leistungen"),
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Leistungen", href: "/leistungen" },
];

export default function LeistungenPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={leistungenUebersicht.h1} breadcrumbs={breadcrumbs} />
      <Section>
        <div className="grid-12">
          <div className="col-content">
            <EntryList
              headingLevel={2}
              items={leistungen.map((leistung) => ({
                title: leistung.h1,
                text: leistung.intro,
                href: `/leistungen/${leistung.slug}`,
              }))}
            />
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
