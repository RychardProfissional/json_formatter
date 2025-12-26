import type { Metadata } from "next";
import { JsonFormatterClient } from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "Formatador de JSON",
  description: "Formatar, validar e compactar JSON online.",
  alternates: { canonical: "/tools/json-formatter" }
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
