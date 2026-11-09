import type { CollectionConfig } from "payload";
import { nurAdmin } from "./access";
import { slugField } from "./slug";

/** Kategorien laut Briefing. Sie werden beim ersten Start angelegt (siehe payload.config.ts). */
export const kategorienStart = ["E-Commerce", "GmbH", "Immobilien", "Freiberufler"] as const;

export const Kategorien: CollectionConfig = {
  slug: "kategorien",
  labels: { singular: "Kategorie", plural: "Kategorien" },
  admin: { useAsTitle: "name", group: "Ratgeber" },
  access: {
    read: () => true,
    create: nurAdmin,
    update: nurAdmin,
    delete: nurAdmin,
  },
  fields: [{ name: "name", type: "text", label: "Name", required: true }, slugField("name")],
};
