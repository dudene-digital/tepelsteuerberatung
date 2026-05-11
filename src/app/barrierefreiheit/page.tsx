import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Barrierefreiheitserklärung",
  description:
    "Erklärung zur Barrierefreiheit der Tepel Steuerberatung gemäß Barrierefreiheitsstärkungsgesetz (BFSG).",
};

const accessibilityHtml = `
<h1>Erklärung zur Barrierefreiheit für Dienstleistungen</h1>
<p>Im Rahmen unserer Barrierefreiheitserklärung möchten wir Ihnen einen Überblick über den Stand der Vereinbarkeit der unten beschriebenen Dienstleistung(en) mit den Anforderungen der Barrierefreiheit nach gesetzlichen Vorschriften (insbesondere mit dem Barrierefreiheitsstärkungsgesetz &ndash; BFSG) geben.</p>

<h2>Angaben zum Dienstleistungserbringer</h2>
<p>Fabian Tepel Steuerberatung<br />
Gottfried-Kinkel-Straße 21<br />
65187 Wiesbaden</p>
<p>E-Mail: fabian@tepel-steuerberatung.de<br />
Telefon: + 49 172 3870104</p>
<p>Link zur Website: <a href="https://tepel-steuerberatung.de">https://tepel-steuerberatung.de</a><br />
Link zum Impressum: <a href="https://tepel-steuerberatung.de/impressum">https://tepel-steuerberatung.de/impressum</a></p>

<h2>Allgemeine Beschreibung der Dienstleistung</h2>
<p>Die Dienstleistung umfasst die geschäftsmäßige Hilfeleistung in Steuersachen sowie die umfassende betriebswirtschaftliche und strategische Beratung. Neben den klassischen Tätigkeiten wie der Erstellung von Steuererklärungen und Jahresabschlüssen liegt der Schwerpunkt auf der vollumfänglichen, digitalen Finanz- und Lohnbuchhaltung. Besondere Kernkompetenzen bilden zudem die ganzheitliche Start-up-Betreuung (inkl. Gründungsberatung, Rechtsformwahl und Begleitung bei Finanzierungsrunden) sowie die Implementierung automatisierter, papierloser Finanzprozesse und KPI-Reportings für Unternehmen.</p>

<h2>Erläuterungen zur Durchführung der Dienstleistung</h2>
<p>Die Dienstleistungserbringung erfolgt zu 100 % digital, papierlos und agil. Der Fokus liegt darauf, die steuerlichen und betriebswirtschaftlichen Prozesse so in den Alltag der Mandanten zu integrieren, dass sie maximal entlastet werden.</p>

<p>Das Angebot wird wie folgt genutzt und durchgeführt:</p>

<p><strong>Kontaktaufnahme &amp; Onboarding:</strong> Interessenten buchen zunächst ein kurzes, kostenloses Erstgespräch über die Kanzlei-Webseite. Kommt es zu einer Zusammenarbeit, erfolgen das gesamte Onboarding sowie die Vertragsunterzeichnung vollständig digital.</p>

<p><strong>Laufende Finanz- und Lohnbuchhaltung (Digitaler Workflow):</strong> Physische Pendelordner gibt es nicht. Mandanten übermitteln ihre Belege laufend per Smartphone-App oder digitalen Upload. Für Bankkonten, Rechnungsprogramme und Bezahlsysteme werden automatisierte Schnittstellen eingerichtet. Auch die Lohnabrechnung ist digitalisiert: Mitarbeiter der Mandanten erhalten ihre monatlichen Auswertungen direkt und sicher via App.</p>

<p><strong>Proaktive Kommunikation &amp; Strategie:</strong> Anstelle von jährlichen Pflichtterminen findet der Austausch agil und proaktiv über regelmäßige Video-Calls statt. So werden aktuelle Unternehmenskennzahlen (KPIs) besprochen, das Cashflow-Monitoring ausgewertet und die Steuerstrategie an das Wachstum des Unternehmens (z.&nbsp;B. bei Start-ups) angepasst.</p>

<p><strong>Bereitstellung von Ergebnissen:</strong> Alle Arbeitsergebnisse (BWA, Jahresabschlüsse, Steuererklärungen) werden den Mandanten über ein sicheres, digitales Mandantenportal ortsunabhängig und jederzeit abrufbar zur Verfügung gestellt. Freigaben an das Finanzamt erfolgen ebenfalls über digitale Authentifizierungsverfahren.</p>

<h2>Stand der Vereinbarkeit mit den Anforderungen</h2>
<p>Wir setzen uns für digitale Barrierefreiheit ein und verfolgen das Ziel, unsere Website so zu gestalten, dass sie für alle Nutzerinnen und Nutzer uneingeschränkt zugänglich ist. Daher arbeiten wir kontinuierlich daran, die Anforderungen des Barrierefreiheitsstärkungsgesetzes (BFSG) und der Verordnung zum Barrierefreiheitsstärkungsgesetz (BFSGV) vollständig umzusetzen.</p>
<p>Unsere Webseite setzt die Vorgaben gemäß Web Content Accessibility Guidelines (WCAG) um:</p>

<p><strong>Tastaturbedienbarkeit:</strong> Alle Inhalte und Funktionen unserer Website sind vollständig über die Tastatur zugänglich. Die Navigation, das Kontaktformular, das Cookie-Banner sowie das mobile Menü können ohne Maus bedient werden. Ein &bdquo;Zum Inhalt springen&ldquo;-Link ermöglicht es Tastaturnutzern, direkt zum Hauptinhalt zu gelangen. Fokus-Fallen in Dialogen (Cookie-Banner, mobiles Menü) werden korrekt verwaltet und können jederzeit per Escape-Taste geschlossen werden.</p>

<p><strong>Vorlesefunktion und ARIA-Attribute:</strong> Unsere Website ist mit ARIA-Attributen versehen, um die Nutzung mit Screenreadern zu erleichtern. Alle interaktiven Elemente verfügen über aussagekräftige Labels (aria-label, aria-labelledby). Dekorative Elemente sind als solche gekennzeichnet (aria-hidden) und werden von Screenreadern übersprungen. Dialoge sind mit role=&quot;dialog&quot; und aria-modal ausgezeichnet. Alle Bilder besitzen beschreibende Alternativtexte.</p>

<p><strong>Optimierte Kontraste und flexible Schriftgrößen:</strong> Wir gewährleisten ein Farbkontrastverhältnis von mindestens 4,5:1 (WCAG AA) für alle Textinhalte. Die Schriftgrößen sind in relativen Einheiten definiert, sodass sie über die Browser-Einstellungen individuell angepasst werden können. Links sind nicht nur durch Farbe, sondern auch durch Unterstreichung als solche erkennbar.</p>

<p><strong>Semantische Strukturierung:</strong> Die Website verwendet eine korrekte HTML5-Seitenstruktur mit semantischen Elementen (&lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, &lt;section&gt;) und einer logischen Überschriftenhierarchie, die die Navigation mit assistiven Technologien erleichtert.</p>

<p><strong>Animationen und Bewegungsreduzierung:</strong> Für Nutzerinnen und Nutzer mit Bewegungsempfindlichkeit werden alle Animationen automatisch deaktiviert, wenn die Systemeinstellung &bdquo;Bewegung reduzieren&ldquo; (prefers-reduced-motion) aktiviert ist.</p>

<p><strong>Lighthouse Accessibility Score:</strong> Die Website erreicht einen Lighthouse Accessibility Score von 100/100.</p>

<h2>Feedbackmöglichkeit zur Meldung von Barrieren</h2>
<p>Wenn Ihnen Barrieren beim Zugang zu Inhalten auf unserer Website aufgefallen sind, können Sie uns gern einen Hinweis geben:</p>
<p>E-Mail: fabian@tepel-steuerberatung.de<br />
Telefon: + 49 172 3870104</p>

<h2>Zuständige Marktüberwachungsbehörde</h2>
<p>Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF)<br />
c/o Ministerium für Arbeit, Soziales, Gesundheit und Gleichstellung Sachsen-Anhalt<br />
Postfach 39 11 55<br />
39135 Magdeburg</p>
<p>Telefon: + 49 (0) 391 567 6970<br />
E-Mail: mlbf@ms.sachsen-anhalt.de</p>
`;

export default function BarrierefreiheitPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tepel-steuerberatung.de" },
      { "@type": "ListItem", position: 2, name: "Barrierefreiheit", item: "https://tepel-steuerberatung.de/barrierefreiheit" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="relative pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8">
          <div
            className="legal-content"
            dangerouslySetInnerHTML={{ __html: accessibilityHtml }}
          />
        </div>
      </main>
    </>
  );
}
