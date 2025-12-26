import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { JsonFormatterClient } from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "Formatador de JSON | Respawn Tech",
  description: "Formate, valide e compacte JSON online no navegador — rápido e sem instalar nada.",
  alternates: { canonical: `${SITE.url}/tools/json/formatter` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json/formatter`,
    title: "Formatador de JSON | Respawn Tech",
    description: "Formate, valide e compacte JSON online no navegador — rápido e sem instalar nada.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Formatador de JSON | Respawn Tech",
    description: "Formate, valide e compacte JSON online no navegador — rápido e sem instalar nada.",
    images: [`${SITE.url}/og.svg`]
  }
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
