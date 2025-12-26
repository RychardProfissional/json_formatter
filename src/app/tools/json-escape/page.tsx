import type { Metadata } from "next";
import { JsonEscapeClient } from "./JsonEscapeClient";

export const metadata: Metadata = {
  title: "Escape / Unescape",
  description: "Escape e unescape de strings para uso em JSON.",
  alternates: { canonical: "/tools/json-escape" }
};

export default function JsonEscapePage() {
  return <JsonEscapeClient />;
}
