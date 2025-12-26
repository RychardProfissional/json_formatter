import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";
import { getDict, localePrefix } from "@/application/i18nServer";

type Params = { locale?: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  return {
    title: dict["tools.pdf.index.meta.title"],
    description: dict["tools.pdf.index.meta.description"],
    alternates: { canonical: `${p}/tools/pdf` },
    openGraph: {
      type: "website",
      title: dict["tools.pdf.index.meta.ogTitle"],
      description: dict["tools.pdf.index.meta.description"],
      url: `${SITE.url}${p}/tools/pdf`,
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.pdf.index.meta.ogTitle"],
      description: dict["tools.pdf.index.meta.description"],
      images: ["/og.svg"]
    }
  };
}

export default function PdfToolsIndexPage({ params }: { params: Params }) {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  const tools = [
    {
      href: `${p}/tools/pdf/image-to-pdf`,
      name: dict["tools.pdf.imageToPdf.title"],
      desc: dict["tools.pdf.index.cards.imageToPdf.desc"]
    },
    {
      href: `${p}/tools/pdf/merge`,
      name: dict["tools.pdf.merge.title"],
      desc: dict["tools.pdf.index.cards.merge.desc"]
    }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["tools.pdf.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["tools.pdf.index.subtitle"]}</p>

      <AdSlot
        slot={SITE.adsenseSlots.toolsIndex}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
          >
            <h2 className="text-lg font-bold">{t.name}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {dict["tools.pdf.index.backTools.before"]}
        <Link className="font-semibold" href={`${p}/tools`}>
          {dict["tools.pdf.index.backTools.link"]}
        </Link>
        {dict["tools.pdf.index.backTools.after"]}
      </p>
    </main>
  );
}
