import type { Metadata } from "next";
import { JsonCsvClient } from "./JsonCsvClient";

export const metadata: Metadata = {
  title: "JSON ↔ CSV",
  description: "Converta JSON para CSV e CSV simples para JSON.",
  alternates: { canonical: "/tools/json-csv" }
};

export default function JsonCsvPage() {
  return <JsonCsvClient />;
}
