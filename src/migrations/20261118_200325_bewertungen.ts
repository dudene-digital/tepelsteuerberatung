import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_bewertungen_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__bewertungen_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_google_profil_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__google_profil_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "bewertungen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"autor" varchar,
  	"datum" timestamp(3) with time zone,
  	"sterne" numeric DEFAULT 5,
  	"ausgeblendet" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_bewertungen_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_bewertungen_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_text" varchar,
  	"version_autor" varchar,
  	"version_datum" timestamp(3) with time zone,
  	"version_sterne" numeric DEFAULT 5,
  	"version_ausgeblendet" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__bewertungen_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "google_profil" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gesamtnote" numeric,
  	"anzahl" numeric,
  	"stand" timestamp(3) with time zone,
  	"hinweis" varchar DEFAULT 'Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die drei neuesten unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.',
  	"_status" "enum_google_profil_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_google_profil_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_gesamtnote" numeric,
  	"version_anzahl" numeric,
  	"version_stand" timestamp(3) with time zone,
  	"version_hinweis" varchar DEFAULT 'Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die drei neuesten unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.',
  	"version__status" "enum__google_profil_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "bewertungen_id" integer;
  ALTER TABLE "_bewertungen_v" ADD CONSTRAINT "_bewertungen_v_parent_id_bewertungen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."bewertungen"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "bewertungen_updated_at_idx" ON "bewertungen" USING btree ("updated_at");
  CREATE INDEX "bewertungen_created_at_idx" ON "bewertungen" USING btree ("created_at");
  CREATE INDEX "bewertungen__status_idx" ON "bewertungen" USING btree ("_status");
  CREATE INDEX "_bewertungen_v_parent_idx" ON "_bewertungen_v" USING btree ("parent_id");
  CREATE INDEX "_bewertungen_v_version_version_updated_at_idx" ON "_bewertungen_v" USING btree ("version_updated_at");
  CREATE INDEX "_bewertungen_v_version_version_created_at_idx" ON "_bewertungen_v" USING btree ("version_created_at");
  CREATE INDEX "_bewertungen_v_version_version__status_idx" ON "_bewertungen_v" USING btree ("version__status");
  CREATE INDEX "_bewertungen_v_created_at_idx" ON "_bewertungen_v" USING btree ("created_at");
  CREATE INDEX "_bewertungen_v_updated_at_idx" ON "_bewertungen_v" USING btree ("updated_at");
  CREATE INDEX "_bewertungen_v_latest_idx" ON "_bewertungen_v" USING btree ("latest");
  CREATE INDEX "google_profil__status_idx" ON "google_profil" USING btree ("_status");
  CREATE INDEX "_google_profil_v_version_version__status_idx" ON "_google_profil_v" USING btree ("version__status");
  CREATE INDEX "_google_profil_v_created_at_idx" ON "_google_profil_v" USING btree ("created_at");
  CREATE INDEX "_google_profil_v_updated_at_idx" ON "_google_profil_v" USING btree ("updated_at");
  CREATE INDEX "_google_profil_v_latest_idx" ON "_google_profil_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bewertungen_fk" FOREIGN KEY ("bewertungen_id") REFERENCES "public"."bewertungen"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_bewertungen_id_idx" ON "payload_locked_documents_rels" USING btree ("bewertungen_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Von Hand umgestellt: Erst die Spalte in payload_locked_documents_rels, dann die Tabellen. In der erzeugten
  // Reihenfolge entfernte DROP TABLE … CASCADE den Fremdschlüssel schon, und DROP CONSTRAINT brach ab.
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_bewertungen_fk";
  DROP INDEX "payload_locked_documents_rels_bewertungen_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "bewertungen_id";
  ALTER TABLE "bewertungen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_bewertungen_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "google_profil" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_google_profil_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "bewertungen" CASCADE;
  DROP TABLE "_bewertungen_v" CASCADE;
  DROP TABLE "google_profil" CASCADE;
  DROP TABLE "_google_profil_v" CASCADE;
  DROP TYPE "public"."enum_bewertungen_status";
  DROP TYPE "public"."enum__bewertungen_v_version_status";
  DROP TYPE "public"."enum_google_profil_status";
  DROP TYPE "public"."enum__google_profil_v_version_status";`)
}
