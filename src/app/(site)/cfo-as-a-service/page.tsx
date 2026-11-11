import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  Statements,
  TwoColumns,
  type Crumb,
} from "@/components/ui";
import { cfo } from "@/content/cfo";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: cfo.seoTitle },
  description: cfo.description,
  ...pageMeta(cfo.href),
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: cfo.navLabel, href: cfo.href },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: cfo.navLabel,
  serviceType: "CFO as a Service",
  alternateName: ["Externer CFO", "Fractional CFO", "Finanzchef auf Teilzeit"],
  description: cfo.description,
  url: `${site.url}${cfo.href}`,
  provider: {
    "@type": "AccountingService",
    "@id": `${site.url}/#kanzlei`,
    name: site.name,
    url: site.url,
  },
  areaServed: [
    { "@type": "City", name: "Wiesbaden" },
    { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cfo.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/** Macht den Verweis auf die Leistungsseiten in der Liste „Passt eher nicht“ zum Link. */
function withLeistungenLink(text: string) {
  const [before, after] = text.split("Leistungsseiten");
  if (after === undefined) return text;
  return (
    <>
      {before}
      <Link href="/leistungen" className="inline-link">
        Leistungsseiten
      </Link>
      {after}
    </>
  );
}

export default function CfoPage() {
  const { vergleich, situationen, leistungen, cockpit, rhythmus, varianten, steuerberater, passung, faq, cta } = cfo;

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHero label={cfo.label} title={cfo.h1} intro={cfo.intro} breadcrumbs={breadcrumbs}>
        <BookingLink>{cfo.heroCta}</BookingLink>
        <QuietLink href="#rhythmus">{cfo.heroLink}</QuietLink>
      </PageHero>

      {/* Rückspiegel und Windschutzscheibe: Zeile für Zeile dieselbe Frage, links rückblickend, rechts vorausschauend. */}
      <Section labelledBy="vergleich-heading">
        <h2 id="vergleich-heading" className="max-w-[16em] font-display text-focus text-balance">
          {vergleich.heading}
        </h2>
        <div className="grid-12 mt-8 lg:mt-12">
          <div className="col-content min-w-0">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-1/2 pr-[var(--col-gap)] pb-3 align-bottom text-base font-medium text-muted">
                    {vergleich.links}
                  </th>
                  <th scope="col" className="w-1/2 pb-3 align-bottom text-base font-medium">
                    {vergleich.rechts}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vergleich.zeilen.map(([links, rechts]) => (
                  <tr key={rechts} className="border-t border-rule align-top">
                    <td className="pt-4 pr-[var(--col-gap)] pb-5 text-muted text-pretty lg:pt-5 lg:pb-6">{links}</td>
                    {/* Am Handy eine Stufe kleiner, sonst passt „Liquiditätsvorschau“ nicht in die halbe Breite. */}
                    <td className="pt-4 pb-5 font-display text-lead text-pretty md:text-h2 lg:pt-5 lg:pb-6">
                      {rechts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="max-w-[34em] border-t border-ink pt-5 text-lead text-pretty lg:pt-6">{vergleich.fazit}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="situationen-heading">
        <TwoColumns heading={<SectionHeading id="situationen-heading">{situationen.heading}</SectionHeading>}>
          <ul className="grid gap-x-[var(--col-gap)] md:grid-cols-2">
            {situationen.items.map((item) => (
              <li key={item} className="border-t border-rule pt-4 pb-6 text-lead text-pretty lg:pt-5 lg:pb-8">
                {item}
              </li>
            ))}
          </ul>
        </TwoColumns>
      </Section>

      <Section labelledBy="leistungen-heading">
        <TwoColumns heading={<SectionHeading id="leistungen-heading">{leistungen.heading}</SectionHeading>}>
          <EntryList items={leistungen.items} />
        </TwoColumns>
      </Section>

      {/* Beispiel-Cockpit über die volle Breite, damit Zahlen und Achsen am Desktop lesbar bleiben. */}
      <Section labelledBy="cockpit-heading">
        <SectionHeading id="cockpit-heading">{cockpit.heading}</SectionHeading>
        <figure className="mt-6 lg:mt-8">
          <Image
            src={cockpit.image.src}
            alt={cockpit.image.alt}
            width={cockpit.image.width}
            height={cockpit.image.height}
            sizes="(min-width: 1920px) 1776px, 94vw"
            className="h-auto w-full"
          />
          <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-5 text-base text-muted">
            <span>{cockpit.caption}</span>
            <a href={cockpit.image.src} target="_blank" rel="noopener noreferrer" className="inline-link tap text-ink">
              Bild in voller Größe öffnen<span className="sr-only"> (öffnet in einem neuen Tab)</span>
            </a>
          </figcaption>
        </figure>
      </Section>

      {/* Vier Takte von links nach rechts, vom kürzesten zum längsten Abstand. */}
      <Section id="rhythmus" labelledBy="rhythmus-heading">
        <SectionHeading id="rhythmus-heading">{rhythmus.heading}</SectionHeading>
        <dl className="mt-6 grid gap-x-[var(--col-gap)] md:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {rhythmus.items.map((item) => (
            <div key={item.wann} className="border-t border-ink pt-4 pb-6 lg:pt-5">
              <dt className="font-display text-h2">{item.wann}</dt>
              <dd className="mt-1.5 max-w-[30em] text-muted text-pretty">{item.was}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Ohne Preise. Die Variante, die das Briefing hervorhebt, steht in der Mitte und ist hell hinterlegt. */}
      <Section labelledBy="varianten-heading">
        <SectionHeading id="varianten-heading">{varianten.heading}</SectionHeading>
        <ul className="mt-6 grid gap-x-[var(--col-gap)] gap-y-8 lg:mt-8 lg:grid-cols-3">
          {varianten.items.map((variante) => {
            const label = variante.hervorgehoben ? "text-bg/70" : "text-muted";
            return (
              <li
                key={variante.name}
                className={
                  variante.hervorgehoben
                    ? "bg-ink px-5 pt-4 pb-6 text-bg lg:px-6 lg:pt-5"
                    : "border-t border-rule pt-4 pb-6 lg:pt-5"
                }
              >
                <h3 className="font-display text-h2">{variante.name}</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className={`text-base ${label}`}>Für wen</dt>
                    <dd className="mt-0.5 text-pretty">{variante.fuerWen}</dd>
                  </div>
                  <div>
                    <dt className={`text-base ${label}`}>Enthalten</dt>
                    <dd className="mt-0.5 text-pretty">{variante.enthalten}</dd>
                  </div>
                  <div>
                    <dt className={`text-base ${label}`}>Rhythmus</dt>
                    <dd className="mt-0.5">{variante.rhythmus}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-lead text-pretty lg:mt-8">{varianten.hinweis}</p>
      </Section>

      <Section labelledBy="steuerberater-heading">
        <SectionHeading id="steuerberater-heading">{steuerberater.heading}</SectionHeading>
        <div className="mt-6 lg:mt-10">
          <Statements items={steuerberater.items} />
        </div>
      </Section>

      <Section labelledBy="passung-heading">
        <TwoColumns heading={<SectionHeading id="passung-heading">{passung.heading}</SectionHeading>}>
          <div className="grid gap-x-[var(--col-gap)] gap-y-10 md:grid-cols-2">
            {[passung.passt, passung.passtNicht].map((liste) => (
              <div key={liste.heading}>
                <h3 className="pb-3 font-medium">{liste.heading}</h3>
                <ul className="border-t border-rule">
                  {liste.items.map((item) => (
                    <li key={item} className="border-b border-rule py-4 text-pretty lg:py-5">
                      {withLeistungenLink(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TwoColumns>
      </Section>

      <Section labelledBy="faq-heading">
        <TwoColumns heading={<SectionHeading id="faq-heading">{faq.heading}</SectionHeading>}>
          <Accordion items={faq.items} />
        </TwoColumns>
      </Section>

      <CtaBand title={cta.title} text={cta.text} label={cta.label} />
    </>
  );
}
