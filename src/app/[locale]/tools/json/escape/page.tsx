import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { getDict, localePrefix } from "@/application/i18nServer";
import { JsonEscapeClient } from "./JsonEscapeClient";

type Params = { locale?: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  return {
    title: dict["tools.json.escape.meta.title"],
    description: dict["tools.json.escape.meta.description"],
    alternates: { canonical: `${p}/tools/json/escape` },
    openGraph: {
      type: "website",
      url: `${SITE.url}${p}/tools/json/escape`,
      title: dict["tools.json.escape.meta.ogTitle"],
      description: dict["tools.json.escape.meta.description"],
      siteName: "Respawn Tech",
      images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.json.escape.meta.ogTitle"],
      description: dict["tools.json.escape.meta.description"],
      images: [`${SITE.url}/og.svg`]
    }
  };
}

export default function JsonEscapePage({ params }: { params: Params }) {
  return <JsonEscapeClient />;
}
