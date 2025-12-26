import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { JsonlPrettifyClient } from "./JsonlPrettifyClient";

export const metadata: Metadata = {
  title: "Prettify JSONL (JSON Lines) | Respawn Tech",
  description: "Formate JSONL (um JSON por linha) em blocos legíveis com indentação configurável.",
  alternates: { canonical: `${SITE.url}/tools/jsonl-prettify` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/jsonl-prettify`,
    title: "Prettify JSONL (JSON Lines)",
    description: "Formate JSONL (um JSON por linha) em blocos legíveis com indentação configurável.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prettify JSONL (JSON Lines)",
    description: "Formate JSONL (um JSON por linha) em blocos legíveis com indentação configurável.",
    images: [`${SITE.url}/og.svg`],
  },
};

export default function JsonlPrettifyPage() {
  return <JsonlPrettifyClient />;
}
