import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";

export const metadata: Metadata = {
  title: "Ferramentas",
  description:
    "Ferramentas online gratuitas para formatar, validar e converter dados (JSON, CSV, JSONL) — rápidas e sem instalar nada.",
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    title: "Ferramentas | Respawn Tech",
    description:
      "Ferramentas online gratuitas para formatar, validar e converter dados (JSON, CSV, JSONL) — rápidas e sem instalar nada.",
    url: "https://respawntech.dev/tools",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferramentas | Respawn Tech",
    description:
      "Ferramentas online gratuitas para formatar, validar e converter dados (JSON, CSV, JSONL) — rápidas e sem instalar nada.",
    images: ["/og.svg"]
  }
};

export default function ToolsIndexPage() {
  // Ad slots are optional; configure in SITE.adsenseSlots.
  const tools = [
    { href: "/tools/json/formatter", name: "Formatador de JSON", desc: "Formatar, compactar e baixar JSON." },
    { href: "/tools/json/validator", name: "Validador JSON", desc: "Checar se um JSON está válido." },
    { href: "/tools/json/minify", name: "JSON Minify", desc: "Compactar JSON removendo espaços." },
    { href: "/tools/json/escape", name: "Escape / Unescape", desc: "Escapar strings para JSON e reverter." },
    { href: "/tools/json/csv", name: "JSON ↔ CSV", desc: "Converter JSON↔CSV simples." },
    { href: "/tools/json/jsonl-prettify", name: "Prettify JSONL", desc: "Embelezar JSON Lines (um JSON por linha)." },
    { href: "/tools/image/compressor", name: "Compressor de Imagens", desc: "Reduza PNG, JPG e WebP no navegador." }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Ferramentas</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Ferramentas gratuitas para resolver tarefas técnicas em segundos.
      </p>

      <div className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
        <p>
          Aqui você encontra utilitários rápidos para tarefas comuns do dia a dia: formatar e validar JSON, compactar
          payloads, escapar strings com segurança, converter JSON↔CSV e organizar JSONL (um JSON por linha). Tudo roda
          no navegador — ideal para depurar APIs, integrações e arquivos exportados.
        </p>
        <p>
          Se você está começando, recomendamos abrir o <a className="font-semibold" href="/tools/json/formatter">Formatador de JSON</a> e o{" "}
          <a className="font-semibold" href="/tools/json/validator">Validador JSON</a>.
        </p>
      </div>

      {/* Client component subtree */}
      <ToolsIndexAd />

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

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Privacidade</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          As ferramentas foram desenhadas para processar os dados no seu navegador. Ainda assim, evite colar segredos
          (tokens, senhas, chaves). Leia também a <a className="font-semibold" href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        Voltando para a <a href="/">home</a>.
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
