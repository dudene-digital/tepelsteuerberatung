import type { Metadata } from "next";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { BookingLink, Card, CheckList, Icon, PageHero, Section, SectionHeading } from "@/components/ui";
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

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-headline text-2xl font-bold mb-6 text-on-surface">{content.aendertHeading}</h2>
            <CheckList items={content.aendert} />
          </Card>
          <Card>
            <h2 className="font-headline text-2xl font-bold mb-6 text-on-surface">{content.bleibtHeading}</h2>
            <CheckList items={content.bleibt} />
          </Card>
        </div>
      </Section>

      {faq.length > 0 && (
        <Section tone="low" size="narrow" labelledBy="faq-heading">
          <SectionHeading id="faq-heading">{content.faqHeading}</SectionHeading>
          <Accordion items={faq} />
        </Section>
      )}

      <Section tone="container" size="narrow" labelledBy="erreichbarkeit-heading">
        <SectionHeading id="erreichbarkeit-heading" center>
          {content.erreichbarkeitHeading}
        </SectionHeading>
        <div className="flex flex-col items-center gap-10 text-center">
          <ul role="list" className="space-y-3 text-lg text-on-surface">
            <li className="flex items-center justify-center gap-3">
              <Icon name="call" className="text-primary shrink-0" />
              <a href={site.phone.href} className="hover:text-primary transition-colors">
                {site.phone.label}
              </a>
            </li>
            <li className="flex items-center justify-center gap-3">
              <Icon name="schedule" className="text-primary shrink-0" />
              <span>{site.hoursShort}</span>
            </li>
          </ul>
          <BookingLink>
            {content.cta}
            <Icon name="arrow_forward" />
          </BookingLink>
        </div>
      </Section>
    </>
  );
}
