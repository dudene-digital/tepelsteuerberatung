"use client";

import { useState, useEffect, useCallback } from "react";

type ConsentState = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
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
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Small delay so the page renders first, then the banner slides in
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const full: ConsentState = { essential: true, analytics: true, marketing: true };
    storeConsent(full);
    setVisible(false);
  }, []);

  const handleRejectOptional = useCallback(() => {
    const minimal: ConsentState = { essential: true, analytics: false, marketing: false };
    storeConsent(minimal);
    setVisible(false);
  }, []);

  const handleSaveSelection = useCallback(() => {
    storeConsent(consent);
    setVisible(false);
  }, [consent]);

  // Don't render at all if consent was already given
  const [hasStored, setHasStored] = useState(true);
  useEffect(() => {
    setHasStored(!!getStoredConsent());
  }, []);

  if (hasStored && !visible) return null;

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
        role="dialog"
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
                <span className="material-symbols-outlined text-primary text-xl" data-icon="cookie">
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
                <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant/10">
                  <div className="flex-1 mr-4">
                    <span className="font-headline font-bold text-sm text-on-surface">
                      Essenzielle Cookies
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Notwendig für die grundlegende Funktionalität der Website (z.B. Navigation, Sicherheit).
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-11 h-6 bg-primary/40 rounded-full cursor-not-allowed">
                      <div className="absolute top-0.5 left-[1.375rem] w-5 h-5 bg-primary rounded-full shadow-md" />
                    </div>
                  </div>
                </label>

                {/* Analytics */}
                <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant/10 cursor-pointer group hover:bg-surface-container-lowest transition-colors">
                  <div className="flex-1 mr-4">
                    <span className="font-headline font-bold text-sm text-on-surface">
                      Analyse-Cookies
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Helfen uns zu verstehen, wie du unsere Website nutzt, um sie zu verbessern.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={consent.analytics}
                    onClick={() =>
                      setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      consent.analytics ? "bg-primary/40" : "bg-outline-variant/40"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${
                        consent.analytics
                          ? "left-[1.375rem] bg-primary"
                          : "left-0.5 bg-on-surface-variant"
                      }`}
                    />
                  </button>
                </label>

                {/* Marketing */}
                <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant/10 cursor-pointer group hover:bg-surface-container-lowest transition-colors">
                  <div className="flex-1 mr-4">
                    <span className="font-headline font-bold text-sm text-on-surface">
                      Marketing-Cookies
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Werden verwendet, um Werbung relevanter für dich zu gestalten.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={consent.marketing}
                    onClick={() =>
                      setConsent((prev) => ({ ...prev, marketing: !prev.marketing }))
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      consent.marketing ? "bg-primary/40" : "bg-outline-variant/40"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${
                        consent.marketing
                          ? "left-[1.375rem] bg-primary"
                          : "left-0.5 bg-on-surface-variant"
                      }`}
                    />
                  </button>
                </label>
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
    </>
  );
}
