/* Inhalte des Bereichs „Leistungen“. Texte wörtlich aus Fabians Briefing, außer bei leistungenUebersicht. */

export type LeistungSlug =
  | "finanzbuchhaltung"
  | "lohn"
  | "jahresabschluss"
  | "gruendung"
  | "steuergestaltung";

export interface Leistung {
  slug: LeistungSlug;
  navLabel: string;
  h1: string;
  intro: string;
  enthalten: readonly string[];
  /** Material-Symbols-Name für die Kachel auf der Übersicht. */
  icon: string;
}

export const leistungen: readonly Leistung[] = [
  {
    slug: "finanzbuchhaltung",
    navLabel: "Finanzbuchhaltung & UStVA",
    h1: "Buchhaltung, die läuft – ohne Pendelordner",
    intro:
      "Du fotografierst oder lädst Belege hoch, deine Bank- und Zahlungsdaten fließen automatisch ein. Wir buchen, prüfen und melden – pünktlich zum 10.",
    enthalten: [
      "Laufende Finanzbuchhaltung (monatlich oder quartalsweise)",
      "Umsatzsteuer-Voranmeldungen, Dauerfristverlängerung, Zusammenfassende Meldungen",
      "Automatischer Belegabgleich mit Bank und Zahlungsdienstleistern",
      "Monatliche BWA online einsehbar",
      "Offene-Posten-Liste auf Wunsch",
    ],
    icon: "devices",
  },
  {
    slug: "lohn",
    navLabel: "Lohn & Gehalt",
    h1: "Lohnabrechnung, auf die sich dein Team verlassen kann",
    intro:
      "Von der ersten Minijobberin bis zur 50-köpfigen Belegschaft: pünktlich, rechtssicher und digital. Abrechnungen landen per App bei deinen Mitarbeitenden.",
    enthalten: [
      "Monatliche Lohn- und Gehaltsabrechnung inkl. Meldewesen (Sozialversicherung, Lohnsteuer, Berufsgenossenschaft)",
      "Minijob, Midijob, Werkstudenten, Geschäftsführer",
      "Steuerfreie und pauschal versteuerte Benefits: Deutschlandticket, Jobrad, Sachbezugskarte, Kita-Zuschuss, betriebliche Altersvorsorge",
      "Digitale Lohnunterlagen und Bescheinigungen",
      "Begleitung von Lohnsteuer-Außenprüfungen und Betriebsprüfungen der Rentenversicherung",
    ],
    icon: "payments",
  },
  {
    slug: "jahresabschluss",
    navLabel: "Jahresabschluss & Steuererklärungen",
    h1: "Jahresabschluss und Steuererklärungen – pünktlich und mit Blick nach vorn",
    intro:
      "Wir erstellen nicht nur die Pflichtunterlagen, sondern besprechen mit dir, was die Zahlen für das nächste Jahr bedeuten.",
    enthalten: [
      "Bilanz mit GuV (Einzelunternehmen, GmbH, GmbH & Co. KG), E-Bilanz, Offenlegung",
      "Einnahmen-Überschuss-Rechnung",
      "Körperschaft-, Gewerbe- und Umsatzsteuererklärung, Feststellungserklärungen",
      "Einkommensteuererklärung für Unternehmer und Gesellschafter",
      "Bescheidprüfung und Einspruch",
      "Abschlussgespräch mit Steuerprognose",
    ],
    icon: "description",
  },
  {
    slug: "gruendung",
    navLabel: "Gründung & Rechtsformwahl",
    h1: "Richtig starten: Rechtsform, Zahlen, Finanzamt",
    intro:
      "Einzelunternehmen, GbR, UG, GmbH oder GmbH & Co. KG? Wir rechnen es dir mit deinen echten Zahlen durch – inklusive Belastungsvergleich.",
    enthalten: [
      "Rechtsformvergleich mit Steuerbelastungsrechnung",
      "Fragebogen zur steuerlichen Erfassung, Kleinunternehmerregelung ja oder nein",
      "Rentabilitäts- und Liquiditätsplanung für Bank oder Förderantrag",
      "Digitale Buchhaltung ab Tag 1",
      "Umwandlung Einzelunternehmen in GmbH, wenn es sich lohnt",
    ],
    icon: "category",
  },
  {
    slug: "steuergestaltung",
    navLabel: "Steuergestaltung & Beratung",
    h1: "Weiter denken als bis zum nächsten Bescheid",
    intro:
      "Wir schauen auf Struktur, nicht nur auf Belege: Wie viel Gehalt, wie viel Ausschüttung? Lohnt eine Holding? Wie wird die Immobilie optimal gehalten?",
    enthalten: [
      "Geschäftsführervergütung oder Gewinnausschüttung",
      "Holding-Strukturen",
      "Immobilien: privat, vermögensverwaltende GmbH oder GmbH & Co. KG",
      "Investitionsabzugsbetrag und Sonderabschreibungen",
      "Unterjährige Steuerprognosen und Kennzahlen-Reporting",
      "Begleitung von Betriebsprüfungen",
    ],
    icon: "insights",
  },
];

/* Das Briefing hat für die Übersicht weder H1 noch Description. Fabian sollte diese Texte freigeben. */
export const leistungenUebersicht = {
  title: "Leistungen",
  h1: "Unsere Leistungen",
  description:
    "Unsere Leistungen im Überblick: Finanzbuchhaltung & UStVA, Lohn & Gehalt, Jahresabschluss & Steuererklärungen, Gründung & Rechtsformwahl, Steuergestaltung & Beratung.",
} as const;

export function getLeistung(slug: string): Leistung | undefined {
  return leistungen.find((leistung) => leistung.slug === slug);
}
