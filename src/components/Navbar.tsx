"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookingHref, bookingUrl, mainNav, site } from "@/lib/site";

const bookingProps = bookingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mastheadVisible, setMastheadVisible] = useState(true);
  const mastheadRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Bei Seitenwechsel im selben Render schließen, damit das Menü nicht kurz stehen bleibt.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsOpen(false);
    setOpenMenu(null);
    setOpenGroup(null);
  }

  // Auf der Startseite steht der Name im großen Kopf. In der Leiste erscheint er erst, wenn der Kopf weggescrollt ist.
  useEffect(() => {
    const masthead = mastheadRef.current;
    if (!masthead) return;
    const observer = new IntersectionObserver(([entry]) => setMastheadVisible(entry.isIntersecting));
    observer.observe(masthead);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Wird das Fenster breit genug für die Desktop-Navigation, darf das Menü die Seite nicht gesperrt lassen.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  const closeMobile = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isOpen) {
        closeMobile();
      } else if (openMenu) {
        const label = openMenu;
        setOpenMenu(null);
        desktopRef.current?.querySelector<HTMLElement>(`[data-menu="${label}"]`)?.focus();
      }
    },
    [isOpen, openMenu, closeMobile]
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
    menu.querySelector<HTMLElement>(selector)?.focus();
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = [...menu.querySelectorAll<HTMLElement>(selector)].filter((item) => item.offsetParent !== null);
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
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  const isActive = (href: string, childHrefs: string[] = []) =>
    pathname === href || pathname.startsWith(`${href}/`) || childHrefs.includes(pathname);

  const topClass = (active: boolean) =>
    `inline-flex min-h-12 items-center whitespace-nowrap text-base decoration-1 underline-offset-[0.3em] hover:underline ${
      active ? "underline" : ""
    }`;

  const showName = !isHome || !mastheadVisible;

  return (
    <>
      {isHome && (
        <div ref={mastheadRef} className="frame wrap pt-2.5 md:pt-3">
          <div className="fit-box">
            <p className="fit-name">Fabian Tepel</p>
          </div>
        </div>
      )}

      {/* Die Leiste bleibt beim Scrollen stehen. Auf der Startseite liegt sie direkt unter dem großen Namen. */}
      <header className="sticky top-0 z-50 bg-bg">
        <div className="frame wrap">
          <nav
            aria-label="Hauptnavigation"
            className={`flex min-h-12 items-center justify-between gap-6 border-b border-ink ${isHome ? "border-t" : ""}`}
          >
            <Link
              href="/"
              aria-label={`${site.legalName} – Startseite`}
              className="flex min-h-12 min-w-0 shrink-0 items-baseline gap-x-2 pt-3"
            >
              {showName && <span className="font-display text-[1.375rem] leading-none whitespace-nowrap">Fabian Tepel</span>}{" "}
              <span className={`text-base leading-none font-medium whitespace-nowrap ${showName ? "max-[21rem]:sr-only" : ""}`}>
                Steuerberatung
              </span>
            </Link>

            {/* Desktop */}
            <div ref={desktopRef} className="hidden items-center gap-x-[clamp(1rem,1.8vw,2.25rem)] lg:flex">
              {mainNav.map((item) => {
                const childHrefs = item.children?.map((c) => c.href) ?? [];
                const active = isActive(item.href, childHrefs);
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={topClass(active)}
                    >
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
                      className={`cursor-pointer ${topClass(active)}`}
                    >
                      {item.label}
                    </button>
                    <div id={panelId} hidden={!expanded} className="absolute top-full -left-4 w-max max-w-[24rem]">
                      <ul className="border border-ink bg-bg py-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={`flex min-h-10 items-center px-4 text-base decoration-1 underline-offset-[0.3em] hover:underline ${
                                pathname === child.href ? "underline" : ""
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
              <Link href={bookingHref} {...bookingProps} className="btn btn-small whitespace-nowrap">
                Erstgespräch
              </Link>
            </div>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(true)}
              className="-mr-2 flex min-h-12 cursor-pointer items-center px-2 text-base font-medium underline decoration-1 underline-offset-[0.3em] lg:hidden"
            >
              Menü
            </button>
          </nav>
        </div>
      </header>

      {/* Mobil */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        hidden={!isOpen}
        className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-bg lg:hidden"
      >
        <div className="wrap flex min-h-full flex-col pb-8">
          <div className="flex min-h-12 items-center justify-between border-b border-ink">
            <span className="font-display text-[1.375rem] leading-none whitespace-nowrap">Fabian Tepel</span>
            <button
              type="button"
              onClick={closeMobile}
              className="-mr-2 flex min-h-12 cursor-pointer items-center px-2 text-base font-medium underline decoration-1 underline-offset-[0.3em]"
            >
              Schließen
            </button>
          </div>

          <ul className="mt-2">
            {mainNav.map((item) => {
              const rowClass = "flex min-h-14 w-full items-center justify-between font-display text-[1.75rem] leading-tight text-left";
              if (!item.children) {
                return (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={rowClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const expanded = openGroup === item.label;
              const groupId = `menu-${item.href.slice(1)}`;
              return (
                <li key={item.href} className="border-b border-rule">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={groupId}
                    onClick={() => setOpenGroup(expanded ? null : item.label)}
                    className={`cursor-pointer ${rowClass}`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-sans text-2xl leading-none font-normal">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                  <ul id={groupId} hidden={!expanded} className="pb-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          onClick={() => setIsOpen(false)}
                          className={`flex min-h-11 items-center text-[1.0625rem] leading-snug decoration-1 underline-offset-[0.3em] ${
                            pathname === child.href ? "underline" : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-8">
            <Link href={bookingHref} {...bookingProps} onClick={() => setIsOpen(false)} className="btn w-full">
              Erstgespräch buchen
            </Link>
            <a href={site.phone.href} className="quiet-link mt-2 w-full justify-center">
              {site.phone.label}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
