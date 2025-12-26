import type { Metadata } from "next";
import { EN } from "@/languages/en";

export const metadata: Metadata = {
  title: EN["termsPage.meta.title"],
  description: EN["termsPage.meta.description"],
  alternates: { canonical: "/en/termos-de-uso" },
  openGraph: {
    type: "website",
    title: EN["termsPage.meta.ogTitle"],
    description: EN["termsPage.meta.description"],
    url: "https://respawntech.dev/en/termos-de-uso",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: EN["termsPage.meta.ogTitle"],
    description: EN["termsPage.meta.description"],
    images: ["/og.svg"]
  }
};

export default function EnTermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{EN["termsPage.h1"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{EN["termsPage.subtitle"]}</p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: EN["termsPage.sections.1.title"],
            body: EN["termsPage.sections.1.body"]
          },
          {
            title: EN["termsPage.sections.2.title"],
            body: EN["termsPage.sections.2.body"]
          },
          {
            title: EN["termsPage.sections.3.title"],
            body: EN["termsPage.sections.3.body"]
          },
          {
            title: EN["termsPage.sections.4.title"],
            body: EN["termsPage.sections.4.body"]
          },
          {
            title: EN["termsPage.sections.5.title"],
            body: EN["termsPage.sections.5.body"],
            link: { href: "/en/contato", label: EN["termsPage.sections.5.linkLabel"] }
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
