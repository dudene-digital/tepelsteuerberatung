import type { CollectionConfig } from "payload";
import { HeadingFeature, LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { angemeldet, nurAdmin } from "./access";
import { slugField } from "./slug";

/* Funktionen, die zum Design der Seite nicht passen oder Überschriften außerhalb von H2/H3 erzeugen würden. */
const ohne = new Set(["heading", "link", "subscript", "superscript", "inlineCode", "checklist", "indent", "align", "relationship"]);

export const Artikel: CollectionConfig = {
  slug: "artikel",
  labels: { singular: "Artikel", plural: "Artikel" },
  admin: {
    useAsTitle: "titel",
    defaultColumns: ["titel", "kategorie", "_status", "veroeffentlichtAm"],
    group: "Ratgeber",
    // Adresse für den Knopf „Ansehen“. Mit ?vorschau=<ID> zeigt die Seite angemeldeten Nutzern auch Entwürfe.
    preview: (doc) =>
      typeof doc.slug === "string" && doc.slug && doc.id ? `/wissen/${doc.slug}?vorschau=${String(doc.id)}` : null,
    // Payloads Vorschau-Knopf ist nur ein Symbol; dieser trägt eine Beschriftung.
    components: { edit: { PreviewButton: "/components/admin/ArtikelAnsehen#ArtikelAnsehen" } },
  },
  defaultSort: "-veroeffentlichtAm",
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    // Ohne Anmeldung nur Veröffentlichtes, angemeldet auch Entwürfe.
    read: ({ req: { user } }) => (user ? true : { _status: { equals: "published" } }),
    create: angemeldet,
    update: angemeldet,
    delete: nurAdmin,
  },
  fields: [
    { name: "titel", type: "text", label: "Titel", required: true },
    {
      name: "teaser",
      type: "textarea",
      label: "Teaser",
      required: true,
      maxLength: 300,
      admin: { description: "Ein bis zwei Sätze. Erscheint in der Übersicht und unter dem Titel." },
    },
    { name: "titelbild", type: "upload", relationTo: "media", label: "Titelbild" },
    {
      name: "inhalt",
      type: "richText",
      label: "Inhalt",
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => !ohne.has(feature.key)),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
          // Interne Links nur auf andere Artikel; die Website setzt daraus /wissen/<slug>.
          LinkFeature({ enabledCollections: ["artikel"] }),
        ],
      }),
    },
    {
      type: "collapsible",
      label: "Suchmaschinen",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "seoTitel",
          type: "text",
          label: "Seitentitel",
          maxLength: 60,
          admin: { description: "Leer lassen, dann gilt der Titel. Höchstens 60 Zeichen." },
        },
        {
          name: "seoBeschreibung",
          type: "textarea",
          label: "Beschreibung",
          maxLength: 160,
          admin: { description: "Leer lassen, dann gilt der Teaser. Höchstens 160 Zeichen." },
        },
      ],
    },
    slugField("titel"),
    {
      name: "kategorie",
      type: "relationship",
      relationTo: "kategorien",
      label: "Kategorie",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "veroeffentlichtAm",
      type: "date",
      label: "Veröffentlicht am",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" },
        description: "Wird beim ersten Veröffentlichen gesetzt, wenn leer.",
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) =>
            !value && siblingData?._status === "published" ? new Date().toISOString() : value,
        ],
      },
    },
    { name: "autor", type: "text", label: "Autor", defaultValue: "Fabian Tepel", admin: { position: "sidebar" } },
  ],
};
