/* Inhalte des Bereichs „Für wen“. Überschriften, Intros und Listen wörtlich aus Fabians Briefing. */

export interface Zielgruppe {
  slug: string;
  href: string;
  navLabel: string;
  kachel: { titel: string; teaser: string };
  h1: string;
  intro: string;
  /** Das Briefing nennt nur für E-Commerce einen SEO-Title. Sonst: Anfang der H1. */
  seoTitle: string;
  /** Text der Hinweisbox auf CFO as a Service. Das Briefing verlangt die Box, gibt aber keinen Text vor. */
  cfoHinweis?: string;
}

export interface ZielgruppeSeite extends Zielgruppe {
  punkte: readonly string[];
  weiterLink?: { label: string; href: string };
}

export interface EcommerceThema {
  begriff: string;
  text: string;
}

export interface ToolSchritt {
  titel: string;
  text?: string;
}

export interface FaqFrage {
  question: string;
  /** null, solange Fabian die Antwort nicht geliefert hat. Solche Fragen werden nicht angezeigt. */
  answer: string | null;
}

export interface Ecommerce extends Zielgruppe {
  badge: string;
  heroCta: string;
  themen: { heading: string; items: readonly EcommerceThema[] };
  tools: { heading: string; text: string; schrittLabel: string; schritte: readonly ToolSchritt[] };
  /** Textleiste statt Logos, wegen der Markenrichtlinien der Anbieter. */
  plattformen: { heading: string; namen: readonly string[] };
  faq: { heading: string; fragen: readonly FaqFrage[] };
  cta: string;
}

export const ecommerce: Ecommerce = {
  slug: "e-commerce",
  href: "/fuer-wen/e-commerce",
  navLabel: "E-Commerce & Online-Handel",
  kachel: {
    titel: "Online-Händler",
    teaser: "Shopify, Etsy, Amazon, eBay: OSS, Marktplatz-Meldungen und Buchhaltung, die mit deinem Shop spricht.",
  },
  h1: "Steuerberatung für Online-Händler – von Shopify bis Amazon",
  intro:
    "Dein Shop verkauft in ganz Europa, deine Buchhaltung soll Schritt halten. Wir verstehen Marktplätze, Zahlungsdienstleister und Umsatzsteuer im Binnenmarkt – und verbinden deine Tools direkt mit der Buchhaltung.",
  seoTitle: "Steuerberater für Online-Händler, Amazon & Shopify | Tepel Steuerberatung",
  cfoHinweis:
    "Wissen, welcher Kanal wirklich Geld verdient: Deckungsbeiträge inklusive Retouren, Gebühren und Werbekosten.",
  badge: "E-Commerce & Online-Handel",
  heroCta: "Kostenloser Umsatzsteuer-Check",
  themen: {
    heading: "Typische Themen, die wir für dich lösen",
    items: [
      {
        begriff: "OSS-Verfahren",
        text: "Überschreitest du die EU-weite Lieferschwelle von 10.000 €, gilt die Umsatzsteuer des Ziellandes. Wir melden quartalsweise über das One-Stop-Shop-Verfahren.",
      },
      {
        begriff: "Amazon FBA & Lager im Ausland",
        text: "Lagert Amazon deine Ware in Polen oder Tschechien, entstehen Registrierungspflichten. Wir behalten den Überblick.",
      },
      {
        begriff: "Plattformgebühren",
        text: "Rechnungen von Amazon, Etsy oder eBay aus Luxemburg oder Irland lösen Reverse Charge aus – auch für Kleinunternehmer.",
      },
      {
        begriff: "DAC7-Meldungen",
        text: "Marktplätze melden deine Verkäufe ans Bundeszentralamt für Steuern. Wir sorgen dafür, dass deine Erklärung dazu passt.",
      },
      {
        begriff: "Kleinunternehmerregelung",
        text: "Seit 2025 gelten 25.000 € (Vorjahr) und 100.000 € (laufendes Jahr) – wir sagen dir rechtzeitig, wann du rausfällst.",
      },
      {
        begriff: "Warenbestand & Retouren",
        text: "Inventur, Wareneinsatz und Retouren sauber abgebildet.",
      },
    ],
  },
  tools: {
    heading: "So verbinden wir deine Tools",
    text: "Über pathway, angebunden an unsere Buchhaltungssoftware ADDISON, laufen Verkäufe, Gebühren, Erstattungen und Zahlungen automatisch in die Buchhaltung – aufgeteilt nach Steuersatz und Lieferland, OSS-ready.",
    /* Schaubild desselben Satzes. Die Bausteine stammen aus dem Text oben, das Schaubild selbst nicht aus dem Briefing. */
    schrittLabel: "Weg deiner Daten in die Buchhaltung",
    schritte: [
      { titel: "Deine Tools", text: "Verkäufe, Gebühren, Erstattungen und Zahlungen" },
      { titel: "pathway" },
      { titel: "ADDISON", text: "Unsere Buchhaltungssoftware" },
      { titel: "Buchhaltung", text: "Aufgeteilt nach Steuersatz und Lieferland, OSS-ready" },
    ],
  },
  plattformen: {
    heading: "Plattformen und Zahlungsdienstleister",
    namen: [
      "Shopify",
      "WooCommerce",
      "Amazon",
      "eBay",
      "Otto",
      "Kaufland",
      "Zalando",
      "TikTok Shop",
      "PayPal",
      "Stripe",
      "Shopify Payments",
      "Klarna",
      "Mollie",
    ],
  },
  faq: {
    heading: "Häufige Fragen",
    fragen: [
      { question: "Ab wann brauche ich eine USt-ID in anderen EU-Ländern?", answer: null },
      { question: "Muss ich als Etsy-Verkäuferin ein Gewerbe anmelden?", answer: null },
      { question: "Was passiert, wenn ich die Lieferschwelle unterjährig überschreite?", answer: null },
    ],
  },
  cta: "Kostenloser Umsatzsteuer-Check für deinen Shop – 30 Minuten, per Video.",
};

/** Zielgruppen, die über /fuer-wen/[slug] laufen. E-Commerce hat eine eigene Seite. */
export const zielgruppenSeiten: readonly ZielgruppeSeite[] = [
  {
    slug: "gmbh",
    href: "/fuer-wen/gmbh",
    navLabel: "GmbH & GmbH & Co. KG",
    kachel: {
      titel: "GmbH & GmbH & Co. KG",
      teaser: "Laufende Buchhaltung, Jahresabschluss, Geschäftsführergehalt und Ausschüttung – steuerlich durchdacht.",
    },
    h1: "Steuerberatung für inhabergeführte GmbHs – Gesellschaft und Gesellschafter im Blick",
    intro:
      "Bei der GmbH hängen Unternehmen und Privatperson steuerlich eng zusammen. Wir betreuen beides aus einer Hand – von der laufenden Buchhaltung bis zur optimalen Gewinnverwendung.",
    seoTitle: "Steuerberatung für inhabergeführte GmbHs",
    cfoHinweis:
      "Deine GmbH nach vorn steuern: Liquidität, Planung und Bankgespräche aus derselben Hand wie Buchhaltung und Abschluss.",
    punkte: [
      "Laufende Buchhaltung, Lohn inkl. Geschäftsführer, Jahresabschluss, E-Bilanz, Offenlegung",
      "Gehalt oder Ausschüttung, Vermeidung verdeckter Gewinnausschüttungen",
      "GmbH & Co. KG: Sonder- und Ergänzungsbilanzen, Feststellungserklärung",
      "Holding-Prüfung",
      "Einkommensteuer der Gesellschafter inklusive",
    ],
  },
  {
    slug: "freiberufler",
    href: "/fuer-wen/freiberufler",
    navLabel: "Freiberufler & Selbständige",
    kachel: {
      titel: "Freiberufler & Selbständige",
      teaser: "EÜR, Umsatzsteuer, Vorauszahlungen im Griff – ohne Schuhkarton.",
    },
    h1: "Steuerberatung für Freiberufler – EÜR, Umsatzsteuer, Ruhe",
    intro:
      "Du willst arbeiten, nicht buchen. Wir übernehmen EÜR, Umsatzsteuer und Einkommensteuer und sagen dir vorher, was an Vorauszahlungen kommt.",
    seoTitle: "Steuerberatung für Freiberufler",
    punkte: [
      "Einnahmen-Überschuss-Rechnung",
      "Abgrenzung freiberuflich oder gewerblich (Gewerbesteuer vermeiden)",
      "Umsatzsteuer, Kleinunternehmerregelung, Reverse Charge bei Auslandsaufträgen",
      "Arbeitszimmer, Fahrzeug, Altersvorsorge optimal ansetzen",
      "Empfehlung für Steuerrücklagen, damit keine Nachzahlung überrascht",
    ],
  },
  {
    slug: "immobilien",
    href: "/fuer-wen/immobilien",
    navLabel: "Immobilien & Vermieter",
    kachel: {
      titel: "Immobilien & Vermieter",
      teaser: "Anlage V, Grundstücksgemeinschaften, Feststellungserklärungen, AfA-Optimierung.",
    },
    // Weiche Trennstelle: Am Handy ist das lange Wort breiter als der Bildschirm.
    h1: "Steuerberatung für Vermieter und Grundstücks\u00adgemeinschaften",
    intro:
      "Ob eine Wohnung oder ein ganzes Portfolio, ob allein oder in der Erbengemeinschaft: Wir holen aus deinen Immobilien steuerlich heraus, was drin ist.",
    seoTitle: "Steuerberatung für Vermieter und Grundstücksgemeinschaften",
    punkte: [
      "Anlage V und Feststellungserklärungen für Grundstücks- und Erbengemeinschaften",
      "AfA-Optimierung: Kaufpreisaufteilung, kürzere Restnutzungsdauer, degressive und Sonder-AfA für Neubauten",
      "Anschaffungsnahe Herstellungskosten im Blick",
      "Umsatzsteuer bei Gewerbevermietung",
      "Verkauf: 10-Jahres-Frist und gewerblicher Grundstückshandel",
      "Strukturberatung: privat halten oder vermögensverwaltende GmbH?",
    ],
  },
  {
    slug: "gruender",
    href: "/fuer-wen/gruender",
    navLabel: "Gründer",
    kachel: {
      titel: "Gründer",
      teaser: "Rechtsform, Planzahlen, Anmeldung beim Finanzamt – sauber von Tag 1.",
    },
    h1: "Gründen in Wiesbaden – mit sauberem Steuer-Setup ab Tag 1",
    intro:
      "Du hast die Idee, wir sorgen für das Fundament: die passende Rechtsform, die Anmeldung beim Finanzamt und eine Buchhaltung, die von Anfang an digital läuft.",
    seoTitle: "Gründen in Wiesbaden",
    punkte: ["Rechtsformvergleich", "Fragebogen zur steuerlichen Erfassung", "Digitale Buchhaltung ab Tag 1"],
    weiterLink: { label: "Gründung & Rechtsformwahl", href: "/leistungen/gruendung" },
  },
];

/** Alle fünf Kacheln in der Reihenfolge des Briefings, auch für die Startseite. */
export const zielgruppen: readonly Zielgruppe[] = [ecommerce, ...zielgruppenSeiten];

/* Das Briefing nennt für die Übersicht nur den Titel. Intro und Description sind die Kernbotschaft aus dem Briefing. */
export const fuerWenUebersicht = {
  h1: "Für wen wir arbeiten",
  intro:
    "Steuerberatung für Online-Händler, Unternehmer und Vermieter im Rhein-Main-Gebiet – digital im Alltag, persönlich, wenn es darauf ankommt.",
} as const;

/* Überschrift der Liste auf den Zielgruppenseiten, übernommen vom Aufbau der Leistungsseiten. */
export const punkteHeading = "Das ist enthalten";

export function getZielgruppeSeite(slug: string): ZielgruppeSeite | undefined {
  return zielgruppenSeiten.find((zielgruppe) => zielgruppe.slug === slug);
}
