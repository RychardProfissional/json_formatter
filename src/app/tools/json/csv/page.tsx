import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { getDict, localeQuery } from "@/application/i18nServer";
import { JsonCsvClient } from "./JsonCsvClient";

type Params = { locale?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return {
    title: dict["tools.json.csv.meta.title"],
    description: dict["tools.json.csv.meta.description"],
    alternates: { canonical: `/tools/json/csv${qs}` },
    openGraph: {
      type: "website",
      url: `${SITE.url}/tools/json/csv${qs}`,
      title: dict["tools.json.csv.meta.ogTitle"],
      description: dict["tools.json.csv.meta.description"],
      siteName: "Respawn Tech",
      images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.json.csv.meta.ogTitle"],
      description: dict["tools.json.csv.meta.description"],
      images: [`${SITE.url}/og.svg`]
    }
  };
}

export default function JsonCsvPage() {
  return <JsonCsvClient />;
}
