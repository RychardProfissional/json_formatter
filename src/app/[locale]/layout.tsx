import type React from "react";
import { notFound } from "next/navigation";

type Params = { locale?: string };

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Params;
}) {
  if (params.locale && params.locale !== "en") notFound();
  return children;
}
