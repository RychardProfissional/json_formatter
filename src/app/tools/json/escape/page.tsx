import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { PT_BR } from "@/languages/pt-br";
import { JsonEscapeClient } from "./JsonEscapeClient";

export const metadata: Metadata = {
  title: PT_BR["tools.json.escape.meta.title"],
  description: PT_BR["tools.json.escape.meta.description"],
  alternates: { canonical: `${SITE.url}/tools/json/escape` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json/escape`,
    title: PT_BR["tools.json.escape.meta.ogTitle"],
    description: PT_BR["tools.json.escape.meta.description"],
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["tools.json.escape.meta.ogTitle"],
    description: PT_BR["tools.json.escape.meta.description"],
    images: [`${SITE.url}/og.svg`]
  }
};

export default function JsonEscapePage() {
  return <JsonEscapeClient />;
}
