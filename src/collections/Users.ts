import type { CollectionConfig } from "payload";
import { adminOderSelbst, nurAdmin, nurAdminFeld } from "./access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Benutzer", plural: "Benutzer" },
  auth: true,
  admin: { useAsTitle: "name", defaultColumns: ["name", "email", "rolle"], group: "Verwaltung" },
  access: {
    read: adminOderSelbst,
    create: nurAdmin,
    update: adminOderSelbst,
    delete: nurAdmin,
  },
  fields: [
    { name: "name", type: "text", label: "Name", required: true },
    {
      name: "rolle",
      type: "select",
      label: "Rolle",
      required: true,
      defaultValue: "redaktion",
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Redaktion", value: "redaktion" },
      ],
      access: { update: nurAdminFeld },
      admin: { description: "Redaktion darf Artikel und Bilder pflegen, Admin zusätzlich Benutzer und Kategorien." },
    },
  ],
  hooks: {
    beforeChange: [
      // Wer sich als Erster anmeldet, richtet das System ein und wird Admin.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({ collection: "users", req });
        return totalDocs === 0 ? { ...data, rolle: "admin" } : data;
      },
    ],
  },
};
