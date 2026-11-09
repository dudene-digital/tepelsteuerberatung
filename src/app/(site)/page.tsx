import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import HashRedirect from "@/components/HashRedirect";
import JsonLd from "@/components/JsonLd";
import { RatgeberTeaser } from "@/components/Ratgeber";
import { BookingLink, CtaBand, LeadIndex, PhotoSplit, QuietLink, Section, SectionHeading, Statements, TwoColumns } from "@/components/ui";
import { bewertungen, bewertungenHinweis, bewertungenStand } from "@/content/bewertungen";
import { fabianImBuero, fabianPortrait } from "@/content/kanzlei";
import { zielgruppen } from "@/content/zielgruppen";
import { neuesteArtikel } from "@/lib/ratgeber";
import { leistungenNav, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Steuerberater Wiesbaden für Online-Händler & Unternehmer | Tepel" },
  description:
    "Digitale Steuerberatung in Wiesbaden: Buchhaltung, Lohn, Jahresabschluss und Steuern für E-Commerce, GmbH, Freiberufler und Vermieter. Fester Ansprechpartner, Antwort in 24 Stunden.",
  ...pageMeta("/"),
};

const trustItems = ["Steuerberater seit 2021", "Inhabergeführt", "Antwort innerhalb von 24 Stunden", "Büro in Wiesbaden"];

const versprechen = [
  {
    title: "Direkter Draht zum Inhaber",
    text: "Du sprichst mit Fabian, nicht mit einer Hotline. Antwort innerhalb von 24 Stunden an Werktagen.",
  },
  {
    title: "Planbare Kosten",
    text: "Nach dem Erstgespräch bekommst du ein Festangebot mit Monatspauschale. Zusatzaufwand nur nach Absprache.",
  },
  {
    title: "Digital, aber nicht anonym",
    text: "Belege per App, Auswertungen online, Besprechung per Video oder bei uns im Büro.",
  },
];

const kanzleiJsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${site.url}/#kanzlei`,
  name: site.name,
  alternateName: site.legalName,
  url: site.url,
  telephone: site.phone.schema,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  description:
    "Steuerberatung für Online-Händler, Unternehmer und Vermieter im Rhein-Main-Gebiet – digital im Alltag, persönlich, wenn es darauf ankommt.",
  sameAs: [site.linkedin, site.googleProfile],
  areaServed: [
    { "@type": "City", name: "Wiesbaden" },
    { "@type": "City", name: "Mainz" },
    { "@type": "City", name: "Frankfurt am Main" },
    { "@type": "State", name: "Hessen" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Fabian Tepel",
    jobTitle: "Steuerberater",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Steuerberatungsleistungen",
    itemListElement: leistungenNav.map((leistung) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: leistung.label,
        url: `${site.url}${leistung.href}`,
      },
    })),
  },
};

export default async function Home() {
  const [schwerpunkt, ...weitere] = zielgruppen;
  // Die neuesten Ratgeber-Artikel kommen zur Laufzeit aus dem CMS, nicht aus dem Build.
  await connection();
  const artikel = await neuesteArtikel();

  return (
    <>
      <JsonLd data={kanzleiJsonLd} />
      <HashRedirect />

      {/* Titelblatt: "lighten" hebt das Fotoschwarz auf das Schwarz der Seite, der Bildrand verschwindet. */}
      <section className="relative">
        <div className="relative isolate h-[clamp(11rem,28svh,78vw)] overflow-hidden bg-bg md:absolute md:inset-y-0 md:left-0 md:h-auto md:w-[46%]">
          <Image
            src={fabianPortrait.src}
            alt={fabianPortrait.alt}
            width={fabianPortrait.width}
            height={fabianPortrait.height}
            sizes="(min-width: 1920px) 1150px, (min-width: 768px) 60vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="absolute top-0 left-0 h-auto w-full max-w-none mix-blend-lighten md:-left-[28%] md:w-[130%]"
          />
        </div>

        <div className="wrap relative pt-4 pb-8 md:ml-[46%] md:py-[clamp(1.25rem,2.2vw,2.75rem)] md:pl-0">
          <h1 className="font-display text-[clamp(1.75rem,9vw,3.5rem)] leading-[1.04] tracking-[-0.012em] md:text-[max(2rem,min(4.3vw,5.2rem,calc((100svh-29.46vw-9.875rem)/5.2)))]">
            <span className="block">Steuerberatung </span>
            <span className="block">für Online-Händler, </span>
            <span className="block">Unternehmer </span>
            <span className="block">und Vermieter </span>
            <span className="block">in Wiesbaden</span>
          </h1>
          <p className="mt-3 max-w-[27em] text-[clamp(1.0625rem,1.4vw,1.5rem)] leading-[1.4] text-pretty lg:mt-5">
            Digital im Alltag, persönlich, wenn es darauf ankommt. Wir kümmern uns um Buchhaltung, Lohn, Abschluss und
            Steuern – du um dein Business.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-1 lg:mt-6">
            <BookingLink>Kostenloses Erstgespräch buchen</BookingLink>
            <QuietLink href="/so-arbeiten-wir">So arbeiten wir</QuietLink>
          </div>
        </div>
      </section>

      {/* Trust-Leiste: Das Foto endet hart auf ihrer oberen Linie. */}
      <div className="wrap">
        <ul className="flex flex-col border-y border-t-ink border-b-rule py-2 text-base md:grid md:grid-cols-3 md:gap-x-8 md:py-3 lg:flex lg:flex-row lg:flex-wrap lg:justify-between">
          {trustItems.map((item) => (
            <li key={item} className="flex min-h-8 items-center">
              {item}
            </li>
          ))}
          <li className="flex min-h-11 items-center md:min-h-8">
            <a href={site.phone.href} className="inline-link tap whitespace-nowrap">
              {site.phone.label}
            </a>
          </li>
        </ul>
      </div>

      {/* Zielgruppen: Der Schwerpunkt so groß wie der Name im Kopf, der Rest als Inhaltsverzeichnis. */}
      <Section labelledBy="zielgruppen-heading">
        <div className="mb-2 lg:mb-3">
          <SectionHeading id="zielgruppen-heading">Für wen wir arbeiten</SectionHeading>
        </div>
        <LeadIndex
          lead={{ title: schwerpunkt.kachel.titel, text: schwerpunkt.kachel.teaser, href: schwerpunkt.href }}
          items={weitere.map((gruppe) => ({ title: gruppe.kachel.titel, text: gruppe.kachel.teaser, href: gruppe.href }))}
        />
      </Section>

      {/* Drei Versprechen */}
      <Section labelledBy="versprechen-heading">
        <h2 id="versprechen-heading" className="sr-only">
          Drei Versprechen
        </h2>
        <Statements items={versprechen} />
      </Section>

      {/* Team-Teaser: das einzige Farbbild der Seite */}
      <PhotoSplit photo={fabianImBuero} imageClassName="object-right" labelledBy="team-heading">
        <SectionHeading id="team-heading">
          Seit September 2026 sind wir zu viert: Fabian Tepel und drei erfahrene Kolleginnen.
        </SectionHeading>
        <p className="mt-3 text-muted text-pretty">
          Für dich heißt das: Inhaber als Ansprechpartner, dazu Kapazität und Vertretung im Urlaub.
        </p>
        <div className="mt-1">
          <QuietLink href="/team">Team kennenlernen</QuietLink>
        </div>
      </PhotoSplit>

      {/* Google-Bewertungen: statische Zitate aus dem Profil, ohne Einbindung von Google. Ohne Einträge nur der Verweis. */}
      <Section labelledBy="bewertungen-heading">
        <TwoColumns heading={<SectionHeading id="bewertungen-heading">Google-Bewertungen</SectionHeading>}>
          <div>
            {bewertungen.length > 0 ? (
              <>
                <ul className="border-t border-rule">
                  {bewertungen.slice(0, 3).map((bewertung) => (
                    <li key={`${bewertung.autor}-${bewertung.datum}`} className="border-b border-rule py-5 lg:py-6">
                      <figure>
                        <p className="text-base text-muted">
                          <span aria-hidden="true">{"★".repeat(bewertung.sterne)}</span>
                          <span className="sr-only">{bewertung.sterne} von 5 Sternen</span>
                        </p>
                        <blockquote className="mt-2 max-w-[34em] text-lead text-pretty">
                          <p>„{bewertung.text}“</p>
                        </blockquote>
                        <figcaption className="mt-2 text-base text-muted">
                          {bewertung.autor}, {bewertung.datum}
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-[46rem] text-base text-muted text-pretty">
                  {bewertungenHinweis}
                  {bewertungenStand && ` Stand: ${bewertungenStand}.`}
                </p>
              </>
            ) : (
              <p className="max-w-[34em] text-lead text-pretty">
                Was Mandanten über die Zusammenarbeit mit uns schreiben, liest du in unserem Google-Unternehmensprofil.
              </p>
            )}
            <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="quiet-link mt-2">
              Bewertungen bei Google ansehen<span className="sr-only"> (öffnet in einem neuen Tab)</span>
            </a>
          </div>
        </TwoColumns>
      </Section>

      <RatgeberTeaser artikel={artikel} />

      <CtaBand />
    </>
  );
}
