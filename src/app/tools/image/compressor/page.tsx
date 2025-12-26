import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";
import { PT_BR } from "@/languages/pt-br";
import { ImageCompressor } from "./components/ImageCompressor";

export const metadata: Metadata = {
  title: PT_BR["tools.image.compressor.page.meta.title"],
  description: PT_BR["tools.image.compressor.page.meta.description"],
  alternates: { canonical: `${SITE.url}/tools/image/compressor` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/image/compressor`,
    title: PT_BR["tools.image.compressor.page.meta.title"],
    description: PT_BR["tools.image.compressor.page.meta.description"],
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["tools.image.compressor.page.meta.title"],
    description: PT_BR["tools.image.compressor.page.meta.description"],
    images: [`${SITE.url}/og.svg`]
  }
};

export default function ImageCompressorPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{PT_BR["tools.image.compressor.page.h1"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {PT_BR["tools.image.compressor.page.lead"]}
      </p>

      <AdSlot
        slot={SITE.adsenseSlots.toolsExtra3}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <ImageCompressor />
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-bold">{PT_BR["tools.image.compressor.page.faq.title"]}</h2>

        <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{PT_BR["tools.image.compressor.page.faq.q1"]}</h3>
            <p className="mt-1">{PT_BR["tools.image.compressor.page.faq.a1"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{PT_BR["tools.image.compressor.page.faq.q2"]}</h3>
            <p className="mt-1">{PT_BR["tools.image.compressor.page.faq.a2"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{PT_BR["tools.image.compressor.page.faq.q3"]}</h3>
            <p className="mt-1">{PT_BR["tools.image.compressor.page.faq.a3"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{PT_BR["tools.image.compressor.page.faq.q4"]}</h3>
            <p className="mt-1">{PT_BR["tools.image.compressor.page.faq.a4"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{PT_BR["tools.image.compressor.page.faq.q5"]}</h3>
            <p className="mt-1">{PT_BR["tools.image.compressor.page.faq.a5"]}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{PT_BR["tools.image.compressor.page.faq.q6"]}</h3>
            <p className="mt-1">{PT_BR["tools.image.compressor.page.faq.a6"]}</p>
          </div>
        </div>
      </section>

      <AdSlot
        slot={SITE.adsenseSlots.toolsExtra4}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">{PT_BR["common.privacyTitle"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {PT_BR["tools.image.compressor.page.privacy.before"]}{" "}
          <a className="font-semibold" href="/politica-de-privacidade">
            {PT_BR["common.privacyPolicy"]}
          </a>
          {PT_BR["tools.image.compressor.page.privacy.after"]}
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {PT_BR["tools.image.compressor.page.moreTools.before"]}
        <a href="/tools">{PT_BR["tools.image.compressor.page.moreTools.link"]}</a>
        {PT_BR["tools.image.compressor.page.moreTools.after"]}
      </p>
    </main>
  );
}
