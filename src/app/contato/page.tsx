import type { Metadata } from "next";
import { ContatoClient } from "./ContatoClient";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Respawn Tech: dúvidas, sugestões de ferramentas, bugs e parcerias.",
  alternates: { canonical: "/contato" },
  openGraph: {
    type: "website",
    title: "Contato | Respawn Tech",
    description: "Fale com a Respawn Tech: dúvidas, sugestões de ferramentas, bugs e parcerias.",
    url: "https://respawntech.dev/contato",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | Respawn Tech",
    description: "Fale com a Respawn Tech: dúvidas, sugestões de ferramentas, bugs e parcerias.",
    images: ["/og.svg"]
  }
};

export default function ContatoPage() {
  return (
    <ContatoClient />
  );
}
