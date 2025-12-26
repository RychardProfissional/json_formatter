import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { JsonEscapeClient } from "./JsonEscapeClient";

export const metadata: Metadata = {
  title: "JSON Escape / Unescape (online) | Respawn Tech",
  description: "Escape e unescape de strings para uso em JSON (\\n, \\t, aspas) de forma rápida e segura.",
  alternates: { canonical: `${SITE.url}/tools/json-escape` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json-escape`,
    title: "JSON Escape / Unescape (online)",
    description: "Escape e unescape de strings para uso em JSON (\\n, \\t, aspas) de forma rápida e segura.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Escape / Unescape (online)",
    description: "Escape e unescape de strings para uso em JSON (\\n, \\t, aspas) de forma rápida e segura.",
    images: [`${SITE.url}/og.svg`],
  },
};

export default function JsonEscapePage() {
  return <JsonEscapeClient />;
}
