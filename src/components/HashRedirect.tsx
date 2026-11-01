"use client";

import { useEffect } from "react";

/* Anker kommen nie beim Server an, eine 301 ist dafür unmöglich.
   Dieses Skript leitet alte Links wie /#faq im Browser auf die neuen Seiten. */
const targets: Record<string, string> = {
  "#services": "/leistungen",
  "#start-up": "/fuer-wen/gruender",
  "#faq": "/faq",
  "#kontakt": "/kontakt",
};

export default function HashRedirect() {
  useEffect(() => {
    const target = targets[window.location.hash];
    if (target) window.location.replace(target);
  }, []);
  return null;
}
