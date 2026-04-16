"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type ConsentState = {
  essential: boolean;
  externalMedia: boolean;
};

const CONSENT_KEY = "cookie-consent";

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  // Dispatch a custom event so other components (e.g. map) can react
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: consent }));
}

export function getCookieConsent(): ConsentState | null {
  return getStoredConsent();
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasStored, setHasStored] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    externalMedia: false,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (!stored) {
      setHasStored(false);
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    } else {
      setHasStored(true);
      setConsent(stored);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const full: ConsentState = { essential: true, externalMedia: true };
    storeConsent(full);
    setConsent(full);
    setHasStored(true);
    setVisible(false);
    setShowDetails(false);
  }, []);

  const handleRejectOptional = useCallback(() => {
    const minimal: ConsentState = { essential: true, externalMedia: false };
    storeConsent(minimal);
    setConsent(minimal);
    setHasStored(true);
    setVisible(false);
    setShowDetails(false);
  }, []);

  const handleSaveSelection = useCallback(() => {
    storeConsent(consent);
    setHasStored(true);
    setVisible(false);
    setShowDetails(false);
  }, [consent]);

  const handleReopen = useCallback(() => {
    const stored = getStoredConsent();
    if (stored) setConsent(stored);
    setShowDetails(true);
    setVisible(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) {
        handleRejectOptional();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, handleRejectOptional]);

  // Focus trap: keep Tab within the cookie banner while visible
  useEffect(() => {
    if (!visible || !dialogRef.current) return;

    // Store the previously focused element to restore later
    previousFocusRef.current = document.activeElement as HTMLElement;

    const dialog = dialogRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), [role="switch"], [tabindex]:not([tabindex="-1"])';

    // Focus the first button after a small delay for the animation
    const timer = setTimeout(() => {
      const firstFocusable = dialog.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }, 200);

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements =
        dialog.querySelectorAll<HTMLElement>(focusableSelector);
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
      // Restore focus when banner closes
      previousFocusRef.current?.focus();
    };
  }, [visible]);

  // Don't render on the server
  if (!mounted) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Cookie-Einstellungen"
        className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-700 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="bg-surface-container-high/95 backdrop-blur-2xl border border-outline-variant/20 rounded-2xl md:rounded-3xl shadow-[0_-8px_60px_-12px_rgba(0,0,0,0.6)] p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-primary text-xl" data-icon="cookie" aria-hidden="true">
                  cookie
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-headline text-lg md:text-xl font-bold text-on-surface mb-1">
                  Cookie-Einstellungen
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Wir verwenden Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten.
                  Weitere Informationen findest du in unserer{" "}
                  <a
                    href="/datenschutz"
                    className="text-primary hover:text-primary-container underline underline-offset-2 transition-colors"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Expandable details */}
            {showDetails && (
              <div className="mt-4 mb-6 space-y-3 animate-in">
                {/* Essential - always on */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant/10">
                  <div className="flex-1 mr-4">
                    <span className="font-headline font-bold text-sm text-on-surface">
                      Essenzielle Cookies
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Notwendig für die grundlegende Funktionalität der Website (z.B. Navigation, Sicherheit).
                    </p>
                  </div>
                  <div className="relative">
                    <div
                      className="w-11 h-6 bg-primary/40 rounded-full"
                      role="switch"
                      aria-checked="true"
                      aria-disabled="true"
                      aria-label="Essenzielle Cookies – immer aktiv"
                      tabIndex={0}
                    >
                      <div className="absolute top-0.5 left-[1.375rem] w-5 h-5 bg-primary rounded-full shadow-md" />
                    </div>
                  </div>
                </div>

                {/* External Media (OSM / Karten) */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant/10 cursor-pointer group hover:bg-surface-container-lowest transition-colors">
                  <div className="flex-1 mr-4">
                    <span id="external-media-label" className="font-headline font-bold text-sm text-on-surface">
                      Externe Medien
                    </span>
                    <p id="external-media-desc" className="text-xs text-on-surface-variant mt-1">
                      Inhalte von externen Anbietern (z.B. OpenStreetMap-Karten via CARTO). Bei Aktivierung werden Daten an Drittanbieter übermittelt.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={consent.externalMedia}
                    aria-labelledby="external-media-label"
                    aria-describedby="external-media-desc"
                    onClick={() =>
                      setConsent((prev) => ({ ...prev, externalMedia: !prev.externalMedia }))
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      consent.externalMedia ? "bg-primary/40" : "bg-outline-variant/40"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${
                        consent.externalMedia
                          ? "left-[1.375rem] bg-primary"
                          : "left-0.5 bg-on-surface-variant"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
              <button
                onClick={handleAcceptAll}
                className="hero-gradient text-on-primary-container px-6 py-3 rounded-xl font-headline font-bold text-sm hover:shadow-[0_0_30px_rgba(0,210,255,0.2)] hover:scale-[1.02] transition-all order-1"
              >
                Alle akzeptieren
              </button>

              {showDetails ? (
                <button
                  onClick={handleSaveSelection}
                  className="bg-surface-variant/30 border border-outline-variant/20 text-on-surface px-6 py-3 rounded-xl font-headline font-bold text-sm hover:bg-surface-variant/50 transition-all order-2"
                >
                  Auswahl speichern
                </button>
              ) : (
                <button
                  onClick={() => setShowDetails(true)}
                  className="bg-surface-variant/30 border border-outline-variant/20 text-on-surface px-6 py-3 rounded-xl font-headline font-bold text-sm hover:bg-surface-variant/50 transition-all order-2"
                >
                  Einstellungen
                </button>
              )}

              <button
                onClick={handleRejectOptional}
                className="text-on-surface-variant px-6 py-3 rounded-xl font-headline font-bold text-sm hover:text-on-surface hover:bg-surface-variant/20 transition-all order-3 sm:ml-auto"
              >
                Nur Essenzielle
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Persistent cookie settings button (bottom-left) */}
      {hasStored && !visible && (
        <button
          onClick={handleReopen}
          aria-label="Cookie-Einstellungen öffnen"
          className="fixed bottom-5 left-5 z-[9997] w-11 h-11 rounded-full bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/20 shadow-lg flex items-center justify-center hover:scale-110 hover:bg-surface-container-highest transition-all duration-300 group"
        >
          <span className="material-symbols-outlined text-primary text-lg group-hover:rotate-12 transition-transform" data-icon="cookie" aria-hidden="true">
            cookie
          </span>
        </button>
      )}
    </>
  );
}
