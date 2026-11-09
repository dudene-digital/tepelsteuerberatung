import { NextResponse, type NextRequest } from "next/server";

/* Nur für die Staging-Umgebung: Ist STAGING_BASIC_AUTH gesetzt (Form „benutzer:passwort“), fragt der Browser
   nach Zugangsdaten, und Suchmaschinen bekommen noindex. Ohne die Variable läuft jede Anfrage normal durch. */
export function proxy(request: NextRequest) {
  const zugang = process.env.STAGING_BASIC_AUTH;
  if (!zugang) return NextResponse.next();

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ") && atob(header.slice(6)) === zugang) {
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
