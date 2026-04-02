"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Kontakt", href: "#kontakt" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-slate-950/80 backdrop-blur-xl shadow-[0_0_40px_rgba(165,231,255,0.06)] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 relative z-[110]">
            <span
              className="material-symbols-outlined text-cyan-400 text-2xl"
              data-icon="account_balance"
            >
              account_balance
            </span>
            <span className="text-xl font-extrabold tracking-tighter text-slate-50 dark:text-white font-manrope uppercase">
              FABIAN TEPEL
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                className="font-manrope text-sm font-semibold tracking-widest uppercase text-slate-300 hover:text-cyan-400 transition-colors"
                href={link.href}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#kontakt"
              className="bg-primary-container text-on-primary-container font-headline font-bold px-6 py-2.5 rounded-lg scale-95 active:scale-90 transition-transform hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] inline-block"
            >
              Erstgespräch
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            title="Toggle Menu"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-[110]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 rounded ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 rounded ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 rounded ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[90] flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-8 w-full px-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-headline text-3xl font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-all transform ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-" + (index * 100)
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setIsOpen(false)}
            className={`mt-8 bg-primary-container text-on-primary-container font-headline font-bold px-8 py-4 rounded-xl text-lg w-full text-center transition-all transform ${
              isOpen
                ? "translate-y-0 opacity-100 delay-400 shadow-[0_0_30px_rgba(0,210,255,0.2)]"
                : "translate-y-8 opacity-0"
            }`}
             style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
          >
            Erstgespräch Buchen
          </a>
        </div>
      </div>
    </>
  );
}
