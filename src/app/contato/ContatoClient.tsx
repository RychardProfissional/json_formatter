"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";

export function ContatoClient() {
  const { locale, t } = useI18n();
  const lp = useLocalePath();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>(() => t("contact.status.idle"));
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");

  const mailtoHref = useMemo(() => {
    const subject = t("contact.mail.subject");
    const body = t("contact.mail.body", { name, email, message });
    return `mailto:rychard.professional@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [t, name, email, message]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();

    if (!n || !em || !msg) {
      setStatusKind("error");
      setStatus(t("contact.status.missingFields"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(em)) {
      setStatusKind("error");
      setStatus(t("contact.status.invalidEmail"));
      return;
    }

    setStatusKind("ok");
    setStatus(t("contact.status.openingEmail"));
    window.location.href = mailtoHref;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("contact.title")}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {t("contact.subtitle")}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-bold">{t("contact.emailTitle")}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            <a href="mailto:rychard.professional@gmail.com">rychard.professional@gmail.com</a>
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("contact.noSla")}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-bold">{t("contact.formTitle")}</h2>
          <form onSubmit={onSubmit} className="mt-3 space-y-3">
            <div>
              <label className="text-sm font-semibold" htmlFor="name">
                {t("contact.nameLabel")}
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
                {t("contact.emailLabel")}
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
                {t("contact.messageLabel")}
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
                {t("contact.send")}
              </button>
              <a
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
                href={mailtoHref}
              >
                {t("contact.sendViaEmail")}
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
        {t("contact.privacy.before")}
        <a href={lp("/politica-de-privacidade")}>{t("common.privacyPolicy")}</a>
        {t("contact.privacy.after")}
      </p>
    </main>
  );
}
