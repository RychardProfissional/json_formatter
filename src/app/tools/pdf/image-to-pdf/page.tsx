import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { getDict, localeQuery } from "@/application/i18nServer";
import { ImageToPdfClient } from "./ImageToPdfClient";

type Params = { locale?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return {
    title: dict["tools.pdf.imageToPdf.meta.title"],
    description: dict["tools.pdf.imageToPdf.meta.description"],
    alternates: { canonical: `/tools/pdf/image-to-pdf${qs}` },
    openGraph: {
      type: "website",
      title: dict["tools.pdf.imageToPdf.meta.ogTitle"],
      description: dict["tools.pdf.imageToPdf.meta.description"],
      url: `${SITE.url}/tools/pdf/image-to-pdf${qs}`,
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.pdf.imageToPdf.meta.ogTitle"],
      description: dict["tools.pdf.imageToPdf.meta.description"],
      images: ["/og.svg"]
    }
  };
}

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
