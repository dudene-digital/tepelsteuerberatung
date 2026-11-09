import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import sharp from "sharp";
import { Artikel } from "./collections/Artikel";
import { Kategorien, kategorienStart } from "./collections/Kategorien";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/* Öffentliche Adresse der Umgebung, z. B. https://tepel-steuerberatung.de. Payload erlaubt schreibende
   Anfragen mit Login-Cookie dann nur von dieser Adresse (CSRF-Schutz). */
const serverURL = process.env.SERVER_URL || "";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL,
  csrf: serverURL ? [serverURL] : [],
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " – Tepel Redaktion" },
  },
  collections: [Artikel, Kategorien, Media, Users],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      // Antwortet die Datenbank nicht, brechen Abfragen nach Sekunden ab, statt Seiten unbegrenzt hängen zu lassen.
      connectionTimeoutMillis: 5000,
      statement_timeout: 15000,
      query_timeout: 20000,
    },
    // Im Produktivbetrieb laufen die Migrationen beim Start; lokal gleicht Payload das Schema selbst ab.
    prodMigrations: migrations,
  }),
  i18n: { supportedLanguages: { de }, fallbackLanguage: "de" },
  graphQL: { disable: true },
  sharp,
  telemetry: false,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  async onInit(payload) {
    const { totalDocs } = await payload.count({ collection: "kategorien" });
    if (totalDocs > 0) return;
    for (const name of kategorienStart) {
      await payload.create({ collection: "kategorien", data: { name } });
    }
  },
});
