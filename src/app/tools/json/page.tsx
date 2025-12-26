import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { PT_BR } from "@/languages/pt-br";

export const metadata: Metadata = {
  title: PT_BR["tools.json.index.meta.title"],
  description: PT_BR["tools.json.index.meta.description"],
  alternates: { canonical: `${SITE.url}/tools/json` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json`,
    title: PT_BR["tools.json.index.meta.title"],
    description: PT_BR["tools.json.index.meta.description"],
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["tools.json.index.meta.title"],
    description: PT_BR["tools.json.index.meta.description"],
    images: [`${SITE.url}/og.svg`]
  }
};

export default function ToolsJsonPage() {
  const tools = [
    { href: "/tools/json/formatter", name: PT_BR["tools.json.formatter.title"], desc: PT_BR["tools.json.index.cards.formatter.desc"] },
    { href: "/tools/json/validator", name: PT_BR["tools.json.validator.title"], desc: PT_BR["tools.json.index.cards.validator.desc"] },
    { href: "/tools/json/minify", name: PT_BR["tools.json.minify.title"], desc: PT_BR["tools.json.index.cards.minify.desc"] },
    { href: "/tools/json/escape", name: PT_BR["tools.json.escape.title"], desc: PT_BR["tools.json.index.cards.escape.desc"] },
    { href: "/tools/json/csv", name: PT_BR["tools.json.csv.title"], desc: PT_BR["tools.json.index.cards.csv.desc"] },
    { href: "/tools/json/jsonl-prettify", name: PT_BR["tools.json.jsonl.title"], desc: PT_BR["tools.json.index.cards.jsonl.desc"] }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{PT_BR["tools.json.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {PT_BR["tools.json.index.subtitle"]}
      </p>

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
        {PT_BR["tools.json.index.backTo.before"]}
        <a href="/tools">{PT_BR["tools.json.index.backTo.link"]}</a>
        {PT_BR["tools.json.index.backTo.after"]}
      </p>
    </main>
  );
}
