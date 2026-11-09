import config from "@payload-config";
import { getPayload } from "payload";
import type { Artikel, Kategorien, Media } from "@/payload-types";

/* Zugriff der Website auf die Ratgeber-Artikel. Die Local API umgeht die Zugriffsregeln,
   deshalb filtert jede Abfrage hier selbst auf veröffentlichte Artikel. */

export type ArtikelMitBezug = Omit<Artikel, "kategorie" | "titelbild"> & {
  kategorie: Kategorien;
  titelbild?: Media | null;
};

const veroeffentlicht = { _status: { equals: "published" } } as const;

export async function veroeffentlichteArtikel(): Promise<ArtikelMitBezug[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "artikel",
    where: veroeffentlicht,
    sort: "-veroeffentlichtAm",
    depth: 1,
    limit: 100,
  });
  return docs as ArtikelMitBezug[];
}

export async function artikelPerSlug(slug: string): Promise<ArtikelMitBezug | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "artikel",
    where: { and: [veroeffentlicht, { slug: { equals: slug } }] },
    depth: 1,
    limit: 1,
  });
  return (docs[0] as ArtikelMitBezug | undefined) ?? null;
}

const datumsformat = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

export const formatDatum = (iso?: string | null) => (iso ? datumsformat.format(new Date(iso)) : "");
