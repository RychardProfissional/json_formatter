"use client";

import { useMemo, useState } from "react";
import { formatJson, minifyJson, parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { ToolPage } from "@/ui/components/tools/ToolPage";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

export function JsonFormatterClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<2 | 4 | 8>(2);
  const [status, setStatus] = useState<string>(() =>
    t("tools.json.formatter.status.idle")
  );
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

  function onFormat() {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      setErr(parsed.errorMessage);
      setOutput("");
      return;
    }
    setOutput(formatJson(parsed.value, indent));
    setOk(t("tools.json.formatter.status.formatted"));
  }

  function onMinify() {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      setErr(parsed.errorMessage);
      setOutput("");
      return;
    }
    setOutput(minifyJson(parsed.value));
    setOk(t("tools.json.formatter.status.minified"));
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

  function onDownload() {
    if (!output.trim()) return;
    const blob = new Blob([output], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setOk(t("common.downloadStarted"));
  }

  function onClear() {
    setInput("");
    setOutput("");
    setStatusKind("");
    setStatus(t("tools.json.formatter.status.idle"));
  }

  return (
    <ToolPage>
      <ToolHeader
        title={t("tools.json.formatter.title")}
        subtitle={t("tools.json.formatter.subtitle")}
      />

      <AdSlot
        slot={SITE.adsenseSlots.toolContentTop}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="text-sm font-semibold" htmlFor="indent">
            {t("common.indent")}
          </label>
          <select
            id="indent"
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value) as 2 | 4 | 8)}
            className="mt-1 w-36 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-900"
          >
            <option value={2}>{t("common.spaces2")}</option>
            <option value={4}>{t("common.spaces4")}</option>
            <option value={8}>{t("common.spaces8")}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onFormat}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("common.format")}
        </button>
        <button
          type="button"
          onClick={onMinify}
          disabled={isEmpty}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
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
        <button
          type="button"
          onClick={onDownload}
          disabled={!output.trim()}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {t("common.download")}
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {t("common.clear")}
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
            placeholder='{"hello":"world"}'
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

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        {t("tools.json.formatter.links.seeAlso")}{" "}
        <a className="font-semibold" href={lp("/tools/json/validator")}>
          {t("tools.json.formatter.links.validator")}
        </a>{" "}
        {t("common.and")}{" "}
        <a className="font-semibold" href={lp("/tools/json/minify")}>
          {t("tools.json.formatter.links.minify")}
        </a>
        .
      </p>

      <ToolSection title={t("tools.json.formatter.section.howToUse")}>
        <ol className="list-decimal space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>{t("tools.json.formatter.howToUse.step1")}</li>
          <li>{t("tools.json.formatter.howToUse.step2")}</li>
          <li>
            {t("tools.json.formatter.howToUse.step3.before")}
            <strong>{t("common.format")}</strong>
            {t("tools.json.formatter.howToUse.step3.between")}
            <strong>{t("common.minify")}</strong>
            {t("tools.json.formatter.howToUse.step3.after")}
          </li>
          <li>{t("tools.json.formatter.howToUse.step4")}</li>
        </ol>
      </ToolSection>

      <ToolSection title={t("tools.json.formatter.section.commonErrors")}>
        <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            <strong>
              {t("tools.json.formatter.errors.trailingComma.label")}:
            </strong>{" "}
            {t("tools.json.formatter.errors.trailingComma.text")}
          </li>
          <li>
            <strong>
              {t("tools.json.formatter.errors.singleQuotes.label")}:
            </strong>{" "}
            {t("tools.json.formatter.errors.singleQuotes.text")}
          </li>
          <li>
            <strong>{t("tools.json.formatter.errors.brackets.label")}:</strong>{" "}
            {t("tools.json.formatter.errors.brackets.lead")}{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">
              {"{"}
            </code>{" "}
            {t("tools.json.formatter.errors.brackets.closesWith")}{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">
              {"}"}
            </code>{" "}
            {t("tools.json.formatter.errors.brackets.and")}{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">
              {"["}
            </code>{" "}
            {t("tools.json.formatter.errors.brackets.closesWith")}{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">
              {"]"}
            </code>
            .
          </li>
        </ul>
      </ToolSection>

      <ToolSection>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {t("common.privacyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {t("tools.json.formatter.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.json.formatter.privacy.after")}
        </p>
      </ToolSection>
    </ToolPage>
  );
}
