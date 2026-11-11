import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { LinkJSXConverter, RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, Section, type Crumb } from "@/components/ui";
import { artikelPerSlug, artikelVorschau, darfVorschau, formatDatum } from "@/lib/ratgeber";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ vorschau?: string | string[] }>;
};

/* Mit ?vorschau=<ID> zeigt die Seite angemeldeten Nutzern der Redaktion die zuletzt gespeicherte Fassung dieses
   Artikels, auch Entwürfe. Ohne Anmeldung bleibt es bei der veröffentlichten Fassung unter dem Slug. */
async function ladeArtikel({ params, searchParams }: Props) {
  await connection();
  const [{ slug }, { vorschau }] = await Promise.all([params, searchParams]);
  // Höchstens neun Ziffern: Größere Zahlen passen nicht in die ID-Spalte und würden einen Datenbankfehler auslösen.
  const id = typeof vorschau === "string" && /^\d{1,9}$/.test(vorschau) ? Number(vorschau) : null;
  if (id !== null && (await darfVorschau())) return { slug, artikel: await artikelVorschau(id), vorschau: true };
  return { slug, artikel: await artikelPerSlug(slug), vorschau: false };
}

/* Interne Links im Artikel zeigen auf andere Ratgeber-Artikel. Öffentlich liefert die Leseregel bei einem
   unveröffentlichten Ziel nur dessen ID; dann bleibt der Linktext stehen, ohne Link ins Leere. In der Vorschau
   führen interne Links zur Vorschau des Ziels, damit auch Entwürfe erreichbar sind. */
function converters(vorschau: boolean): JSXConvertersFunction {
  const { autolink, link } = LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const ziel = linkNode.fields.doc?.value;
      if (typeof ziel !== "object" || !ziel || !("slug" in ziel)) return "/wissen";
      return vorschau ? `/wissen/${ziel.slug}?vorschau=${ziel.id}` : `/wissen/${ziel.slug}`;
    },
  });
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    autolink,
    link: (args) => {
      const ziel = args.node.fields.doc?.value;
      if (args.node.fields.linkType === "internal" && (typeof ziel !== "object" || !ziel)) {
        return <>{args.nodesToJSX({ nodes: args.node.children })}</>;
      }
      return typeof link === "function" ? link(args) : link;
    },
  });
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { artikel, vorschau } = await ladeArtikel(props);
  // notFound() gehört in die Seite, sonst rendert Next nur eine leere Fehlerhülle statt der 404-Seite.
  if (!artikel) return { title: "Seite nicht gefunden", robots: { index: false } };
  return {
    title: artikel.seoTitel || artikel.titel,
    description: artikel.seoBeschreibung || artikel.teaser,
    ...pageMeta(`/wissen/${artikel.slug}`),
    ...(vorschau && { robots: { index: false, follow: false } }),
  };
}

export default async function ArtikelPage(props: Props) {
  const { slug, artikel, vorschau } = await ladeArtikel(props);
  if (!artikel) notFound();
  // Hat der Entwurf einen neuen Slug, führt die Vorschau dorthin. Auch ein veralteter Knopf in der Redaktion landet so richtig.
  if (vorschau && artikel.slug !== slug) {
    if (!artikel.slug || !/^[a-z0-9-]+$/.test(artikel.slug)) notFound();
    redirect(`/wissen/${artikel.slug}?vorschau=${artikel.id}`);
  }

  const path = `/wissen/${artikel.slug}`;
  const breadcrumbs: Crumb[] = [
    { name: "Startseite", href: "/" },
    { name: "Ratgeber", href: "/wissen" },
    { name: artikel.titel, href: path },
  ];
  const bild = artikel.titelbild;
  const bildUrl = bild?.sizes?.gross?.url || bild?.url;

  return (
    <>
      {vorschau && (
        <div role="status" className="wrap">
          <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-3 text-base">
            <span>
              <strong className="font-semibold">Vorschau</strong>
              <span className="text-muted">
                {artikel._status === "published"
                  ? " · Zuletzt gespeicherter Stand, veröffentlicht."
                  : " · Zuletzt gespeicherter Stand, noch nicht veröffentlicht und nur für die Redaktion sichtbar."}
              </span>
            </span>
            <a href={`/admin/collections/artikel/${artikel.id}`} className="inline-link">
              Zurück zur Redaktion
            </a>
          </p>
        </div>
      )}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: artikel.titel,
          description: artikel.teaser,
          url: `${site.url}${path}`,
          ...(artikel.veroeffentlichtAm && { datePublished: artikel.veroeffentlichtAm }),
          dateModified: artikel.updatedAt,
          author: { "@type": "Person", name: artikel.autor || "Fabian Tepel" },
          publisher: { "@type": "AccountingService", "@id": `${site.url}/#kanzlei`, name: site.name },
          ...(bildUrl && { image: `${site.url}${bildUrl}` }),
        }}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero label={artikel.kategorie?.name} title={artikel.titel} intro={artikel.teaser} breadcrumbs={breadcrumbs} />

      <Section>
        <div className="grid-12 gap-y-8">
          <p className="text-base text-muted lg:col-span-3">
            {artikel.autor}
            {artikel.veroeffentlichtAm && (
              <>
                <br />
                {formatDatum(artikel.veroeffentlichtAm)}
              </>
            )}
          </p>
          <div className="min-w-0 lg:col-span-9">
            {bild && bildUrl && (
              <Image
                src={bildUrl}
                alt={bild.alt}
                width={bild.sizes?.gross?.width || bild.width || 1600}
                height={bild.sizes?.gross?.height || bild.height || 900}
                sizes="(min-width: 1920px) 1300px, (min-width: 1024px) 70vw, 100vw"
                className="mb-8 h-auto w-full"
              />
            )}
            <RichText data={artikel.inhalt} converters={converters(vorschau)} className="rich-text max-w-[38rem]" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
