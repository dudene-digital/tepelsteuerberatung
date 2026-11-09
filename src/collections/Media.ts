import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";
import { angemeldet } from "./access";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Bild", plural: "Bilder" },
  admin: { group: "Ratgeber" },
  access: {
    read: () => true,
    create: angemeldet,
    update: angemeldet,
    delete: angemeldet,
  },
  upload: {
    // Auf dem Server liegt der Ordner auf einem eigenen Volume, damit Uploads ein neues Deployment überleben.
    staticDir: process.env.PAYLOAD_MEDIA_DIR || path.resolve(dirname, "../../media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    focalPoint: true,
    imageSizes: [
      { name: "klein", width: 800 },
      { name: "gross", width: 1600 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alternativtext",
      required: true,
      admin: { description: "Beschreibt in einem Satz, was zu sehen ist. Wichtig für Screenreader und Google." },
    },
  ],
};
