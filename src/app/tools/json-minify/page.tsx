import type { Metadata } from "next";
import { JsonMinifyClient } from "./JsonMinifyClient";

export const metadata: Metadata = {
  title: "JSON Minify",
  description: "Compacte JSON removendo espaços e quebras de linha.",
  alternates: { canonical: "/tools/json-minify" }
};

export default function JsonMinifyPage() {
  return <JsonMinifyClient />;
}
