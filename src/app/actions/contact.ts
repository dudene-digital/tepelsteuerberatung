"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || "–";
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  try {
    // 1. Notification email to Fabian (MUST succeed)
    const notificationResult = await resend.emails.send({
      from: "Kontaktformular <no-reply@tepel-steuerberatung.de>",
      to: "fabian@tepel-steuerberatung.de",
      replyTo: email,
      subject: `Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 32px 40px;">
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
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #0891b2; text-decoration: none;">${escapeHtml(email)}</a></td>
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
    console.log("Notification email sent:", JSON.stringify(notificationResult));

    // 2. Confirmation email to sender (fire-and-forget, must not block success)
    resend.emails.send({
      from: "Fabian Tepel Steuerberatung <no-reply@tepel-steuerberatung.de>",
      to: email,
      replyTo: "fabian@tepel-steuerberatung.de",
      subject: "Deine Anfrage bei Tepel Steuerberatung",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 32px 40px;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700;">Vielen Dank für deine Nachricht!</h1>
          </div>
          <div style="padding: 32px 40px;">
            <p style="color: #1e293b; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Hallo ${escapeHtml(name)},
            </p>
            <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              deine Anfrage ist bei mir eingegangen. Ich melde mich in der Regel innerhalb von 24 Stunden bei dir.
            </p>
            <div style="background: #f1f5f9; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
              <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Dein Anliegen</p>
              <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 16px;">${escapeHtml(subject)}</p>
              <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Deine Nachricht</p>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
            </div>
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
              Tepel Steuerberatung · Gottfried-Kinkel-Straße 21 · 65187 Wiesbaden<br/>
              <a href="https://tepel-steuerberatung.de" style="color: #0891b2; text-decoration: none;">tepel-steuerberatung.de</a> · <a href="mailto:fabian@tepel-steuerberatung.de" style="color: #0891b2; text-decoration: none;">fabian@tepel-steuerberatung.de</a>
            </p>
          </div>
        </div>
      `,
    }).then((result) => {
      console.log("Confirmation email sent:", JSON.stringify(result));
    }).catch((err) => {
      console.error("Confirmation email failed (non-blocking):", err);
    });

    return { success: true };
  } catch (error) {
    console.error("Resend notification error:", error);
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
