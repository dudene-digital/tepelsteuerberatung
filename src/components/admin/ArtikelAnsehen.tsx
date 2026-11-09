"use client";

import { Button, useLivePreviewContext } from "@payloadcms/ui";

/* Ersetzt Payloads Vorschau-Symbol in der Leiste über dem Artikel durch einen beschrifteten Knopf. Die Vorschau
   öffnet im selben Tab, so gibt es nur einen Editor. Ein Knopf statt eines Links: Payload fängt Klicks auf Links
   mit einem eigenen Dialog ab, und beim Wechsel auf die Website fragte danach noch der Browser. So fragt bei
   ungespeicherten Änderungen nur der Browser, einmal.
   Die Adresse kommt aus admin.preview in collections/Artikel.ts und enthält die ID des Artikels. Stimmt der Slug
   darin nicht mehr, leitet die Website auf den aktuellen weiter. */
export function ArtikelAnsehen() {
  const { previewURL } = useLivePreviewContext();

  // Neue Artikel haben vor dem ersten Speichern noch keine Adresse.
  if (!previewURL) return null;

  return (
    <Button buttonStyle="secondary" size="medium" margin={false} onClick={() => window.location.assign(previewURL)}>
      Ansehen
    </Button>
  );
}
