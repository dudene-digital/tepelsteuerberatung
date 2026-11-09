import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { RichText } from "@payloadcms/richtext-lexical/react";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, Section, type Crumb } from "@/components/ui";
import { artikelPerSlug, formatDatum } from "@/lib/ratgeber";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const artikel = await artikelPerSlug(slug);
  if (!artikel) notFound();
  return {
    title: artikel.seoTitel || artikel.titel,
    description: artikel.seoBeschreibung || artikel.teaser,
    ...pageMeta(`/wissen/${artikel.slug}`),
  };
}

export default async function ArtikelPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const artikel = await artikelPerSlug(slug);
  if (!artikel) notFound();

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
      <PageHero label={artikel.kategorie.name} title={artikel.titel} intro={artikel.teaser} breadcrumbs={breadcrumbs} />

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
            <RichText data={artikel.inhalt} className="rich-text max-w-[42rem]" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
