import type { ReactNode } from "react";
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/* Seitenrahmen der Website. Gemeinsam für das Layout und die globale 404-Seite, die außerhalb des Layouts läuft. */

export function Statistik() {
  return (
    <Script defer data-domain="tepel-steuerberatung.de" src="https://analytics.tepel-steuerberatung.de/js/script.js" />
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Zum Inhalt springen
      </a>
      <Navbar />
      <main id="main-content" className="frame flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
