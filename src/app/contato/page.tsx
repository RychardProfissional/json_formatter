import type { Metadata } from "next";
import { ContatoClient } from "./ContatoClient";

export const metadata: Metadata = {
  title: "Contato",
  alternates: { canonical: "/contato" }
};

export default function ContatoPage() {
  return (
    <ContatoClient />
  );
}
