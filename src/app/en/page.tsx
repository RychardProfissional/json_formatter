import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Free online tools for developers — format JSON, validate payloads, convert CSV/JSON, and more.",
  alternates: { canonical: "/en" },
  openGraph: {
    type: "website",
    title: "Respawn Tech",
    description: "Free online tools to solve technical tasks in seconds — no installs, no account.",
    url: "https://respawntech.dev/en",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Respawn Tech",
    description: "Free online tools to solve technical tasks in seconds — no installs, no account.",
    images: ["/og.svg"]
  }
};

export default function EnHomePage() {
  const tools = [
    { href: "/en/tools/json/formatter", name: "JSON Formatter", desc: "Format, minify and validate JSON in your browser." },
    { href: "/en/tools/json/validator", name: "JSON Validator", desc: "Check if JSON is valid and see helpful errors." },
    { href: "/en/tools/json/minify", name: "JSON Minify", desc: "Minify JSON by removing spaces and line breaks." },
    { href: "/en/tools/json/escape", name: "Escape / Unescape", desc: "Escape text into a safe JSON string and revert it." },
    { href: "/en/tools/json/csv", name: "JSON ↔ CSV", desc: "Convert simple JSON ↔ CSV." },
    { href: "/en/tools/json/jsonl-prettify", name: "Prettify JSONL", desc: "Make JSON Lines (one JSON per line) readable." }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section
        aria-label="Hero"
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      >
        <h1 className="text-4xl font-extrabold tracking-tight">Respawn Tech</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Free online tools for developers, students and builders. Mission: reduce friction — solve technical tasks in
          seconds, with no installs and no account.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700" href="/en/tools">
            Open tools
          </a>
          <a
            className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
            href="/en/blog"
          >
            Read the blog
          </a>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["No login", "Fast & responsive", "Useful by default", "Transparent"].map((b) => (
            <span
              key={b}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      <section aria-label="What it is" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">What is Respawn Tech</h2>
        <div className="mt-3 space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            Respawn Tech is a platform of free online tools for developers, students and builders. The goal is to reduce
            friction and help you execute technical tasks in seconds — without installs or accounts.
          </p>
          <p>
            This project exists because a lot of productivity is lost in “small tasks”: validating JSON, escaping a
            string, converting CSV, reading logs. Simple steps, repeated many times every week.
          </p>
          <p>
            The foundation is simple: browser-first tools with readability, performance and a consistent UX. If ads and
            analytics are enabled, we aim to be transparent and let users control preferences.
          </p>
        </div>
      </section>

      <section aria-label="Tools" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Available tools</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          The main content lives at <a href="/en/tools">/tools</a>.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tools.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
            >
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section aria-label="Who it is for" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Who it is for</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Developers:</strong> quick payload inspection, configs and integrations.
          </li>
          <li>
            <strong>Students:</strong> learn structures, validate examples and understand common errors.
          </li>
          <li>
            <strong>Builders:</strong> test integrations, automations and exports.
          </li>
          <li>
            <strong>Product/ops teams:</strong> inspect data and logs without heavy editors.
          </li>
        </ul>
      </section>

      <section aria-label="FAQ" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">FAQ</h2>
        <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Is it free?</strong> Yes. Tools are free for personal and professional use.
          </li>
          <li>
            <strong>Do you store my data?</strong> In general, no. Tools run in the browser. Some features may use local
            storage only if you enable them.
          </li>
          <li>
            <strong>Do I need an account?</strong> No.
          </li>
          <li>
            <strong>Who maintains it?</strong> The project is maintained by Rychard.
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Want to suggest a tool? Reach out via <a href="/en/contato">contact</a>.
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
                name: "Is it free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Respawn Tech tools are free for personal and professional use."
                }
              },
              {
                "@type": "Question",
                name: "Do you store my data?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In general, no. Processing happens in the browser. Some features may use local storage only if you enable them."
                }
              },
              {
                "@type": "Question",
                name: "Do I need an account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The goal is to reduce friction: open and use."
                }
              },
              {
                "@type": "Question",
                name: "Who maintains it?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The project is maintained by Rychard."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}
