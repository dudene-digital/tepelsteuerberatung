import { zielgruppen } from "@/content/zielgruppen";
import type { Metadata } from "next";
import Image from "next/image";
import HashRedirect from "@/components/HashRedirect";
import JsonLd from "@/components/JsonLd";
import {
  Badge,
  BookingLink,
  Card,
  CtaBand,
  Icon,
  LinkCard,
  SecondaryLink,
  Section,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import { leistungenNav, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Steuerberater Wiesbaden für Online-Händler & Unternehmer | Tepel" },
  description:
    "Digitale Steuerberatung in Wiesbaden: Buchhaltung, Lohn, Jahresabschluss und Steuern für E-Commerce, GmbH, Freiberufler und Vermieter. Fester Ansprechpartner, Antwort in 24 Stunden.",
  alternates: { canonical: "/" },
};

const trustItems: readonly { icon: string; label: string }[] = [
  { icon: "verified", label: "Steuerberater seit 2021" },
  { icon: "person", label: "Inhabergeführt" },
  { icon: "schedule", label: "Antwort innerhalb von 24 Stunden" },
  { icon: "location_on", label: "Büro in Wiesbaden" },
];

/* Die erste Kachel läuft mobil über zwei Spalten, die Texte stehen in content/zielgruppen.ts. */
const kachelLayout = ["md:col-span-2 lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

const versprechen: readonly { title: string; text: string; icon: string }[] = [
  {
    title: "Direkter Draht zum Inhaber",
    text: "Du sprichst mit Fabian, nicht mit einer Hotline. Antwort innerhalb von 24 Stunden an Werktagen.",
    icon: "forum",
  },
  {
    title: "Planbare Kosten",
    text: "Nach dem Erstgespräch bekommst du ein Festangebot mit Monatspauschale. Zusatzaufwand nur nach Absprache.",
    icon: "receipt_long",
  },
  {
    title: "Digital, aber nicht anonym",
    text: "Belege per App, Auswertungen online, Besprechung per Video oder bei uns im Büro.",
    icon: "devices",
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

export default function Home() {
  return (
    <>
      <JsonLd data={kanzleiJsonLd} />
      <HashRedirect />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Badge>Digital, aber nicht anonym</Badge>
              <h1 className="font-headline text-[2rem] min-[390px]:text-4xl md:text-5xl xl:text-6xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-8 text-balance">
                Steuerberatung für <span className="whitespace-nowrap">Online-Händler,</span> Unternehmer und Vermieter in
                Wiesbaden
              </h1>
              <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                Digital im Alltag, persönlich, wenn es darauf ankommt. Wir kümmern uns um Buchhaltung, Lohn, Abschluss und
                Steuern – du um dein Business.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <BookingLink>Kostenloses Erstgespräch buchen</BookingLink>
                <SecondaryLink href="/so-arbeiten-wir">So arbeiten wir</SecondaryLink>
              </div>
            </div>
            <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl animate-float">
                <Image
                  src="/berater_1.jpg"
                  alt="Porträt von Fabian Tepel, Steuerberater in Wiesbaden"
                  fill
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 372px, (min-width: 496px) 448px, calc(100vw - 48px)"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-4 lg:-left-6 glass-card px-5 py-4 md:p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center shrink-0">
                  <Icon name="verified" className="text-tertiary" />
                </div>
                <div>
                  <p className="font-headline font-bold text-on-surface">Fabian Tepel</p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    Steuerberater &amp; Inhaber
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-16 lg:mt-20 pt-8 border-t border-outline-variant/20 flex flex-wrap lg:justify-between gap-x-6 gap-y-3 text-sm text-on-surface-variant">
            {trustItems.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <Icon name={item.icon} className="text-primary text-lg shrink-0" />
                {item.label}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Icon name="call" className="text-primary text-lg shrink-0" />
              <a href={site.phone.href} className="whitespace-nowrap hover:text-primary transition-colors">
                {site.phone.label}
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Zielgruppen */}
      <Section tone="low" labelledBy="zielgruppen-heading">
        <SectionHeading id="zielgruppen-heading">Für wen wir arbeiten</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {zielgruppen.map((gruppe, index) => (
            <div key={gruppe.href} className={`grid ${kachelLayout[index]}`}>
              <LinkCard href={gruppe.href} title={gruppe.kachel.titel} text={gruppe.kachel.teaser} icon={gruppe.icon} />
            </div>
          ))}
        </div>
      </Section>

      {/* Drei Versprechen */}
      <Section labelledBy="versprechen-heading">
        <SectionHeading id="versprechen-heading">Drei Versprechen</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {versprechen.map((eintrag) => (
            <Card key={eintrag.title}>
              <Icon name={eintrag.icon} className="text-4xl text-tertiary mb-6 block" />
              <h3 className="font-headline text-xl md:text-2xl font-bold mb-3 text-on-surface">{eintrag.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{eintrag.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team-Teaser */}
      <Section tone="lowest" labelledBy="team-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              id="team-heading"
              intro="Für dich heißt das: Inhaber als Ansprechpartner, dazu Kapazität und Vertretung im Urlaub."
            >
              Seit September 2026 sind wir zu viert: Fabian Tepel und drei erfahrene Kolleginnen.
            </SectionHeading>
            <TextLink href="/team">Team kennenlernen</TextLink>
          </div>
          <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/berater_2.jpg"
              alt="Fabian Tepel steht in der Tür seines Büros"
              fill
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) calc(50vw - 56px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Google-Bewertungen: nur Verweis auf das Profil, ohne Zitate und ohne Einbindung von Google. */}
      <Section size="narrow" labelledBy="bewertungen-heading">
        <SectionHeading
          id="bewertungen-heading"
          center
          intro="Was Mandanten über die Zusammenarbeit mit uns schreiben, liest du in unserem Google-Unternehmensprofil."
        >
          Google-Bewertungen
        </SectionHeading>
        <p className="text-center">
          <a
            href={site.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-headline font-bold text-primary underline underline-offset-4 hover:text-primary-container transition-colors"
          >
            Bewertungen bei Google ansehen
            <Icon name="open_in_new" className="text-lg" />
            <span className="sr-only">(öffnet in einem neuen Tab)</span>
          </a>
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
