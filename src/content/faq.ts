/* Häufige Fragen der Kanzlei. Übernommen von der bisherigen Startseite, umgestellt auf „wir“. */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqIntro = {
  title: "Häufig gestellte Fragen",
  intro: "Alles, was du über moderne Steuerberatung wissen solltest – kompakt beantwortet.",
} as const;

export const faqItems: readonly FaqItem[] = [
  {
    question: "Was kostet mich die Zusammenarbeit mit Fabian?",
    answer:
      "Unsere Honorare richten sich nach der Steuerberatervergütungsverordnung (StBVV) und hängen vom Umfang ab. Daneben bieten wir aber auch Pauschalpreise an, um unseren Mandanten Kostentransparenz und Planungssicherheit zu bieten. Im kostenlosen Erstgespräch schauen wir uns gemeinsam deine Situation an und erstellen dir ein transparentes Angebot – ohne versteckte Kosten, ohne Überraschungen.",
  },
  {
    question: "Wie funktioniert die digitale Buchhaltung bei euch?",
    answer:
      "Ganz einfach: Du fotografierst oder scannst deine Belege per App oder Scanner und lädst sie hoch – gleichzeitig richten wir automatische Schnittstellen aus deinem Rechnungsschreibungstool und deinem Banking ein. Wir verarbeiten alles digital und du hast jederzeit digital Einblick in deine Zahlen. Pendelordner und Papierchaos? Das war einmal.",
  },
  {
    question: "Ich gründe gerade – könnt ihr mir dabei helfen?",
    answer:
      "Auf jeden Fall. Von der Wahl der richtigen Rechtsform über die steuerliche Registrierung bis hin zu Cashflow-Monitoring und Finanzplanung – wir begleiten dich ab Tag 1 und bauen die steuerliche Struktur so auf, dass sie mit deinem Business mitwächst.",
  },
  {
    question: "Muss ich für Termine persönlich vorbeikommen?",
    answer:
      "Nein, wir arbeiten komplett digital und ortsunabhängig. Unsere Besprechungen machen wir per Video-Call, Belege werden online übermittelt. Wenn du trotzdem mal persönlich vorbeischauen willst – unsere Kanzlei in Wiesbaden steht dir natürlich offen.",
  },
  {
    question: "Brauche ich überhaupt einen Steuerberater oder reicht ein Buchhalter?",
    answer:
      "Ein Buchhalter erfasst deine laufenden Geschäftsvorfälle und bereitet Unterlagen vor. Wir dürfen darüber hinaus Steuererklärungen erstellen, dich gegenüber dem Finanzamt vertreten und steuerlich beraten. Bei uns bekommst du beides aus einer Hand – Buchhaltung und strategische Beratung.",
  },
  {
    question: "Arbeitet ihr nur mit bestimmten Branchen?",
    answer:
      "Nein, wir betreuen Mandanten branchenübergreifend – von E-Commerce und IT über Handwerk bis hin zu Freiberuflern und Beratern. Unser digitaler Workflow passt sich flexibel an dein Business an, egal in welcher Branche du unterwegs bist.",
  },
  {
    question: "Wie schnell kann ich bei euch loslegen?",
    answer:
      "Ziemlich schnell: Nach unserem kostenlosen Erstgespräch richten wir dein digitales Mandantenkonto ein und starten innerhalb weniger Tage mit der laufenden Buchhaltung oder Steuerberatung. Lange Wartezeiten gibt es bei uns nicht.",
  },
  {
    question: "Was bringt mir proaktive Steuergestaltung konkret?",
    answer:
      "Statt erst am Jahresende auf deine Zahlen zu schauen, identifizieren wir unterjährig Optimierungspotenziale – zum Beispiel durch Investitionsabzugsbeträge, das passende Abschreibungsmodell oder eine günstige Gewinnverteilung. Das Ergebnis: weniger Steuerlast, mehr Liquidität für dein Business.",
  },
  {
    question: "Macht ihr auch Lohnabrechnungen?",
    answer:
      "Ja, wir übernehmen die komplette Lohn- und Gehaltsabrechnung – inklusive aller Meldungen an Sozialversicherungsträger und Finanzamt, Abrechnung von Benefits und Sachbezügen. Deine Mitarbeiter können ihre Lohnauswertungen digital per App abrufen.",
  },
  {
    question: "Welche Tools nutzen wir für die Zusammenarbeit?",
    answer:
      "Wir setzen auf ADDISON Direkt und ADDISON Lohn Online und ergänzen das Ganze um moderne Schnittstellen für den automatisierten Belegaustausch. Alles DSGVO-konform. So verbinden wir die Zuverlässigkeit bewährter Systeme mit dem Komfort, den du von modernen Apps gewohnt bist.",
  },
  {
    question: "Ich will meinen aktuellen Steuerberater wechseln – geht das problemlos?",
    answer:
      "Absolut, ein Wechsel ist jederzeit möglich. Wir kümmern uns um die komplette Übernahme deiner Unterlagen vom bisherigen Berater, damit kein Beleg verloren geht. Im Erstgespräch besprechen wir den Ablauf und den passenden Zeitpunkt dafür.",
  },
  {
    question: "Brauche ich einen Jahresabschluss oder reicht eine EÜR?",
    answer:
      "Das hängt von deiner Rechtsform und Unternehmensgröße ab. Kapitalgesellschaften (z.B. GmbH, UG) sind bilanzierungspflichtig und brauchen einen Jahresabschluss mit Bilanz und GuV. Freiberufler und kleinere Gewerbetreibende kommen oft mit einer Einnahmen-Überschuss-Rechnung (EÜR) aus. Wir klären im Erstgespräch, was für dich die richtige Wahl ist.",
  },
  {
    question: "Wie oft sprechen wir miteinander?",
    answer:
      "Wir empfehlen regelmäßige Check-ins – mindestens quartalsweise, bei wachsenden Unternehmen auch monatlich. So können wir frühzeitig auf Veränderungen reagieren und deine Steuerstrategie laufend anpassen. Das ist bei uns kein Zusatzservice, sondern fester Bestandteil unserer Zusammenarbeit.",
  },
];
