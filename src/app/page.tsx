import Link from "next/link";
import { localeQuery, getDict } from "@/application/i18nServer";

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);
  const qs = localeQuery(sp?.lang);

  const tools = [
    {
      href: "/tools/json/formatter",
      name: dict["tools.json.formatter.title"],
      desc: dict["tools.json.formatter.subtitle"],
    },
    {
      href: "/tools/json/validator",
      name: dict["tools.json.validator.title"],
      desc: dict["tools.json.validator.subtitle"],
    },
    {
      href: "/tools/json/minify",
      name: dict["tools.json.minify.title"],
      desc: dict["tools.json.minify.subtitle"],
    },
    {
      href: "/tools/json/escape",
      name: dict["tools.json.escape.title"],
      desc: dict["tools.json.escape.subtitle"],
    },
    {
      href: "/tools/json/csv",
      name: dict["tools.json.csv.title"],
      desc: dict["tools.json.csv.meta.description"],
    },
    {
      href: "/tools/json/jsonl-prettify",
      name: dict["tools.json.jsonl.title"] ?? "Prettify JSONL",
      desc: dict["tools.json.jsonl.meta.description"] ?? "Prettify JSONL",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-24">
      {/* Hero Section */}
      <section aria-label="Hero" className="text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          New Tools Available
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
          <span className="text-gradient drop-shadow-sm">
            {dict["home.hero.title"]}
          </span>
        </h1>
        <p
          className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          {dict["home.hero.subtitle"]}
        </p>

        <div
          className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            className="rounded-full bg-primary px-8 py-3.5 font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-105 transition-all duration-200"
            href={`/tools${qs}`}
          >
            {dict["home.cta.tools"]}
          </Link>
          <Link
            className="rounded-full glass px-8 py-3.5 font-bold text-foreground hover:bg-white/10 hover:scale-105 transition-all duration-200"
            href={`/blog${qs}`}
          >
            {dict["home.cta.blog"]}
          </Link>
        </div>

        <div
          className="mt-12 flex flex-wrap justify-center gap-3 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            dict["home.badge.1"],
            dict["home.badge.2"],
            dict["home.badge.3"],
            dict["home.badge.4"],
          ].map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section aria-label="Ferramentas">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            {dict["home.tools.title"]}
          </h2>
          <Link
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            href={`/tools${qs}`}
          >
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={`${t.href}${qs}`}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {t.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section
          aria-label="O que é"
          className="glass rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-gradient">
            {dict["home.what.title"]}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{dict["home.what.p1"]}</p>
            <p>{dict["home.what.p2"]}</p>
            <p>{dict["home.what.p3"]}</p>
          </div>
        </section>

        <section
          aria-label="Para quem é"
          className="glass rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-gradient">
            {dict["home.forWho.title"]}
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>
                <strong className="text-foreground">Desenvolvedores:</strong>{" "}
                {dict["home.forWho.dev"]}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>
                <strong className="text-foreground">Estudantes:</strong>{" "}
                {dict["home.forWho.students"]}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  PMEs e empreendedores:
                </strong>{" "}
                {dict["home.forWho.smes"]}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>
                <strong className="text-foreground">
                  Times de produto/ops:
                </strong>{" "}
                {dict["home.forWho.teams"]}
              </span>
            </li>
          </ul>
        </section>
      </div>

      {/* Differentials */}
      <section
        aria-label="Diferenciais"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-8 md:p-12"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          {dict["home.diff.title"]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            dict["home.diff.item1"],
            dict["home.diff.item2"],
            dict["home.diff.item3"],
            dict["home.diff.item4"],
          ].map((item, i) => {
            const [title, desc] = item.split(":");
            return (
              <div
                key={i}
                className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-lg font-bold text-primary mb-2">
                  {title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {desc?.trim()}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ & Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section
          aria-label="Roadmap"
          className="lg:col-span-1 glass rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-xl font-bold tracking-tight mb-6">
            {dict["home.roadmap.title"]}
          </h2>
          <ul className="space-y-4">
            {[
              dict["home.roadmap.item1"],
              dict["home.roadmap.item2"],
              dict["home.roadmap.item3"],
              dict["home.roadmap.item4"],
              dict["home.roadmap.item5"],
              dict["home.roadmap.item6"],
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="FAQ"
          className="lg:col-span-2 glass rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-xl font-bold tracking-tight mb-6">
            {dict["home.faq.title"]}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i}>
                <h3 className="font-semibold text-foreground mb-1">
                  {dict[`home.faq.q${i}`]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dict[`home.faq.a${i}`]}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground border-t border-white/10 pt-6">
            {dict["home.contactPrompt"]}{" "}
            <Link
              className="font-semibold text-primary hover:underline"
              href={`/contato${qs}`}
            >
              {dict["home.contactLink"]}
            </Link>
            .
          </p>
        </section>
      </div>

      {/* Developer Info */}
      <section aria-label="Quem desenvolve" className="text-center py-8">
        <p className="text-muted-foreground">
          {dict["home.dev.text"]}{" "}
          <a
            href="https://rychard.vercel.app/"
            rel="noopener"
            className="text-primary hover:underline font-medium"
          >
            {dict["home.dev.link"]}
          </a>
          .
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
                  text:
                    "Sim. As ferramentas da Respawn Tech são gratuitas para uso pessoal e profissional.",
                },
              },
              {
                "@type": "Question",
                name: "Meus dados ficam armazenados?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Em geral não. O processamento ocorre no navegador. Algumas funções podem usar armazenamento local apenas se você ativar.",
                },
              },
              {
                "@type": "Question",
                name: "Precisa de login?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Não. A proposta é reduzir atrito: abrir e usar, sem criar conta.",
                },
              },
              {
                "@type": "Question",
                name: "Quem desenvolveu?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O projeto é mantido por Rychard.",
                },
              },
              {
                "@type": "Question",
                name: "Posso usar comercialmente?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Sim. Recomendamos revisar os resultados antes de usar em produção, especialmente conversões.",
                },
              },
            ],
          }),
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
              url: "https://rychard.vercel.app/",
            },
          }),
        }}
      />
    </div>
  );
}
