import config from "@payload-config";
import { getPayload } from "payload";
import { sichtbar } from "@/collections/Bewertungen";
import { anzahlStartseiteMax, anzahlStartseiteVorgabe } from "@/globals/GoogleProfil";
import type { Bewertung, GoogleProfil } from "@/payload-types";

/* Zugriff der Website auf die Google-Bewertungen. Abfragen laufen mit overrideAccess: false, also mit den Rechten
   eines anonymen Besuchers: Die Leseregeln in collections/Bewertungen.ts und globals/GoogleProfil.ts lassen nur
   Veröffentlichtes durch, Entwürfe und ausgeblendete Bewertungen nicht. Ist die Datenbank nicht erreichbar,
   zeigt die Startseite nur den Link auf das Google-Profil. */

export type BewertungEintrag = Pick<Bewertung, "id" | "text" | "autor" | "datum" | "sterne">;
export type ProfilAngaben = Pick<GoogleProfil, "gesamtnote" | "anzahl" | "stand" | "hinweis" | "anzahlStartseite">;

export interface BewertungenDaten {
  bewertungen: BewertungEintrag[];
  /** Leer, solange das Global „Google-Profil“ nicht veröffentlicht ist. */
  profil: Partial<ProfilAngaben>;
}

export async function bewertungenStartseite(): Promise<BewertungenDaten> {
  try {
    const payload = await getPayload({ config });
    // Beide Abfragen laufen gleichzeitig. Darum holt die erste so viele Bewertungen, wie höchstens erlaubt sind,
    // und gekürzt wird erst, wenn die eingestellte Anzahl aus dem Google-Profil da ist.
    const [{ docs }, profilDoc] = await Promise.all([
      payload.find({
        collection: "bewertungen",
        where: sichtbar,
        select: { text: true, autor: true, datum: true, sterne: true },
        sort: ["-datum", "-createdAt"],
        depth: 0,
        limit: anzahlStartseiteMax,
        pagination: false,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: "google-profil",
        select: { gesamtnote: true, anzahl: true, stand: true, hinweis: true, anzahlStartseite: true },
        depth: 0,
        overrideAccess: false,
      }),
    ]);
    const profil = (profilDoc ?? {}) as Partial<ProfilAngaben>;
    const anzahl = profil.anzahlStartseite ?? anzahlStartseiteVorgabe;
    return { bewertungen: (docs as BewertungEintrag[]).slice(0, anzahl), profil };
  } catch (fehler) {
    console.error("Google-Bewertungen konnten nicht geladen werden", fehler);
    return { bewertungen: [], profil: {} };
  }
}

/** Ob die Startseite Bewertungen zeigt. Dann braucht die Datenschutzerklärung ihren Abschnitt dazu. */
export async function zeigtBewertungen(): Promise<boolean> {
  try {
    const payload = await getPayload({ config });
    const { totalDocs } = await payload.count({ collection: "bewertungen", where: sichtbar, overrideAccess: false });
    return totalDocs > 0;
  } catch (fehler) {
    console.error("Google-Bewertungen konnten nicht gezählt werden", fehler);
    return false;
  }
}

const monatsformat = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric", timeZone: "Europe/Berlin" });

/** „Oktober 2026“ */
export const formatMonat = (iso?: string | null) => (iso ? monatsformat.format(new Date(iso)) : "");

const noteformat = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 4.9 → „4,9“, 5 → „5,0“ wie bei Google. */
export const formatNote = (note: number) => noteformat.format(note);
