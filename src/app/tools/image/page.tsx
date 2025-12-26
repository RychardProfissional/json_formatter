import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { PT_BR } from "@/languages/pt-br";

export const metadata: Metadata = {
  title: PT_BR["tools.image.index.meta.title"],
  description: PT_BR["tools.image.index.meta.description"],
  alternates: { canonical: `${SITE.url}/tools/image` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/image`,
    title: PT_BR["tools.image.index.meta.title"],
    description: PT_BR["tools.image.index.meta.description"],
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["tools.image.index.meta.title"],
    description: PT_BR["tools.image.index.meta.description"],
    images: [`${SITE.url}/og.svg`]
  }
};

export default function ToolsImagePage() {
  const tools = [
    { href: "/tools/image/compressor", name: PT_BR["tools.image.index.cards.compressor.title"], desc: PT_BR["tools.image.index.cards.compressor.desc"] }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{PT_BR["tools.image.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{PT_BR["tools.image.index.subtitle"]}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
          >
            <h2 className="text-lg font-bold">{t.name}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
          </a>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {PT_BR["tools.image.index.backTo.before"]}
        <a href="/tools">{PT_BR["tools.image.index.backTo.link"]}</a>
        {PT_BR["tools.image.index.backTo.after"]}
      </p>
    </main>
  );
}
