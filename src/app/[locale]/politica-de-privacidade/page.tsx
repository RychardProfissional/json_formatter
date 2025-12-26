import type { Metadata } from "next";
import Link from "next/link";
import { getDict, localePrefix } from "@/application/i18nServer";
import { SITE } from "@/application/siteConfig";

type Params = { locale?: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  return {
    title: dict["privacyPage.meta.title"],
    description: dict["privacyPage.meta.description"],
    alternates: { canonical: `${p}/politica-de-privacidade` },
    openGraph: {
      type: "website",
      title: dict["privacyPage.meta.ogTitle"],
      description: dict["privacyPage.meta.description"],
      url: `${SITE.url}${p}/politica-de-privacidade`,
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: dict["privacyPage.meta.ogTitle"],
      description: dict["privacyPage.meta.description"],
      images: ["/og.svg"]
    }
  };
}

export default function PoliticaDePrivacidadePage({ params }: { params: Params }) {
  const dict = getDict(params.locale);
  const p = localePrefix(params.locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["privacyPage.h1"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["privacyPage.subtitle"]}</p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: dict["privacyPage.sections.1.title"],
            body: dict["privacyPage.sections.1.body"]
          },
          {
            title: dict["privacyPage.sections.2.title"],
            body: dict["privacyPage.sections.2.body"]
          },
          {
            title: dict["privacyPage.sections.3.title"],
            body: dict["privacyPage.sections.3.body"]
          },
          {
            title: dict["privacyPage.sections.4.title"],
            body: dict["privacyPage.sections.4.body"]
          },
          {
            title: dict["privacyPage.sections.5.title"],
            body: dict["privacyPage.sections.5.body"]
          },
          {
            title: dict["privacyPage.sections.cookiesPrefs.title"],
            body: dict["privacyPage.sections.cookiesPrefs.body"],
            id: "preferencias"
          },
          {
            title: dict["privacyPage.sections.6.title"],
            body: dict["privacyPage.sections.6.body"]
          },
          {
            title: dict["privacyPage.sections.7.title"],
            body: dict["privacyPage.sections.7.body"],
            link: { href: `${p}/contato`, label: dict["privacyPage.sections.7.linkLabel"] }
          }
        ].map((s) => (
          <section
            key={s.title}
            id={s.id}
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

        <p className="text-sm text-slate-500 dark:text-slate-400">{dict["privacyPage.lastUpdated"]}</p>
      </div>
    </main>
  );
}
