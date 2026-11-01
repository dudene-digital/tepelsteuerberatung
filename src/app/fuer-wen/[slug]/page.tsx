import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, QuietLink, RuleList, Section, SectionHeading, TwoColumns, type Crumb } from "@/components/ui";
import { getZielgruppeSeite, punkteHeading, zielgruppenSeiten } from "@/content/zielgruppen";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/* E-Commerce fehlt hier bewusst: Die Seite liegt als eigene Datei unter /fuer-wen/e-commerce. */
export function generateStaticParams() {
  return zielgruppenSeiten.map((zielgruppe) => ({ slug: zielgruppe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zielgruppe = getZielgruppeSeite(slug);
  if (!zielgruppe) notFound();

  return {
    title: zielgruppe.seoTitle,
    description: zielgruppe.intro,
    alternates: { canonical: zielgruppe.href },
  };
}

export default async function ZielgruppePage({ params }: Props) {
  const { slug } = await params;
  const zielgruppe = getZielgruppeSeite(slug);
  if (!zielgruppe) notFound();

  const breadcrumbs: Crumb[] = [
    { name: "Startseite", href: "/" },
    { name: "Für wen", href: "/fuer-wen" },
    { name: zielgruppe.navLabel, href: zielgruppe.href },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={zielgruppe.h1} intro={zielgruppe.intro} breadcrumbs={breadcrumbs} />
      <Section labelledBy="punkte-heading">
        <TwoColumns
          heading={
            <>
              <SectionHeading id="punkte-heading">{punkteHeading}</SectionHeading>
              {zielgruppe.weiterLink && (
                <div className="mt-1">
                  <QuietLink href={zielgruppe.weiterLink.href}>{zielgruppe.weiterLink.label}</QuietLink>
                </div>
              )}
            </>
          }
        >
          <RuleList items={zielgruppe.punkte} />
        </TwoColumns>
      </Section>
      <CtaBand />
    </>
  );
}
