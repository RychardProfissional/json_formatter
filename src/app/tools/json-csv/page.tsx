import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { JsonCsvClient } from "./JsonCsvClient";

export const metadata: Metadata = {
  title: "JSON ↔ CSV (converter online) | Respawn Tech",
  description: "Converta JSON para CSV e CSV simples para JSON de forma rápida. Ideal para planilhas e integrações.",
  alternates: { canonical: `${SITE.url}/tools/json-csv` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json-csv`,
    title: "JSON ↔ CSV (converter online)",
    description: "Converta JSON para CSV e CSV simples para JSON de forma rápida. Ideal para planilhas e integrações.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON ↔ CSV (converter online)",
    description: "Converta JSON para CSV e CSV simples para JSON de forma rápida. Ideal para planilhas e integrações.",
    images: [`${SITE.url}/og.svg`],
  },
};

export default function JsonCsvPage() {
  return <JsonCsvClient />;
}
