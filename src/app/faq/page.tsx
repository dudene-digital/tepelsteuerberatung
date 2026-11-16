import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, Section, type Crumb } from "@/components/ui";
import { faqIntro, faqItems } from "@/content/faq";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: faqIntro.title,
  description: faqIntro.intro,
  ...pageMeta("/faq"),
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "FAQ", href: "/faq" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd} />
      <PageHero title={faqIntro.title} intro={faqIntro.intro} breadcrumbs={breadcrumbs} />
      <Section labelledBy="faq-fragen">
        {/* Das Akkordeon rendert h3. Das h2 hält die Überschriftenfolge ohne Sprung. */}
        <h2 id="faq-fragen" className="sr-only">
          Fragen und Antworten
        </h2>
        <div className="grid-12">
          <div className="col-content min-w-0">
            <Accordion items={faqItems} />
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
