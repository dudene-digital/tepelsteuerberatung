import Link from "next/link";
import { fuerWenNav, legalNav, leistungenNav, site } from "@/lib/site";

const linkClass =
  "inline-flex min-h-11 items-center py-0.5 text-base leading-snug text-muted decoration-1 underline-offset-[0.25em] hover:text-ink hover:underline lg:min-h-8";

const kanzleiLinks = [
  { label: "So arbeiten wir", href: "/so-arbeiten-wir" },
  { label: "Honorar", href: "/honorar" },
  { label: "Über uns & Team", href: "/team" },
  { label: "Ratgeber", href: "/wissen" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

const footerNav = [
  { label: "Leistungen", links: leistungenNav },
  { label: "Für wen", links: fuerWenNav },
  { label: "Kanzlei", links: kanzleiLinks },
  { label: "Rechtliches", links: legalNav },
];

export default function Footer() {
  return (
    <footer className="frame wrap">
      <div className="grid-12 gap-y-10 border-t border-ink pt-5 pb-10 lg:pt-6">
        <div className="col-aside">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-2xl leading-tight">Fabian Tepel</span>
            <span className="text-base text-muted">Steuerberatung</span>
          </p>
          <address className="mt-3 text-base leading-relaxed text-muted not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <ul className="mt-2">
            <li>
              <a className={linkClass} href={site.phone.href}>
                {site.phone.label}
              </a>
            </li>
            <li>
              <a className={linkClass} href={site.mobile.href}>
                {site.mobile.label}
              </a>
            </li>
            <li>
              <a className={`${linkClass} break-all`} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li className="mt-1 text-base text-muted lg:mt-0">{site.hoursShort}</li>
          </ul>
        </div>
        <div className="col-content min-w-0">
          <div className="grid grid-cols-1 gap-x-[var(--col-gap)] gap-y-8 min-[22.5rem]:grid-cols-2 min-[56rem]:grid-cols-4 lg:grid-cols-[4fr_3fr_2fr_2fr]">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <p className="mb-1 text-base font-medium lg:mb-2">{group.label}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link className={linkClass} href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-x-6 gap-y-2 border-t border-rule py-5 text-base text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.legalName}
        </p>
        <p>
          Made with ❤️ by{" "}
          <a href="https://dudene-digital.de" target="_blank" rel="noopener noreferrer" className="inline-link text-ink">
            Dudene Digital
          </a>
        </p>
      </div>
    </footer>
  );
}
