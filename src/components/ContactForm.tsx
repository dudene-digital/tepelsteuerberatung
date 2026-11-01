"use client";

import { startTransition, useActionState, useRef, useEffect } from "react";
import { sendContactEmail, type ContactFormState } from "@/app/actions/contact";

const ANLIEGEN_OPTIONS = [
  { value: "", label: "Bitte wählen…" },
  { value: "Finanzbuchhaltung", label: "Finanzbuchhaltung" },
  { value: "Lohn & Gehalt", label: "Lohn & Gehalt" },
  { value: "Jahresabschluss & Steuererklärung", label: "Jahresabschluss & Steuererklärung" },
  { value: "Gründung", label: "Gründung" },
  { value: "Steuergestaltung & Beratung", label: "Steuergestaltung & Beratung" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Immobilien/Vermietung", label: "Immobilien/Vermietung" },
  { value: "Sonstiges", label: "Sonstiges" },
];

const initialState: ContactFormState = { success: false };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  // React leert ein Formular mit action nach jedem Aufruf. Der Handler verhindert
  // das, damit Eingaben bei einer Fehlermeldung erhalten bleiben.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  // Schriftgröße mindestens 16 px: Darunter zoomt iOS beim Antippen in das Feld.
  const inputClasses =
    "w-full min-h-[3.25rem] rounded-none border border-control bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted hover:border-ink";

  const labelClasses = "mb-1.5 block text-base font-medium";

  return (
    <div>
      <h2 className="mb-6 font-display text-h2">Nachricht senden</h2>

      {/* Success message */}
      {state.success && (
        <div role="alert" className="mb-6 border border-ink p-4">
          <p className="text-base font-semibold">Nachricht gesendet!</p>
          <p className="mt-1 text-base text-muted">Vielen Dank für deine Nachricht. Fabian meldet sich in Kürze bei dir.</p>
        </div>
      )}

      {/* Error message */}
      {state.error && (
        <div role="alert" className="mb-6 border border-alert p-4">
          <p className="text-base font-semibold text-alert">Fehler</p>
          <p className="mt-1 text-base text-muted">{state.error}</p>
        </div>
      )}

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Fangfeld für Bots: für Menschen unsichtbar und nicht per Tab erreichbar. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            maxLength={120}
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className={inputClasses}
          />
        </div>

        {/* Email + Phone row */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-[var(--col-gap)]">
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              E-Mail <span className="text-alert">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              maxLength={254}
              required
              autoComplete="email"
              inputMode="email"
              placeholder="max@beispiel.de"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClasses}>
              Telefon <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              maxLength={40}
              autoComplete="tel"
              placeholder="+49 123 456789"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Subject dropdown */}
        <div>
          <label htmlFor="contact-subject" className={labelClasses}>
            Anliegen <span className="text-alert">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            className={`${inputClasses} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23f3f2ee%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 [&>option]:bg-bg`}
          >
            {ANLIEGEN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Nachricht <span className="text-alert">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={5000}
            required
            rows={5}
            placeholder="Wie können wir dir helfen?"
            className={`${inputClasses} block min-h-[8rem] resize-y`}
          />
        </div>

        {/* Privacy checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="contact-privacy"
            name="privacy"
            value="accepted"
            required
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-ink"
          />
          <label htmlFor="contact-privacy" className="cursor-pointer text-base leading-snug text-muted">
            Ich habe die{" "}
            <a href="/datenschutz" className="inline-link text-ink">
              Datenschutzerklärung
            </a>{" "}
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.{" "}
            <span className="text-alert">*</span>
          </label>
        </div>

        {/* Submit */}
        <button type="submit" disabled={isPending} className="btn w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {isPending ? "Wird gesendet…" : "Nachricht senden"}
        </button>
      </form>
    </div>
  );
}
