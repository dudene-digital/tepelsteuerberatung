"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

export type ContactFormState = {
  success: boolean;
  error?: string;
};

// Warn at startup if the API key is missing
if (!process.env.RESEND_API_KEY) {
  console.warn(
    "[CONTACT] ⚠️  RESEND_API_KEY is not set! All email sends will fail."
  );
}

/* Auf der passwortgeschützten Testseite gehen Anfragen echt an Fabian, im Betreff aber erkennbar als Test. */
const betreffZusatz = process.env.STAGING_BASIC_AUTH ? "[Testseite] " : "";

/* Schlichtes Limit je IP. Der Zähler liegt im Speicher, das reicht für eine einzelne Instanz. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

/* Entfernt abgelaufene Zeitstempel und IPs ohne gültige Zeitstempel. */
function purgeExpired(now: number) {
  for (const [key, times] of recentRequests) {
    const valid = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) recentRequests.delete(key);
    else if (valid.length !== times.length) recentRequests.set(key, valid);
  }
}

/* Läuft jede Minute, auch ohne neue Anfragen. Eine IP ist damit spätestens elf Minuten nach ihrer
   letzten Anfrage gelöscht, so steht es in der Datenschutzerklärung. unref hält den Prozess nicht am Leben. */
setInterval(() => purgeExpired(Date.now()), 60 * 1000).unref();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  purgeExpired(now);
  const times = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (times.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, times);
    return true;
  }
  recentRequests.set(ip, [...times, now]);
  return false;
}

function textField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Fangfeld ausgefüllt: Bot. Erfolg vortäuschen, nichts senden.
  if (textField(formData, "website")) {
    return { success: true };
  }

  const name = textField(formData, "name");
  const email = textField(formData, "email");
  const phone = textField(formData, "phone") || "–";
  const subject = textField(formData, "subject").replace(/[\r\n]+/g, " ");
  const message = textField(formData, "message").replace(/\r\n/g, "\n");
  const privacy = formData.get("privacy");

  // Server-side validation
  if (!name || !email || !subject || !message) {
    return { success: false, error: "Bitte fülle alle Pflichtfelder aus." };
  }

  if (!privacy) {
    return {
      success: false,
      error: "Bitte bestätige die Datenschutzerklärung.",
    };
  }

  if (
    name.length > 120 ||
    email.length > 254 ||
    phone.length > 40 ||
    subject.length > 80 ||
    message.length > 5000
  ) {
    return { success: false, error: "Eine deiner Eingaben ist zu lang." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  const requestHeaders = await headers();
  // Vorne in x-forwarded-for kann der Client selbst etwas eintragen, verlässlich ist nur der Proxy-Eintrag.
  const ip =
    requestHeaders.get("x-real-ip")?.trim() ||
    requestHeaders.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unbekannt";
  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Zu viele Anfragen in kurzer Zeit. Bitte versuche es später erneut oder ruf uns an.",
    };
  }

  try {
    // Hier statt auf Modulebene: Ohne Key wirft der Konstruktor, und das soll der catch-Zweig abfangen.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Notification email to Fabian (MUST succeed)
    const notificationResult = await resend.emails.send({
      from: "Kontaktformular <no-reply@tepel-steuerberatung.de>",
      to: "fabian@tepel-steuerberatung.de",
      replyTo: email,
      subject: `${betreffZusatz}Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #0c0c0b; padding: 32px 40px;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700;">Neue Kontaktanfrage</h1>
            <p style="color: rgba(255,255,255,0.85); font-size: 14px; margin: 8px 0 0;">über tepel-steuerberatung.de</p>
          </div>
          <div style="padding: 32px 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">E-Mail</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #0c0c0b; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Telefon</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">${escapeHtml(phone)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Anliegen</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;">${escapeHtml(subject)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Nachricht</td>
                <td style="padding: 12px 0; color: #1e293b; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f1f5f9; padding: 20px 40px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Diese Nachricht wurde über das Kontaktformular auf tepel-steuerberatung.de gesendet.</p>
          </div>
        </div>
      `,
    });
    if (notificationResult.error) {
      throw new Error(notificationResult.error.message);
    }
    console.log("Notification email sent:", JSON.stringify(notificationResult));

    // 2. Confirmation email to sender (fire-and-forget, must not block success)
    resend.emails.send({
      from: "Fabian Tepel Steuerberatung <no-reply@tepel-steuerberatung.de>",
      to: email,
      replyTo: "fabian@tepel-steuerberatung.de",
      subject: "Deine Anfrage bei Tepel Steuerberatung",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #0c0c0b; padding: 32px 40px;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700;">Vielen Dank für deine Nachricht!</h1>
          </div>
          <div style="padding: 32px 40px;">
            <p style="color: #1e293b; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Hallo,
            </p>
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              deine Anfrage ist bei uns eingegangen. Du bekommst an Werktagen innerhalb von 24 Stunden eine Antwort.
            </p>
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 6px;">
              Viele Grüße,
            </p>
            <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0;">
              Fabian Tepel
            </p>
            <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">
              Steuerberater · Tepel Steuerberatung
            </p>
          </div>
          <div style="background: #f1f5f9; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Tepel Steuerberatung · Gottfried-Kinkel-Straße 21 · 65187 Wiesbaden · 0611 / 15756 0<br/>
              <a href="https://tepel-steuerberatung.de" style="color: #0c0c0b; text-decoration: none;">tepel-steuerberatung.de</a> · <a href="mailto:fabian@tepel-steuerberatung.de" style="color: #0c0c0b; text-decoration: none;">fabian@tepel-steuerberatung.de</a>
            </p>
          </div>
        </div>
      `,
    }).then((result) => {
      if (result.error) {
        console.error("Confirmation email failed (non-blocking):", result.error);
        return;
      }
      console.log("Confirmation email sent:", JSON.stringify(result));
    }).catch((err) => {
      console.error("Confirmation email failed (non-blocking):", err);
    });

    return { success: true };
  } catch (error) {
    // Bewusst ohne Formularinhalte: Anfragen an eine Steuerkanzlei gehören nicht in Logs.
    console.error(
      "[CONTACT] Versand fehlgeschlagen:",
      error instanceof Error ? error.message : "Unbekannter Fehler"
    );

    return {
      success: false,
      error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt per E-Mail.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
