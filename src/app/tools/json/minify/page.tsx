import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { PT_BR } from "@/languages/pt-br";
import { JsonMinifyClient } from "./JsonMinifyClient";

export const metadata: Metadata = {
  title: PT_BR["tools.json.minify.meta.title"],
  description: PT_BR["tools.json.minify.meta.description"],
  alternates: { canonical: `${SITE.url}/tools/json/minify` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json/minify`,
    title: PT_BR["tools.json.minify.meta.ogTitle"],
    description: PT_BR["tools.json.minify.meta.description"],
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["tools.json.minify.meta.ogTitle"],
    description: PT_BR["tools.json.minify.meta.description"],
    images: [`${SITE.url}/og.svg`]
  }
};

export default function JsonMinifyPage() {
  return <JsonMinifyClient />;
}
