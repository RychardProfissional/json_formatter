import Link from "next/link";
import { localeQuery, getDict } from "@/application/i18nServer";

interface Props { searchParams: Promise<{ lang?: string }> }

export default async function HomePage({ searchParams }: Props) {
  const sp = await searchParams
  const dict = getDict(sp?.lang);
  const qs = localeQuery(sp?.lang);

  const tools = [
    { href: "/tools/json/formatter", name: dict["tools.json.formatter.title"], desc: dict["tools.json.formatter.subtitle"] },
    { href: "/tools/json/validator", name: dict["tools.json.validator.title"], desc: dict["tools.json.validator.subtitle"] },
    { href: "/tools/json/minify", name: dict["tools.json.minify.title"], desc: dict["tools.json.minify.subtitle"] },
    { href: "/tools/json/escape", name: dict["tools.json.escape.title"], desc: dict["tools.json.escape.subtitle"] },
    { href: "/tools/json/csv", name: dict["tools.json.csv.title"], desc: dict["tools.json.csv.meta.description"] },
    { href: "/tools/json/jsonl-prettify", name: dict["tools.json.jsonl.title"] ?? "Prettify JSONL", desc: dict["tools.json.jsonl.meta.description"] ?? "Prettify JSONL" }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section aria-label="Hero" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h1 className="text-4xl font-extrabold tracking-tight">{dict["home.hero.title"]}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["home.hero.subtitle"]}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700" href={`/tools${qs}`}>
            {dict["home.cta.tools"]}
          </Link>
          <Link
            className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
            href={`/blog${qs}`}
          >
            {dict["home.cta.blog"]}
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {[dict["home.badge.1"], dict["home.badge.2"], dict["home.badge.3"], dict["home.badge.4"]].map((b) => (
            <span
              key={b}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      <section aria-label="O que é" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.what.title"]}</h2>
        <div className="mt-3 space-y-3 text-slate-600 dark:text-slate-300">
          <p>{dict["home.what.p1"]}</p>
          <p>{dict["home.what.p2"]}</p>
          <p>{dict["home.what.p3"]}</p>
        </div>
      </section>

      <section aria-label="Ferramentas" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.tools.title"]}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {dict["home.tools.desc"].split("/tools")[0]} <Link className="font-semibold" href={`/tools${qs}`}>/tools</Link>.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={`${t.href}${qs}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
            >
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Para quem é" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.forWho.title"]}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li><strong>Desenvolvedores:</strong> {dict["home.forWho.dev"]}</li>
          <li><strong>Estudantes:</strong> {dict["home.forWho.students"]}</li>
          <li><strong>PMEs e empreendedores:</strong> {dict["home.forWho.smes"]}</li>
          <li><strong>Times de produto/ops:</strong> {dict["home.forWho.teams"]}</li>
        </ul>
      </section>

      <section aria-label="Diferenciais" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.diff.title"]}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li><strong>{dict["home.diff.item1"].split(":")[0]}:</strong> {dict["home.diff.item1"].split(":")[1]?.trim()}</li>
          <li><strong>{dict["home.diff.item2"].split(":")[0]}:</strong> {dict["home.diff.item2"].split(":")[1]?.trim()}</li>
          <li><strong>{dict["home.diff.item3"].split(":")[0]}:</strong> {dict["home.diff.item3"].split(":")[1]?.trim()}</li>
          <li><strong>{dict["home.diff.item4"].split(":")[0]}:</strong> {dict["home.diff.item4"].split(":")[1]?.trim()}</li>
        </ul>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{dict["home.hero.subtitle"].split(".")[0]}.</p>
      </section>

      <section aria-label="Quem desenvolve" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.dev.title"]}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {dict["home.dev.text"]} <a href="https://rychard.vercel.app/" rel="noopener">{dict["home.dev.link"]}</a>.
        </p>
      </section>

      <section aria-label="Roadmap" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.roadmap.title"]}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>{dict["home.roadmap.item1"]}</li>
          <li>{dict["home.roadmap.item2"]}</li>
          <li>{dict["home.roadmap.item3"]}</li>
          <li>{dict["home.roadmap.item4"]}</li>
          <li>{dict["home.roadmap.item5"]}</li>
          <li>{dict["home.roadmap.item6"]}</li>
        </ul>
      </section>

      <section aria-label="FAQ" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">{dict["home.faq.title"]}</h2>
        <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
          <li><strong>{dict["home.faq.q1"]}</strong> {dict["home.faq.a1"]}</li>
          <li><strong>{dict["home.faq.q2"]}</strong> {dict["home.faq.a2"]}</li>
          <li><strong>{dict["home.faq.q3"]}</strong> {dict["home.faq.a3"]}</li>
          <li><strong>{dict["home.faq.q4"]}</strong> {dict["home.faq.a4"]}</li>
          <li><strong>{dict["home.faq.q5"]}</strong> {dict["home.faq.a5"]}</li>
        </ul>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {dict["home.contactPrompt"]} <Link className="font-semibold" href={`/contato${qs}`}>{dict["home.contactLink"]}</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "É grátis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. As ferramentas da Respawn Tech são gratuitas para uso pessoal e profissional."
                }
              },
              {
                "@type": "Question",
                name: "Meus dados ficam armazenados?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Em geral não. O processamento ocorre no navegador. Algumas funções podem usar armazenamento local apenas se você ativar."
                }
              },
              {
                "@type": "Question",
                name: "Precisa de login?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. A proposta é reduzir atrito: abrir e usar, sem criar conta."
                }
              },
              {
                "@type": "Question",
                name: "Quem desenvolveu?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O projeto é mantido por Rychard."
                }
              },
              {
                "@type": "Question",
                name: "Posso usar comercialmente?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. Recomendamos revisar os resultados antes de usar em produção, especialmente conversões."
                }
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Respawn Tech",
            url: "https://respawntech.dev/",
            founder: {
              "@type": "Person",
              name: "Rychard",
              url: "https://rychard.vercel.app/"
            }
          })
        }}
      />
    </main>
  );
}
