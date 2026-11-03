import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import {
  BookingLink,
  CtaBand,
  EntryList,
  PageHero,
  QuietLink,
  Section,
  SectionHeading,
  Steps,
  TwoColumns,
  type Crumb,
} from "@/components/ui";
import { ecommerce } from "@/content/zielgruppen";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: ecommerce.seoTitle },
  description: ecommerce.intro,
  ...pageMeta(ecommerce.href),
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

      <PageHero label={ecommerce.badge} title={ecommerce.h1} intro={ecommerce.intro} breadcrumbs={breadcrumbs}>
        <BookingLink>{ecommerce.heroCta}</BookingLink>
        <QuietLink href="/so-arbeiten-wir">So arbeiten wir</QuietLink>
      </PageHero>

      <Section labelledBy="themen-heading">
        <TwoColumns heading={<SectionHeading id="themen-heading">{ecommerce.themen.heading}</SectionHeading>}>
          <EntryList items={ecommerce.themen.items.map((thema) => ({ title: thema.begriff, text: thema.text }))} />
        </TwoColumns>
      </Section>

      <Section labelledBy="tools-heading">
        <TwoColumns heading={<SectionHeading id="tools-heading">{ecommerce.tools.heading}</SectionHeading>}>
          <p className="max-w-[34em] text-lead text-pretty">{ecommerce.tools.text}</p>
        </TwoColumns>
        <div className="mt-8 lg:mt-12">
          <Steps
            label={ecommerce.tools.schrittLabel}
            items={ecommerce.tools.schritte.map((schritt) => ({ title: schritt.titel, text: schritt.text }))}
          />
        </div>
      </Section>

      <Section labelledBy="plattformen-heading">
        <div className="grid-12">
          <div className="col-content">
            <div>
              <SectionHeading id="plattformen-heading">{ecommerce.plattformen.heading}</SectionHeading>
              <ul className="mt-4 flex flex-wrap gap-x-[0.5em] text-lead">
                {ecommerce.plattformen.namen.map((name, index) => (
                  <li key={name} className="whitespace-nowrap text-muted">
                    {name}
                    {index < ecommerce.plattformen.namen.length - 1 && <span aria-hidden="true"> ·</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {faqItems.length > 0 && (
        <Section labelledBy="faq-heading">
          <TwoColumns heading={<SectionHeading id="faq-heading">{ecommerce.faq.heading}</SectionHeading>}>
            <Accordion items={faqItems} />
          </TwoColumns>
        </Section>
      )}

      {/* Leerer text: Das Briefing gibt nur diesen einen Satz vor, der Standardtext von CtaBand passt nicht zum Check. */}
      <CtaBand title={ecommerce.cta} text="" />
    </>
  );
}
