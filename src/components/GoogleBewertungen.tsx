import { Section, SectionHeading, TwoColumns } from "@/components/ui";
import { hinweisVorlage } from "@/globals/GoogleProfil";
import { formatMonat, formatNote, type BewertungenDaten } from "@/lib/bewertungen";
import { formatDatum } from "@/lib/ratgeber";
import { site } from "@/lib/site";

/* Google-Bewertungen auf der Startseite: Zitate aus dem CMS, ohne Einbindung von Google. Statt Sternsymbolen steht die
   Note als Text („5 von 5“), die Seite kommt ohne Symbole aus. Die Zeilen liegen auf dem Raster von TwoColumns:
   Name und Note in den ersten drei Spalten, das Zitat daneben. Kein aggregateRating im JSON-LD: Google lässt
   Bewertungsmarkup für das eigene Unternehmen und für von anderen Seiten übernommene Bewertungen nicht zu. */

const anzahlformat = new Intl.NumberFormat("de-DE");

/** Absätze bleiben erhalten. Die Anführungszeichen umschließen das ganze Zitat. */
function Zitat({ text, className }: { text: string; className: string }) {
  const absaetze = text.trim().split(/\n\s*\n/);
  return (
    <blockquote className={`max-w-[34em] text-lead text-pretty ${className}`}>
      {absaetze.map((absatz, index) => (
        <p key={index} className={`whitespace-pre-line ${index > 0 ? "mt-[0.6em]" : ""}`}>
          {index === 0 && "„"}
          {absatz}
          {index === absaetze.length - 1 && "“"}
        </p>
      ))}
    </blockquote>
  );
}

function ProfilLink({ className }: { className: string }) {
  return (
    <p className={className}>
      <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="quiet-link">
        Bewertungen bei Google ansehen<span className="sr-only"> (öffnet in einem neuen Tab)</span>
      </a>
    </p>
  );
}

export function GoogleBewertungen({ bewertungen, profil }: BewertungenDaten) {
  const note = typeof profil.gesamtnote === "number" ? profil.gesamtnote : null;
  const anzahl = typeof profil.anzahl === "number" ? profil.anzahl : null;
  const stand = formatDatum(profil.stand);
  // Der Pflichthinweis steht immer dabei, auch solange das Global noch nicht veröffentlicht ist.
  const hinweis = profil.hinweis?.trim() || hinweisVorlage;

  return (
    <Section labelledBy="bewertungen-heading">
      <TwoColumns heading={<SectionHeading id="bewertungen-heading">Google-Bewertungen</SectionHeading>}>
        {bewertungen.length === 0 && note === null ? (
          <>
            <p className="max-w-[34em] text-lead text-pretty">
              Was Mandanten über die Zusammenarbeit mit uns schreiben, liest du in unserem Google-Unternehmensprofil.
            </p>
            <ProfilLink className="mt-2" />
          </>
        ) : (
          <>
            {note !== null && (
              <div className="col-sub items-baseline pb-6 lg:pb-8">
                <p className="lg:col-span-3">
                  <span className="sr-only">Gesamtnote </span>
                  <span className="font-display text-focus">{formatNote(note)}</span>
                  <span className="ml-2 text-lead text-muted">von 5</span>
                </p>
                <p className="mt-1 text-base text-muted lg:col-span-6 lg:mt-0">
                  {anzahl !== null
                    ? `${anzahlformat.format(anzahl)} ${anzahl === 1 ? "Bewertung" : "Bewertungen"} bei Google`
                    : "Gesamtnote bei Google"}
                  {stand && (
                    <>
                      <br />
                      Stand: {stand}
                    </>
                  )}
                </p>
              </div>
            )}

            {bewertungen.length > 0 && (
              <ul className="col-sub border-b border-rule">
                {bewertungen.map((bewertung) => (
                  <li key={bewertung.id} className="col-sub border-t border-rule pt-4 pb-6 lg:pt-5 lg:pb-8">
                    <figure className="col-sub items-baseline">
                      <figcaption className="lg:col-span-3">
                        <span className="block font-medium">{bewertung.autor}</span>
                        <span className="block text-base text-muted">
                          {bewertung.sterne} von 5<span className="sr-only"> Sternen</span>
                          <span aria-hidden="true" className="lg:hidden">
                            {" · "}
                          </span>
                          <span className="lg:block">{formatMonat(bewertung.datum)}</span>
                        </span>
                      </figcaption>
                      <Zitat text={bewertung.text} className="mt-2 lg:col-span-6 lg:mt-0" />
                    </figure>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-5 max-w-[46rem] text-base text-muted text-pretty lg:col-span-6 lg:col-start-4">
              {hinweis}
              {note === null && stand && ` Stand: ${stand}.`}
            </p>
            <ProfilLink className="mt-2 lg:col-span-6 lg:col-start-4" />
          </>
        )}
      </TwoColumns>
    </Section>
  );
}
