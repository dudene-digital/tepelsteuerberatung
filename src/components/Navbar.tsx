"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookingHref, bookingUrl, mainNav } from "@/lib/site";

const bookingProps = bookingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Bei Seitenwechsel im selben Render schließen, damit das Menü nicht kurz stehen bleibt.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      } else if (openMenu) {
        const label = openMenu;
        setOpenMenu(null);
        desktopRef.current?.querySelector<HTMLElement>(`[data-menu="${label}"]`)?.focus();
      }
    },
    [isOpen, openMenu]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!openMenu) return;
    const close = (e: PointerEvent) => {
      if (!desktopRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [openMenu]);

  // Fokus bleibt im mobilen Menü, solange es offen ist.
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const menu = menuRef.current;
    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const timer = setTimeout(() => menu.querySelector<HTMLElement>(selector)?.focus(), 100);
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = menu.querySelectorAll<HTMLElement>(selector);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen]);

  const isActive = (href: string, childHrefs: string[] = []) =>
    pathname === href || pathname.startsWith(`${href}/`) || childHrefs.includes(pathname);

  const topClass = (active: boolean) =>
    `font-manrope text-[13px] font-semibold tracking-widest uppercase whitespace-nowrap transition-colors ${
      active ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
    }`;

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
        <div className="flex justify-between items-center gap-6 max-w-7xl mx-auto px-6 md:px-8">
          <Link
            href="/"
            aria-label="Fabian Tepel Steuerberatung – Startseite"
            className="flex items-center gap-3 relative z-[110] shrink-0"
          >
            <span className="material-symbols-outlined text-cyan-400 text-2xl" aria-hidden="true" data-icon="account_balance">
              account_balance
            </span>
            <span className="text-xl font-extrabold tracking-tighter text-white font-manrope uppercase">FABIAN TEPEL</span>
          </Link>

          {/* Desktop */}
          <div ref={desktopRef} className="hidden xl:flex items-center gap-6 xl:gap-8">
            {mainNav.map((item) => {
              const childHrefs = item.children?.map((c) => c.href) ?? [];
              const active = isActive(item.href, childHrefs);
              if (!item.children) {
                return (
                  <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={topClass(active)}>
                    {item.label}
                  </Link>
                );
              }
              const expanded = openMenu === item.label;
              const panelId = `nav-${item.href.slice(1)}`;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setOpenMenu(item.label);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    data-menu={item.label}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(expanded ? null : item.label)}
                    className={`inline-flex items-center gap-1 ${topClass(active)}`}
                  >
                    {item.label}
                    <span
                      className={`material-symbols-outlined text-base transition-transform ${expanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                      data-icon="expand_more"
                    >
                      expand_more
                    </span>
                  </button>
                  <div id={panelId} hidden={!expanded} className="absolute left-0 top-full pt-3 w-80">
                    <ul className="rounded-2xl border border-outline-variant/20 bg-slate-950 p-2 shadow-2xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-surface-container-high ${
                              pathname === child.href ? "text-cyan-400" : "text-slate-200 hover:text-cyan-400"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden xl:block shrink-0">
            <Link
              href={bookingHref}
              {...bookingProps}
              className="bg-primary-container text-on-primary-container font-headline font-bold px-5 py-2.5 rounded-lg active:scale-95 transition-transform hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] inline-block"
            >
              Erstgespräch
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="xl:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-[110]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span aria-hidden="true" className={`block w-6 h-0.5 bg-white transition-transform duration-300 rounded ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span aria-hidden="true" className={`block w-6 h-0.5 bg-white transition-opacity duration-300 rounded ${isOpen ? "opacity-0" : ""}`} />
            <span aria-hidden="true" className={`block w-6 h-0.5 bg-white transition-transform duration-300 rounded ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobil */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[90] overflow-y-auto overscroll-contain transition-all duration-300 xl:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="min-h-full px-6 pt-24 pb-10">
          <ul className="space-y-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <p className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{item.label}</p>
                    <ul className="space-y-1 border-l border-slate-800 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={() => setIsOpen(false)} className={`block py-2 text-base font-medium ${pathname === child.href ? "text-cyan-400" : "text-white"}`}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={item.href} onClick={() => setIsOpen(false)} className={`block font-headline text-xl font-bold ${pathname === item.href ? "text-cyan-400" : "text-white"}`}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={bookingHref}
            {...bookingProps}
            onClick={() => setIsOpen(false)}
            className="mt-8 block bg-primary-container text-on-primary-container font-headline font-bold px-8 py-4 rounded-xl text-lg text-center"
          >
            Erstgespräch buchen
          </Link>
        </div>
      </div>
    </>
  );
}
