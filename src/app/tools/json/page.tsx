import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";

export const metadata: Metadata = {
  title: "Ferramentas de JSON | Respawn Tech",
  description: "Ferramentas online para formatar, validar, minificar e converter JSON (CSV, JSONL), sem instalar nada.",
  alternates: { canonical: `${SITE.url}/tools/json` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/json`,
    title: "Ferramentas de JSON | Respawn Tech",
    description: "Ferramentas online para formatar, validar, minificar e converter JSON (CSV, JSONL), sem instalar nada.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferramentas de JSON | Respawn Tech",
    description: "Ferramentas online para formatar, validar, minificar e converter JSON (CSV, JSONL), sem instalar nada.",
    images: [`${SITE.url}/og.svg`]
  }
};

export default function ToolsJsonPage() {
  const tools = [
    { href: "/tools/json/formatter", name: "Formatador de JSON", desc: "Formatar, compactar e baixar JSON." },
    { href: "/tools/json/validator", name: "Validador JSON", desc: "Checar se um JSON está válido." },
    { href: "/tools/json/minify", name: "JSON Minify", desc: "Compactar JSON removendo espaços." },
    { href: "/tools/json/escape", name: "Escape / Unescape", desc: "Escapar strings para JSON e reverter." },
    { href: "/tools/json/csv", name: "JSON ↔ CSV", desc: "Converter JSON↔CSV simples." },
    { href: "/tools/json/jsonl-prettify", name: "Prettify JSONL", desc: "Embelezar JSON Lines (um JSON por linha)." }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Ferramentas de JSON</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Ferramentas para trabalhar com JSON: formatar, validar, minificar, escapar strings e converter JSON/CSV/JSONL.
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
        Voltar para <a href="/tools">/tools</a>.
      </p>
    </main>
  );
}
