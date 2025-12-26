import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { PT_BR } from "@/languages/pt-br";
import { JsonCsvClient } from "./JsonCsvClient";

export const metadata: Metadata = {
  title: PT_BR["tools.json.csv.meta.title"],
  description: PT_BR["tools.json.csv.meta.description"],
  alternates: { canonical: `${SITE.url}/tools/json/csv` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json/csv`,
    title: PT_BR["tools.json.csv.meta.ogTitle"],
    description: PT_BR["tools.json.csv.meta.description"],
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["tools.json.csv.meta.ogTitle"],
    description: PT_BR["tools.json.csv.meta.description"],
    images: [`${SITE.url}/og.svg`]
  }
};

export default function JsonCsvPage() {
  return <JsonCsvClient />;
}
