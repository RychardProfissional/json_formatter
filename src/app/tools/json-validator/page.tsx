import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { JsonValidatorClient } from "./JsonValidatorClient";

export const metadata: Metadata = {
  title: "Validador JSON (online e grátis) | Respawn Tech",
  description: "Valide JSON online, encontre erros de sintaxe e corrija rapidamente com dicas práticas.",
  alternates: { canonical: `${SITE.url}/tools/json-validator` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json-validator`,
    title: "Validador JSON (online e grátis)",
    description: "Valide JSON online, encontre erros de sintaxe e corrija rapidamente com dicas práticas.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Validador JSON (online e grátis)",
    description: "Valide JSON online, encontre erros de sintaxe e corrija rapidamente com dicas práticas.",
    images: [`${SITE.url}/og.svg`],
  },
};

export default function JsonValidatorPage() {
  return <JsonValidatorClient />;
}
