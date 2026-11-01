import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, EntryList, PageHero, Section, SectionHeading, Steps, TwoColumns } from "@/components/ui";
import { soArbeitenWir as content } from "@/content/kanzlei";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: "/so-arbeiten-wir" },
};

const breadcrumbs = [
  { name: "Startseite", href: "/" },
  { name: "So arbeiten wir", href: "/so-arbeiten-wir" },
];

export default function SoArbeitenWirPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={content.h1} breadcrumbs={breadcrumbs} />

      <Section>
        <Steps headingLevel={2} items={content.steps} />
      </Section>

      <Section labelledBy="tools-heading">
        <TwoColumns heading={<SectionHeading id="tools-heading">{content.toolsHeading}</SectionHeading>}>
          <EntryList items={content.tools.map(({ name, text }) => ({ title: name, text }))} />
        </TwoColumns>
      </Section>

      <Section id="beraterwechsel" labelledBy="beraterwechsel-heading">
        <TwoColumns heading={<SectionHeading id="beraterwechsel-heading">{content.beraterwechselHeading}</SectionHeading>}>
          <p className="max-w-[34em] text-lead text-pretty">{content.beraterwechselText}</p>
        </TwoColumns>
      </Section>

      <CtaBand />
    </>
  );
}
