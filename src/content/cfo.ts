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

  /* Beispielbild von Sven. Überschrift und Bildunterschrift stehen nicht im Briefing. */
  cockpit: {
    heading: "So sieht ein Kennzahlen-Cockpit aus",
    caption: "Beispiel für einen Online-Händler, alle Werte fiktiv.",
    image: {
      src: "/cfo-kennzahlen-cockpit.webp",
      alt: "Beispiel eines Kennzahlen-Cockpits für Oktober: sechs Kennzahlen von Umsatz bis Lagerreichweite, Umsatz Ist gegen Plan über zwölf Monate, Liquiditätsvorschau für 13 Wochen mit Tiefpunkt kurz über der Mindestliquidität, Deckungsbeitrag je Verkaufskanal und drei kommentierte Auffälligkeiten als Grundlage für den Monatstermin.",
      width: 2000,
      height: 1322,
    },
  },

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
