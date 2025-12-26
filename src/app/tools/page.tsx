import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";
import { PT_BR } from "@/languages/pt-br";

export const metadata: Metadata = {
  title: PT_BR["tools.index.meta.title"],
  description: PT_BR["tools.index.meta.description"],
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    title: `${PT_BR["tools.index.meta.title"]} | Respawn Tech`,
    description: PT_BR["tools.index.meta.description"],
    url: "https://respawntech.dev/tools",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: `${PT_BR["tools.index.meta.title"]} | Respawn Tech`,
    description: PT_BR["tools.index.meta.description"],
    images: ["/og.svg"]
  }
};

export default function ToolsIndexPage() {
  // Ad slots are optional; configure in SITE.adsenseSlots.
  const tools = [
    { href: "/tools/json/formatter", name: PT_BR["tools.json.formatter.title"], desc: PT_BR["tools.json.index.cards.formatter.desc"] },
    { href: "/tools/json/validator", name: PT_BR["tools.json.validator.title"], desc: PT_BR["tools.json.index.cards.validator.desc"] },
    { href: "/tools/json/minify", name: PT_BR["tools.json.minify.title"], desc: PT_BR["tools.json.index.cards.minify.desc"] },
    { href: "/tools/json/escape", name: PT_BR["tools.json.escape.title"], desc: PT_BR["tools.json.index.cards.escape.desc"] },
    { href: "/tools/json/csv", name: PT_BR["tools.json.csv.title"], desc: PT_BR["tools.json.index.cards.csv.desc"] },
    { href: "/tools/json/jsonl-prettify", name: PT_BR["tools.json.jsonl.title"], desc: PT_BR["tools.json.index.cards.jsonl.desc"] },
    { href: "/tools/image/compressor", name: PT_BR["tools.image.index.cards.compressor.title"], desc: PT_BR["tools.image.index.cards.compressor.desc"] },
    { href: "/tools/pdf", name: PT_BR["tools.index.cards.pdf.title"], desc: PT_BR["tools.index.cards.pdf.desc"] }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{PT_BR["tools.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{PT_BR["tools.index.subtitle"]}</p>

      <div className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
        <p>{PT_BR["tools.index.intro.p1"]}</p>
        <p>
          {PT_BR["tools.index.intro.p2.before"]}
          <Link className="font-semibold" href="/tools/json/formatter">
            {PT_BR["tools.index.intro.p2.link1"]}
          </Link>
          {PT_BR["tools.index.intro.p2.between"]}
          <Link className="font-semibold" href="/tools/json/validator">
            {PT_BR["tools.index.intro.p2.link2"]}
          </Link>
          {PT_BR["tools.index.intro.p2.after"]}
        </p>
      </div>

      {/* Client component subtree */}
      <ToolsIndexAd />

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

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">{PT_BR["common.privacyTitle"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {PT_BR["tools.index.privacy.before"]}
          <Link className="font-semibold" href="/politica-de-privacidade">
            {PT_BR["common.privacyPolicy"]}
          </Link>
          {PT_BR["tools.index.privacy.after"]}
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {PT_BR["tools.index.backHome.before"]}
        <Link className="font-semibold" href="/">{PT_BR["tools.index.backHome.link"]}</Link>
        {PT_BR["tools.index.backHome.after"]}
      </p>
    </main>
  );
}

function ToolsIndexAd() {
  return (
    <AdSlot
      slot={SITE.adsenseSlots.toolsIndex}
      className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      minHeight={250}
    />
  );
}
