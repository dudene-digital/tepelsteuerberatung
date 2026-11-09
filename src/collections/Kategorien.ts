import { APIError, type CollectionConfig } from "payload";
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
  hooks: {
    beforeDelete: [
      async ({ id, req }) => {
        // Veröffentlichte Fassungen und der jeweils neueste Entwurf, der eine andere Kategorie haben kann.
        const [{ totalDocs: artikel }, { totalDocs: entwuerfe }] = await Promise.all([
          req.payload.count({ collection: "artikel", where: { kategorie: { equals: id } }, req }),
          req.payload.countVersions({
            collection: "artikel",
            where: { and: [{ latest: { equals: true } }, { "version.kategorie": { equals: id } }] },
            req,
          }),
        ]);
        const anzahl = Math.max(artikel, entwuerfe);
        if (anzahl > 0) {
          throw new APIError(
            `Diese Kategorie wird noch von ${anzahl} Artikel(n) genutzt. Bitte zuerst die Artikel umstellen.`,
            400,
            undefined,
            true,
          );
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", label: "Name", required: true },
    // Der URL-Teil verbindet die Kategorie mit ihrer Branchenseite: „gmbh“ zeigt die Artikel auf /fuer-wen/gmbh.
    slugField(
      "name",
      "Verbindet die Kategorie mit ihrer Branchenseite, „gmbh“ etwa mit /fuer-wen/gmbh. Nicht ändern, sonst fehlen die Artikel dort.",
    ),
  ],
};
