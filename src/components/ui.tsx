import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookingHref, bookingUrl } from "@/lib/site";

/* Bausteine der Seiten. Struktur entsteht aus Schrift, Haarlinien und dem Zwölf-Spalten-Raster. Keine Karten, keine Symbole. */

/** Hält in großen Überschriften den Gedankenstrich am Zeilenende und „Online-Händler“ in einem Stück. */
function tidyTitle(title: string): ReactNode {
  return title
    .replaceAll(" – ", "\u00a0– ")
    .split(/(Online-Händler)/)
    .map((part, index) =>
      part === "Online-Händler" ? (
        <span key={index} className="whitespace-nowrap">
          {part}
        </span>
      ) : (
        part
      ),
    );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn max-md:w-full">
      {children}
    </Link>
  );
}

/** Erstgespräch-Button. Mit Bookings-URL öffnet er die Buchungsseite in einem neuen Tab. */
export function BookingLink({ children }: { children: ReactNode }) {
  if (bookingUrl) {
    return (
      <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="btn max-md:w-full">
        {children}
      </a>
    );
  }
  return (
    <Link href={bookingHref} className="btn max-md:w-full">
      {children}
    </Link>
  );
}

export function QuietLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="quiet-link">
      {children}
    </Link>
  );
}

export function Section({
  children,
  id,
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="wrap section">
      {children}
    </section>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-h2 text-balance">
      {children}
    </h2>
  );
}

/** Überschrift in den ersten drei Spalten, Inhalt daneben. Die Überschrift bleibt beim Scrollen langer Listen stehen. */
export function TwoColumns({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <div className="grid-12 gap-y-5">
      <div className="col-aside lg:sticky lg:top-20 lg:self-start">{heading}</div>
      <div className="col-content min-w-0">{children}</div>
    </div>
  );
}

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen">
      <ol className="flex flex-wrap items-center gap-x-2 text-base text-muted">
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <li key={item.href} aria-current="page" className="py-2.5 text-ink">
              {item.name}
            </li>
          ) : (
            <li key={item.href} className="flex items-center gap-x-2">
              <Link href={item.href} className="py-2.5 underline-offset-[0.25em] hover:underline">
                {item.name}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/** Seitenkopf aller Unterseiten: einziges h1 der Seite. */
export function PageHero({
  label,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  label?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="wrap pt-1.5">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      {label && <p className="mt-6 font-medium md:mt-8">{label}</p>}
      <h1 className={`font-display text-title text-balance ${label ? "mt-2" : "mt-6 md:mt-8"}`}>{tidyTitle(title)}</h1>
      {(intro || children) && (
        <div className="grid-12 mt-5 md:mt-7">
          <div className="col-content min-w-0">
            {intro && <p className="max-w-[34em] text-lead text-pretty">{intro}</p>}
            {children && <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-8">{children}</div>}
          </div>
        </div>
      )}
    </section>
  );
}

/** Aufzählung ohne Titel: eine Aussage je Zeile, getrennt durch Haarlinien. */
export function RuleList({ items }: { items: readonly string[] }) {
  return (
    <ul className="border-t border-rule">
      {items.map((item) => (
        <li key={item} className="border-b border-rule py-4 lg:py-5">
          {/* Die Linie läuft über die ganze Spalte, der Text bleibt in lesbarer Zeilenlänge. */}
          <span className="block max-w-[40rem] text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export interface EntryItem {
  title: string;
  text?: string;
  href?: string;
}

function EntryBody({ item, headingLevel }: { item: EntryItem; headingLevel: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <>
      <Heading
        className={`font-display text-h2 text-balance decoration-1 underline-offset-[0.14em] lg:col-span-5 ${
          item.href ? "group-hover:underline touch:underline" : ""
        }`}
      >
        {item.title}
      </Heading>
      {item.text && <p className="mt-1.5 text-muted text-pretty lg:col-span-4 lg:mt-0">{item.text}</p>}
    </>
  );
}

/** Zeilen wie im Inhaltsverzeichnis: Titel links, Erläuterung rechts. Liegt auf dem Raster von TwoColumns. */
export function EntryList({
  items,
  headingLevel = 3,
  className = "",
}: {
  items: readonly EntryItem[];
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const row = "col-sub items-baseline border-t border-rule pt-4 pb-5 lg:pt-5 lg:pb-7";
  return (
    <ul className={`col-sub ${className}`}>
      {items.map((item) => (
        <li key={item.title} className="col-sub">
          {item.href ? (
            <Link href={item.href} className={`group max-lg:block ${row}`}>
              <EntryBody item={item} headingLevel={headingLevel} />
            </Link>
          ) : (
            <div className={row}>
              <EntryBody item={item} headingLevel={headingLevel} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Der Schwerpunkt groß vorneweg, die übrigen Einträge als Inhaltsverzeichnis darunter. */
export function LeadIndex({
  lead,
  items,
  headingLevel = 3,
}: {
  lead: EntryItem & { href: string };
  items: readonly EntryItem[];
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="grid-12">
      <Link href={lead.href} className="group col-sub col-full pb-8 max-lg:block lg:pb-[clamp(2rem,3.5vw,4rem)]">
        <Heading className="col-full font-display text-focus text-balance decoration-2 underline-offset-[0.1em] group-hover:underline touch:underline">
          {lead.title}
        </Heading>
        <p className="mt-3 max-w-[27em] text-lead text-pretty lg:col-span-9 lg:col-start-4 lg:mt-4">{lead.text}</p>
      </Link>
      <div className="col-content">
        <EntryList items={items} headingLevel={headingLevel} />
      </div>
    </div>
  );
}

/** Geordnete Schritte: Ziffer in den ersten drei Spalten, dahinter Titel und Text. */
export function Steps({
  items,
  headingLevel = 3,
  label,
}: {
  items: readonly { title: string; text?: string }[];
  headingLevel?: 2 | 3;
  label?: string;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ol aria-label={label} className="grid-12">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="col-sub col-full items-baseline max-lg:grid max-lg:grid-cols-[2.5rem_minmax(0,1fr)] border-t border-rule pt-4 pb-6 lg:pt-5 lg:pb-8"
        >
          <span aria-hidden="true" className="font-display text-h2 lg:col-span-3">
            {index + 1}
          </span>
          <Heading className="font-display text-h2 text-balance lg:col-span-5">{item.title}</Heading>
          {item.text && (
            <p className="col-start-2 mt-1.5 text-muted text-pretty lg:col-span-4 lg:col-start-auto lg:mt-0">{item.text}</p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Lesetext eine Stufe über dem Fließtext: Das Stichwort läuft in die Zeile ein. */
export function Statements({
  items,
  headingLevel = 3,
}: {
  items: readonly { title: string; text: string }[];
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="max-w-[27em] text-statement text-muted">
      {items.map((item, index) => (
        <div key={item.title} className={index > 0 ? "mt-[0.85em]" : ""}>
          <Heading className="inline font-display text-ink">{item.title}</Heading>{" "}
          <p className="inline tracking-[-0.012em]">– {item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* Seitenverhältnis des Fotorahmens in PhotoSplit, passend zu aspect-[1.148] unten. */
const SPLIT_ASPECT = 1.148;

/** Farbfoto über acht Spalten, Text rechts daneben auf der Grundlinie des Fotos. Am Handy steht der Text darunter.
    Ist der Text höher als das Foto, wächst der Rahmen mit, damit die Überschrift nicht über dem Foto hängt. */
export function PhotoSplit({
  photo,
  imageClassName = "",
  labelledBy,
  className = "",
  children,
}: {
  photo: { src: string; alt: string; width: number; height: number };
  imageClassName?: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  /* Ein breiteres Foto füllt den Rahmen über die Höhe und wird dabei breiter gemalt als der Rahmen.
     sizes muss diese Breite nennen, sonst lädt der Browser eine zu kleine Datei. */
  const overscan = Math.max(1, photo.width / photo.height / SPLIT_ASPECT);
  const sizes = `(min-width: 1920px) ${Math.round(1280 * overscan)}px, (min-width: 1024px) ${Math.round(
    67 * overscan
  )}vw, ${Math.round(100 * overscan)}vw`;
  return (
    <section aria-labelledby={labelledBy} className={`section ${className}`}>
      <div className="grid-12 items-end gap-y-5">
        {/* Der Platzhalter gibt die Mindesthöhe vor. Die Breite bleibt an die Spalte gebunden, auch wenn der Rahmen mitwächst. */}
        <div className="relative overflow-hidden lg:col-span-8 lg:self-stretch">
          <div aria-hidden="true" className="aspect-[1.148]" />
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            className={`object-cover ${imageClassName}`}
          />
        </div>
        <div className="wrap min-w-0 lg:col-span-4 lg:pl-0">{children}</div>
      </div>
    </section>
  );
}

/** Hinweis auf CFO as a Service. Der einzige gerahmte Block der Seiten, damit er sich vom Raster abhebt. */
export function CfoHinweis({ text }: { text: string }) {
  return (
    <aside aria-label="Hinweis auf CFO as a Service" className="border border-ink p-5 md:p-8">
      <p className="font-medium">Neu: CFO as a Service</p>
      <p className="mt-2 max-w-[24em] font-display text-h2 text-balance">{text}</p>
      <div className="mt-3">
        <QuietLink href="/cfo-as-a-service">Mehr zu CFO as a Service</QuietLink>
      </div>
    </aside>
  );
}

/** Beschriftete Zeilen für Kontaktdaten. */
export function InfoRows({ rows }: { rows: readonly { label: string; content: ReactNode }[] }) {
  return (
    <dl className="border-t border-rule">
      {rows.map((row) => (
        <div key={row.label} className="border-b border-rule py-3.5">
          <dt className="text-base text-muted">{row.label}</dt>
          <dd className="mt-0.5 min-w-0 break-words">{row.content}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Abschluss jeder Seite. Ohne Angaben führt der Button zum Erstgespräch. */
export function CtaBand({
  title = "In 30 Minuten weißt\u00a0du, was wir für\u00a0dich tun können.",
  text = "Kostenloses Erstgespräch per Video oder im Büro.",
  label = "Termin wählen",
  href,
}: {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="wrap section pb-[clamp(3rem,2rem+3.5vw,6rem)]">
      <h2 className="font-display text-closing text-balance">{tidyTitle(title)}</h2>
      <div className="grid-12 mt-6 md:mt-8">
        <div className="col-content flex flex-col items-start gap-x-8 gap-y-4 md:flex-row md:flex-wrap md:items-center">
          {text && <p className="text-lead">{text}</p>}
          {href ? <PrimaryLink href={href}>{label}</PrimaryLink> : <BookingLink>{label}</BookingLink>}
        </div>
      </div>
    </section>
  );
}
