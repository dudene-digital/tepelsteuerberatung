import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Tepel Steuerberatung – Fabian Tepel, Steuerberater in Wiesbaden. Angaben gemäß § 5 TMG.",
};

const imprintHtml = `
<h1>Impressum</h1>

<p>Fabian Tepel<br />
Fabian Tepel Steuerberatung<br />
Gottfried-Kinkel-Stra&szlig;e 21<br />
65187 Wiesbaden</p>

<h2>Kontakt</h2>
<p>Telefon: + 49 172 3870104<br />
E-Mail: fabian@tepel-steuerberatung.de</p>

<h2>Aufsichtsbeh&ouml;rde</h2>
<p>Steuerberaterkammer Hessen<br />
K&ouml;rperschaft des &ouml;ffentlichen Rechts<br />
Europa-Allee 52<br />
60327 Frankfurt am Main</p>
<p><a href="https://www.stbk-hessen.de" target="_blank" rel="noopener noreferrer">https://www.stbk-hessen.de</a></p>

<h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>

<p><strong>Berufsbezeichnung:</strong><br />
Steuerberater</p>

<p><strong>Zust&auml;ndige Kammer:</strong><br />
Steuerberaterkammer Hessen<br />
K&ouml;rperschaft des &ouml;ffentlichen Rechts<br />
Europa-Allee 52<br />
60327 Frankfurt am Main</p>

<p><strong>Verliehen in:</strong><br />
Deutschland</p>

<p>Es gelten folgende berufsrechtliche Regelungen:</p>
<ul>
<li>Steuerberatungsgesetz (StBerG) &ndash; einsehbar unter: <a href="https://www.bstbk.de/de/" target="_blank" rel="noopener noreferrer">https://www.bstbk.de/de/</a></li>
<li>Durchf&uuml;hrungsverordnung zum Steuerberatungsgesetz (DVStB) &ndash; einsehbar unter: <a href="https://www.bstbk.de/de/" target="_blank" rel="noopener noreferrer">https://www.bstbk.de/de/</a></li>
<li>Berufsordnung f&uuml;r Steuerberater (BOStB) &ndash; einsehbar unter: <a href="https://www.bstbk.de/de/" target="_blank" rel="noopener noreferrer">https://www.bstbk.de/de/</a></li>
<li>Steuerberatergeb&uuml;hrenverordnung (StBGebV) &ndash; einsehbar unter: <a href="https://www.bstbk.de/de/" target="_blank" rel="noopener noreferrer">https://www.bstbk.de/de/</a></li>
</ul>

<h2>Angaben zur Berufshaftpflichtversicherung</h2>

<p><strong>Name und Sitz des Versicherers:</strong><br />
HDI Versicherung AG<br />
HDI-Platz 1<br />
30659 Hannover</p>

<p><strong>Geltungsraum der Versicherung:</strong><br />
Deutschland</p>

<h2>Redaktionell verantwortlich</h2>
<p>Fabian Tepel</p>

<h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
<p>An einem Verfahren zur Streitbeilegung bei einer Verbraucherschlichtungsstelle nehmen wir nicht teil. Gem. &sect; 76 Abs. 2 Nr. 3 StBerG vermittelt unsere Steuerberaterkammer auf Antrag bei Streitigkeiten, z.&nbsp;B. anl&auml;sslich einer Honorarrechnung oder der Nichtherausgabe von Unterlagen, zwischen Mitgliedern der Kammer und ihren Auftraggebern. Es handelt sich in diesem Fall um ein Mediationsverfahren. An anderen Vermittlungsverfahren nehmen wir nicht teil.</p>
`;

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8">
          <div
            className="legal-content"
            dangerouslySetInnerHTML={{ __html: imprintHtml }}
          />
        </div>
      </main>
    </>
  );
}
