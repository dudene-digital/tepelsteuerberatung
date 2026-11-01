import type { ReactNode } from "react";
import Link from "next/link";
import { bookingHref, bookingUrl } from "@/lib/site";

/* Bausteine der Unterseiten. Sie übernehmen Farben, Radien und Abstände der bisherigen Seite. */

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} data-icon={name} aria-hidden="true">
      {name}
    </span>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block py-1 px-3 mb-6 bg-surface-container-high rounded-full border border-outline-variant/20 text-tertiary text-[10px] font-bold tracking-[0.2em] uppercase">
      {children}
    </span>
  );
}

const primaryClass =
  "inline-flex items-center justify-center gap-3 text-center hero-gradient text-on-primary-container px-6 py-4 md:px-10 md:py-5 rounded-xl font-headline font-bold text-base md:text-lg shadow-[0_0_40px_rgba(165,231,255,0.15)] hover:scale-[1.02] transition-transform";
const secondaryClass =
  "inline-flex items-center justify-center gap-3 text-center bg-surface-variant/20 border border-outline-variant/30 text-on-surface px-6 py-4 md:px-10 md:py-5 rounded-xl font-headline font-bold text-base md:text-lg hover:bg-surface-variant/30 transition-all";

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={primaryClass}>
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={secondaryClass}>
      {children}
    </Link>
  );
}

/** Erstgespräch-Button. Mit Bookings-URL öffnet er die Buchungsseite in einem neuen Tab. */
export function BookingLink({ children }: { children: ReactNode }) {
  if (bookingUrl) {
    return (
      <a href={bookingHref} target="_blank" rel="noopener noreferrer" className={primaryClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={bookingHref} className={primaryClass}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-headline font-bold text-primary hover:text-primary-container transition-colors group"
    >
      {children}
      <Icon name="arrow_forward" className="text-lg group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

const tones = {
  default: "",
  low: "bg-surface-container-low",
  lowest: "bg-surface-container-lowest",
  container: "bg-surface-container",
};

export function Section({
  children,
  tone = "default",
  size = "default",
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: "default" | "narrow";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 md:py-28 relative scroll-mt-24 ${tones[tone]}`}>
      <div className={`mx-auto px-6 md:px-8 ${size === "narrow" ? "max-w-4xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  children,
  intro,
  center = false,
}: {
  id?: string;
  children: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}`}>
      <h2 id={id} className="font-headline text-3xl md:text-4xl font-bold mb-6 text-on-surface">
        {children}
      </h2>
      {intro && <p className="text-lg text-on-surface-variant leading-relaxed mb-6">{intro}</p>}
      <div className={`w-24 h-1 bg-primary rounded-full ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-on-surface">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Seitenkopf aller Unterseiten: einziges h1 der Seite, dazu der bekannte Lichtschein im Hintergrund. */
export function PageHero({
  badge,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  badge?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {badge && <Badge>{badge}</Badge>}
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-8 max-w-5xl text-balance">
          {title}
        </h1>
        {intro && <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icon name="check_circle" className="text-primary mt-0.5 shrink-0" />
          <span className="text-on-surface leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-card p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 ${className}`}>{children}</div>
  );
}

/** Verlinkte Kachel für Leistungen und Zielgruppen. */
export function LinkCard({
  href,
  title,
  text,
  icon,
  headingLevel = 3,
}: {
  href: string;
  title: string;
  text: string;
  icon?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Link
      href={href}
      className="glass-card flex flex-col p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-300 group"
    >
      {icon && <Icon name={icon} className="text-4xl text-primary mb-6 block" />}
      <Heading className="font-headline text-xl md:text-2xl font-bold mb-3 text-on-surface">{title}</Heading>
      <p className="text-on-surface-variant leading-relaxed mb-6 flex-1">{text}</p>
      <span className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary">
        Mehr erfahren
        <Icon name="arrow_forward" className="text-lg group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

/** Abschluss jeder Seite. Ohne Angaben führt der Button zum Erstgespräch. */
export function CtaBand({
  title = "In 30 Minuten weißt du, was wir für dich tun können.",
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
    <section className="py-20 md:py-28 bg-surface-container relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-6 text-on-surface text-balance">{title}</h2>
        {text ? <p className="text-lg md:text-xl text-on-surface-variant mb-10">{text}</p> : <div className="mb-10" />}
        {href ? (
          <PrimaryLink href={href}>
            {label}
            <Icon name="arrow_forward" />
          </PrimaryLink>
        ) : (
          <BookingLink>
            {label}
            <Icon name="arrow_forward" />
          </BookingLink>
        )}
      </div>
    </section>
  );
}
