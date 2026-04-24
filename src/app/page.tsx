import Navbar from "@/components/Navbar";
import ConsentMap from "@/components/ConsentMap";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Tepel Steuerberatung",
    alternateName: "Fabian Tepel Steuerberatung",
    url: "https://tepel-steuerberatung.de",
    telephone: "+491723870104",
    email: "fabian@tepel-steuerberatung.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gottfried-Kinkel-Straße 21",
      addressLocality: "Wiesbaden",
      postalCode: "65187",
      addressCountry: "DE",
      addressRegion: "Hessen",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.05882,
      longitude: 8.23970,
    },
    description:
      "Digitale & agile Steuerberatung in Wiesbaden. Maßgeschneiderte Lösungen für Unternehmer, Start-ups und Freiberufler.",
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Wiesbaden",
    },
    founder: {
      "@type": "Person",
      name: "Fabian Tepel",
      jobTitle: "Steuerberater",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Steuerberatungsleistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Finanzbuchhaltung",
            description: "Digitale Buchhaltung – 100% papierlos & ortsunabhängig",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lohn & Gehalt",
            description: "Komplette Lohnabrechnung inkl. Meldungen an Sozialversicherungsträger und Finanzamt",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jahresabschlüsse & Steuererklärungen",
            description: "Erstellung von Jahresabschlüssen und Steuererklärungen",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Strategische Steuerberatung",
            description: "Proaktive Steuergestaltung, Belastungsvergleich und betriebswirtschaftliche Analyse",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
<main id="main-content" className="relative">

<section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
<div className="absolute inset-0 z-0" aria-hidden="true">
<div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
<div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[100px]"></div>
</div>
<div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-7">
<span className="inline-block py-1 px-3 mb-6 bg-surface-container-high rounded-full border border-outline-variant/20 text-tertiary text-[10px] font-bold tracking-[0.2em] uppercase">Digital &amp; Agil</span>
<h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-8">
                        STEUERBERATUNG, DIE SICH DEINEM BUSINESS ANPASST
                    </h1>
<p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                        Hi, ich bin Fabian. Ich helfe Unternehmern und Start-ups dabei, ihre Finanzen stressfrei im Griff zu behalten. Vergiss Pendelordner und kompliziertes Behördendeutsch – wir arbeiten smart, voll digital mit digitalen Tools und sprechen eine Sprache, die du verstehst.
                    </p>
<div className="flex flex-col sm:flex-row flex-wrap gap-4">
<a href="#kontakt" className="inline-block text-center hero-gradient text-on-primary-container px-6 py-4 md:px-10 md:py-5 rounded-xl font-headline font-bold text-base md:text-lg shadow-[0_0_40px_rgba(165,231,255,0.15)] hover:scale-[1.02] transition-transform">
                            Kostenloses Erstgespräch
                        </a>
<a href="#services" className="inline-block text-center bg-surface-variant/20 backdrop-blur-md border border-outline-variant/15 text-on-surface px-6 py-4 md:px-10 md:py-5 rounded-xl font-headline font-bold text-base md:text-lg hover:bg-surface-variant/30 transition-all">
                            Mein Ansatz
                        </a>
</div>
</div>
<div className="lg:col-span-5 relative mt-16 lg:mt-0">
<div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl animate-float">
<img alt="Portrait von Fabian Tepel, Steuerberater in Wiesbaden" className="w-full h-full object-cover" src="/berater_1.jpg"/>
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

</div>

<div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="verified" aria-hidden="true">verified</span>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Status</p>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#32d7c2]"></div>
<span className="font-headline font-bold">100% Digital</span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="py-24 bg-surface-container-low relative" aria-label="Kennzahlen">
<div className="max-w-7xl mx-auto px-8">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
<div className="text-center group">
<div className="font-headline text-6xl md:text-8xl font-black text-primary mb-4 tracking-tighter transition-transform group-hover:scale-110">100%</div>
<p className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant">Mandanten mit digitaler Beratung</p>
</div>
<div className="text-center group">
<div className="font-headline text-6xl md:text-8xl font-black text-tertiary mb-4 tracking-tighter transition-transform group-hover:scale-110">30%</div>
<p className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant">Zeiteinsparung durch agile Prozesse</p>
</div>
<div className="text-center group">
<div className="font-headline text-6xl md:text-8xl font-black text-on-surface mb-4 tracking-tighter transition-transform group-hover:scale-110">1:1</div>
<p className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant">Persönliche Mandantenbetreuung</p>
</div>
</div>
</div>
</section>

<section id="services" className="py-32 relative" aria-labelledby="services-heading">
<div className="max-w-7xl mx-auto px-8">
<div className="mb-20 text-center max-w-3xl mx-auto">
<h2 id="services-heading" className="font-headline text-4xl font-bold mb-6">Werte, die den Unterschied machen</h2>
<div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-primary mb-8 block" data-icon="cloud_off" aria-hidden="true">cloud_off</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Kein Papierkram mehr</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Belege scannen statt abheften. Wir nutzen modernste digitale Schnittstellen und Automatisierungen, damit du dich nie wieder mit Pendelordnern herumschlagen musst.
                        </p>

</div>

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-tertiary mb-8 block" data-icon="bolt" aria-hidden="true">bolt</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Agilität statt Stillstand</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Das Steuerrecht ändert sich, dein Business wächst. Wir passen unsere Prozesse monatlich an deine Bedürfnisse an, statt in alten Strukturen zu verharren.
                        </p>

</div>

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-primary mb-8 block" data-icon="forum" aria-hidden="true">forum</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Echter Austausch statt Pflichttermin</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Wir telefonieren nicht nur, wenn die Frist abläuft. Regelmäßige Check-ins per Video-Call stellen sicher, dass wir proaktiv statt reaktiv handeln.
                        </p>

</div>

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-tertiary mb-8 block" data-icon="rocket_launch" aria-hidden="true">rocket_launch</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Du baust das Business, ich halte dir den Rücken frei.</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Konzentriere dich auf dein Produkt. Ich kümmere mich um die steuerliche Struktur, die Finanzplanung und die Kommunikation mit dem Finanzamt.
                        </p>

</div>
</div>
</div>
</section>

<section id="start-up" className="py-32 bg-surface-container-lowest relative overflow-hidden" aria-labelledby="startup-heading">
<div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-32" aria-hidden="true"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="category" aria-hidden="true">category</span>
</div>
<span className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-bold">Start-up Support</span>
</div>
<h2 id="startup-heading" className="font-headline text-4xl md:text-5xl font-extrabold mb-8 leading-tight">DEIN FUNDAMENT FÜR SKALIERUNG.</h2>
<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                        Du hast die Idee, ich die Struktur. Von der Gründung über die Wahl der richtigen Rechtsform bis hin zu komplexen Beteiligungsmodellen – ich bin dein strategischer Partner.
                    </p>
<ul className="space-y-4 mb-12">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle" aria-hidden="true">check_circle</span>
<span className="text-on-surface">Gründungsberatung &amp; Rechtsformwahl</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Digitale Buchhaltung ab Tag 1</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Cashflow-Monitoring &amp; Finanzplanung</span>
</li>
</ul>

</div>
<div>
<img alt="Fabian Tepel – Start-up Support" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl" src="/berater_2.jpg"/>
</div>
</div>
</section>

<section className="py-32 bg-surface-container-low relative overflow-hidden">
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div className="order-last lg:order-first">
<img alt="Zusammenarbeit bei der strategischen Steuerplanung" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl" src="strategy_consulting_image_1774551205403.png"/>
</div>
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="insights" aria-hidden="true">insights</span>
</div>
<span className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-bold">Strategische Beratung</span>
</div>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 leading-tight">WEITER ALS DAS FINANZAMT DENKT.</h2>
<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                        Steuerberatung heißt für mich nicht nur, die Vergangenheit zu verwalten, sondern deine Zukunft zu gestalten. Wir optimieren deine Steuerlast proaktiv und passen die Strategie an, wenn dein Business skaliert.
                    </p>
<ul className="space-y-4">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Proaktive Steuergestaltung &amp; Belastungsvergleich</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Betriebswirtschaftliche Analyse &amp; KPI-Reporting</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Begleitung bei Finanzierungsrunden &amp; Exits</span>
</li>
</ul>
</div>
</div>
</section>


<section className="py-32 bg-surface-container-lowest relative overflow-hidden">
<div className="absolute left-0 top-0 w-1/2 h-full bg-primary/5 -skew-x-12 -translate-x-32" aria-hidden="true"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="devices" aria-hidden="true">devices</span>
</div>
<span className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-bold">Digitaler Workflow</span>
</div>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 leading-tight">BUCHHALTUNG 2.0</h2>
<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                        Vergiss Pendelordner und Schuhkartons voller Belege. Mit <strong>innovativen Werkzeugen</strong>{" "}digitalisieren wir deine Buchführung komplett. Du fotografierst Belege per App oder lädst sie hoch, das geht auch automatisiert &ndash; ich kümmere mich um den Rest.
                    </p>
<ul className="space-y-4">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">100% papierlos &amp; ortsunabhängig</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Digitaler Einblick in deine Unternehmenskennzahlen</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Automatisierte Schnittstellen zu Bank &amp; Bezahlsystemen</span>
</li>
</ul>
</div>
<div>
<img alt="Digitale Belegerfassung per App und Cloud" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl" src="digital_workflow_image_1774551221355.png"/>
</div>
</div>
</section>


<section className="py-32 bg-surface-container relative overflow-hidden">
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div className="order-last lg:order-first">
<img alt="Lohnabrechnung und Gehaltsauswertung digital" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl" src="/lohn-gehalt.png"/>
</div>
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="payments" aria-hidden="true">payments</span>
</div>
<span className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-bold">Lohn & Gehalt</span>
</div>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 leading-tight">EINFACH FÜR DICH UND DEIN TEAM.</h2>
<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                        Dein Team wächst? Ich übernehme die komplette Lohnabrechnung, inklusive aller Meldungen an Sozialversicherungsträger und Finanzamt. Digitaler Abruf der Abrechnungen für deine Mitarbeiter inklusive.
                    </p>
<ul className="space-y-4">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Digitale Lohnauswertungen via App</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Rechtssichere Abrechnung von Benefits &amp; Sachbezügen</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<span className="text-on-surface">Volle Übernahme der Melde- und Bescheinigungswesen</span>
</li>
</ul>
</div>
</div>
</section>


<section id="kontakt" className="py-32 bg-surface-container relative overflow-hidden" aria-labelledby="contact-heading">
<div className="absolute inset-0 opacity-10" aria-hidden="true">
<img src="support_contact_image_1774551249320.png" alt="" className="w-full h-full object-cover grayscale mix-blend-screen" />
</div>
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10">
<div className="text-center max-w-4xl mx-auto mb-16">
<h2 id="contact-heading" className="font-headline text-4xl md:text-6xl font-extrabold mb-6 text-on-surface">Effizient, agil und persönlich betreut</h2>
<p className="text-2xl text-on-surface-variant font-medium">Innovative Lösungen für zeitgemäße Beratung.</p>
</div>

<div className="grid lg:grid-cols-2 gap-8 bg-surface-container-low/80 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/30 shadow-2xl">
{/* Left: Contact Form */}
<div>
  <ContactForm />
</div>
{/* Right: Contact Info + Map */}
<div className="flex flex-col gap-6">
<div>
<h3 className="font-headline text-2xl font-bold mb-6 text-primary">Kontakt</h3>
<div className="space-y-3">
  <a href="tel:+491723870104" className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container transition-all group">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
      <span className="material-symbols-outlined text-primary text-lg" data-icon="phone" aria-hidden="true">phone</span>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">Telefon</p>
      <p className="text-sm text-on-surface font-medium">+ 49 172 3870104</p>
    </div>
  </a>
  <a href="mailto:fabian@tepel-steuerberatung.de" className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container transition-all group">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
      <span className="material-symbols-outlined text-primary text-lg" data-icon="mail" aria-hidden="true">mail</span>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">E-Mail</p>
      <p className="text-sm text-on-surface font-medium">fabian@tepel-steuerberatung.de</p>
    </div>
  </a>
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/10">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary text-lg" data-icon="location_on" aria-hidden="true">location_on</span>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">Adresse</p>
      <p className="text-sm text-on-surface font-medium">Gottfried-Kinkel-Straße 21<br/>65187 Wiesbaden</p>
    </div>
  </div>
</div>
</div>
<div className="flex-1 min-h-[250px] rounded-2xl overflow-hidden border border-outline-variant/20 shadow-lg">
  <ConsentMap />
</div>
</div>
</div>

</div>
</section>

</main>

<footer className="bg-slate-950 border-t border-slate-900 py-16">
<div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12">
<div className="max-w-sm">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-cyan-400 text-2xl" data-icon="account_balance" aria-hidden="true">account_balance</span>
<span className="font-manrope font-bold text-slate-300 text-xl tracking-tighter">FABIAN TEPEL</span>
</div>
<p className="font-inter text-xs tracking-normal text-slate-400 leading-relaxed mb-6">
                    © 2026 Fabian Tepel Steuerberatung. Digital &amp; Agil.<br/>
                    Moderne Steuerberatung für die digitale Wirtschaft.
                </p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
<nav aria-label="Footer-Navigation">
<p className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6">Navigation</p>
<ul className="space-y-4">
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/#home">Home</a></li>
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/#services">Services</a></li>
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/#kontakt">Kontakt</a></li>
</ul>
</nav>
<nav aria-label="Rechtliche Seiten">
<p className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6">Rechtliches</p>
<ul className="space-y-4">
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/impressum">Impressum</a></li>
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/datenschutz">Datenschutz</a></li>
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/barrierefreiheit">Barrierefreiheit</a></li>
</ul>
</nav>
<div>
<p className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6">Kontakt</p>
<ul className="space-y-4">
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="mailto:fabian@tepel-steuerberatung.de">E-Mail schreiben</a></li>
<li><a className="text-slate-400 hover:text-cyan-300 transition-colors text-xs" href="/#kontakt">Kontakt aufnehmen</a></li>
</ul>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-slate-800 text-center">
<p className="font-inter text-xs text-slate-400">
  Made with ❤️ by{" "}
  <a href="https://dudene-digital.de" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2">Dudene Digital</a>
</p>
</div>
</footer>

    </>
  );
}
