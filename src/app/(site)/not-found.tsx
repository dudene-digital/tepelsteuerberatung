import type { Metadata } from "next";
import { PrimaryLink, QuietLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

/* Gilt auch für Adressen, die es nie gab. Next setzt dafür selbst noindex und den Status 404. */
export default function NotFound() {
  return (
    <section className="wrap pt-6 pb-[clamp(3rem,2rem+3.5vw,6rem)] md:pt-10">
      <h1 className="font-display text-title text-balance">Diese Seite gibt es nicht.</h1>
      <div className="grid-12 mt-5 md:mt-7">
        <div className="col-content min-w-0">
          <p className="max-w-[34em] text-lead text-pretty">
            Vielleicht hat sich die Adresse geändert. Von hier aus geht es weiter:
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-8">
            <PrimaryLink href="/">Zur Startseite</PrimaryLink>
            <QuietLink href="/leistungen">Leistungen</QuietLink>
            <QuietLink href="/kontakt">Kontakt</QuietLink>
          </div>
        </div>
      </div>
    </section>
  );
}
