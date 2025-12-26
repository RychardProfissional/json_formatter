import type { Metadata } from "next";
import { JsonValidatorClient } from "./JsonValidatorClient";

export const metadata: Metadata = {
  title: "Validador JSON",
  description: "Verifique se um JSON é válido e veja a mensagem de erro.",
  alternates: { canonical: "/tools/json-validator" }
};

export default function JsonValidatorPage() {
  return <JsonValidatorClient />;
}
