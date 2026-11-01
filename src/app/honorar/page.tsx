import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { Card, CheckList, CtaBand, Icon, PageHero, Section, SectionHeading } from "@/components/ui";
import { honorar as content } from "@/content/kanzlei";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: "/honorar" },
};

const breadcrumbs = [
  { name: "Startseite", href: "/" },
  { name: "So arbeiten wir", href: "/so-arbeiten-wir" },
  { name: "Honorar", href: "/honorar" },
];

export default function HonorarPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={content.h1} intro={content.intro} breadcrumbs={breadcrumbs} />

      <Section labelledBy="angebot-heading">
        <SectionHeading id="angebot-heading">{content.angebotHeading}</SectionHeading>
        <div className="max-w-3xl">
          <CheckList items={content.angebot} />
        </div>
      </Section>

      <Section tone="low" labelledBy="preis-heading">
        <SectionHeading id="preis-heading">{content.preisHeading}</SectionHeading>
        <ul role="list" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.preisfaktoren.map((faktor) => (
            <li key={faktor.text}>
              <Card className="h-full">
                <Icon name={faktor.icon} className="text-4xl text-primary mb-6 block" />
                <p className="text-on-surface leading-relaxed">{faktor.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
