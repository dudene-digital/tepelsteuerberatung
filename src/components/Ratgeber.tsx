import Link from "next/link";
import { QuietLink, Section, SectionHeading, TwoColumns } from "@/components/ui";
import { formatDatum, type ArtikelEintrag } from "@/lib/ratgeber";

/** Artikel als Zeilen: Kategorie und Datum, Titel, Teaser. Auf Branchenseiten ohne Kategorie, die steht dort schon im Titel. */
export function ArtikelListe({ artikel, mitKategorie = true }: { artikel: ArtikelEintrag[]; mitKategorie?: boolean }) {
  return (
    <ul className="border-t border-rule">
      {artikel.map((eintrag) => (
        <li key={eintrag.id} className="border-b border-rule">
          <Link href={`/wissen/${eintrag.slug}`} className="group block py-5 lg:py-7">
            <p className="text-base text-muted">
              {[mitKategorie && eintrag.kategorie?.name, formatDatum(eintrag.veroeffentlichtAm)].filter(Boolean).join(" · ")}
            </p>
            <h3 className="mt-1 font-display text-h2 text-balance decoration-1 underline-offset-[0.14em] group-hover:underline touch:underline">
              {eintrag.titel}
            </h3>
            <p className="mt-2 max-w-[46rem] text-muted text-pretty">{eintrag.teaser}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Abschnitt „Aus dem Ratgeber“ für Startseite und Branchenseiten. Ohne Artikel erscheint er nicht. */
export function RatgeberTeaser({ artikel, mitKategorie }: { artikel: ArtikelEintrag[]; mitKategorie?: boolean }) {
  if (artikel.length === 0) return null;
  return (
    <Section labelledBy="ratgeber-heading">
      <TwoColumns
        heading={
          <>
            <SectionHeading id="ratgeber-heading">Aus dem Ratgeber</SectionHeading>
            <div className="mt-1">
              <QuietLink href="/wissen">Alle Artikel</QuietLink>
            </div>
          </>
        }
      >
        <ArtikelListe artikel={artikel} mitKategorie={mitKategorie} />
      </TwoColumns>
    </Section>
  );
}
