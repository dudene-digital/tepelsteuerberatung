"use client";

import { useActionState, useRef, useEffect } from "react";
import { sendContactEmail, type ContactFormState } from "@/app/actions/contact";

const ANLIEGEN_OPTIONS = [
  { value: "", label: "Bitte wählen…" },
  { value: "Gründungsberatung", label: "Gründungsberatung" },
  { value: "Finanzbuchhaltung", label: "Finanzbuchhaltung" },
  { value: "Lohn & Gehalt", label: "Lohn & Gehalt" },
  { value: "Jahresabschluss & Steuererklärung", label: "Jahresabschluss & Steuererklärung" },
  { value: "Strategische Beratung", label: "Strategische Beratung" },
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
  }, [state.success]);

  const inputClasses =
    "w-full bg-surface-container/80 border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface font-body text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all";

  const labelClasses =
    "block font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-2";

  return (
    <div>
      <h3 className="font-headline text-4xl font-bold mb-8 text-primary">
        Nachricht senden
      </h3>

      {/* Success message */}
      {state.success && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-tertiary/10 border border-tertiary/30 flex items-start gap-3"
        >
          <span
            className="material-symbols-outlined text-tertiary mt-0.5"
            data-icon="check_circle"
            aria-hidden="true"
          >
            check_circle
          </span>
          <div>
            <p className="font-headline font-bold text-sm text-tertiary">
              Nachricht gesendet!
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              Vielen Dank für deine Nachricht. Fabian meldet sich in Kürze bei dir.
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {state.error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-error/10 border border-error/30 flex items-start gap-3"
        >
          <span
            className="material-symbols-outlined text-error mt-0.5"
            data-icon="error"
            aria-hidden="true"
          >
            error
          </span>
          <div>
            <p className="font-headline font-bold text-sm text-error">
              Fehler
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              {state.error}
            </p>
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className={inputClasses}
          />
        </div>

        {/* Email + Phone row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              E-Mail <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              autoComplete="email"
              placeholder="max@beispiel.de"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClasses}>
              Telefon <span className="text-on-surface-variant/40">(optional)</span>
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              autoComplete="tel"
              placeholder="+49 123 456789"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Subject dropdown */}
        <div>
          <label htmlFor="contact-subject" className={labelClasses}>
            Anliegen <span className="text-error">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23859399%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:20px] pr-10`}
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
            Nachricht <span className="text-error">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Wie kann Fabian dir helfen?"
            className={`${inputClasses} resize-y min-h-[120px]`}
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
            className="mt-1 w-4 h-4 rounded border-outline-variant/30 bg-surface-container text-primary focus:ring-primary/50 accent-primary cursor-pointer"
          />
          <label
            htmlFor="contact-privacy"
            className="text-xs text-on-surface-variant leading-relaxed cursor-pointer"
          >
            Ich habe die{" "}
            <a
              href="/datenschutz"
              className="text-primary underline underline-offset-2 hover:text-primary-container transition-colors"
            >
              Datenschutzerklärung
            </a>{" "}
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.{" "}
            <span className="text-error">*</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full hero-gradient text-on-primary-container px-8 py-4 rounded-xl font-headline font-bold text-lg hover:shadow-[0_0_30px_rgba(0,210,255,0.2)] hover:scale-[1.02] transition-all flex justify-center items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-on-primary-container/30 border-t-on-primary-container rounded-full animate-spin" />
              Wird gesendet…
            </>
          ) : (
            <>
              Nachricht senden
              <span
                className="material-symbols-outlined"
                data-icon="send"
                aria-hidden="true"
              >
                send
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
