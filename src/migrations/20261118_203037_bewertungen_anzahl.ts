import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "google_profil" ALTER COLUMN "hinweis" SET DEFAULT 'Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die neuesten Bewertungen unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.';
  ALTER TABLE "_google_profil_v" ALTER COLUMN "version_hinweis" SET DEFAULT 'Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die neuesten Bewertungen unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.';
  ALTER TABLE "google_profil" ADD COLUMN "anzahl_startseite" numeric DEFAULT 3;
  ALTER TABLE "_google_profil_v" ADD COLUMN "version_anzahl_startseite" numeric DEFAULT 3;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "google_profil" ALTER COLUMN "hinweis" SET DEFAULT 'Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die drei neuesten unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.';
  ALTER TABLE "_google_profil_v" ALTER COLUMN "version_hinweis" SET DEFAULT 'Die Bewertungen stammen aus unserem Google-Unternehmensprofil. Wir zeigen die drei neuesten unverändert. Ob eine Bewertung von einer Person stammt, die unsere Leistungen tatsächlich in Anspruch genommen hat, prüfen wir nicht.';
  ALTER TABLE "google_profil" DROP COLUMN "anzahl_startseite";
  ALTER TABLE "_google_profil_v" DROP COLUMN "version_anzahl_startseite";`)
}
