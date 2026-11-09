import { NextResponse, type NextRequest } from "next/server";

/* Nur für die Staging-Umgebung: Ist STAGING_BASIC_AUTH gesetzt (Form „benutzer:passwort“), fragt der Browser
   nach Zugangsdaten, und Suchmaschinen bekommen noindex. Ohne die Variable läuft jede Anfrage normal durch. */

/* Bilddateien laufen ohne Abfrage durch. Der Bildoptimierer von Next lädt sie intern ohne Zugangsdaten nach
   und würde sonst an der Abfrage scheitern. Auf der Live-Seite sind sie ohnehin öffentlich. */
const bilddatei = /\.(?:jpe?g|png|webp|avif|gif|svg|ico)$/i;

function zugangsdaten(header: string | null): string | null {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const bytes = Uint8Array.from(atob(header.slice(6)), (zeichen) => zeichen.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const zugang = process.env.STAGING_BASIC_AUTH;
  if (!zugang) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (bilddatei.test(pathname) || pathname.startsWith("/api/media/file/")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (zugangsdaten(request.headers.get("authorization")) === zugang) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return new NextResponse("Zugang nur für Berechtigte.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Tepel Staging", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
