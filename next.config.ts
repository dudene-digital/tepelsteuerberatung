import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  experimental: {
    // Website und Redaktionsoberfläche haben je ein eigenes Root-Layout. Für Adressen, die es nicht gibt,
    // braucht es deshalb eine 404-Seite außerhalb beider Layouts (src/app/global-not-found.tsx).
    globalNotFound: true,
  },
};

export default withPayload(nextConfig);
