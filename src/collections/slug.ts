import type { Field } from "payload";

/** Aus „Umsatzsteuer für Online-Händler“ wird „umsatzsteuer-fuer-online-haendler“. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const gueltig = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** URL-Teil, der sich aus dem angegebenen Feld bildet, solange niemand ihn selbst setzt. */
export function slugField(
  quelle: string,
  beschreibung = "Wird aus dem Titel gebildet. Nach dem Veröffentlichen nicht mehr ändern, sonst gehen Links ins Leere.",
): Field {
  return {
    name: "slug",
    type: "text",
    label: "URL",
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: beschreibung,
    },
    // Greift beim Veröffentlichen; Entwürfe prüft Payload nicht.
    validate: (value: unknown) =>
      (typeof value === "string" && gueltig.test(value)) || "Bitte eine URL aus Kleinbuchstaben, Ziffern und Bindestrichen angeben.",
    hooks: {
      beforeValidate: [
        ({ value, data, originalDoc }) => {
          const eigener = typeof value === "string" ? slugify(value) : "";
          if (eigener) return eigener;
          // Fehlt das Feld ganz (Teil-Update per API), bleibt der gespeicherte Slug.
          if (value == null && originalDoc?.slug) return undefined;
          // Leer gelassen: aus der Quelle bilden. Ergibt die nichts, bleibt der bisherige Slug.
          const text = data?.[quelle] ?? originalDoc?.[quelle];
          return (typeof text === "string" && slugify(text)) || originalDoc?.slug || null;
        },
      ],
    },
  };
}
