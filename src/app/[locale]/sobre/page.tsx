import type { Metadata } from "next";
import Link from "next/link";

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

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Sobre</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        A Respawn Tech é um projeto que reúne ferramentas online gratuitas para programadores, estudantes e
        empreendedores. O objetivo é reduzir atrito no dia a dia — tarefas pequenas e repetitivas devem ser resolvidas
        em segundos, sem instalação e sem criar conta.
      </p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Onde ficam as ferramentas</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          As ferramentas ficam em <Link href="/tools">/tools</Link>.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Privacidade e transparência</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          As ferramentas são pensadas para rodar no navegador. Quando houver anúncios e medição, isso é feito com
          transparência e preferência do usuário. Veja detalhes na <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Quem mantém</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          O projeto é mantido por Rychard. Saiba mais em <a href="https://rychard.vercel.app/" rel="noopener">rychard.vercel.app</a>.
        </p>
      </section>
    </main>
  );
}
