import type { Metadata } from "next";
import { JsonlPrettifyClient } from "./JsonlPrettifyClient";

export const metadata: Metadata = {
  title: "Prettify JSONL",
  description: "Transforme JSON Lines (um JSON por linha) em blocos legíveis.",
  alternates: { canonical: "/tools/jsonl-prettify" }
};

export default function JsonlPrettifyPage() {
  return <JsonlPrettifyClient />;
}
