"use client";

import { useState, useCallback } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Was kostet mich die Zusammenarbeit mit Fabian?",
    answer:
      "Meine Honorare richten sich nach der Steuerberatervergütungsverordnung (StBVV) und hängen vom Umfang ab. Daneben biete ich aber auch Pauschalpreise an um meinen Mandanten maximale Kostentransparenz und Planungssicherheit zu bieten. Im kostenlosen Erstgespräch schauen wir uns gemeinsam deine Situation an und ich erstelle dir ein transparentes Angebot – ohne versteckte Kosten, ohne Überraschungen.",
  },
  {
    question: "Wie funktioniert die digitale Buchhaltung bei dir?",
    answer:
      "Ganz einfach: Du fotografierst oder scannst deine Belege per App oder Scanner und lädst sie hoch – gleichzeitig richten wir automatische Schnittstellen aus deinem Rechnungsschreibungstool und deinem Banking ein. Ich verarbeite alles digital und du hast jederzeit digital Einblick in deine Zahlen. Pendelordner und Papierchaos? Das war einmal.",
  },
  {
    question: "Ich gründe gerade – kannst du mir dabei helfen?",
    answer:
      "Auf jeden Fall, das ist sogar einer meiner Schwerpunkte. Von der Wahl der richtigen Rechtsform über die steuerliche Registrierung bis hin zu Cashflow-Monitoring und Finanzplanung – ich begleite dich ab Tag 1 und baue die steuerliche Struktur so auf, dass sie mit deinem Business mitwächst.",
  },
  {
    question: "Muss ich für Termine persönlich vorbeikommen?",
    answer:
      "Nein, ich arbeite komplett digital und ortsunabhängig. Unsere Besprechungen machen wir per Video-Call, Belege werden online übermittelt. Wenn du trotzdem mal persönlich vorbeischauen willst – meine Kanzlei in Wiesbaden steht dir natürlich offen.",
  },
  {
    question: "Brauche ich überhaupt einen Steuerberater oder reicht ein Buchhalter?",
    answer:
      "Ein Buchhalter erfasst deine laufenden Geschäftsvorfälle und bereitet Unterlagen vor. Ich darf darüber hinaus Steuererklärungen erstellen, dich gegenüber dem Finanzamt vertreten und steuerlich beraten. Bei mir bekommst du beides aus einer Hand – Buchhaltung und strategische Beratung.",
  },
  {
    question: "Arbeitest du nur mit bestimmten Branchen?",
    answer:
      "Nein, ich betreue Mandanten branchenübergreifend – von E-Commerce und IT über Handwerk bis hin zu Freiberuflern und Beratern. Mein digitaler Workflow passt sich flexibel an dein Business an, egal in welcher Branche du unterwegs bist.",
  },
  {
    question: "Wie schnell kann ich bei dir loslegen?",
    answer:
      "Ziemlich schnell: Nach unserem kostenlosen Erstgespräch richte ich dein digitales Mandantenkonto ein und wir starten innerhalb weniger Tage mit der laufenden Buchhaltung oder Steuerberatung. Lange Wartezeiten gibt es bei mir nicht.",
  },
  {
    question: "Was bringt mir proaktive Steuergestaltung konkret?",
    answer:
      "Statt erst am Jahresende auf deine Zahlen zu schauen, identifiziere ich unterjährig Optimierungspotenziale – zum Beispiel durch Investitionsabzugsbeträge, das passende Abschreibungsmodell oder eine günstige Gewinnverteilung. Das Ergebnis: weniger Steuerlast, mehr Liquidität für dein Business.",
  },
  {
    question: "Machst du auch Lohnabrechnungen?",
    answer:
      "Ja, ich übernehme die komplette Lohn- und Gehaltsabrechnung – inklusive aller Meldungen an Sozialversicherungsträger und Finanzamt, Abrechnung von Benefits und Sachbezügen. Deine Mitarbeiter können ihre Lohnauswertungen digital per App abrufen.",
  },
  {
    question: "Welche Tools nutzen wir für die Zusammenarbeit?",
    answer:
      "Ich setze auf ADDISON Direkt und ADDISON Lohn Online und ergänze das Ganze um moderne Schnittstellen für den automatisierten Belegaustausch. Alles DSGVO-konform. So verbinden wir die Zuverlässigkeit bewährter Systeme mit dem Komfort, den du von modernen Apps gewohnt bist.",
  },
  {
    question: "Ich will meinen aktuellen Steuerberater wechseln – geht das problemlos?",
    answer:
      "Absolut, ein Wechsel ist jederzeit möglich. Ich kümmere mich um die komplette Übernahme deiner Unterlagen vom bisherigen Berater, damit kein Beleg verloren geht. Im Erstgespräch besprechen wir den Ablauf und den besten Zeitpunkt dafür.",
  },
  {
    question: "Brauche ich einen Jahresabschluss oder reicht eine EÜR?",
    answer:
      "Das hängt von deiner Rechtsform und Unternehmensgröße ab. Kapitalgesellschaften (z.B. GmbH, UG) sind bilanzierungspflichtig und brauchen einen Jahresabschluss mit Bilanz und GuV. Freiberufler und kleinere Gewerbetreibende kommen oft mit einer Einnahmen-Überschuss-Rechnung (EÜR) aus. Ich kläre im Erstgespräch, was für dich die richtige Wahl ist.",
  },
  {
    question: "Wie oft sprechen wir miteinander?",
    answer:
      "Ich empfehle regelmäßige Check-ins – mindestens quartalsweise, bei wachsenden Unternehmen auch monatlich. So kann ich frühzeitig auf Veränderungen reagieren und deine Steuerstrategie laufend anpassen. Das ist bei mir kein Zusatzservice, sondern fester Bestandteil unserer Zusammenarbeit.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="faq"
      className="py-32 bg-surface-container-low relative"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                data-icon="help"
                aria-hidden="true"
              >
                help
              </span>
            </div>
          </div>
          <h2
            id="faq-heading"
            className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tight"
          >
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Alles, was du über moderne Steuerberatung wissen solltest – kompakt
            beantwortet.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8"></div>
        </div>

        {/* Accordion */}
        <div className="space-y-3" role="list">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                role="listitem"
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-surface-container border-primary/20 shadow-[0_4px_24px_rgba(165,231,255,0.08)]"
                    : "bg-surface-container/50 border-outline-variant/10 hover:bg-surface-container/80 hover:border-outline-variant/20"
                }`}
              >
                <button
                  type="button"
                  id={`faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full flex items-start gap-4 p-5 md:p-6 text-left cursor-pointer group"
                >
                  <span
                    className={`material-symbols-outlined text-lg mt-0.5 shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "text-primary rotate-0"
                        : "text-on-surface-variant -rotate-90"
                    }`}
                    aria-hidden="true"
                    data-icon="expand_more"
                  >
                    expand_more
                  </span>
                  <span
                    className={`font-headline text-sm md:text-base font-bold transition-colors duration-200 ${
                      isOpen ? "text-primary" : "text-on-surface group-hover:text-primary/80"
                    }`}
                  >
                    {item.question}
                  </span>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 pl-[3.25rem] md:pl-[3.5rem] text-sm md:text-[0.95rem] text-on-surface-variant leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Schema.org FAQPage structured data for SEO/GEO */
export function FAQSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
