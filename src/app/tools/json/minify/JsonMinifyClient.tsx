"use client";

import { useMemo, useState } from "react";
import { minifyJson, parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";

export function JsonMinifyClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string>(() => t("tools.json.minify.status.idle"));
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");

  const isEmpty = useMemo(() => input.trim().length === 0, [input]);

  function setOk(msg: string) {
    setStatusKind("ok");
    setStatus(msg);
  }

  function setErr(msg: string) {
    setStatusKind("error");
    setStatus(msg);
  }

  function onMinify() {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      setErr(parsed.errorMessage);
      setOutput("");
      return;
    }
    setOutput(minifyJson(parsed.value));
    setOk(t("tools.json.minify.status.minified"));
  }

  async function onCopy() {
    if (!output.trim()) return;
    try {
      await navigator.clipboard.writeText(output);
      setOk(t("common.copied"));
    } catch {
      setErr(t("common.copyFailed"));
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("tools.json.minify.title")}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {t("tools.json.minify.subtitle")}
      </p>

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onMinify}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("common.minify")}
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={!output.trim()}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {t("common.copy")}
        </button>
      </div>

      <div className="mt-4">
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
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold" htmlFor="input">
            {t("common.input")}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="mt-1 min-h-80 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-700 dark:focus:ring-blue-950"
          />
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="output">
            {t("common.output")}
          </label>
          <textarea
            id="output"
            value={output}
            readOnly
            spellCheck={false}
            className="mt-1 min-h-80 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
          />
        </div>
      </div>

      <section className="mt-10 space-y-4 text-slate-600 dark:text-slate-300">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {t("tools.json.minify.section.when")}
        </h2>
        <p>
          {t("tools.json.minify.when.body")}
        </p>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {t("tools.json.minify.section.cautions")}
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            {t("tools.json.minify.caution.validator.before")}
            <a className="font-semibold" href={lp("/tools/json/validator")}>
              {t("tools.json.minify.caution.validator.link")}
            </a>
            {t("tools.json.minify.caution.validator.after")}
          </li>
          <li>{t("tools.json.minify.caution.secrets")}</li>
          <li>{t("tools.json.minify.caution.diffs")}</li>
        </ul>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{t("common.privacyTitle")}</h2>
        <p>
          {t("tools.json.minify.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.json.minify.privacy.after")}
        </p>
      </section>
    </main>
  );
}
