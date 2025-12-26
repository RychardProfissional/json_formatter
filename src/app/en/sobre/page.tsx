import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Respawn Tech is, how tools work, and our privacy approach.",
  alternates: { canonical: "/en/sobre" },
  openGraph: {
    type: "website",
    title: "About | Respawn Tech",
    description: "Learn what Respawn Tech is, how tools work, and our privacy approach.",
    url: "https://respawntech.dev/en/sobre",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Respawn Tech",
    description: "Learn what Respawn Tech is, how tools work, and our privacy approach.",
    images: ["/og.svg"]
  }
};

export default function EnAboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">About</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Respawn Tech is a project that brings together free online tools for developers, students and builders. The goal
        is to reduce day-to-day friction — small repetitive tasks should be solved in seconds, with no installs and no
        account.
      </p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Where the tools live</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Tools live under <a href="/en/tools">/tools</a>.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Privacy and transparency</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Tools are designed to run in the browser. If ads and analytics are enabled, we aim to be transparent and let
          users control preferences. Details are in the <a href="/en/politica-de-privacidade">Privacy Policy</a>.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Maintainer</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          The project is maintained by Rychard. Learn more at{" "}
          <a href="https://rychard.vercel.app/" rel="noopener">
            rychard.vercel.app
          </a>
          .
        </p>
      </section>
    </main>
  );
}
