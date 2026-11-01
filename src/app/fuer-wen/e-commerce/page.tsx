import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import {
  BookingLink,
  Card,
  CtaBand,
  Icon,
  PageHero,
  SecondaryLink,
  Section,
  SectionHeading,
  type Crumb,
} from "@/components/ui";
import { ecommerce } from "@/content/zielgruppen";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: ecommerce.seoTitle },
  description: ecommerce.intro,
  alternates: { canonical: ecommerce.href },
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Für wen", href: "/fuer-wen" },
  { name: ecommerce.navLabel, href: ecommerce.href },
];

/* Fragen ohne Antwort bleiben unsichtbar, bis Fabian sie liefert. */
const faqItems = ecommerce.faq.fragen.flatMap(({ question, answer }) => (answer ? [{ question, answer }] : []));

export default function EcommercePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: ecommerce.navLabel,
          description: ecommerce.intro,
          url: `${site.url}${ecommerce.href}`,
          provider: {
            "@type": "AccountingService",
            "@id": `${site.url}/#kanzlei`,
            name: site.name,
            url: site.url,
          },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHero badge={ecommerce.badge} title={ecommerce.h1} intro={ecommerce.intro} breadcrumbs={breadcrumbs}>
        <div className="flex flex-col sm:flex-row gap-4">
          <BookingLink>
            {ecommerce.heroCta}
            <Icon name="arrow_forward" />
          </BookingLink>
          <SecondaryLink href="/so-arbeiten-wir">So arbeiten wir</SecondaryLink>
        </div>
      </PageHero>

      <Section labelledBy="themen-heading">
        <SectionHeading id="themen-heading">{ecommerce.themen.heading}</SectionHeading>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ecommerce.themen.items.map((thema) => (
            <li key={thema.begriff} className="grid">
              <Card>
                <Icon name={thema.icon} className="text-primary mb-5" />
                <p className="text-on-surface-variant leading-relaxed">
                  <strong className="font-bold text-on-surface">{thema.begriff}:</strong> {thema.text}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="low" labelledBy="tools-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <SectionHeading id="tools-heading" intro={ecommerce.tools.text}>
            {ecommerce.tools.heading}
          </SectionHeading>
          <ol aria-label={ecommerce.tools.schrittLabel}>
            {ecommerce.tools.schritte.map((schritt, index) => (
              <li key={schritt.titel}>
                {index > 0 && (
                  <div className="flex justify-center py-2">
                    <Icon name="arrow_downward" className="text-primary" />
                  </div>
                )}
                <div className="glass-card flex items-center gap-4 p-5 rounded-2xl border border-outline-variant/10">
                  <Icon name={schritt.icon} className="text-primary shrink-0" />
                  <div>
                    <p className="font-headline font-bold text-on-surface">{schritt.titel}</p>
                    {schritt.text && <p className="text-sm text-on-surface-variant leading-relaxed">{schritt.text}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 md:mt-20 pt-12 border-t border-outline-variant/20">
          <h3 className="mb-6 text-tertiary text-xs font-bold tracking-[0.2em] uppercase">
            {ecommerce.plattformen.heading}
          </h3>
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {ecommerce.plattformen.namen.map((name) => (
              <li key={name} className="font-headline text-lg md:text-xl font-bold text-on-surface-variant">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {faqItems.length > 0 && (
        <Section size="narrow" labelledBy="faq-heading">
          <SectionHeading id="faq-heading">{ecommerce.faq.heading}</SectionHeading>
          <Accordion items={faqItems} />
        </Section>
      )}

      {/* Leerer text: Das Briefing gibt nur diesen einen Satz vor, der Standardtext von CtaBand passt nicht zum Check. */}
      <CtaBand title={ecommerce.cta} text="" />
    </>
  );
}
