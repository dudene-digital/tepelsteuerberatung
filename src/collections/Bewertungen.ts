import type { CollectionConfig, Where } from "payload";
import { angemeldet } from "./access";

/* Google-Bewertungen als Zitate auf der Startseite, von Hand aus dem Google-Unternehmensprofil übernommen.
   Die Website bindet Google nicht ein: kein Abruf bei Google, keine Google-Skripte im Browser, kein Tracking.
   Pflege: neue Bewertungen wörtlich übernehmen, nicht auswählen oder kürzen. Namen nur so, wie sie bei Google
   öffentlich stehen, am besten Vorname und Initial. Neue Einträge sind Entwürfe; erst wenn Fabian sie veröffentlicht,
   sind sie live. Die Startseite zeigt die drei neuesten veröffentlichten Bewertungen, die nicht ausgeblendet sind.
   Note, Anzahl, Stand und den Hinweis nach § 5b Abs. 3 UWG pflegt das Global „Google-Profil“. */

/** So viele Bewertungen zeigt die Startseite. Der UWG-Hinweis im Global nennt dieselbe Zahl. */
export const bewertungenAufStartseite = 3;

/** Was Besucher sehen dürfen: veröffentlicht und nicht ausgeblendet. */
export const sichtbar: Where = { and: [{ _status: { equals: "published" } }, { ausgeblendet: { not_equals: true } }] };

export const Bewertungen: CollectionConfig = {
  slug: "bewertungen",
  labels: { singular: "Bewertung", plural: "Bewertungen" },
  typescript: { interface: "Bewertung" },
  admin: {
    useAsTitle: "autor",
    defaultColumns: ["autor", "datum", "sterne", "ausgeblendet", "_status"],
    listSearchableFields: ["autor", "text"],
    group: "Google-Bewertungen",
    description:
      "Die Startseite zeigt automatisch die drei neuesten veröffentlichten Bewertungen. Bewertungen wörtlich aus dem Google-Profil übernehmen und erst nach Fabians Freigabe veröffentlichen.",
  },
  defaultSort: "-datum",
  versions: { drafts: true, maxPerDoc: 10 },
  access: {
    // Ohne Anmeldung nur Veröffentlichtes, das nicht ausgeblendet ist. So liefert auch die API nichts anderes.
    read: ({ req: { user } }) => (user ? true : sichtbar),
    create: angemeldet,
    update: angemeldet,
    // Widerspricht jemand der Anzeige, entfernt die Redaktion die Bewertung selbst (siehe Datenschutzerklärung).
    delete: angemeldet,
  },
  fields: [
    {
      name: "text",
      type: "textarea",
      label: "Bewertungstext",
      required: true,
      admin: {
        rows: 6,
        description: "Wörtlich wie bei Google, ohne Kürzungen. Anführungszeichen setzt die Website selbst.",
      },
    },
    {
      name: "autor",
      type: "text",
      label: "Name",
      required: true,
      admin: { description: "So, wie er bei Google steht, am besten Vorname und Initial, z. B. „Anna M.“" },
    },
    {
      name: "datum",
      type: "date",
      label: "Monat der Bewertung",
      required: true,
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "monthOnly", displayFormat: "MMMM yyyy" },
        description: "Steht bei Google nur „vor 3 Monaten“, den ungefähren Monat wählen.",
      },
    },
    {
      name: "sterne",
      type: "number",
      label: "Sterne",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
      admin: { position: "sidebar", step: 1, description: "1 bis 5, wie bei Google." },
      validate: (value: number | null | undefined) =>
        typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5
          ? true
          : "Bitte eine ganze Zahl von 1 bis 5 eingeben.",
    },
    {
      name: "ausgeblendet",
      type: "checkbox",
      label: "Auf der Website ausblenden",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Etwa wenn die Bewertung bei Google nicht mehr steht. Widerspricht jemand der Anzeige, die Bewertung besser löschen.",
      },
    },
  ],
};
