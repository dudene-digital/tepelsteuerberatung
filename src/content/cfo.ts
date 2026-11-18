/* Inhalte der Seite „CFO as a Service“. Texte wörtlich aus Fabians Briefing „CFO as a Service“,
   außer wo ein Kommentar etwas anderes sagt. */

export interface CfoVariante {
  name: string;
  fuerWen: string;
  enthalten: string;
  rhythmus: string;
  hervorgehoben?: boolean;
}

/* Die Einträge stehen auf der Seite allein unter ihrem Stichwort, deshalb beginnen sie groß. */
const varianten: readonly CfoVariante[] = [
  {
    name: "Kompass",
    fuerWen: "Unternehmen, die erstmals Klarheit in ihre Zahlen bringen wollen",
    enthalten: "Kennzahlen-Cockpit monatlich, Quartalsgespräch, Liquiditätsvorschau 12 Monate",
    rhythmus: "Quartalsweise",
  },
  {
    name: "Steuerung",
    fuerWen: "Wachsende Unternehmen mit Bank, Investitionen, Team",
    enthalten:
      "Alles aus Kompass plus wöchentliche Liquidität, rollierender Forecast, Budget, Bankreporting, monatlicher Termin",
    rhythmus: "Monatlich",
    hervorgehoben: true,
  },
  {
    name: "Projekt",
    fuerWen: "Konkreter Anlass, einmalig",
    enthalten:
      "z. B. Finanzierungsunterlagen, Unternehmensplanung, Kauf oder Verkauf eines Unternehmens, Rechtsformwechsel",
    rhythmus: "Nach Projektplan",
  },
];

export interface CockpitKennzahl {
  label: string;
  wert: string;
  notiz: string;
}

export interface CockpitMonat {
  kurz: string;
  lang: string;
  ist: number;
  plan: number;
}

export interface CockpitWoche {
  kw: number;
  saldo: number;
}

export interface CockpitKanal {
  name: string;
  /** Deckungsbeitrag in Prozent vom Umsatz */
  db: number;
}

export interface CockpitPunkt {
  status: "Risiko" | "Chance";
  titel: string;
  text: string;
}

/* Geschützte Leerzeichen halten Zahl und Einheit zusammen. */
const cockpit = {
  heading: "So sieht ein Kennzahlen-Cockpit aus",
  titel: "Kennzahlen-Cockpit Oktober 2026",
  unterzeile: "Muster Handels GmbH · Online-Handel · Stand 15.11.2026",
  hinweis: "Beispiel mit fiktiven Zahlen",
  kennzahlen: [
    { label: "Umsatz Oktober", wert: "412 T€", notiz: "+8,4 % ggü. Vorjahr" },
    { label: "Rohertragsquote", wert: "41,2 %", notiz: "+1,3 Pkt. ggü. Plan" },
    { label: "EBIT-Marge (YTD)", wert: "7,8 %", notiz: "Plan 8,5 %" },
    { label: "Liquide Mittel", wert: "186 T€", notiz: "Reichweite 2,4 Monate" },
    { label: "Retourenquote", wert: "14,1 %", notiz: "+2,0 Pkt. ggü. Vormonat" },
    { label: "Lagerreichweite", wert: "58 Tage", notiz: "Ziel ≤ 60 Tage" },
  ] satisfies CockpitKennzahl[],
  umsatz: {
    titel: "Umsatz Ist vs. Plan",
    unterzeile: "in T€, letzte 12 Monate",
    monate: [
      { kurz: "Nov", lang: "November 2025", ist: 363, plan: 350 },
      { kurz: "Dez", lang: "Dezember 2025", ist: 486, plan: 470 },
      { kurz: "Jan", lang: "Januar 2026", ist: 296, plan: 300 },
      { kurz: "Feb", lang: "Februar 2026", ist: 274, plan: 290 },
      { kurz: "Mär", lang: "März 2026", ist: 310, plan: 315 },
      { kurz: "Apr", lang: "April 2026", ist: 332, plan: 330 },
      { kurz: "Mai", lang: "Mai 2026", ist: 341, plan: 345 },
      { kurz: "Jun", lang: "Juni 2026", ist: 329, plan: 335 },
      { kurz: "Jul", lang: "Juli 2026", ist: 318, plan: 325 },
      { kurz: "Aug", lang: "August 2026", ist: 334, plan: 340 },
      { kurz: "Sep", lang: "September 2026", ist: 370, plan: 365 },
      { kurz: "Okt", lang: "Oktober 2026", ist: 412, plan: 395 },
    ] satisfies CockpitMonat[],
  },
  liquiditaet: {
    titel: "Liquiditätsvorschau 13 Wochen",
    unterzeile: "Kontostand in T€, KW 47/2026 – KW 6/2027",
    mindestliquiditaet: 100,
    wochen: [
      { kw: 47, saldo: 186 },
      { kw: 48, saldo: 170 },
      { kw: 49, saldo: 153 },
      { kw: 50, saldo: 138 },
      { kw: 51, saldo: 124 },
      { kw: 52, saldo: 118 },
      { kw: 53, saldo: 141 },
      { kw: 1, saldo: 175 },
      { kw: 2, saldo: 197 },
      { kw: 3, saldo: 214 },
      { kw: 4, saldo: 225 },
      { kw: 5, saldo: 241 },
      { kw: 6, saldo: 257 },
    ] satisfies CockpitWoche[],
  },
  kanaele: {
    titel: "Deckungsbeitrag nach Kanal",
    unterzeile: "Oktober 2026, nach Gebühren, Retouren und Werbung, in % vom Umsatz",
    werte: [
      { name: "Eigener Shop", db: 22 },
      { name: "Otto", db: 15 },
      { name: "eBay", db: 12 },
      { name: "Amazon", db: 9 },
    ] satisfies CockpitKanal[],
  },
  einordnung: {
    titel: "Was auffällt – unsere Einordnung",
    unterzeile: "Gesprächsgrundlage für den Monatstermin",
    punkte: [
      {
        status: "Risiko",
        titel: "Liquiditätstief in KW 52",
        text: "Wareneinkauf fürs Weihnachtsgeschäft und Umsatzsteuer fallen zusammen. Puffer zur Mindestliquidität nur 18 T€ – Zahlungsziel mit Lieferant A verhandeln.",
      },
      {
        status: "Risiko",
        titel: "Retouren auf Amazon steigen",
        text: "Der Kanal liegt beim Deckungsbeitrag nur noch bei 9 %. Ursachen je Produktgruppe prüfen.",
      },
      {
        status: "Chance",
        titel: "Eigener Shop trägt das Wachstum",
        text: "22 % Deckungsbeitrag, Umsatz +14 % ggü. Vorjahr. Werbebudget dorthin verlagern.",
      },
    ] satisfies CockpitPunkt[],
  },
};

export type CockpitDaten = typeof cockpit;

export const cfo = {
  href: "/cfo-as-a-service",
  navLabel: "CFO as a Service",
  seoTitle: "CFO as a Service vom Steuerberater | Externer CFO Wiesbaden & Rhein-Main | Tepel",
  description:
    "Externer CFO für den Mittelstand: Liquiditätsplanung, Forecast, Kennzahlen und Bankgespräche – kombiniert mit Buchhaltung und Steuern aus einer Hand. Kostenloses Erstgespräch in Wiesbaden oder per Video.",

  /* Zeile über der H1. Nicht aus dem Briefing: trägt Suchbegriffe und Region, Fabian sollte sie freigeben. */
  label: "Fractional CFO für KMU in Wiesbaden und Rhein-Main",
  h1: "CFO as a Service – dein externer Finanzchef, ohne Vollzeitgehalt",
  intro:
    "Wir steuern deine Zahlen nach vorn: Liquidität, Planung, Kennzahlen und Bankgespräche. Mit dem Vorteil, dass Buchhaltung, Steuern und Finanzsteuerung aus einer Hand kommen.",
  heroCta: "Kostenloses Erstgespräch",
  heroLink: "So läuft es ab",

  vergleich: {
    heading: "Steuerberatung schaut zurück. Ein CFO schaut nach vorn.",
    links: "Klassische Steuerberatung",
    rechts: "CFO as a Service",
    zeilen: [
      ["Was ist letztes Jahr passiert?", "Was passiert in den nächsten 12 Monaten?"],
      ["Jahresabschluss und Steuererklärung", "Planung, Forecast und Szenarien"],
      ["BWA einmal im Monat", "Kennzahlen-Cockpit mit Einordnung und Empfehlung"],
      ["Kontostand von heute", "Liquiditätsvorschau für die nächsten Wochen und Monate"],
      ["Reaktion auf den Bescheid", "Vorbereitung auf Bankgespräch, Investition, Wachstum"],
    ],
    fazit: "Bei uns bekommst du beides – aus einer Hand und auf derselben Datenbasis.",
  },

  situationen: {
    heading: "Kennst du das?",
    items: [
      "Der Umsatz wächst, aber auf dem Konto wird es trotzdem eng.",
      "Die Bank will Planzahlen sehen – und du hast keine.",
      "Du entscheidest über Investitionen und Personal aus dem Bauch.",
      "Die BWA kommt, aber niemand erklärt dir, was sie bedeutet.",
      "Du weißt nicht genau, welches Produkt oder welcher Kanal wirklich Geld verdient.",
      "Ein Vollzeit-CFO wäre zu teuer – aber allein willst du die Zahlen nicht mehr steuern.",
    ],
  },

  /* Überschrift nimmt den Suchbegriff „externer CFO“ auf. Das Briefing nennt nur den Modulnamen. */
  leistungen: {
    heading: "Das übernehmen wir als dein externer CFO",
    items: [
      {
        title: "Liquiditätsplanung",
        text: "Rollierende Vorschau auf 13 Wochen und 12 Monate. Du siehst Engpässe, bevor sie entstehen.",
      },
      {
        title: "Planung & Forecast",
        text: "Jahresbudget, monatlicher Soll-Ist-Vergleich, Szenarien für Wachstum, Investition oder Krise.",
      },
      {
        title: "Kennzahlen-Cockpit",
        text: "8 bis 12 Kennzahlen, die für dein Geschäft wirklich zählen, monatlich aufbereitet und besprochen.",
      },
      {
        title: "Bank & Finanzierung",
        text: "Unterlagen für Kreditgespräche, Bankreporting, Begleitung zu Terminen, Fördermittel im Blick.",
      },
      {
        title: "Preise & Margen",
        text: "Deckungsbeiträge je Produkt, Kunde oder Kanal. Für Online-Händler inklusive Retouren, Gebühren und Werbekosten.",
      },
      {
        title: "Prozesse & Tools",
        text: "Schnellere Abschlüsse, digitale Belegwege, sinnvolle Software statt Excel-Chaos.",
      },
    ],
  },

  /* Beispiel-Cockpit nach Svens Vorlage, als Seiteninhalt statt als Bild. Alle Werte fiktiv.
     Überschrift steht nicht im Briefing. Die Vorschau nennt KW 53, weil 2026 dreiundfünfzig Kalenderwochen hat. */
  cockpit,

  rhythmus: {
    heading: "Unser Rhythmus",
    items: [
      { wann: "Wöchentlich", was: "Liquiditäts-Update (je nach Variante)" },
      {
        wann: "Monatlich",
        was: "Kennzahlen-Cockpit bis zum 15. des Folgemonats, 60-Minuten-Termin mit Einordnung und Empfehlungen",
      },
      {
        wann: "Quartalsweise",
        was: "Strategie-Termin mit der Geschäftsführung, Forecast-Update, Bank- oder Gesellschafterreporting",
      },
      {
        wann: "Bei Bedarf",
        was: "Kurzfristige Unterstützung vor Investitionen, Bankterminen oder Verhandlungen – Antwort innerhalb von 24 Stunden",
      },
    ],
  },

  varianten: {
    heading: "Drei Varianten für den Einstieg",
    items: varianten,
    hinweis: "Dein Festangebot bekommst du nach dem Erstgespräch.",
  },

  steuerberater: {
    heading: "Warum vom Steuerberater?",
    items: [
      {
        title: "Eine Datenbasis",
        text: "Wir machen deine Buchhaltung ohnehin. Zahlen müssen nicht erst übergeben, abgestimmt und korrigiert werden.",
      },
      {
        title: "Steuern immer mitgedacht",
        text: "Jede Planung, jede Investition, jede Gehaltsentscheidung prüfen wir direkt auf ihre steuerlichen Folgen.",
      },
      {
        title: "Gesetzliche Verschwiegenheit",
        text: "Als Steuerberater bin ich zur Verschwiegenheit verpflichtet. Deine Zahlen sind bei uns sicher.",
      },
    ],
  },

  /* Geschützte Leerzeichen halten „1 bis 30 Mio. €“ zusammen. */
  passung: {
    heading: "Passt das zu dir?",
    passt: {
      heading: "Passt, wenn du …",
      items: [
        "ein Unternehmen mit etwa 5\u00a0bis 100 Mitarbeitenden oder 1\u00a0bis 30\u00a0Mio.\u00a0€ Umsatz führst,",
        "vor Wachstum, Investition oder Bankgesprächen stehst,",
        "Entscheidungen auf Zahlen stützen willst, aber keinen Vollzeit-CFO brauchst.",
      ],
    },
    passtNicht: {
      heading: "Passt eher nicht, wenn du …",
      /* Der Klammerzusatz verweist im Briefing auf die Leistungsseiten und wird auf der Seite zum Link. */
      items: [
        "nur eine Buchhaltung oder Steuererklärung suchst (dafür gibt es unsere Leistungsseiten),",
        "bereits einen eigenen Finanzchef hast.",
      ],
    },
  },

  faq: {
    /* Überschrift nimmt den Suchbegriff „externer CFO“ auf. */
    heading: "Häufige Fragen zum externen CFO",
    items: [
      {
        question: "Was ist der Unterschied zu einem Interim-CFO?",
        answer:
          "Ein Interim-CFO überbrückt meist eine Vakanz, in Vollzeit und befristet. CFO as a Service ist eine dauerhafte Begleitung in Teilzeit, deren Umfang mitwächst.",
      },
      {
        question: "Muss meine Buchhaltung bei euch liegen?",
        answer:
          "Nein, aber es macht vieles einfacher und günstiger. Wenn deine Buchhaltung woanders liegt, klären wir im Erstgespräch, wie wir an die Daten kommen.",
      },
      {
        question: "Wie viel Zeit muss ich investieren?",
        answer: "Etwa eine Stunde im Monat für den gemeinsamen Termin, dazu kurze Rückfragen.",
      },
      {
        question: "Wie schnell geht es los?",
        answer: "Nach dem Erstgespräch erstellen wir in der Regel innerhalb von zwei bis vier Wochen das erste Cockpit.",
      },
      {
        question: "Was kostet das?",
        answer:
          "Das hängt von Variante und Umfang ab. Nach dem Erstgespräch bekommst du ein schriftliches Festangebot mit Monatspauschale.",
      },
      {
        /* Im Briefing: „Die Laufzeit ist flexibel und passen wir an …“. Nur der Satzbau ist geglättet. */
        question: "Kann ich jederzeit aufhören oder wechseln?",
        answer: "Die Laufzeit ist flexibel, wir passen sie an deine persönlichen Verhältnisse und Wünsche an.",
      },
    ],
  },

  cta: {
    title: "Lass uns auf deine Zahlen schauen.",
    text: "Bring deine letzte BWA mit – im kostenlosen Erstgespräch sagen wir dir, wo du stehst und was ein CFO-Service für dich bringen kann.",
    label: "Termin wählen",
  },

  /* Verweise von anderen Seiten. */
  startseiteLink: "Neu: CFO as a Service – dein externer Finanzchef",
  startseiteKachel: "Zahlen nach vorn steuern: Liquidität, Planung, Bankgespräche – ohne Vollzeit-CFO.",
  steuergestaltungFrage: "Du willst laufend steuern statt einmal im Jahr?",
};
