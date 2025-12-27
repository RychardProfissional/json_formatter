import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/application/i18nServer";
import { SupportedLocale } from "@/languages";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Respawn Tech: propósito, como as ferramentas funcionam, privacidade e quem mantém o projeto.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    type: "website",
    title: "Sobre | Respawn Tech",
    description:
      "Conheça a Respawn Tech: propósito, como as ferramentas funcionam, privacidade e quem mantém o projeto.",
    url: "https://respawntech.dev/sobre",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre | Respawn Tech",
    description:
      "Conheça a Respawn Tech: propósito, como as ferramentas funcionam, privacidade e quem mantém o projeto.",
    images: ["/og.svg"]
  }
};

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export default async function About({ searchParams }: Props) {
  const sp = await searchParams;
  const lang = (sp?.lang as SupportedLocale) || "pt-BR";
  const dict = getDict(lang);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["about.title"]}</h1>
      <div className="prose prose-slate dark:prose-invert mt-6">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {dict["home.what.p1"]}
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          {dict["home.what.p2"]}
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          {dict["home.what.p3"]}
        </p>

        <h2 className="text-lg font-bold">{dict["about.whereTools"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {dict["about.whereTools.body.before"]}
          <Link href={dict["about.whereTools.body.link"]}>{dict["about.whereTools.body.link"]}</Link>
          {dict["about.whereTools.body.after"]}
        </p>

        <h2 className="text-lg font-bold">{dict["about.privacy"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {dict["home.diff.item4"]} {dict["about.privacy.body.before"]}
          <Link href="/politica-de-privacidade">{dict["about.privacy.body.link"]}</Link>
          {dict["about.privacy.body.after"]}
        </p>

        <h2 className="text-lg font-bold">{dict["about.maintainer"]}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {dict["about.maintainer.body.before"]}
          <a href={`https://${dict["about.maintainer.body.link"]}/`} rel="noopener">
            {dict["about.maintainer.body.link"]}
          </a>
          {dict["about.maintainer.body.after"]}
        </p>
      </div>
    </main>
  );
}
