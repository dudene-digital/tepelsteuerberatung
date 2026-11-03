/** Stammdaten der Kanzlei. Eine Quelle für Seiten, Footer und strukturierte Daten. */
export const site = {
  name: "Tepel Steuerberatung",
  legalName: "Fabian Tepel Steuerberatung",
  url: "https://tepel-steuerberatung.de",
  email: "fabian@tepel-steuerberatung.de",
  phone: { label: "0611 / 15756 0", href: "tel:+49611157560", schema: "+49611157560" },
  mobile: { label: "+ 49 172 3870104", href: "tel:+491723870104" },
  address: {
    street: "Gottfried-Kinkel-Straße 21",
    postalCode: "65187",
    city: "Wiesbaden",
    region: "Hessen",
    country: "DE",
  },
  geo: { latitude: 50.05882, longitude: 8.2397 },
  /* Geschützte Leerzeichen und Wortverbinder halten „9–13 Uhr“ in einer Zeile. */
  hoursShort: "Mo\u2060–\u2060Do 9\u2060–\u206016\u00a0Uhr, Fr 9\u2060–\u206013\u00a0Uhr",
  hoursLong: "Montag bis Donnerstag 9\u2060–\u206016\u00a0Uhr, Freitag 9\u2060–\u206013\u00a0Uhr",
  linkedin: "https://www.linkedin.com/in/fabian-tepel-0925bb108",
  googleProfile:
    "https://www.google.com/maps/place/Fabian+Tepel+Steuerberatung/@50.0588221,8.2396785",
} as const;

/**
 * Ziel aller „Erstgespräch buchen“-Buttons. Solange Fabian keine Bookings-Seite
 * eingerichtet hat, führt es zum Kontaktformular. Danach reicht hier die Bookings-URL.
 */
export const bookingUrl: string | null = null;
export const bookingHref = bookingUrl ?? "/kontakt#erstgespraech";

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const leistungenNav: NavChild[] = [
  { label: "Finanzbuchhaltung & UStVA", href: "/leistungen/finanzbuchhaltung" },
  { label: "Lohn & Gehalt", href: "/leistungen/lohn" },
  { label: "Jahresabschluss & Steuererklärungen", href: "/leistungen/jahresabschluss" },
  { label: "Gründung & Rechtsformwahl", href: "/leistungen/gruendung" },
  { label: "Steuergestaltung & Beratung", href: "/leistungen/steuergestaltung" },
];

export const fuerWenNav: NavChild[] = [
  { label: "E-Commerce & Online-Handel", href: "/fuer-wen/e-commerce" },
  { label: "GmbH & GmbH & Co. KG", href: "/fuer-wen/gmbh" },
  { label: "Freiberufler & Selbständige", href: "/fuer-wen/freiberufler" },
  { label: "Immobilien & Vermieter", href: "/fuer-wen/immobilien" },
  { label: "Gründer", href: "/fuer-wen/gruender" },
];

/* „Kanzlei“ und „Wissen“ führen bis Phase 2 direkt auf ihre einzige Seite. */
export const mainNav: NavItem[] = [
  {
    label: "Leistungen",
    href: "/leistungen",
    children: [{ label: "Alle Leistungen", href: "/leistungen" }, ...leistungenNav],
  },
  {
    label: "Für wen",
    href: "/fuer-wen",
    children: [{ label: "Alle Zielgruppen", href: "/fuer-wen" }, ...fuerWenNav],
  },
  {
    label: "So arbeiten wir",
    href: "/so-arbeiten-wir",
    children: [
      { label: "Ablauf, Tools, Beraterwechsel", href: "/so-arbeiten-wir" },
      { label: "Honorar", href: "/honorar" },
    ],
  },
  { label: "Kanzlei", href: "/team" },
  { label: "Wissen", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavChild[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Barrierefreiheit", href: "/barrierefreiheit" },
];
