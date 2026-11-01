import type { Metadata } from "next";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { BookingLink, InfoRows, PageHero, RuleList, Section, SectionHeading, TwoColumns } from "@/components/ui";
import { willkommen as content } from "@/content/kanzlei";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: "/willkommen" },
  robots: { index: false, follow: true },
};

const breadcrumbs = [
  { name: "Startseite", href: "/" },
  { name: content.seo.title, href: "/willkommen" },
];

export default function WillkommenPage() {
  const faq = content.faq.filter((entry): entry is AccordionItem => entry.answer !== null);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={content.h1} intro={content.intro} breadcrumbs={breadcrumbs} />

      <Section labelledBy="aendert-heading">
        <TwoColumns heading={<SectionHeading id="aendert-heading">{content.aendertHeading}</SectionHeading>}>
          <RuleList items={content.aendert} />
        </TwoColumns>
      </Section>

      <Section labelledBy="bleibt-heading">
        <TwoColumns heading={<SectionHeading id="bleibt-heading">{content.bleibtHeading}</SectionHeading>}>
          <RuleList items={content.bleibt} />
        </TwoColumns>
      </Section>

      {faq.length > 0 && (
        <Section labelledBy="faq-heading">
          <TwoColumns heading={<SectionHeading id="faq-heading">{content.faqHeading}</SectionHeading>}>
            <Accordion items={faq} />
          </TwoColumns>
        </Section>
      )}

      <section aria-labelledby="erreichbarkeit-heading" className="wrap section pb-[clamp(3.5rem,2rem+5vw,9rem)]">
        <TwoColumns heading={<SectionHeading id="erreichbarkeit-heading">{content.erreichbarkeitHeading}</SectionHeading>}>
          <div>
            <InfoRows
              rows={[
                {
                  label: "Telefon",
                  content: (
                    <a href={site.phone.href} className="inline-link tap">
                      {site.phone.label}
                    </a>
                  ),
                },
                { label: "Zeiten", content: site.hoursShort },
              ]}
            />
            <div className="mt-6">
              <BookingLink>{content.cta}</BookingLink>
            </div>
          </div>
        </TwoColumns>
      </section>
    </>
  );
}
