import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";
import { getDict, localeQuery } from "@/application/i18nServer";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  return {
    title: dict["tools.index.meta.title"],
    description: dict["tools.index.meta.description"],
    alternates: { canonical: "/tools" },
    openGraph: {
      type: "website",
      title: `${dict["tools.index.meta.title"]} | Respawn Tech`,
      description: dict["tools.index.meta.description"],
      url: "https://respawntech.dev/tools",
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict["tools.index.meta.title"]} | Respawn Tech`,
      description: dict["tools.index.meta.description"],
      images: ["/og.svg"]
    }
  };
}

export default async function ToolsIndexPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  // Ad slots are optional; configure in SITE.adsenseSlots.
  const tools = [
    { href: "/tools/json/formatter", name: dict["tools.json.formatter.title"], desc: dict["tools.json.index.cards.formatter.desc"] },
    { href: "/tools/json/validator", name: dict["tools.json.validator.title"], desc: dict["tools.json.index.cards.validator.desc"] },
    { href: "/tools/json/minify", name: dict["tools.json.minify.title"], desc: dict["tools.json.index.cards.minify.desc"] },
    { href: "/tools/json/escape", name: dict["tools.json.escape.title"], desc: dict["tools.json.index.cards.escape.desc"] },
    { href: "/tools/json/csv", name: dict["tools.json.csv.title"], desc: dict["tools.json.index.cards.csv.desc"] },
    { href: "/tools/json/jsonl-prettify", name: dict["tools.json.jsonl.title"], desc: dict["tools.json.index.cards.jsonl.desc"] },
    { href: "/tools/image/compressor", name: dict["tools.image.index.cards.compressor.title"], desc: dict["tools.image.index.cards.compressor.desc"] },
    { href: "/tools/pdf", name: dict["tools.index.cards.pdf.title"], desc: dict["tools.index.cards.pdf.desc"] }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["tools.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["tools.index.subtitle"]}</p>

      <div className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
        <p>{dict["tools.index.intro.p1"]}</p>
        <p>
          {dict["tools.index.intro.p2.before"]}
          <Link className="font-semibold" href={`/tools/json/formatter${qs}`}>
            {dict["tools.index.intro.p2.link1"]}
          </Link>
          {dict["tools.index.intro.p2.between"]}
          <Link className="font-semibold" href={`/tools/json/validator${qs}`}>
            {dict["tools.index.intro.p2.link2"]}
          </Link>
          {dict["tools.index.intro.p2.after"]}
        </p>
      </div>

      {/* Client component subtree */}
      <ToolsIndexAd />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={`${t.href}${qs}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
          >
            <h2 className="text-lg font-bold">{t.name}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">{dict["common.privacyTitle"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {dict["tools.index.privacy.before"]}
          <Link className="font-semibold" href={`/politica-de-privacidade${qs}`}>
            {dict["common.privacyPolicy"]}
          </Link>
          {dict["tools.index.privacy.after"]}
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {dict["tools.index.backHome.before"]}
        <Link className="font-semibold" href={`/${qs}`}>{dict["tools.index.backHome.link"]}</Link>
        {dict["tools.index.backHome.after"]}
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
