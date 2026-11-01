import type { Metadata } from "next";
import Image from "next/image";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import StandortKarte from "@/components/StandortKarte";
import { Card, CtaBand, Icon, PageHero, Section, SectionHeading } from "@/components/ui";
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
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">
          <Image
            src={fabianPortrait.src}
            alt={fabianPortrait.alt}
            width={fabianPortrait.width}
            height={fabianPortrait.height}
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
            loading="eager"
            className="w-full h-auto rounded-3xl border border-outline-variant/20"
          />
          <div>
            <SectionHeading id="fabian-heading">{content.fabianHeading}</SectionHeading>
            <blockquote className="border-l-4 border-primary pl-6 text-lg text-on-surface leading-relaxed">
              <p>{content.fabianQuote}</p>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section tone="low" size="narrow" labelledBy="werdegang-heading">
        <SectionHeading id="werdegang-heading">{content.werdegangHeading}</SectionHeading>
        <ol role="list" className="ml-2 border-l border-outline-variant/30 space-y-10">
          {content.werdegang.map((eintrag) => (
            <li key={eintrag.period} className="relative pl-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
              />
              <p className="font-headline text-sm font-bold text-tertiary mb-1">{eintrag.period}</p>
              <p className="text-on-surface leading-relaxed">{eintrag.station}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="team-heading">
        <SectionHeading id="team-heading" intro={content.teamText}>
          {content.teamHeading}
        </SectionHeading>
        {teamMembers.length > 0 && (
          <ul role="list" className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <li key={member.name}>
                <Card className="h-full">
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    width={member.photo.width}
                    height={member.photo.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="w-full h-auto rounded-2xl mb-6"
                  />
                  <h3 className="font-headline text-xl font-bold mb-1 text-on-surface">{member.name}</h3>
                  <p className="text-sm font-bold text-tertiary mb-3">{member.role}</p>
                  <p className="text-on-surface-variant leading-relaxed">{member.sentence}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="low" labelledBy="werte-heading">
        <SectionHeading id="werte-heading">{content.werteHeading}</SectionHeading>
        <ul role="list" className="grid md:grid-cols-3 gap-6">
          {content.werte.map((wert) => (
            <li key={wert.title}>
              <Card className="h-full">
                <Icon name={wert.icon} className="text-4xl text-primary mb-6 block" />
                <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">{wert.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{wert.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="buero-heading">
        <SectionHeading id="buero-heading">{content.bueroHeading}</SectionHeading>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Image
            src={fabianImBuero.src}
            alt={fabianImBuero.alt}
            width={fabianImBuero.width}
            height={fabianImBuero.height}
            sizes="(min-width: 1280px) 590px, (min-width: 1024px) 50vw, 100vw"
            className="w-full h-auto rounded-3xl"
          />
          <div className="flex flex-col gap-8">
            <ul role="list" className="space-y-4 text-on-surface leading-relaxed">
              <li className="flex items-start gap-3">
                <Icon name="location_on" className="text-primary mt-0.5 shrink-0" />
                <address className="not-italic">
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="call" className="text-primary mt-0.5 shrink-0" />
                <span>
                  {content.telefonLabel}{" "}
                  <a href={site.phone.href} className="hover:text-primary transition-colors">
                    {site.phone.label}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="schedule" className="text-primary mt-0.5 shrink-0" />
                <span>{site.hoursLong}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="event" className="text-primary mt-0.5 shrink-0" />
                <span>{content.termineHinweis}</span>
              </li>
            </ul>
            <StandortKarte />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
