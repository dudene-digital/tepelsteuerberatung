import type { ReactNode } from "react";
import type { CockpitDaten, CockpitMonat, CockpitWoche } from "@/content/cfo";

/* Beispiel-Cockpit als Seiteninhalt: Kennzahlen, drei Diagramme und die Einordnung.
   Ohne Bibliothek und ohne JavaScript. Die Diagramme sind für Screenreader ausgeblendet,
   ihre Werte stehen dort in Tabellen. Am Desktop zeigt Hover den Wert einer Spalte.

   Schwarz-weiß wie die übrige Seite. Ist und Plan folgen der Finanz-Konvention:
   Ist gefüllt, Plan nur umrandet und leicht versetzt dahinter. */

const prozent = (wert: number, max: number) => `${(wert / max) * 100}%`;

/* Hinweisfelder bleiben ohne Hover ausgeblendet (display: none), damit sie am Handy
   keinen Platz beanspruchen und die Seite nicht seitlich verbreitern. */
const tooltip = "pointer-events-none absolute z-20 hidden whitespace-nowrap bg-ink px-2 py-1 text-sm text-bg";

export default function KennzahlenCockpit({ daten }: { daten: CockpitDaten }) {
  const { kennzahlen, umsatz, liquiditaet, kanaele, einordnung } = daten;

  return (
    <figure className="mt-6 grid gap-px border border-rule bg-rule lg:mt-8 lg:grid-cols-12">
      <figcaption className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 bg-bg p-5 md:p-8 lg:col-span-12">
        <div>
          <h3 className="text-h3 font-semibold">{daten.titel}</h3>
          <p className="mt-1 text-base text-muted">{daten.unterzeile}</p>
        </div>
        <p className="border border-rule px-3 py-1.5 text-base text-muted">{daten.hinweis}</p>
      </figcaption>

      <dl className="grid grid-cols-2 gap-px md:grid-cols-3 lg:col-span-12 xl:grid-cols-6">
        {kennzahlen.map((k) => (
          <div key={k.label} className="flex flex-col bg-bg px-5 py-4 md:px-6 md:py-5">
            <dt className="text-base text-muted">{k.label}</dt>
            <dd className="mt-1.5 text-[clamp(1.75rem,1.5rem+0.8vw,2.5rem)] leading-none font-semibold tracking-tight">
              {k.wert}
            </dd>
            <dd className="mt-2 text-base text-muted">{k.notiz}</dd>
          </div>
        ))}
      </dl>

      <Panel titel={umsatz.titel} unterzeile={umsatz.unterzeile} className="lg:col-span-7">
        <Legende
          eintraege={[
            { name: "Ist", zeichen: <span className="size-3 bg-ink" /> },
            { name: "Plan", zeichen: <span className="size-3 border border-ink" /> },
          ]}
        />
        <UmsatzDiagramm monate={umsatz.monate} />
        <div className="sr-only">
          <table>
            <caption>Umsatz Ist und Plan in Tausend Euro, November 2025 bis Oktober 2026</caption>
            <thead>
              <tr>
                <th scope="col">Monat</th>
                <th scope="col">Ist</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              {umsatz.monate.map((m) => (
                <tr key={m.lang}>
                  <th scope="row">{m.lang}</th>
                  <td>{m.ist}</td>
                  <td>{m.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel titel={liquiditaet.titel} unterzeile={liquiditaet.unterzeile} className="lg:col-span-5">
        <Legende
          eintraege={[
            { name: "Prognose", zeichen: <span className="h-0.5 w-4 bg-ink" /> },
            {
              name: `Mindestliquidität ${liquiditaet.mindestliquiditaet} T€`,
              zeichen: <span className="w-4 border-t-2 border-dashed border-muted" />,
            },
          ]}
        />
        <LiquiditaetDiagramm wochen={liquiditaet.wochen} minimum={liquiditaet.mindestliquiditaet} />
        <div className="sr-only">
          <table>
            <caption>
              Erwarteter Kontostand in Tausend Euro je Kalenderwoche, Mindestliquidität{" "}
              {liquiditaet.mindestliquiditaet} Tausend Euro
            </caption>
            <thead>
              <tr>
                <th scope="col">Kalenderwoche</th>
                <th scope="col">Kontostand</th>
              </tr>
            </thead>
            <tbody>
              {liquiditaet.wochen.map((w) => (
                <tr key={w.kw}>
                  <th scope="row">KW {w.kw}</th>
                  <td>{w.saldo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel titel={kanaele.titel} unterzeile={kanaele.unterzeile} className="lg:col-span-5">
        <KanalBalken werte={kanaele.werte} />
      </Panel>

      <Panel titel={einordnung.titel} unterzeile={einordnung.unterzeile} className="lg:col-span-7">
        <ul className="mt-5">
          {einordnung.punkte.map((p) => (
            <li
              key={p.titel}
              className="grid gap-x-5 gap-y-1 border-t border-rule py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
            >
              <span className="text-base text-muted">{p.status}</span>
              <p className="text-pretty">
                <strong className="font-semibold">{p.titel}:</strong> {p.text}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </figure>
  );
}

function Panel({
  titel,
  unterzeile,
  className,
  children,
}: {
  titel: string;
  unterzeile: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={`min-w-0 bg-bg p-5 md:p-8 ${className}`}>
      <h4 className="text-lead font-semibold">{titel}</h4>
      <p className="mt-1 text-base text-muted text-pretty">{unterzeile}</p>
      {children}
    </div>
  );
}

function Legende({ eintraege }: { eintraege: { name: string; zeichen: ReactNode }[] }) {
  return (
    <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
      {eintraege.map((e) => (
        <li key={e.name} className="flex items-center gap-2">
          {e.zeichen}
          {e.name}
        </li>
      ))}
    </ul>
  );
}

/** Hilfslinien mit Beschriftung links. Die Nulllinie liegt über den Balken, damit sie durchgehend bleibt. */
function Raster({ ticks, max }: { ticks: number[]; max: number }) {
  return (
    <>
      {ticks.map((t) => (
        <div
          key={t}
          className={`absolute inset-x-0 border-t ${t === 0 ? "z-10 border-control" : "border-rule"}`}
          style={{ bottom: prozent(t, max) }}
        >
          <span className="absolute right-full mr-2 translate-y-[-50%] text-sm text-muted tabular-nums">{t}</span>
        </div>
      ))}
    </>
  );
}

function UmsatzDiagramm({ monate }: { monate: readonly CockpitMonat[] }) {
  const max = 500;
  const letzter = monate.length - 1;

  return (
    <div aria-hidden="true" className="mt-6 pl-9">
      <div className="relative h-52 md:h-60">
        <Raster ticks={[0, 100, 200, 300, 400, 500]} max={max} />
        <div className="absolute inset-0 flex">
          {monate.map((m, i) => {
            const ausrichtung = i < 3 ? "left-0" : i > letzter - 3 ? "right-0" : "left-1/2 -translate-x-1/2";
            return (
              <div key={m.lang} className="group/monat relative flex-1 hover:bg-ink/[0.06]">
                <div className="absolute inset-y-0 left-1/2 w-[min(72%,2.5rem)] -translate-x-1/2">
                  <div
                    className="absolute right-0 bottom-0 w-[64%] border border-ink bg-bg"
                    style={{ height: prozent(m.plan, max) }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-[64%] bg-ink shadow-[0_0_0_2px_var(--color-bg)]"
                    style={{ height: prozent(m.ist, max) }}
                  />
                </div>
                {i === letzter && (
                  <span
                    className="absolute left-1/2 mb-1.5 -translate-x-1/2 text-sm font-medium tabular-nums"
                    style={{ bottom: prozent(Math.max(m.ist, m.plan), max) }}
                  >
                    {m.ist}
                  </span>
                )}
                <span
                  className={`${tooltip} ${ausrichtung} group-hover/monat:block`}
                  style={{ bottom: `calc(${prozent(Math.max(m.ist, m.plan), max)} + 0.5rem)` }}
                >
                  <span className="font-semibold">{m.kurz}</span> Ist {m.ist} · Plan {m.plan}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Ist das Diagramm schmal, reicht der Anfangsbuchstabe, sonst stoßen die Monatsnamen aneinander. */}
      <div className="@container mt-2 flex text-xs text-muted">
        {monate.map((m) => (
          <span key={m.lang} className="flex-1 text-center @min-[24rem]:text-sm">
            <span className="@min-[24rem]:hidden">{m.kurz[0]}</span>
            <span className="@max-[24rem]:hidden">{m.kurz}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function LiquiditaetDiagramm({ wochen, minimum }: { wochen: readonly CockpitWoche[]; minimum: number }) {
  const max = 300;
  const breite = 1200;
  const schritte = wochen.length - 1;
  const x = (i: number) => (i / schritte) * breite;
  const linie = wochen.map((w, i) => `${i === 0 ? "M" : "L"}${x(i)} ${max - w.saldo}`).join(" ");
  const flaeche = `${linie} L${breite} ${max} L0 ${max} Z`;
  const tief = wochen.reduce((t, w, i) => (w.saldo < wochen[t].saldo ? i : t), 0);

  return (
    <div aria-hidden="true" className="mt-6 pl-9">
      <div className="relative h-52 md:h-60">
        <Raster ticks={[0, 100, 200, 300]} max={max} />
        <svg
          viewBox={`0 0 ${breite} ${max}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible text-ink"
        >
          <path d={flaeche} fill="currentColor" fillOpacity={0.1} />
          <path
            d={linie}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div
          className="absolute inset-x-0 translate-y-1/2 border-t-2 border-dashed border-muted"
          style={{ bottom: prozent(minimum, max) }}
        />
        <span
          className="absolute size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-ink shadow-[0_0_0_2px_var(--color-bg)]"
          style={{ left: prozent(tief, schritte), bottom: prozent(wochen[tief].saldo, max) }}
        />
        <span
          className="absolute -translate-x-1/2 text-sm font-medium whitespace-nowrap"
          style={{ left: prozent(tief, schritte), bottom: `calc(${prozent(minimum, max)} - 1.9rem)` }}
        >
          Tiefpunkt {wochen[tief].saldo}&nbsp;T€ (KW&nbsp;{wochen[tief].kw})
        </span>

        {/* Hover: senkrechte Linie, Punkt und Wert der Woche unter dem Zeiger. */}
        {wochen.map((w, i) => {
          const ausrichtung = i < 2 ? "left-1/2" : i > schritte - 2 ? "right-1/2" : "left-1/2 -translate-x-1/2";
          return (
            <div
              key={w.kw}
              className="group/woche absolute inset-y-0 z-10"
              style={{ left: `calc(${prozent(i, schritte)} - ${50 / schritte}%)`, width: `${100 / schritte}%` }}
            >
              <span className="absolute inset-y-0 left-1/2 hidden border-l border-muted group-hover/woche:block" />
              <span
                className="absolute left-1/2 hidden size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-ink shadow-[0_0_0_2px_var(--color-bg)] group-hover/woche:block"
                style={{ bottom: prozent(w.saldo, max) }}
              />
              <span
                className={`${tooltip} ${ausrichtung} group-hover/woche:block`}
                style={{ bottom: `calc(${prozent(w.saldo, max)} + 0.75rem)` }}
              >
                <span className="font-semibold">KW {w.kw}</span> {w.saldo}&nbsp;T€
              </span>
            </div>
          );
        })}
      </div>
      {/* Jede zweite Woche beschriftet. Ist das Diagramm schmal, ohne „KW“, das steht in der Unterzeile. */}
      <div className="@container relative mt-2 h-5 text-xs text-muted">
        {wochen.map((w, i) =>
          i % 2 === 0 ? (
            <span
              key={w.kw}
              className="absolute -translate-x-1/2 whitespace-nowrap @min-[24rem]:text-sm"
              style={{ left: prozent(i, schritte) }}
            >
              <span className="@max-[24rem]:hidden">KW </span>
              {w.kw}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
}

function KanalBalken({ werte }: { werte: readonly { name: string; db: number }[] }) {
  const max = 25;
  return (
    <ul className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3">
      {werte.map((k) => (
        <li key={k.name} className="col-span-2 grid grid-cols-subgrid items-center">
          <span className="py-2 text-right">{k.name}</span>
          <span className="flex items-center gap-2 border-l border-control py-2">
            <span
              aria-hidden="true"
              className="h-6 shrink-0 bg-ink"
              style={{ width: `calc((100% - 3.5rem) * ${k.db / max})` }}
            />
            <span className="font-medium tabular-nums">{k.db}&nbsp;%</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
