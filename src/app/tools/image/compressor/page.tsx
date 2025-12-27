import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";
import { getDict, localeQuery } from "@/application/i18nServer";
import { ImageCompressor } from "./components/ImageCompressor";
import { Suspense } from "react";
import { ToolPage } from "@/ui/components/tools/ToolPage";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

type Params = { locale?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return {
    title: dict["tools.image.compressor.page.meta.title"],
    description: dict["tools.image.compressor.page.meta.description"],
    alternates: { canonical: `/tools/image/compressor${qs}` },
    openGraph: {
      type: "website",
      url: `${SITE.url}/tools/image/compressor${qs}`,
      title: dict["tools.image.compressor.page.meta.title"],
      description: dict["tools.image.compressor.page.meta.description"],
      siteName: "Respawn Tech",
      images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.image.compressor.page.meta.title"],
      description: dict["tools.image.compressor.page.meta.description"],
      images: [`${SITE.url}/og.svg`]
    }
  };
}

export default async function ImageCompressorPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return (
    <ToolPage>
      <ToolHeader
        title={dict["tools.image.compressor.page.h1"]}
        subtitle={dict["tools.image.compressor.page.lead"]}
      />

      <AdSlot
        slot={SITE.adsenseSlots.toolContentTop}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <ToolSection>
        <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />}>
          <ImageCompressor />
        </Suspense>
      </ToolSection>

      <ToolSection title={dict["tools.image.compressor.page.faq.title"]}>
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{dict["tools.image.compressor.page.faq.q1"]}</h3>
            <p className="mt-1">{dict["tools.image.compressor.page.faq.a1"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{dict["tools.image.compressor.page.faq.q2"]}</h3>
            <p className="mt-1">{dict["tools.image.compressor.page.faq.a2"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{dict["tools.image.compressor.page.faq.q3"]}</h3>
            <p className="mt-1">{dict["tools.image.compressor.page.faq.a3"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{dict["tools.image.compressor.page.faq.q4"]}</h3>
            <p className="mt-1">{dict["tools.image.compressor.page.faq.a4"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{dict["tools.image.compressor.page.faq.q5"]}</h3>
            <p className="mt-1">{dict["tools.image.compressor.page.faq.a5"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{dict["tools.image.compressor.page.faq.q6"]}</h3>
            <p className="mt-1">{dict["tools.image.compressor.page.faq.a6"]}</p>
          </div>
        </div>
      </ToolSection>

      <AdSlot
        slot={SITE.adsenseSlots.toolContentBottom}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <ToolSection>
        <h2 className="text-lg font-bold">{dict["common.privacyTitle"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {dict["tools.image.compressor.page.privacy.before"]} {" "}
            <a className="font-semibold" href={`/politica-de-privacidade${qs}`}>
            {dict["common.privacyPolicy"]}
          </a>
          {dict["tools.image.compressor.page.privacy.after"]}
        </p>
      </ToolSection>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {dict["tools.image.compressor.page.moreTools.before"]}
        <a href={`/tools${qs}`}>{dict["tools.image.compressor.page.moreTools.link"]}</a>
        {dict["tools.image.compressor.page.moreTools.after"]}
      </p>
    </ToolPage>
  );
}
