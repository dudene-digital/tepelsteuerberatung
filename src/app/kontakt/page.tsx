import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import StandortKarte from "@/components/StandortKarte";
import { CtaBand, InfoRows, PageHero, Section, type Crumb } from "@/components/ui";
import { bookingUrl, site } from "@/lib/site";

const title = "Kontakt, Anfahrt, Erstgespräch";
const intro = "Schreib uns, ruf an oder komm im Büro vorbei. Antwort innerhalb von 24 Stunden an Werktagen.";

export const metadata: Metadata = {
  title,
  description: intro,
  alternates: { canonical: "/kontakt" },
};

const breadcrumbs: Crumb[] = [
  { name: "Startseite", href: "/" },
  { name: "Kontakt", href: "/kontakt" },
];

const kontaktwege: readonly { label: string; lines: readonly string[]; href?: string }[] = [
  { label: "Telefon", lines: [site.phone.label], href: site.phone.href },
  { label: "Mobil", lines: [site.mobile.label], href: site.mobile.href },
  { label: "E-Mail", lines: [site.email], href: `mailto:${site.email}` },
  { label: "Adresse", lines: [site.address.street, `${site.address.postalCode} ${site.address.city}`] },
  { label: "Erreichbarkeit", lines: [site.hoursShort] },
];

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={title} intro={intro} breadcrumbs={breadcrumbs} />

      {/* Kontaktwege zuerst: Am Handy ist der Anruf oft der kürzeste Weg. Formular und Sprungziele folgen danach. */}
      <Section>
        <div className="grid-12 gap-y-12">
          <div className="min-w-0 lg:col-span-4">
            <h2 className="mb-4 font-display text-h2">Kontakt</h2>
            <InfoRows
              rows={kontaktwege.map((weg) => ({
                label: weg.label,
                content: weg.href ? (
                  <a href={weg.href} className="inline-link tap">
                    {weg.lines[0]}
                  </a>
                ) : (
                  weg.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                ),
              }))}
            />
            <div className="mt-6">
              <StandortKarte />
            </div>
          </div>
          <div id="erstgespraech" className="min-w-0 lg:col-span-7 lg:col-start-6">
            <div id="nachricht">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Solange es keine Buchungsseite gibt, führt der Button zum Formular. */}
      {bookingUrl ? <CtaBand /> : <CtaBand href="#nachricht" label="Termin anfragen" />}
    </>
  );
}
