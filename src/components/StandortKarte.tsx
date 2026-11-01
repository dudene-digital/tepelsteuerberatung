import { site } from "@/lib/site";

/* Statisches Bild vom eigenen Server: Erst der Klick auf den Link verlässt die Website. */
export default function StandortKarte() {
  return (
    <figure className="flex-1 flex flex-col min-h-[250px] rounded-2xl overflow-hidden border border-outline-variant/20 shadow-lg bg-surface-container">
      <a
        href={site.googleProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block flex-1 min-h-[210px] group focus-visible:outline-offset-[-5px]!"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Kartenausschnitt ist bereits passend exportiert */}
        <img
          src="/standort-karte.webp"
          alt={`Kartenausschnitt mit dem Kanzleistandort ${site.address.street} in ${site.address.city}`}
          width={820}
          height={560}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-primary text-xs font-headline font-bold border border-outline-variant/30 group-hover:border-primary/40 transition-colors">
          <span className="material-symbols-outlined text-base" data-icon="directions" aria-hidden="true">
            directions
          </span>
          Route in Google Maps öffnen
        </span>
      </a>
      <figcaption className="px-3 py-2 text-[10px] text-on-surface-variant">
        Kartendaten ©{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          OpenStreetMap-Mitwirkende
        </a>
      </figcaption>
    </figure>
  );
}
