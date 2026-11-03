import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, PhotoSplit, Section, SectionHeading, Steps, TwoColumns } from "@/components/ui";
import { fabianAmLaptop, soArbeitenWir as content } from "@/content/kanzlei";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  ...pageMeta("/so-arbeiten-wir"),
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

      {/* Digitale Werkzeuge neben dem Foto am Laptop */}
      <PhotoSplit photo={fabianAmLaptop} imageClassName="object-[62%_50%]" labelledBy="tools-heading">
        <SectionHeading id="tools-heading">{content.toolsHeading}</SectionHeading>
        <ul className="mt-4 border-t border-rule">
          {content.tools.map((tool) => (
            <li key={tool.name} className="border-b border-rule py-3.5">
              <h3 className="font-display text-2xl leading-tight">{tool.name}</h3>
              <p className="mt-1 text-muted text-pretty">{tool.text}</p>
            </li>
          ))}
        </ul>
      </PhotoSplit>

      <Section id="beraterwechsel" labelledBy="beraterwechsel-heading">
        <TwoColumns heading={<SectionHeading id="beraterwechsel-heading">{content.beraterwechselHeading}</SectionHeading>}>
          <p className="max-w-[34em] text-lead text-pretty">{content.beraterwechselText}</p>
        </TwoColumns>
      </Section>

      <CtaBand />
    </>
  );
}
