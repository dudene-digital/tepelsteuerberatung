import type { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Barrierefreiheitserklärung",
  description:
    "Erklärung zur Barrierefreiheit der Tepel Steuerberatung gemäß Barrierefreiheitsstärkungsgesetz (BFSG).",
  ...pageMeta("/barrierefreiheit"),
};

const accessibilityHtml = `
<h1>Erklärung zur Barrierefreiheit für Dienstleistungen</h1>
<p>Im Rahmen unserer Barrierefreiheitserklärung möchten wir Ihnen einen Überblick über den Stand der Vereinbarkeit der unten beschriebenen Dienstleistung(en) mit den Anforderungen der Barrierefreiheit nach gesetzlichen Vorschriften (insbesondere mit dem Barrierefreiheitsstärkungsgesetz &ndash; BFSG) geben.</p>

<h2>Angaben zum Dienstleistungserbringer</h2>
<p>Fabian Tepel Steuerberatung<br />
Gottfried-Kinkel-Straße 21<br />
65187 Wiesbaden</p>
<p>E-Mail: fabian@tepel-steuerberatung.de<br />
Telefon: 0611 / 15756 0<br />
Mobil: + 49 172 3870104</p>
<p>Link zur Website: <a href="https://tepel-steuerberatung.de">https://tepel-steuerberatung.de</a><br />
Link zum Impressum: <a href="https://tepel-steuerberatung.de/impressum">https://tepel-steuerberatung.de/impressum</a></p>

<h2>Allgemeine Beschreibung der Dienstleistung</h2>
<p>Die Dienstleistung umfasst die geschäftsmäßige Hilfeleistung in Steuersachen für Online-Händler, Unternehmer und Vermieter im Rhein-Main-Gebiet: laufende Finanzbuchhaltung und Umsatzsteuer-Voranmeldungen, Lohn- und Gehaltsabrechnung, Jahresabschlüsse und Steuererklärungen, Gründungs- und Rechtsformberatung sowie Steuergestaltung.</p>

<h2>Erläuterungen zur Durchführung der Dienstleistung</h2>
<p>Die Zusammenarbeit ist im Alltag digital und persönlich, wenn es darauf ankommt. Sie läuft in vier Schritten:</p>

<p><strong>Erstgespräch:</strong> Interessenten vereinbaren über die Website, per Telefon oder E-Mail ein kostenloses Erstgespräch von 30 Minuten, per Video oder im Büro.</p>

<p><strong>Festangebot:</strong> Innerhalb von zwei Werktagen erhalten Interessenten ein schriftliches Festangebot.</p>

<p><strong>Onboarding:</strong> Wir richten ein digitales Mandantenkonto ein, verbinden Bank und Shop und fordern die Unterlagen beim bisherigen Berater an.</p>

<p><strong>Laufende Betreuung:</strong> Belege werden per App übermittelt, Auswertungen stehen online bereit, der Datenaustausch läuft über ein verschlüsseltes Mandantenportal. Besprechungen finden per Video oder im Büro statt. Wer lieber mit Papierbelegen arbeitet, kann diese weiterhin im Büro abgeben.</p>

<h2>Stand der Vereinbarkeit mit den Anforderungen</h2>
<p>Wir setzen uns für digitale Barrierefreiheit ein und verfolgen das Ziel, unsere Website so zu gestalten, dass sie für alle Nutzerinnen und Nutzer uneingeschränkt zugänglich ist. Daher arbeiten wir kontinuierlich daran, die Anforderungen des Barrierefreiheitsstärkungsgesetzes (BFSG) und der Verordnung zum Barrierefreiheitsstärkungsgesetz (BFSGV) vollständig umzusetzen.</p>
<p>Unsere Webseite setzt die Vorgaben gemäß Web Content Accessibility Guidelines (WCAG) um:</p>

<p><strong>Tastaturbedienbarkeit:</strong> Alle Inhalte und Funktionen unserer Website sind vollständig über die Tastatur zugänglich. Die Navigation, das Kontaktformular sowie das mobile Menü können ohne Maus bedient werden. Ein &bdquo;Zum Inhalt springen&ldquo;-Link ermöglicht es Tastaturnutzern, direkt zum Hauptinhalt zu gelangen. Der Fokus wird im geöffneten mobilen Menü korrekt geführt, das Menü lässt sich jederzeit per Escape-Taste schließen.</p>

<p><strong>Vorlesefunktion und ARIA-Attribute:</strong> Unsere Website ist mit ARIA-Attributen versehen, um die Nutzung mit Screenreadern zu erleichtern. Alle interaktiven Elemente verfügen über aussagekräftige Labels (aria-label, aria-labelledby). Dekorative Elemente sind als solche gekennzeichnet (aria-hidden) und werden von Screenreadern übersprungen. Dialoge sind mit role=&quot;dialog&quot; und aria-modal ausgezeichnet. Alle Bilder besitzen beschreibende Alternativtexte.</p>

<p><strong>Optimierte Kontraste und flexible Schriftgrößen:</strong> Wir gewährleisten ein Farbkontrastverhältnis von mindestens 4,5:1 (WCAG AA) für alle Textinhalte. Die Schriftgrößen sind in relativen Einheiten definiert, sodass sie über die Browser-Einstellungen individuell angepasst werden können. Links im Fließtext sind durch Unterstreichung erkennbar, Links in Navigation und Fußzeile durch ihre Anordnung in eigenen Menüs; beim Überfahren mit der Maus werden auch sie unterstrichen.</p>

<p><strong>Semantische Strukturierung:</strong> Die Website verwendet eine korrekte HTML5-Seitenstruktur mit semantischen Elementen (&lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, &lt;section&gt;) und einer logischen Überschriftenhierarchie, die die Navigation mit assistiven Technologien erleichtert.</p>

<p><strong>Animationen und Bewegungsreduzierung:</strong> Für Nutzerinnen und Nutzer mit Bewegungsempfindlichkeit werden alle Animationen automatisch deaktiviert, wenn die Systemeinstellung &bdquo;Bewegung reduzieren&ldquo; (prefers-reduced-motion) aktiviert ist.</p>

<p><strong>Lighthouse Accessibility Score:</strong> Die Website erreicht einen Lighthouse Accessibility Score von 100/100.</p>

<h2>Feedbackmöglichkeit zur Meldung von Barrieren</h2>
<p>Wenn Ihnen Barrieren beim Zugang zu Inhalten auf unserer Website aufgefallen sind, können Sie uns gern einen Hinweis geben:</p>
<p>E-Mail: fabian@tepel-steuerberatung.de<br />
Telefon: 0611 / 15756 0<br />
Mobil: + 49 172 3870104</p>

<h2>Zuständige Marktüberwachungsbehörde</h2>
<p>Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen – Anstalt öffentlichen Rechts (MLBF AöR)<br />
Carl-Miller-Straße 6<br />
39112 Magdeburg</p>
<p>Telefon: +49 391 289 230 23<br />
E-Mail: kontakt@mlbf-barrierefrei.de<br />
Website: <a href="https://www.mlbf-barrierefrei.de" target="_blank" rel="noopener noreferrer">mlbf-barrierefrei.de</a></p>
`;

const breadcrumbs = [
  { name: "Startseite", href: "/" },
  { name: "Barrierefreiheit", href: "/barrierefreiheit" },
];

export default function BarrierefreiheitPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <div className="wrap pt-1.5 pb-[clamp(3.5rem,2rem+5vw,9rem)]">
        <Breadcrumbs items={breadcrumbs} />
        <div
          className="legal-content mt-6 md:mt-10"
          dangerouslySetInnerHTML={{ __html: accessibilityHtml }}
        />
      </div>
    </>
  );
}
