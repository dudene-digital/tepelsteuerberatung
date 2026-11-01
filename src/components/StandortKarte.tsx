import { site } from "@/lib/site";

/* Statisches Bild vom eigenen Server: Erst der Klick auf den Link verlässt die Website. */
export default function StandortKarte() {
  return (
    <figure>
      <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="group block">
        {/* eslint-disable-next-line @next/next/no-img-element -- Kartenausschnitt ist bereits passend exportiert */}
        <img
          src="/standort-karte.webp"
          alt={`Kartenausschnitt mit dem Kanzleistandort ${site.address.street} in ${site.address.city}`}
          width={820}
          height={560}
          loading="lazy"
          className="block h-auto w-full border border-rule"
        />
        <span className="quiet-link group-hover:decoration-2">
          Route in Google Maps öffnen<span className="sr-only"> (öffnet in einem neuen Tab)</span>
        </span>
      </a>
      <figcaption className="text-sm text-muted">
        Kartendaten ©{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="inline-link">
          OpenStreetMap-Mitwirkende
        </a>
      </figcaption>
    </figure>
  );
}
