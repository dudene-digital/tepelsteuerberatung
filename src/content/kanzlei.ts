/* Inhalte für Ablauf, Honorar, Team und Willkommen. Texte stammen wörtlich aus Fabians Briefing. */

export interface Seo {
  title: string;
  description: string;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FaqEntry {
  question: string;
  /** null: Antwort steht noch aus, die Frage wird nicht angezeigt. */
  answer: string | null;
}

export const fabianPortrait: Photo = {
  src: "/berater_1.jpg",
  alt: "Porträt von Fabian Tepel, Steuerberater in Wiesbaden",
  width: 5472,
  height: 3648,
};

export const fabianImBuero: Photo = {
  src: "/berater_2.jpg",
  alt: "Fabian Tepel im Büro, im Türrahmen zwischen Fachwerk und Backsteinwand",
  width: 5472,
  height: 3648,
};

/* ── /so-arbeiten-wir ── */

export interface AblaufSchritt {
  title: string;
  text: string;
}

export interface Tool {
  name: string;
  text: string;
  icon: string;
}

export const soArbeitenWir: {
  seo: Seo;
  h1: string;
  steps: readonly AblaufSchritt[];
  toolsHeading: string;
  tools: readonly Tool[];
  beraterwechselHeading: string;
  beraterwechselText: string;
} = {
  seo: {
    title: "So arbeiten wir",
    description:
      "In vier Schritten zu deiner neuen Steuerberatung: Erstgespräch, Festangebot, Onboarding und laufende Betreuung. Dazu unsere Tools und der Beraterwechsel.",
  },
  h1: "In vier Schritten zu deiner neuen Steuerberatung",
  steps: [
    {
      title: "Erstgespräch (kostenlos, 30 Minuten)",
      text: "Wir verstehen dein Business und deine Fragen. Per Video oder im Büro.",
    },
    {
      title: "Festangebot",
      text: "Innerhalb von zwei Werktagen bekommst du ein schriftliches Angebot.",
    },
    {
      title: "Onboarding",
      text: "Wir richten dein digitales Mandantenkonto ein, verbinden Bank und Shop und holen die Unterlagen bei deinem bisherigen Berater an.",
    },
    {
      title: "Laufende Betreuung",
      text: "Belege per App, Auswertungen online, Check-in quartalsweise oder monatlich.",
    },
  ],
  toolsHeading: "Unsere Tools",
  tools: [
    { name: "ADDISON Direkt", text: "für Belege und Auswertungen", icon: "receipt_long" },
    { name: "ADDISON Lohn Online", text: "für die Lohnabrechnung", icon: "payments" },
    {
      name: "Datenaustausch",
      text: "über ein verschlüsseltes Mandantenportal statt per E-Mail",
      icon: "lock",
    },
  ],
  beraterwechselHeading: "Beraterwechsel",
  beraterwechselText:
    "Wechseln ist einfacher, als du denkst. Du unterschreibst eine Vollmacht, wir fordern Unterlagen und Datenbestände bei deinem bisherigen Berater an und behalten alle Fristen im Blick. Für dich entsteht keine Doppelarbeit.",
};

/* ── /honorar ── */

export interface Preisfaktor {
  text: string;
  icon: string;
}

export const honorar: {
  seo: Seo;
  h1: string;
  intro: string;
  angebotHeading: string;
  angebot: readonly string[];
  preisHeading: string;
  preisfaktoren: readonly Preisfaktor[];
} = {
  seo: {
    title: "Honorar",
    description:
      "Jedes Unternehmen ist anders – deshalb gibt es bei uns keine Preisliste, sondern ein Festangebot, das zu dir passt. Grundlage ist die Steuerberatervergütungsverordnung (StBVV).",
  },
  h1: "Was kostet Steuerberatung bei uns?",
  intro:
    "Jedes Unternehmen ist anders – deshalb gibt es bei uns keine Preisliste, sondern ein Festangebot, das zu dir passt. Grundlage ist die Steuerberatervergütungsverordnung (StBVV).",
  angebotHeading: "So entsteht dein Angebot",
  angebot: [
    "Kostenloses Erstgespräch: Wir klären Umfang, Belegmenge, Mitarbeitende und Rechtsform.",
    "Innerhalb von zwei Werktagen bekommst du ein schriftliches Festangebot.",
    "Laufende Leistungen rechnen wir als feste Monatspauschale ab – du weißt jeden Monat, was du zahlst.",
    "Beratung außerhalb der Pauschale stimmen wir vorher mit dir ab.",
  ],
  preisHeading: "Was den Preis bestimmt",
  preisfaktoren: [
    { text: "Anzahl der Buchungen und Belege", icon: "receipt_long" },
    { text: "Zahl der Mitarbeitenden", icon: "groups" },
    { text: "Rechtsform und Bilanzierungspflicht", icon: "account_balance" },
    { text: "Zahl der Shops, Marktplätze und EU-Länder", icon: "storefront" },
  ],
};

/* ── /team ── */

export interface WerdegangEintrag {
  period: string;
  station: string;
}

export interface Wert {
  title: string;
  text: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  sentence: string;
  photo: Photo;
}

/** Bleibt leer, bis Fotos, Namen und Einwilligungen von Fabian vorliegen. Karten erscheinen erst mit Einträgen. */
export const teamMembers: readonly TeamMember[] = [];

export const team: {
  seo: Seo;
  h1: string;
  fabianHeading: string;
  fabianQuote: string;
  werdegangHeading: string;
  werdegang: readonly WerdegangEintrag[];
  teamHeading: string;
  teamText: string;
  werteHeading: string;
  werte: readonly Wert[];
  bueroHeading: string;
  telefonLabel: string;
  termineHinweis: string;
} = {
  seo: {
    title: "Über uns & Team",
    description:
      "Seit September 2026 sind wir zu viert: Fabian Tepel und drei erfahrene Kolleginnen. Für dich heißt das: Inhaber als Ansprechpartner, dazu Kapazität und Vertretung im Urlaub.",
  },
  h1: "Wir sind Tepel Steuerberatung",
  fabianHeading: "Fabian Tepel, Steuerberater & Inhaber",
  fabianQuote:
    "Ich bin Steuerberater aus der Praxis. Angefangen habe ich als Steuerfachangestellter, habe berufsbegleitend BWL an der Hochschule Mainz studiert und danach als Steuerberaterassistent in einer mittelständischen Steuerberatungs- und Wirtschaftsprüfungskanzlei in Wiesbaden gearbeitet. Im März 2021 wurde ich zum Steuerberater bestellt. Danach war ich Steuerberater in einer Wiesbadener Kanzlei in enger Zusammenarbeit mit den Partnern und anschließend drei Jahre Gesellschafter-Geschäftsführer einer Steuerberatungskanzlei in Hanau. Seit April 2026 führe ich meine eigene Kanzlei in Wiesbaden – seit September 2026 mit einem erfahrenen Team. Weil ich jeden Schritt dieses Berufs selbst gegangen bin, weiß ich, wo Steuerberatung für Mandanten einfacher werden muss.",
  werdegangHeading: "Werdegang",
  werdegang: [
    { period: "seit 09/2026", station: "Erweiterung der Kanzlei, Team mit 4 Personen" },
    { period: "seit 04/2026", station: "Eigene Kanzlei in Wiesbaden" },
    {
      period: "03/2023 – 03/2026",
      station: "Gesellschafter-Geschäftsführer einer Steuerberatungskanzlei in Hanau",
    },
    {
      period: "07/2021 – 02/2023",
      station: "Steuerberater in einer Wiesbadener Kanzlei, enge Zusammenarbeit mit den Partnern",
    },
    { period: "03/2021", station: "Bestellung zum Steuerberater" },
    {
      period: "04/2017 – 06/2021",
      station:
        "Steuerberaterassistent bzw. Steuerberater in einer Steuerberatungs- und Wirtschaftsprüfungskanzlei in Wiesbaden",
    },
    {
      period: "davor",
      station:
        "Ausbildung zum Steuerfachangestellten, berufsbegleitendes BWL-Studium an der Hochschule Mainz",
    },
  ],
  teamHeading: "Das Team",
  teamText:
    "Seit September 2026 sind wir zu viert: Fabian Tepel und drei erfahrene Kolleginnen. Für dich heißt das: Inhaber als Ansprechpartner, dazu Kapazität und Vertretung im Urlaub.",
  werteHeading: "Werte",
  werte: [
    { title: "Klarheit", text: "verständliche Sprache", icon: "translate" },
    { title: "Verlässlichkeit", text: "Fristen, Rückmeldung in 24 Stunden", icon: "event_available" },
    { title: "Weitblick", text: "Gestaltung statt Verwaltung", icon: "explore" },
  ],
  bueroHeading: "Büro & Erreichbarkeit",
  telefonLabel: "Telefon",
  termineHinweis: "Termine außerhalb nach Vereinbarung",
};

/* ── /willkommen ── */

export const willkommen: {
  seo: Seo;
  h1: string;
  intro: string;
  aendertHeading: string;
  aendert: readonly string[];
  bleibtHeading: string;
  bleibt: readonly string[];
  faqHeading: string;
  faq: readonly FaqEntry[];
  erreichbarkeitHeading: string;
  cta: string;
} = {
  seo: {
    title: "Willkommen",
    description:
      "Zum 1. September 2026 hat Steuerberater Fabian Tepel die Betreuung deiner steuerlichen Angelegenheiten von Anette Ott übernommen.",
  },
  h1: "Herzlich willkommen – deine Steuerberatung geht nahtlos weiter",
  intro:
    "Zum 1. September 2026 hat Steuerberater Fabian Tepel die Betreuung deiner steuerlichen Angelegenheiten von Anette Ott übernommen. Für dich ändert sich im Alltag wenig: Deine vertrauten Ansprechpartnerinnen sind weiterhin für dich da, deine Unterlagen sind sicher übernommen, alle Fristen werden weiter überwacht.",
  aendertHeading: "Was sich ändert",
  aendert: [
    "neue Kontaktdaten und Bankverbindung",
    "auf Wunsch digitaler Belegaustausch statt Pendelordner – kein Muss",
  ],
  bleibtHeading: "Was bleibt",
  bleibt: ["persönliche Betreuung", "deine Ansprechpartnerin", "Termine im Büro"],
  faqHeading: "Kurz-FAQ",
  faq: [
    { question: "Muss ich etwas unterschreiben?", answer: null },
    { question: "Bleiben meine Unterlagen vertraulich?", answer: null },
    { question: "Kann ich weiterhin Papierbelege abgeben?", answer: null },
    { question: "Wen erreiche ich wie?", answer: null },
  ],
  erreichbarkeitHeading: "Erreichbarkeit",
  cta: "Persönlichen Kennenlerntermin mit Fabian Tepel vereinbaren",
};
