import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { getDict, localePrefix } from "@/application/i18nServer";
import { ImageToPdfClient } from "./ImageToPdfClient";

type Params = { locale?: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  return {
    title: dict["tools.pdf.imageToPdf.meta.title"],
    description: dict["tools.pdf.imageToPdf.meta.description"],
    alternates: { canonical: `${p}/tools/pdf/image-to-pdf` },
    openGraph: {
      type: "website",
      title: dict["tools.pdf.imageToPdf.meta.ogTitle"],
      description: dict["tools.pdf.imageToPdf.meta.description"],
      url: `${SITE.url}${p}/tools/pdf/image-to-pdf`,
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
