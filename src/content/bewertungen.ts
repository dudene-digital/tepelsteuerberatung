/* Google-Bewertungen als statische Zitate, ohne Einbindung von Google und ohne Tracking (Briefing, Technik).
   Pflege: die drei neuesten Bewertungen aus dem Google-Unternehmensprofil wörtlich übernehmen, nicht auswählen
   oder kürzen, und das Abrufdatum aktualisieren. Namen nur so, wie sie bei Google öffentlich stehen,
   am besten Vorname und Initial. Fabian gibt die Einträge und den Hinweistext frei, bevor sie live gehen.
   Solange die Liste leer ist, zeigt die Startseite nur den Link auf das Profil. */

export interface Bewertung {
  text: string;
  /** Wie bei Google angezeigt, z. B. „Anna M.“ */
  autor: string;
  /** Monat und Jahr der Bewertung, z. B. „Oktober 2026“ */
  datum: string;
  /** 1 bis 5 */
  sterne: number;
}

export const bewertungen: readonly Bewertung[] = [];

/** Stand der Übernahme aus dem Profil, z. B. „3. November 2026“. */
export const bewertungenStand = "";

/* Pflichthinweis nach § 5b Abs. 3 UWG: ob und wie wir sicherstellen, dass Bewertungen von echten Mandanten stammen.
   Entwurf, Fabian prüft ihn. */
export const bewertungenHinweis =
  "Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die drei neuesten unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.";
