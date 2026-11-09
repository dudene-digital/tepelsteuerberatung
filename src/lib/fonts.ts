import { Gloock, Schibsted_Grotesk } from "next/font/google";

/* Schriften der Website. Eigene Datei, weil das Layout und die globale 404-Seite sie beide brauchen. */
export const gloock = Gloock({
  variable: "--font-gloock",
  weight: "400",
  subsets: ["latin"],
});

export const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});
