import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, QuietLink, RuleList, Section, SectionHeading, TwoColumns, type Crumb } from "@/components/ui";
import { getLeistung, leistungen } from "@/content/leistungen";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return leistungen.map((leistung) => ({ slug: leistung.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leistung = getLeistung(slug);
  if (!leistung) notFound();

  return {
    title: leistung.navLabel,
    description: leistung.intro,
    alternates: { canonical: `/leistungen/${leistung.slug}` },
  };
}

export default async function LeistungPage({ params }: Props) {
  const { slug } = await params;
  const leistung = getLeistung(slug);
  if (!leistung) notFound();

  const path = `/leistungen/${leistung.slug}`;
  const breadcrumbs: Crumb[] = [
    { name: "Startseite", href: "/" },
    { name: "Leistungen", href: "/leistungen" },
    { name: leistung.navLabel, href: path },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: leistung.navLabel,
          description: leistung.intro,
          url: `${site.url}${path}`,
          provider: {
            "@type": "AccountingService",
            "@id": `${site.url}/#kanzlei`,
            name: site.name,
            url: site.url,
          },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={leistung.h1} intro={leistung.intro} breadcrumbs={breadcrumbs} />
      <Section labelledBy="enthalten-heading">
        <TwoColumns
          heading={
            <>
              <SectionHeading id="enthalten-heading">Das ist enthalten</SectionHeading>
              <div className="mt-1">
                <QuietLink href="/so-arbeiten-wir">So arbeiten wir</QuietLink>
              </div>
            </>
          }
        >
          <RuleList items={leistung.enthalten} />
        </TwoColumns>
      </Section>
      <CtaBand />
    </>
  );
}
