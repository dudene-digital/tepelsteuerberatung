import type { Metadata } from "next";
import "./(site)/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { gloock, schibsted } from "@/lib/fonts";
import NotFound from "./(site)/not-found";

/* 404 für Adressen, die es nicht gibt. Läuft außerhalb der Root-Layouts von Website und
   Redaktionsoberfläche und baut den Seitenrahmen deshalb selbst auf. */
export const metadata: Metadata = {
  title: "Seite nicht gefunden | Tepel Steuerberatung",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="de" className={`${gloock.variable} ${schibsted.variable} antialiased`}>
      <body className="flex flex-col">
        <Navbar />
        <main id="main-content" className="frame flex-1">
          <NotFound />
        </main>
        <Footer />
      </body>
    </html>
  );
}
