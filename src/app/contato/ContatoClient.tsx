"use client";

import { useMemo, useState } from "react";

export function ContatoClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>("Preencha os campos para enviar.");
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");

  const mailtoHref = useMemo(() => {
    const subject = "Respawn Tech — contato";
    const body = `Nome: ${name}\nE-mail: ${email}\n\n${message}`;
    return `mailto:rychard.professional@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, email, message]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();

    if (!n || !em || !msg) {
      setStatusKind("error");
      setStatus("Preencha nome, e-mail e mensagem.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(em)) {
      setStatusKind("error");
      setStatus("Informe um e-mail válido.");
      return;
    }

    setStatusKind("ok");
    setStatus("Abrindo seu aplicativo de e-mail…");
    window.location.href = mailtoHref;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Contato</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Dúvidas, feedback e sugestões de ferramentas.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-bold">E-mail</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            <a href="mailto:rychard.professional@gmail.com">rychard.professional@gmail.com</a>
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sem SLA garantido.</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-bold">Formulário rápido</h2>
          <form onSubmit={onSubmit} className="mt-3 space-y-3">
            <div>
              <label className="text-sm font-semibold" htmlFor="name">
                Seu nome
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-700 dark:focus:ring-blue-950"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="email">
                Seu e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-700 dark:focus:ring-blue-950"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="message">
                Mensagem
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-700 dark:focus:ring-blue-950"
                required
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Enviar
              </button>
              <a
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
                href={mailtoHref}
              >
                Enviar via e-mail
              </a>
            </div>

            <p
              className={`rounded-xl border px-3 py-2 text-sm ${
                statusKind === "ok"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                  : statusKind === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
                    : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
              {status}
            </p>
          </form>
        </section>
      </div>

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Para informações sobre cookies, anúncios e analytics, veja a <a href="/politica-de-privacidade">Política de Privacidade</a>.
      </p>
    </main>
  );
}
