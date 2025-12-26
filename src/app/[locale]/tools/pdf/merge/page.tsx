import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { getDict, localePrefix } from "@/application/i18nServer";
import { PdfMergeClient } from "./PdfMergeClient";

type Params = { locale?: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  return {
    title: dict["tools.pdf.merge.meta.title"],
    description: dict["tools.pdf.merge.meta.description"],
    alternates: { canonical: `${p}/tools/pdf/merge` },
    openGraph: {
      type: "website",
      title: dict["tools.pdf.merge.meta.ogTitle"],
      description: dict["tools.pdf.merge.meta.description"],
      url: `${SITE.url}${p}/tools/pdf/merge`,
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.pdf.merge.meta.ogTitle"],
      description: dict["tools.pdf.merge.meta.description"],
      images: ["/og.svg"]
    }
  };
}

export default function PdfMergePage() {
  return <PdfMergeClient />;
}
