import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import StandortKarte from "@/components/StandortKarte";
import { CtaBand, Icon, PageHero, Section, type Crumb } from "@/components/ui";
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

const kontaktwege: readonly { icon: string; label: string; lines: readonly string[]; href?: string }[] = [
  { icon: "call", label: "Telefon", lines: [site.phone.label], href: site.phone.href },
  { icon: "smartphone", label: "Mobil", lines: [site.mobile.label], href: site.mobile.href },
  { icon: "mail", label: "E-Mail", lines: [site.email], href: `mailto:${site.email}` },
  {
    icon: "location_on",
    label: "Adresse",
    lines: [site.address.street, `${site.address.postalCode} ${site.address.city}`],
  },
  { icon: "schedule", label: "Erreichbarkeit", lines: [site.hoursShort] },
];

const zeileBasis = "flex items-center gap-4 p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/10";

function KontaktInhalt({ icon, label, lines }: { icon: string; label: string; lines: readonly string[] }) {
  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
        <Icon name={icon} className="text-primary text-lg" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">{label}</p>
        {lines.map((line) => (
          <p key={line} className="text-sm text-on-surface font-medium break-words">
            {line}
          </p>
        ))}
      </div>
    </>
  );
}

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={title} intro={intro} breadcrumbs={breadcrumbs} />

      <Section id="nachricht">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 bg-surface-container-low/80 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/30 shadow-2xl">
          <div className="min-w-0">
            <ContactForm />
          </div>
          <div className="min-w-0 flex flex-col gap-6">
            <div>
              <h2 className="font-headline text-2xl font-bold mb-6 text-primary">Kontakt</h2>
              <div className="space-y-3">
                {kontaktwege.map((weg) =>
                  weg.href ? (
                    <a
                      key={weg.label}
                      href={weg.href}
                      className={`${zeileBasis} hover:border-primary/30 hover:bg-surface-container transition-all group`}
                    >
                      <KontaktInhalt icon={weg.icon} label={weg.label} lines={weg.lines} />
                    </a>
                  ) : (
                    <div key={weg.label} className={zeileBasis}>
                      <KontaktInhalt icon={weg.icon} label={weg.label} lines={weg.lines} />
                    </div>
                  ),
                )}
              </div>
            </div>
            <StandortKarte />
          </div>
        </div>
      </Section>

      {/* Solange es keine Buchungsseite gibt, führt der Button zum Formular statt auf diesen Abschnitt zurück. */}
      <div id="erstgespraech" className="scroll-mt-20">
        {bookingUrl ? <CtaBand /> : <CtaBand href="#nachricht" label="Termin anfragen" />}
      </div>
    </>
  );
}
