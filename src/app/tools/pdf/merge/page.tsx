import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { getDict, localeQuery } from "@/application/i18nServer";
import { PdfMergeClient } from "./PdfMergeClient";

type Params = { locale?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return {
    title: dict["tools.pdf.merge.meta.title"],
    description: dict["tools.pdf.merge.meta.description"],
    alternates: { canonical: `/tools/pdf/merge${qs}` },
    openGraph: {
      type: "website",
      title: dict["tools.pdf.merge.meta.ogTitle"],
      description: dict["tools.pdf.merge.meta.description"],
      url: `${SITE.url}/tools/pdf/merge${qs}`,
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
