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
    title: dict["tools.image.index.meta.title"],
    description: dict["tools.image.index.meta.description"],
    alternates: { canonical: `/tools/image${qs}` },
    openGraph: {
      type: "website",
      url: `${SITE.url}/tools/image${qs}`,
      title: dict["tools.image.index.meta.title"],
      description: dict["tools.image.index.meta.description"],
      siteName: "Respawn Tech",
      images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["tools.image.index.meta.title"],
      description: dict["tools.image.index.meta.description"],
      images: [`${SITE.url}/og.svg`]
    }
  };
}

export default async function ToolsImagePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams;
  const lang = sp?.lang;
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  const tools = [
    { href: `/tools/image/compressor${qs}`, name: dict["tools.image.index.cards.compressor.title"], desc: dict["tools.image.index.cards.compressor.desc"] }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["tools.image.index.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["tools.image.index.subtitle"]}</p>

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
        {dict["tools.image.index.backTo.before"]}
        <Link className="font-semibold" href={`/tools${qs}`}>{dict["tools.image.index.backTo.link"]}</Link>
        {dict["tools.image.index.backTo.after"]}
      </p>
    </main>
  );
}
