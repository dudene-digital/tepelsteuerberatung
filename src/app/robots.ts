import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Google wendet die längste passende Regel an: CMS-Bilder bleiben erreichbar, der Rest von /api nicht.
        allow: ["/", "/api/media/file/"],
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: "https://tepel-steuerberatung.de/sitemap.xml",
  };
}
