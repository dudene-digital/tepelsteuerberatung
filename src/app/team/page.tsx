import type { Metadata } from "next";
import Image from "next/image";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import StandortKarte from "@/components/StandortKarte";
import { CtaBand, InfoRows, PageHero, Section, SectionHeading, Statements, TwoColumns } from "@/components/ui";
import { fabianImBuero, fabianPortrait, team as content, teamMembers } from "@/content/kanzlei";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: "/team" },
};

const breadcrumbs = [
  { name: "Startseite", href: "/" },
  { name: "Über uns & Team", href: "/team" },
];

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHero title={content.h1} breadcrumbs={breadcrumbs} />

      <Section labelledBy="fabian-heading">
        <div className="grid-12 gap-y-6">
          <div className="-mx-[var(--gutter)] isolate self-start border-b border-ink bg-bg lg:col-span-5 lg:mr-0">
            <Image
              src={fabianPortrait.src}
              alt={fabianPortrait.alt}
              width={fabianPortrait.width}
              height={fabianPortrait.height}
              sizes="(min-width: 1920px) 800px, (min-width: 1024px) 42vw, 100vw"
              loading="eager"
              className="block h-auto w-full mix-blend-lighten"
            />
          </div>
          <div className="min-w-0 lg:col-span-7">
            <SectionHeading id="fabian-heading">{content.fabianHeading}</SectionHeading>
            <blockquote className="mt-4 max-w-[34em] text-lead text-pretty lg:mt-6">
              <p>{content.fabianQuote}</p>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section labelledBy="werdegang-heading">
        <TwoColumns heading={<SectionHeading id="werdegang-heading">{content.werdegangHeading}</SectionHeading>}>
          <ol className="col-sub">
            {content.werdegang.map((eintrag) => (
              <li key={eintrag.period} className="col-sub border-t border-rule pt-3 pb-4 lg:py-4">
                <p className="text-base leading-[1.6] text-muted tabular-nums lg:col-span-3">{eintrag.period}</p>
                <p className="mt-0.5 text-pretty lg:col-span-6 lg:mt-0">{eintrag.station}</p>
              </li>
            ))}
          </ol>
        </TwoColumns>
      </Section>

      <Section labelledBy="team-heading">
        <TwoColumns heading={<SectionHeading id="team-heading">{content.teamHeading}</SectionHeading>}>
          <div>
            <p className="max-w-[34em] text-lead text-pretty">{content.teamText}</p>
            {teamMembers.length > 0 && (
              <ul className="mt-10 grid gap-[var(--col-gap)] gap-y-8 md:grid-cols-3">
                {teamMembers.map((member) => (
                  <li key={member.name}>
                    <Image
                      src={member.photo.src}
                      alt={member.photo.alt}
                      width={member.photo.width}
                      height={member.photo.height}
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="mb-4 h-auto w-full"
                    />
                    <h3 className="font-display text-h2">{member.name}</h3>
                    <p className="mt-1 text-base font-medium">{member.role}</p>
                    <p className="mt-2 text-muted">{member.sentence}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TwoColumns>
      </Section>

      <Section labelledBy="werte-heading">
        <div className="mb-5 lg:mb-8">
          <SectionHeading id="werte-heading">{content.werteHeading}</SectionHeading>
        </div>
        <Statements items={content.werte} />
      </Section>

      <section aria-labelledby="buero-heading" className="section">
        <div className="grid-12 items-end gap-y-6">
          <div className="relative aspect-[1.148] overflow-hidden lg:col-span-8">
            <Image
              src={fabianImBuero.src}
              alt={fabianImBuero.alt}
              fill
              sizes="(min-width: 1920px) 1280px, (min-width: 1024px) 67vw, 100vw"
              className="object-cover object-right"
            />
          </div>
          <div className="wrap min-w-0 lg:col-span-4 lg:pl-0">
            <h2 id="buero-heading" className="mb-4 font-display text-h2 text-balance">
              {content.bueroHeading}
            </h2>
            <InfoRows
              rows={[
                {
                  label: "Adresse",
                  content: (
                    <address className="not-italic">
                      {site.address.street}, {site.address.postalCode} {site.address.city}
                    </address>
                  ),
                },
                {
                  label: content.telefonLabel,
                  content: (
                    <a href={site.phone.href} className="inline-link tap">
                      {site.phone.label}
                    </a>
                  ),
                },
                { label: "Erreichbarkeit", content: site.hoursLong },
                { label: "Termine", content: content.termineHinweis },
              ]}
            />
            <div className="mt-6">
              <StandortKarte />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
