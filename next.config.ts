import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Kein „X-Powered-By“, auch nicht der Zusatz, den withPayload sonst setzt.
  poweredByHeader: false,
  experimental: {
    // Website und Redaktionsoberfläche haben je ein eigenes Root-Layout. Für Adressen, die es nicht gibt,
    // braucht es deshalb eine 404-Seite außerhalb beider Layouts (src/app/global-not-found.tsx).
    globalNotFound: true,
  },
};

const config = withPayload(nextConfig);

/* withPayload hängt Client-Hints-Header (Accept-CH, Critical-CH) an jede Seite. Die braucht nur die Redaktion;
   auf der Website ließen sie Chrome den ersten Aufruf wiederholen. */
const payloadHeaders = config.headers;
config.headers = async () =>
  (payloadHeaders ? await payloadHeaders() : []).map((regel) =>
    regel.source === "/:path*" ? { ...regel, source: "/admin/:path*" } : regel,
  );

export default config;
