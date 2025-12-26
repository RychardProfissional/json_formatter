import type { Metadata } from "next";
import { ContatoClient } from "@/app/contato/ContatoClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Respawn Tech: questions, tool suggestions, bugs and partnerships.",
  alternates: { canonical: "/en/contato" },
  openGraph: {
    type: "website",
    title: "Contact | Respawn Tech",
    description: "Contact Respawn Tech: questions, tool suggestions, bugs and partnerships.",
    url: "https://respawntech.dev/en/contato",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Respawn Tech",
    description: "Contact Respawn Tech: questions, tool suggestions, bugs and partnerships.",
    images: ["/og.svg"]
  }
};

export default function EnContactPage() {
  return <ContatoClient />;
}
