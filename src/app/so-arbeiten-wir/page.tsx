import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { Card, CtaBand, Icon, PageHero, Section, SectionHeading } from "@/components/ui";
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
        <ol role="list" className="grid md:grid-cols-2 gap-6">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <Card className="flex gap-5 md:gap-6 h-full">
                <span
                  aria-hidden="true"
                  className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 text-primary font-headline font-bold text-lg"
                >
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-headline text-xl md:text-2xl font-bold mb-3 text-on-surface">{step.title}</h2>
                  <p className="text-on-surface-variant leading-relaxed">{step.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="low" labelledBy="tools-heading">
        <SectionHeading id="tools-heading">{content.toolsHeading}</SectionHeading>
        <ul role="list" className="grid md:grid-cols-3 gap-6">
          {content.tools.map((tool) => (
            <li key={tool.name}>
              <Card className="h-full">
                <Icon name={tool.icon} className="text-4xl text-primary mb-6 block" />
                <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">{tool.name}</h3>
                <p className="text-on-surface-variant leading-relaxed">{tool.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="beraterwechsel" labelledBy="beraterwechsel-heading">
        <SectionHeading id="beraterwechsel-heading" intro={content.beraterwechselText}>
          {content.beraterwechselHeading}
        </SectionHeading>
      </Section>

      <CtaBand />
    </>
  );
}
