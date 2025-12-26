import type { Metadata } from "next";
import { EN } from "@/languages/en";

export const metadata: Metadata = {
  title: EN["privacyPage.meta.title"],
  description: EN["privacyPage.meta.description"],
  alternates: { canonical: "/en/politica-de-privacidade" },
  openGraph: {
    type: "website",
    title: EN["privacyPage.meta.ogTitle"],
    description: EN["privacyPage.meta.description"],
    url: "https://respawntech.dev/en/politica-de-privacidade",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: EN["privacyPage.meta.ogTitle"],
    description: EN["privacyPage.meta.description"],
    images: ["/og.svg"]
  }
};

export default function EnPrivacyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{EN["privacyPage.h1"]}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{EN["privacyPage.subtitle"]}</p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: EN["privacyPage.sections.1.title"],
            body: EN["privacyPage.sections.1.body"]
          },
          {
            title: EN["privacyPage.sections.2.title"],
            body: EN["privacyPage.sections.2.body"]
          },
          {
            title: EN["privacyPage.sections.3.title"],
            body: EN["privacyPage.sections.3.body"]
          },
          {
            title: EN["privacyPage.sections.4.title"],
            body: EN["privacyPage.sections.4.body"]
          },
          {
            title: EN["privacyPage.sections.5.title"],
            body: EN["privacyPage.sections.5.body"]
          }
        ].map((s) => (
          <section
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <h2 className="text-lg font-bold">{s.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
