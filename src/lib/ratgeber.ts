import { cache } from "react";
import { headers } from "next/headers";
import config from "@payload-config";
import { getPayload, type Where } from "payload";
import type { Artikel, Kategorien, Media } from "@/payload-types";

/* Zugriff der Website auf die Ratgeber-Artikel. Öffentliche Abfragen laufen mit overrideAccess: false, also mit
   den Rechten eines anonymen Besuchers. Die Leseregel aus collections/Artikel.ts lässt dann nur Veröffentlichtes
   durch, auch bei Artikeln, auf die ein Artikel verlinkt. Entwürfe sieht nur die Vorschau für die Redaktion. */

export type ArtikelMitBezug = Omit<Artikel, "kategorie" | "titelbild"> & {
  kategorie: Kategorien | null;
  titelbild?: Media | null;
};

/** Was Listen und Sitemap brauchen. Inhalt und Titelbild bleiben in der Datenbank. */
export type ArtikelEintrag = Pick<Artikel, "id" | "titel" | "slug" | "teaser" | "veroeffentlichtAm" | "updatedAt"> & {
  kategorie: Pick<Kategorien, "id" | "name" | "slug"> | null;
};

const veroeffentlicht: Where = { _status: { equals: "published" } };

async function artikelListe(where: Where[], anzahl: number): Promise<ArtikelEintrag[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "artikel",
    where: { and: [veroeffentlicht, ...where] },
    select: { titel: true, slug: true, teaser: true, veroeffentlichtAm: true, kategorie: true, updatedAt: true },
    populate: { kategorien: { name: true, slug: true } },
    sort: "-veroeffentlichtAm",
    depth: 1,
    limit: anzahl,
    pagination: false,
    overrideAccess: false,
  });
  return docs as unknown as ArtikelEintrag[];
}

export const veroeffentlichteArtikel = () => artikelListe([], 100);

/** Die neuesten Artikel für Startseite und Branchenseiten, wahlweise nur aus einer Kategorie.
    Ist die Datenbank nicht erreichbar, fehlt der Block, die Seite selbst lädt trotzdem. */
export async function neuesteArtikel({
  kategorie,
  anzahl = 3,
}: { kategorie?: string; anzahl?: number } = {}): Promise<ArtikelEintrag[]> {
  try {
    return await artikelListe(kategorie ? [{ "kategorie.slug": { equals: kategorie } }] : [], anzahl);
  } catch (fehler) {
    console.error("Ratgeber-Artikel konnten nicht geladen werden", fehler);
    return [];
  }
}

/* cache(): Metadaten und Seite fragen denselben Artikel ab, die Datenbank nur einmal je Anfrage. */
export const artikelPerSlug = cache(async (slug: string): Promise<ArtikelMitBezug | null> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "artikel",
    where: { and: [veroeffentlicht, { slug: { equals: slug } }] },
    depth: 1,
    limit: 1,
    pagination: false,
    overrideAccess: false,
  });
  return (docs[0] as ArtikelMitBezug | undefined) ?? null;
});

/** Prüft das Login-Cookie der Redaktion. Nur dann zeigt die Website auch Entwürfe. */
export const darfVorschau = cache(async (): Promise<boolean> => {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  return Boolean(user);
});

/** Zuletzt gespeicherte Fassung eines Artikels, auch als Entwurf. Nur nach darfVorschau() aufrufen.
    Die Vorschau sucht über die ID: Ein Slug kann in einem Entwurf auch bei einem anderen Artikel stehen. */
export const artikelVorschau = cache(async (id: number): Promise<ArtikelMitBezug | null> => {
  const payload = await getPayload({ config });
  const artikel = await payload.findByID({ collection: "artikel", id, draft: true, depth: 1, disableErrors: true });
  return (artikel as ArtikelMitBezug | null) ?? null;
});

const datumsformat = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

export const formatDatum = (iso?: string | null) => (iso ? datumsformat.format(new Date(iso)) : "");
