import type { Metadata } from "next";
import { JsonFormatterClient } from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "Formatador de JSON",
  description: "Formatar, validar e compactar JSON online.",
  alternates: { canonical: "/tools/json-formatter" },
  openGraph: {
    type: "website",
    title: "Formatador de JSON | Respawn Tech",
    description: "Formate, valide e compacte JSON online no navegador — rápido e sem instalar nada.",
    url: "https://respawntech.dev/tools/json-formatter",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Formatador de JSON | Respawn Tech",
    description: "Formate, valide e compacte JSON online no navegador — rápido e sem instalar nada.",
    images: ["/og.svg"]
  }
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
