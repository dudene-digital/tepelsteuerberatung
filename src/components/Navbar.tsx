"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  // Close menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap: keep Tab within the mobile menu while open
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Small delay to allow animation to complete
    const timer = setTimeout(() => {
      const firstFocusable = menu.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }, 100);

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements =
        menu.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Services", href: "/#services" },
    { name: "FAQ", href: "/#faq" },
    { name: "Kontakt", href: "/#kontakt" },
  ];

  return (
    <>
      <nav
        aria-label="Hauptnavigation"
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-slate-950/80 backdrop-blur-xl shadow-[0_0_40px_rgba(165,231,255,0.06)] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8">
          <a
            href="/"
            aria-label="Fabian Tepel Steuerberatung – Startseite"
            className="flex items-center gap-3 relative z-[110]"
          >
            <span
              className="material-symbols-outlined text-cyan-400 text-2xl"
              aria-hidden="true"
              data-icon="account_balance"
            >
              account_balance
            </span>
            <span className="text-xl font-extrabold tracking-tighter text-slate-50 dark:text-white font-manrope uppercase">
              FABIAN TEPEL
            </span>
          </a>

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
              href="/#kontakt"
              className="bg-primary-container text-on-primary-container font-headline font-bold px-6 py-2.5 rounded-lg scale-95 active:scale-90 transition-transform hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] inline-block"
            >
              Erstgespräch
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={toggleRef}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-[110]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 rounded ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 rounded ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 rounded ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
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
              className={`font-headline text-3xl font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-all transform duration-300 ${
                isOpen
                  ? `translate-y-0 opacity-100 ${index === 0 ? "delay-0" : index === 1 ? "delay-[100ms]" : "delay-[200ms]"}`
                  : "translate-y-8 opacity-0 delay-0"
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#kontakt"
            onClick={() => setIsOpen(false)}
            className={`mt-8 bg-primary-container text-on-primary-container font-headline font-bold px-8 py-4 rounded-xl text-lg w-full text-center transition-all transform duration-300 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-[400ms] shadow-[0_0_30px_rgba(0,210,255,0.2)]"
                : "translate-y-8 opacity-0 delay-0"
            }`}
          >
            Erstgespräch Buchen
          </a>
        </div>
      </div>
    </>
  );
}
