import type { Metadata } from "next";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos rápidos e práticos sobre ferramentas web, produtividade e validação de dados.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Respawn Tech",
    description: "Artigos rápidos e práticos sobre ferramentas web, produtividade e validação de dados.",
    url: "https://respawntech.dev/blog",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Respawn Tech",
    description: "Artigos rápidos e práticos sobre ferramentas web, produtividade e validação de dados.",
    images: ["/og.svg"]
  }
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Conteúdo curto, direto e útil — para resolver problemas reais.
      </p>

      <div className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
        <p>
          O objetivo do blog é apoiar as ferramentas da Respawn Tech com explicações, exemplos e boas práticas. Aqui
          você encontra guias de JSON, conversões (CSV/JSON), validação, depuração de payloads e dicas para reduzir o
          tempo perdido em tarefas repetitivas.
        </p>
        <p>
          Quer ir direto para prática? Abra as <a className="font-semibold" href="/tools">ferramentas</a> e use os artigos
          como referência para entender erros comuns e padrões de uso.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {blogPosts.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
          >
            <h2 className="text-lg font-bold">{p.title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
          </a>
        ))}
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog | Respawn Tech",
            url: "https://respawntech.dev/blog",
            mainEntity: blogPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.description,
              datePublished: p.publishedAt,
              url: `https://respawntech.dev/blog/${p.slug}`
            }))
          })
        }}
      />
    </main>
  );
}
