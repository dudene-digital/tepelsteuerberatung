import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
<main className="relative">

<section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
<div className="absolute inset-0 z-0">
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
<img alt="Fabian Tepel" className="w-full h-full object-cover" src="/fabian-tepel.png"/>
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

</div>

<div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="verified">verified</span>
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

<section className="py-24 bg-surface-container-low relative">
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

<section id="services" className="py-32 relative">
<div className="max-w-7xl mx-auto px-8">
<div className="mb-20 text-center max-w-3xl mx-auto">
<h2 className="font-headline text-4xl font-bold mb-6">Werte, die den Unterschied machen</h2>
<div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-primary mb-8 block" data-icon="cloud_off">cloud_off</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Kein Papierkram mehr</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Belege scannen statt abheften. Wir nutzen modernste digitale Schnittstellen und Automatisierungen, damit du dich nie wieder mit Pendelordnern herumschlagen musst.
                        </p>

</div>

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-tertiary mb-8 block" data-icon="bolt">bolt</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Agilität statt Stillstand</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Das Steuerrecht ändert sich, dein Business wächst. Wir passen unsere Prozesse monatlich an deine Bedürfnisse an, statt in alten Strukturen zu verharren.
                        </p>

</div>

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-primary mb-8 block" data-icon="forum">forum</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Echter Austausch statt Pflichttermin</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Wir telefonieren nicht nur, wenn die Frist abläuft. Regelmäßige Check-ins per Video-Call stellen sicher, dass wir proaktiv statt reaktiv handeln.
                        </p>

</div>

<div className="glass-card p-6 md:p-10 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-variant/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,210,255,0.1)] transition-all duration-500 group">
<span className="material-symbols-outlined text-4xl text-tertiary mb-8 block" data-icon="rocket_launch">rocket_launch</span>
<h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">Du baust das Business, ich halte dir den Rücken frei.</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                            Konzentriere dich auf dein Produkt. Ich kümmere mich um die steuerliche Struktur, die Finanzplanung und die Kommunikation mit dem Finanzamt.
                        </p>

</div>
</div>
</div>
</section>

<section id="start-up" className="py-32 bg-surface-container-lowest relative overflow-hidden">
<div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-32"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="category">category</span>
</div>
<span className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-bold">Start-up Support</span>
</div>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 leading-tight">DEIN FUNDAMENT FÜR SKALIERUNG.</h2>
<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                        Du hast die Idee, ich die Struktur. Von der Gründung über die Wahl der richtigen Rechtsform bis hin zu komplexen Beteiligungsmodellen – ich bin dein strategischer Partner.
                    </p>
<ul className="space-y-4 mb-12">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
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
<div className="relative">
<div className="relative z-10 p-4 glass-card rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden animate-float">
<img alt="Start-up Space" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[2.5rem]" data-alt="Modern geometric architectural shot of a sleek glass and concrete building with futuristic lighting and abstract patterns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1J4BFu_1Nlxvf6INKi7c68BRJeCCKFgeGVfhIGZOl-G92r-HFsDAj3c0e204KNDXt3UHFO8-OMGs7FZQNGwgVr07zOxsHRCArQlO3EiQuVsRvmUsUuqhYq0vPZKgk0ceyzzscFe8Mb7_my6jh1CP53gEPql0wzKBXRisDT9qxFyXXRDPMGg4erM6QG7YdWtRecuYSrvw8gcrkiT5WtcR_a5ptcxjJ8OVPIKjPNWzkQxVzgNlLIYwUwDwAv7fSOPfQ_PzVB6oyEuFF"/>
</div>

<div className="absolute -top-12 -right-12 w-64 h-64 border-[40px] border-primary/10 rounded-full animate-float-delayed"></div>
</div>
</div>
</section>

<section className="py-32 bg-surface-container-low relative overflow-hidden">
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div className="relative order-last lg:order-first">
<div className="relative z-10 p-4 glass-card rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden animate-float-slow">
<img alt="Strategische Beratung" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[2.5rem]" src="strategy_consulting_image_1774551205403.png"/>
</div>
<div className="absolute -bottom-12 -left-12 w-64 h-64 border-[40px] border-tertiary/10 rounded-full animate-float"></div>
</div>
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="insights">insights</span>
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
<div className="absolute left-0 top-0 w-1/2 h-full bg-primary/5 -skew-x-12 -translate-x-32"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="devices">devices</span>
</div>
<span className="font-label text-sm uppercase tracking-[0.2em] text-tertiary font-bold">Digitaler Workflow</span>
</div>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 leading-tight">BUCHHALTUNG 2.0.</h2>
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
<div className="relative">
<div className="relative z-10 p-4 glass-card rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden animate-float-delayed">
<img alt="Digitaler Workflow" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[2.5rem]" src="digital_workflow_image_1774551221355.png"/>
</div>
<div className="absolute -top-12 -right-12 w-64 h-64 border-[40px] border-primary/10 rounded-full animate-float-slow"></div>
</div>
</div>
</section>


<section className="py-32 bg-surface-container relative overflow-hidden">
<div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
<div className="relative order-last lg:order-first">
<div className="relative z-10 p-4 glass-card rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden animate-float">
<img alt="Lohn & Gehalt" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[2.5rem]" src="/lohn-gehalt.png"/>
</div>
<div className="absolute -bottom-12 -left-12 w-64 h-64 border-[40px] border-secondary/10 rounded-full animate-float-delayed"></div>
</div>
<div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="payments">payments</span>
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


<section id="kontakt" className="py-32 bg-surface-container relative overflow-hidden">
<div className="absolute inset-0 opacity-10">
<img src="support_contact_image_1774551249320.png" alt="Support Background" className="w-full h-full object-cover grayscale mix-blend-screen" />
</div>
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10">
<div className="text-center max-w-4xl mx-auto mb-16">
<h2 className="font-headline text-4xl md:text-6xl font-extrabold mb-6 text-on-surface">Effizient, agil und persönlich betreut</h2>
<p className="text-2xl text-on-surface-variant font-medium">Innovative Lösungen für zeitgemäße Beratung.</p>
</div>

<div className="grid lg:grid-cols-2 gap-12 bg-surface-container-low/80 backdrop-blur-xl p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/30 shadow-2xl">
<div>
<h3 className="font-headline text-4xl font-bold mb-8 text-primary">Kontakt</h3>
<ul className="space-y-6 text-xl text-on-surface-variant mb-12">
<li className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-primary/20 transition-colors">
<span className="material-symbols-outlined text-tertiary text-lg" data-icon="phone">phone</span>
</div>
<span>Telefon: + 49 172 3870104</span>
</li>
<li className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-primary/20 transition-colors">
<span className="material-symbols-outlined text-tertiary text-lg" data-icon="mail">mail</span>
</div>
<span>E-Mail: fabian@tepel-steuerberatung.de</span>
</li>
<li className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-primary/20 transition-colors">
<span className="material-symbols-outlined text-tertiary text-lg" data-icon="location_on">location_on</span>
</div>
<span className="leading-snug flex-1">Gottfried-Kinkel-Straße 21, 65187 Wiesbaden</span>
</li>
</ul>
<a href="mailto:fabian@tepel-steuerberatung.de" className="bg-surface-bright text-on-surface px-8 py-4 rounded-xl font-headline font-bold text-lg border border-outline-variant/30 hover:border-primary transition-all flex items-center gap-3 w-fit">
Jetzt Kontakt <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
<div className="bg-surface-container-highest p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-outline-variant/20 shadow-inner flex flex-col justify-center">
<h4 className="font-headline text-2xl font-bold mb-8 text-on-surface">Schreib mir direkt</h4>
<form className="flex flex-col gap-6" action="">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <label className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">Name</label>
      <input type="text" className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary placeholder-outline-variant/50" placeholder="Dein Name" />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">E-Mail</label>
      <input type="email" className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary placeholder-outline-variant/50" placeholder="deine@email.de" />
    </div>
  </div>
  <div className="flex flex-col gap-2">
    <label className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">Thema (optional)</label>
    <input type="text" className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary placeholder-outline-variant/50" placeholder="Worum geht es?" />
  </div>
  <div className="flex flex-col gap-2">
    <label className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">Nachricht</label>
    <textarea rows={4} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary resize-none placeholder-outline-variant/50" placeholder="Wie kann ich dich unterstützen?"></textarea>
  </div>
  <button type="submit" className="mt-4 hero-gradient text-on-primary-container px-8 py-4 rounded-xl font-headline font-bold text-lg hover:shadow-[0_0_30px_rgba(0,210,255,0.2)] hover:scale-[1.02] transition-all flex justify-center items-center gap-3 w-full">
    Nachricht senden <span className="material-symbols-outlined" data-icon="send">send</span>
  </button>
</form>
</div>
</div>
</div>
</section>

<section className="py-32">
<div className="max-w-5xl mx-auto px-8">
<div className="bg-gradient-to-br from-surface-container-high to-surface-container p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center border border-outline-variant/10 shadow-2xl relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
<h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">Bereit für den digitalen Wechsel?</h2>
<p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
                        Lass uns in 15 Minuten klären, wie ich dich und dein Business unterstützen kann. Unverbindlich und direkt.
                    </p>
<a href="#kontakt" className="hero-gradient text-on-primary-container px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-headline font-bold text-lg md:text-xl hover:shadow-[0_0_50px_rgba(0,210,255,0.4)] hover:scale-105 transition-all inline-block w-full md:w-auto">
                        Jetzt Erstgespräch buchen
                    </a>
</div>
</div>
</section>
</main>

<footer className="bg-slate-950 border-t border-slate-900 py-16">
<div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12">
<div className="max-w-sm">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-cyan-400 text-2xl" data-icon="account_balance">account_balance</span>
<span className="font-manrope font-bold text-slate-300 text-xl tracking-tighter">FABIAN TEPEL</span>
</div>
<p className="font-inter text-xs tracking-normal text-slate-500 leading-relaxed mb-6">
                    © 2024 Fabian Tepel Steuerberatung. Digital &amp; Agil.<br/>
                    Moderne Steuerberatung für die digitale Wirtschaft.
                </p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
<div>
<h4 className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6">Navigation</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">Home</a></li>
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">Services</a></li>
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">Start-up</a></li>
</ul>
</div>
<div>
<h4 className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6">Rechtliches</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">Impressum</a></li>
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">Datenschutz</a></li>
</ul>
</div>
<div>
<h4 className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-100 mb-6">Kontakt</h4>
<ul className="space-y-4">
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">E-Mail</a></li>
<li><a className="text-slate-500 hover:text-cyan-300 transition-colors text-xs" href="#">LinkedIn</a></li>
</ul>
</div>
</div>
</div>
</footer>

    </>
  );
}
