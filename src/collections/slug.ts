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

/** URL-Teil, der sich aus dem angegebenen Feld bildet, solange niemand ihn selbst setzt. */
export function slugField(quelle: string): Field {
  return {
    name: "slug",
    type: "text",
    label: "URL",
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "Wird aus dem Titel gebildet. Nach dem Veröffentlichen nicht mehr ändern, sonst gehen Links ins Leere.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === "string" && value.trim()) return slugify(value);
          const text = data?.[quelle];
          return typeof text === "string" ? slugify(text) : value;
        },
      ],
    },
  };
}
