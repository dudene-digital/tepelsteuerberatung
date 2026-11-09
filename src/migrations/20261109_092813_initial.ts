import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_artikel_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__artikel_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_rolle" AS ENUM('admin', 'redaktion');
  CREATE TABLE "artikel" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"teaser" varchar,
  	"titelbild_id" integer,
  	"inhalt" jsonb,
  	"seo_titel" varchar,
  	"seo_beschreibung" varchar,
  	"slug" varchar,
  	"kategorie_id" integer,
  	"veroeffentlicht_am" timestamp(3) with time zone,
  	"autor" varchar DEFAULT 'Fabian Tepel',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_artikel_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_artikel_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titel" varchar,
  	"version_teaser" varchar,
  	"version_titelbild_id" integer,
  	"version_inhalt" jsonb,
  	"version_seo_titel" varchar,
  	"version_seo_beschreibung" varchar,
  	"version_slug" varchar,
  	"version_kategorie_id" integer,
  	"version_veroeffentlicht_am" timestamp(3) with time zone,
  	"version_autor" varchar DEFAULT 'Fabian Tepel',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__artikel_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "kategorien" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_klein_url" varchar,
  	"sizes_klein_width" numeric,
  	"sizes_klein_height" numeric,
  	"sizes_klein_mime_type" varchar,
  	"sizes_klein_filesize" numeric,
  	"sizes_klein_filename" varchar,
  	"sizes_gross_url" varchar,
  	"sizes_gross_width" numeric,
  	"sizes_gross_height" numeric,
  	"sizes_gross_mime_type" varchar,
  	"sizes_gross_filesize" numeric,
  	"sizes_gross_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rolle" "enum_users_rolle" DEFAULT 'redaktion' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"artikel_id" integer,
  	"kategorien_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "artikel" ADD CONSTRAINT "artikel_titelbild_id_media_id_fk" FOREIGN KEY ("titelbild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "artikel" ADD CONSTRAINT "artikel_kategorie_id_kategorien_id_fk" FOREIGN KEY ("kategorie_id") REFERENCES "public"."kategorien"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_artikel_v" ADD CONSTRAINT "_artikel_v_parent_id_artikel_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artikel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_artikel_v" ADD CONSTRAINT "_artikel_v_version_titelbild_id_media_id_fk" FOREIGN KEY ("version_titelbild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_artikel_v" ADD CONSTRAINT "_artikel_v_version_kategorie_id_kategorien_id_fk" FOREIGN KEY ("version_kategorie_id") REFERENCES "public"."kategorien"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artikel_fk" FOREIGN KEY ("artikel_id") REFERENCES "public"."artikel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kategorien_fk" FOREIGN KEY ("kategorien_id") REFERENCES "public"."kategorien"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "artikel_titelbild_idx" ON "artikel" USING btree ("titelbild_id");
  CREATE UNIQUE INDEX "artikel_slug_idx" ON "artikel" USING btree ("slug");
  CREATE INDEX "artikel_kategorie_idx" ON "artikel" USING btree ("kategorie_id");
  CREATE INDEX "artikel_updated_at_idx" ON "artikel" USING btree ("updated_at");
  CREATE INDEX "artikel_created_at_idx" ON "artikel" USING btree ("created_at");
  CREATE INDEX "artikel__status_idx" ON "artikel" USING btree ("_status");
  CREATE INDEX "_artikel_v_parent_idx" ON "_artikel_v" USING btree ("parent_id");
  CREATE INDEX "_artikel_v_version_version_titelbild_idx" ON "_artikel_v" USING btree ("version_titelbild_id");
  CREATE INDEX "_artikel_v_version_version_slug_idx" ON "_artikel_v" USING btree ("version_slug");
  CREATE INDEX "_artikel_v_version_version_kategorie_idx" ON "_artikel_v" USING btree ("version_kategorie_id");
  CREATE INDEX "_artikel_v_version_version_updated_at_idx" ON "_artikel_v" USING btree ("version_updated_at");
  CREATE INDEX "_artikel_v_version_version_created_at_idx" ON "_artikel_v" USING btree ("version_created_at");
  CREATE INDEX "_artikel_v_version_version__status_idx" ON "_artikel_v" USING btree ("version__status");
  CREATE INDEX "_artikel_v_created_at_idx" ON "_artikel_v" USING btree ("created_at");
  CREATE INDEX "_artikel_v_updated_at_idx" ON "_artikel_v" USING btree ("updated_at");
  CREATE INDEX "_artikel_v_latest_idx" ON "_artikel_v" USING btree ("latest");
  CREATE UNIQUE INDEX "kategorien_slug_idx" ON "kategorien" USING btree ("slug");
  CREATE INDEX "kategorien_updated_at_idx" ON "kategorien" USING btree ("updated_at");
  CREATE INDEX "kategorien_created_at_idx" ON "kategorien" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_klein_sizes_klein_filename_idx" ON "media" USING btree ("sizes_klein_filename");
  CREATE INDEX "media_sizes_gross_sizes_gross_filename_idx" ON "media" USING btree ("sizes_gross_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_artikel_id_idx" ON "payload_locked_documents_rels" USING btree ("artikel_id");
  CREATE INDEX "payload_locked_documents_rels_kategorien_id_idx" ON "payload_locked_documents_rels" USING btree ("kategorien_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "artikel" CASCADE;
  DROP TABLE "_artikel_v" CASCADE;
  DROP TABLE "kategorien" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_artikel_status";
  DROP TYPE "public"."enum__artikel_v_version_status";
  DROP TYPE "public"."enum_users_rolle";`)
}
