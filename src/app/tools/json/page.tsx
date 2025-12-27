import type { Metadata } from "next";
import Link from "next/link";
import { getDict, localeQuery } from "@/application/i18nServer";
import { SITE } from "@/application/siteConfig";

type Params = { locale?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return {
    title: dict["tools.json.index.meta.title"],
    description: dict["tools.json.index.meta.description"],
    alternates: { canonical: `/tools/json${qs}` },
    openGraph: {
      type: "website",
      url: `${SITE.url}/tools/json${qs}`,
      title: dict["tools.json.index.meta.title"],
      description: dict["tools.json.index.meta.description"],
      siteName: "Respawn Tech",
      images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.json.index.meta.title"],
      description: dict["tools.json.index.meta.description"],
      images: [`${SITE.url}/og.svg`]
    }
  };
}

export default async function ToolsJsonPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  const tools = [
    { href: `/tools/json/formatter${qs}`, name: dict["tools.json.formatter.title"], desc: dict["tools.json.index.cards.formatter.desc"] },
    { href: `/tools/json/validator${qs}`, name: dict["tools.json.validator.title"], desc: dict["tools.json.index.cards.validator.desc"] },
    { href: `/tools/json/minify${qs}`, name: dict["tools.json.minify.title"], desc: dict["tools.json.index.cards.minify.desc"] },
    { href: `/tools/json/escape${qs}`, name: dict["tools.json.escape.title"], desc: dict["tools.json.index.cards.escape.desc"] },
    { href: `/tools/json/csv${qs}`, name: dict["tools.json.csv.title"], desc: dict["tools.json.index.cards.csv.desc"] },
    { href: `/tools/json/jsonl-prettify${qs}`, name: dict["tools.json.jsonl.title"], desc: dict["tools.json.index.cards.jsonl.desc"] }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["tools.json.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {dict["tools.json.index.subtitle"]}
      </p>

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
        {dict["tools.json.index.backTo.before"]}
        <Link className="font-semibold" href={`/tools${qs}`}>{dict["tools.json.index.backTo.link"]}</Link>
        {dict["tools.json.index.backTo.after"]}
      </p>
    </main>
  );
}
