import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { JsonMinifyClient } from "./JsonMinifyClient";

export const metadata: Metadata = {
  title: "JSON Minify (compactar JSON) | Respawn Tech",
  description: "Minifique JSON online: remova espaços e quebras de linha para obter uma versão compacta e fácil de copiar.",
  alternates: { canonical: `${SITE.url}/tools/json/minify` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json/minify`,
    title: "JSON Minify (compactar JSON)",
    description: "Minifique JSON online: remova espaços e quebras de linha para obter uma versão compacta e fácil de copiar.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Minify (compactar JSON)",
    description: "Minifique JSON online: remova espaços e quebras de linha para obter uma versão compacta e fácil de copiar.",
    images: [`${SITE.url}/og.svg`]
  }
};

export default function JsonMinifyPage() {
  return <JsonMinifyClient />;
}
