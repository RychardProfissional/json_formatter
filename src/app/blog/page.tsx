import type { Metadata } from "next";
import { blogPosts } from "@/content/blog";
import Link from "next/link";
import { localeQuery, getDict } from "@/application/i18nServer";

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

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const qs = localeQuery(sp?.lang);
  const dict = getDict(sp?.lang);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{dict["blog.title"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {dict["blog.subtitle"]}
      </p>

      <div className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
        <p>
          {dict["blog.description.p1"]}
        </p>
        <p>
          {dict["blog.description.p2.before"]} <Link className="font-semibold" href={`/tools${qs}`}>{dict["blog.description.p2.link"]}</Link> {dict["blog.description.p2.after"]}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}${qs}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
          >
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{post.description}</p>
          </Link>
        ))}
      </div>

      <script
        type="application/ld+json"
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
