import type { Metadata } from "next";
import Link from "next/link";
import { getDict, localeQuery } from "@/application/i18nServer";

type Params = { locale?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = (await searchParams)?.lang
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return {
    title: dict["termsPage.meta.title"],
    description: dict["termsPage.meta.description"],
    alternates: { canonical: `/termos-de-uso${qs}` },
    openGraph: {
      type: "website",
      title: dict["termsPage.meta.ogTitle"],
      description: dict["termsPage.meta.description"],
      url: `https://respawntech.dev/termos-de-uso${qs}`,
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["termsPage.meta.ogTitle"],
      description: dict["termsPage.meta.description"],
      images: ["/og.svg"]
    }
  };
}

export default async function TermosDeUsoPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = (await searchParams)?.lang
  const dict = getDict(lang);
  const qs = localeQuery(lang);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["termsPage.h1"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["termsPage.subtitle"]}</p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: dict["termsPage.sections.1.title"],
            body: dict["termsPage.sections.1.body"]
          },
          {
            title: dict["termsPage.sections.2.title"],
            body: dict["termsPage.sections.2.body"]
          },
          {
            title: dict["termsPage.sections.3.title"],
            body: dict["termsPage.sections.3.body"]
          },
          {
            title: dict["termsPage.sections.4.title"],
            body: dict["termsPage.sections.4.body"]
          },
          {
            title: dict["termsPage.sections.5.title"],
            body: dict["termsPage.sections.5.body"],
            link: { href: `/contato${qs}`, label: dict["termsPage.sections.5.linkLabel"] }
          }
        ].map((s) => (
          <section
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <h2 className="text-lg font-bold">{s.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{s.body}</p>
            {s.link ? (
              <p className="mt-2">
                <Link href={s.link.href} className="font-semibold">
                  {s.link.label}
                </Link>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
