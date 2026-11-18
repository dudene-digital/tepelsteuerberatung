import type { GlobalConfig } from "payload";
import { angemeldet } from "../collections/access";

/* Angaben zum Google-Unternehmensprofil für die Bewertungen auf der Startseite: Gesamtnote, Anzahl, Stand der
   Übernahme, wie viele Bewertungen die Startseite zeigt, und der Pflichthinweis nach § 5b Abs. 3 UWG. Wie die Bewertungen selbst erst nach Fabians Freigabe live:
   Ein gespeicherter Entwurf ändert die Website nicht, erst „Veröffentlichen“. */

/** Entwurf des Pflichthinweises: ob und wie wir sicherstellen, dass Bewertungen von echten Mandanten stammen.
    Gilt auch, solange das Global noch nicht veröffentlicht ist, denn ohne Hinweis dürfen keine Bewertungen erscheinen.
    Er nennt keine Zahl, damit er stimmt, wie viele Bewertungen die Startseite auch zeigt. */
export const hinweisVorlage =
  "Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die neuesten Bewertungen unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.";

/** Wie viele Bewertungen die Startseite höchstens zeigt: Vorgabe und Obergrenze des Felds unten. */
export const anzahlStartseiteVorgabe = 3;
export const anzahlStartseiteMax = 10;

export const GoogleProfil: GlobalConfig = {
  slug: "google-profil",
  label: "Google-Profil",
  admin: {
    group: "Google-Bewertungen",
    description:
      "Gesamtnote, Anzahl und Stand wie im Google-Unternehmensprofil. Bei jeder Übernahme neuer Bewertungen mit aktualisieren.",
  },
  versions: { drafts: true, max: 20 },
  access: {
    // Ohne Anmeldung nur die veröffentlichte Fassung, auch über die API.
    read: ({ req: { user } }) => (user ? true : { _status: { equals: "published" } }),
    update: angemeldet,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "gesamtnote",
          type: "number",
          label: "Gesamtnote",
          min: 1,
          max: 5,
          admin: {
            step: 0.1,
            width: "50%",
            description: "Wie bei Google, z. B. 4,9. Leer lassen, dann zeigt die Startseite keine Gesamtnote.",
          },
        },
        {
          name: "anzahl",
          type: "number",
          label: "Anzahl der Bewertungen",
          min: 1,
          admin: { step: 1, width: "50%", description: "Wie bei Google neben der Gesamtnote." },
        },
      ],
    },
    {
      name: "stand",
      type: "date",
      label: "Stand",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
        description: "Tag, an dem ihr Bewertungen, Note und Anzahl zuletzt mit dem Google-Profil abgeglichen habt.",
      },
    },
    {
      name: "anzahlStartseite",
      type: "number",
      label: "Bewertungen auf der Startseite",
      required: true,
      defaultValue: anzahlStartseiteVorgabe,
      min: 1,
      max: anzahlStartseiteMax,
      admin: {
        step: 1,
        description: `So viele der neuesten veröffentlichten Bewertungen zeigt die Startseite, höchstens ${anzahlStartseiteMax}. Nennt der Hinweis unten eine Zahl, dort mit anpassen.`,
      },
      validate: (value: number | null | undefined) =>
        typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= anzahlStartseiteMax
          ? true
          : `Bitte eine ganze Zahl von 1 bis ${anzahlStartseiteMax} eingeben.`,
    },
    {
      name: "hinweis",
      type: "textarea",
      label: "Hinweis zur Echtheit (§ 5b Abs. 3 UWG)",
      required: true,
      defaultValue: hinweisVorlage,
      admin: {
        rows: 4,
        description: "Steht unter den Bewertungen. Fabian prüft den Text, bevor er veröffentlicht wird.",
      },
    },
  ],
};
