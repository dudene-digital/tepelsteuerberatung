import type { Metadata, Viewport } from "next";
import "./(site)/globals.css";
import SiteShell, { Statistik } from "@/components/SiteShell";
import { gloock, schibsted } from "@/lib/fonts";
import NotFound from "./(site)/not-found";

/* 404 für Adressen, die es nicht gibt. Läuft außerhalb der Root-Layouts von Website und
   Redaktionsoberfläche und baut den Seitenrahmen deshalb selbst auf. */
export const metadata: Metadata = {
  title: "Seite nicht gefunden | Tepel Steuerberatung",
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${gloock.variable} ${schibsted.variable} antialiased scroll-smooth`}
    >
      <head>
        <Statistik />
      </head>
      <body className="flex flex-col">
        <SiteShell>
          <NotFound />
        </SiteShell>
      </body>
    </html>
  );
}
