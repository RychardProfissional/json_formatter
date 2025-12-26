import type { Metadata } from "next";
import { PT_BR } from "@/languages/pt-br";

export const metadata: Metadata = {
  title: PT_BR["termsPage.meta.title"],
  description: PT_BR["termsPage.meta.description"],
  alternates: { canonical: "/termos-de-uso" },
  openGraph: {
    type: "website",
    title: PT_BR["termsPage.meta.ogTitle"],
    description: PT_BR["termsPage.meta.description"],
    url: "https://respawntech.dev/termos-de-uso",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: PT_BR["termsPage.meta.ogTitle"],
    description: PT_BR["termsPage.meta.description"],
    images: ["/og.svg"]
  }
};

export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{PT_BR["termsPage.h1"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {PT_BR["termsPage.subtitle"]}
      </p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: PT_BR["termsPage.sections.1.title"],
            body: PT_BR["termsPage.sections.1.body"]
          },
          {
            title: PT_BR["termsPage.sections.2.title"],
            body: PT_BR["termsPage.sections.2.body"]
          },
          {
            title: PT_BR["termsPage.sections.3.title"],
            body: PT_BR["termsPage.sections.3.body"]
          },
          {
            title: PT_BR["termsPage.sections.4.title"],
            body: PT_BR["termsPage.sections.4.body"]
          },
          {
            title: PT_BR["termsPage.sections.5.title"],
            body: PT_BR["termsPage.sections.5.body"],
            link: { href: "/contato", label: PT_BR["termsPage.sections.5.linkLabel"] }
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
                <a href={s.link.href} className="font-semibold">
                  {s.link.label}
                </a>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
