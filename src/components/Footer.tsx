import Link from "next/link";
import { fuerWenNav, legalNav, leistungenNav, site } from "@/lib/site";

const linkClass = "text-slate-400 hover:text-cyan-300 transition-colors text-xs";
const headingClass = "font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6";

const kanzleiLinks = [
  { label: "So arbeiten wir", href: "/so-arbeiten-wir" },
  { label: "Honorar", href: "/honorar" },
  { label: "Über uns & Team", href: "/team" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid gap-12 lg:grid-cols-[1.4fr_3fr]">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-cyan-400 text-2xl" data-icon="account_balance" aria-hidden="true">
              account_balance
            </span>
            <span className="font-manrope font-bold text-slate-300 text-xl tracking-tighter">FABIAN TEPEL</span>
          </div>
          <address className="not-italic font-inter text-xs text-slate-400 leading-relaxed mb-4">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <ul className="space-y-2 mb-6">
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
              <a className={linkClass} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li className="text-slate-400 text-xs">{site.hoursShort}</li>
          </ul>
          <p className="font-inter text-xs text-slate-400">© {new Date().getFullYear()} {site.legalName}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <nav aria-label="Leistungen">
            <p className={headingClass}>Leistungen</p>
            <ul className="space-y-4">
              {leistungenNav.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Für wen">
            <p className={headingClass}>Für wen</p>
            <ul className="space-y-4">
              {fuerWenNav.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Kanzlei">
            <p className={headingClass}>Kanzlei</p>
            <ul className="space-y-4">
              {kanzleiLinks.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Rechtliches">
            <p className={headingClass}>Rechtliches</p>
            <ul className="space-y-4">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-12 pt-8 border-t border-slate-800 text-center">
        <p className="font-inter text-xs text-slate-400">
          Made with ❤️ by{" "}
          <a href="https://dudene-digital.de" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2">
            Dudene Digital
          </a>
        </p>
      </div>
    </footer>
  );
}
