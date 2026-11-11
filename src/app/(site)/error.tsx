"use client";

import Link from "next/link";
import { useEffect } from "react";

/* Fehlerseite innerhalb des Website-Layouts, etwa wenn die Datenbank kurz nicht erreichbar ist.
   Navigation und Footer bleiben stehen. */
export default function Fehler({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="wrap pt-6 pb-[clamp(3rem,2rem+3.5vw,6rem)] md:pt-10">
      <h1 className="font-display text-title text-balance">Das hat gerade nicht geklappt.</h1>
      <div className="grid-12 mt-5 md:mt-7">
        <div className="col-content min-w-0">
          <p className="max-w-[34em] text-lead text-pretty">
            Die Seite ließ sich gerade nicht laden. Versuch es bitte gleich noch einmal.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-8">
            <button type="button" onClick={() => retry()} className="btn max-md:w-full">
              Erneut versuchen
            </button>
            <Link href="/" className="quiet-link">
              Zur Startseite
            </Link>
            <Link href="/kontakt" className="quiet-link">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
