"use client";

import { useState, useEffect, useCallback } from "react";

export default function ConsentMap() {
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkConsent = useCallback(() => {
    try {
      const raw = localStorage.getItem("cookie-consent");
      if (raw) {
        const consent = JSON.parse(raw);
        setAllowed(!!consent.externalMedia);
      }
    } catch {
      // ignore
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    checkConsent();

    const handler = () => checkConsent();
    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, [checkConsent]);

  const handleAllow = () => {
    try {
      const raw = localStorage.getItem("cookie-consent");
      if (raw) {
        const consent = JSON.parse(raw);
        consent.externalMedia = true;
        localStorage.setItem("cookie-consent", JSON.stringify(consent));
        window.dispatchEvent(
          new CustomEvent("cookie-consent-changed", { detail: consent })
        );
      } else {
        // No consent object yet – create one with externalMedia allowed
        const consent = {
          essential: true,
          externalMedia: true,
        };
        localStorage.setItem("cookie-consent", JSON.stringify(consent));
        window.dispatchEvent(
          new CustomEvent("cookie-consent-changed", { detail: consent })
        );
      }
      setAllowed(true);
    } catch {
      // ignore
    }
  };

  if (!checked) {
    // SSR / loading state – show placeholder
    return (
      <div className="rounded-2xl overflow-hidden border border-outline-variant/20 shadow-lg relative h-full bg-surface-container flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (allowed) {
    return (
      <div className="rounded-2xl overflow-hidden border border-outline-variant/20 shadow-lg relative h-full">
        <iframe
          title="Standort Tepel Steuerberatung"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src="/map.html"
        ></iframe>
      </div>
    );
  }

  // Consent not given – show placeholder with enable button
  return (
    <div className="rounded-2xl overflow-hidden border border-outline-variant/20 shadow-lg relative h-full bg-surface-container flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <span
          className="material-symbols-outlined text-primary text-2xl"
          data-icon="map"
        >
          map
        </span>
      </div>
      <div>
        <p className="text-sm font-headline font-bold text-on-surface mb-1">
          OpenStreetMap-Karte
        </p>
        <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
          Zum Laden der Karte werden Daten an CARTO (USA) übermittelt.{" "}
          <a
            href="/datenschutz"
            className="text-primary underline underline-offset-2"
          >
            Mehr erfahren
          </a>
        </p>
      </div>
      <button
        onClick={handleAllow}
        className="bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary px-5 py-2 rounded-xl font-headline font-bold text-xs transition-all hover:scale-[1.02]"
      >
        Karte laden
      </button>
    </div>
  );
}
