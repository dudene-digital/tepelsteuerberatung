import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, LinkCard, PageHero, Section, type Crumb } from "@/components/ui";
import { leistungen, leistungenUebersicht } from "@/content/leistungen";

export const metadata: Metadata = {
  title: leistungenUebersicht.title,
  description: leistungenUebersicht.description,
  alternates: { canonical: "/leistungen" },
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
      <Section tone="low">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leistungen.map((leistung) => (
            <LinkCard
              key={leistung.slug}
              href={`/leistungen/${leistung.slug}`}
              title={leistung.h1}
              text={leistung.intro}
              icon={leistung.icon}
              headingLevel={2}
            />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
