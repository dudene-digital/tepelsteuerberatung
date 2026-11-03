import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, RuleList, Section, SectionHeading, TwoColumns } from "@/components/ui";
import { honorar as content } from "@/content/kanzlei";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  ...pageMeta("/honorar"),
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
        <TwoColumns heading={<SectionHeading id="angebot-heading">{content.angebotHeading}</SectionHeading>}>
          <RuleList items={content.angebot} />
        </TwoColumns>
      </Section>

      <Section labelledBy="preis-heading">
        <TwoColumns heading={<SectionHeading id="preis-heading">{content.preisHeading}</SectionHeading>}>
          <RuleList items={content.preisfaktoren} />
        </TwoColumns>
      </Section>

      <CtaBand />
    </>
  );
}
