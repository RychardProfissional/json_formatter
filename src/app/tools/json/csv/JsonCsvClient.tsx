"use client";

import { useMemo, useState } from "react";
import { csvToJson, jsonToCsv, parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { ToolPage } from "@/ui/components/tools/ToolPage";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

export function JsonCsvClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const [status, setStatus] = useState<string>(() =>
    t("tools.json.csv.status.idle")
  );
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");

  const isJsonEmpty = useMemo(() => jsonInput.trim().length === 0, [jsonInput]);
  const isCsvEmpty = useMemo(() => csvInput.trim().length === 0, [csvInput]);

  function setOk(msg: string) {
    setStatusKind("ok");
    setStatus(msg);
  }

  function setErr(msg: string) {
    setStatusKind("error");
    setStatus(msg);
  }

  function onJsonToCsv() {
    const parsed = parseJson(jsonInput);
    if (!parsed.ok) {
      setErr(parsed.errorMessage);
      setCsvOutput("");
      return;
    }

    try {
      setCsvOutput(jsonToCsv(parsed.value));
      setOk(t("tools.json.csv.status.toCsv"));
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("tools.json.csv.error.toCsv"));
      setCsvOutput("");
    }
  }

  function onCsvToJson() {
    try {
      const value = csvToJson(csvInput);
      setJsonOutput(JSON.stringify(value, null, 2));
      setOk(t("tools.json.csv.status.toJson"));
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("tools.json.csv.error.toJson"));
      setJsonOutput("");
    }
  }

  return (
    <ToolPage>
      <ToolHeader
        title={t("tools.json.csv.title")}
        subtitle={t("tools.json.csv.subtitle")}
      />

      <AdSlot
        slot={SITE.adsenseSlots.toolContentTop}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

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

      <ToolSection title={t("tools.json.csv.section.jsonToCsvTitle")}>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {t("tools.json.csv.jsonToCsv.help")}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onJsonToCsv}
            disabled={isJsonEmpty}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("common.convert")}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck={false}
            className="min-h-56 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-950"
            placeholder='[{"name":"Ana","age":30}]'
          />
          <textarea
            value={csvOutput}
            readOnly
            spellCheck={false}
            className="min-h-56 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
          />
        </div>
      </ToolSection>

      <ToolSection title={t("tools.json.csv.section.csvToJsonTitle")}>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {t("tools.json.csv.csvToJson.help")}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCsvToJson}
            disabled={isCsvEmpty}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("common.convert")}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            spellCheck={false}
            className="min-h-56 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-950"
            placeholder="name,age\nAna,30"
          />
          <textarea
            value={jsonOutput}
            readOnly
            spellCheck={false}
            className="min-h-56 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
          />
        </div>
      </ToolSection>

      <ToolSection title={t("tools.json.csv.section.how")}>
        <p className="text-slate-600 dark:text-slate-300">
          {t("tools.json.csv.how.body")}
        </p>
      </ToolSection>

      <ToolSection title={t("tools.json.csv.section.tips")}>
        <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>{t("tools.json.csv.tips.li1")}</li>
          <li>{t("tools.json.csv.tips.li2")}</li>
          <li>
            {t("tools.json.csv.tips.li3.before")}
            <a className="font-semibold" href={lp("/tools/json/validator")}>
              {t("tools.json.csv.tips.li3.link")}
            </a>
            {t("tools.json.csv.tips.li3.after")}
          </li>
        </ul>
      </ToolSection>

      <ToolSection>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {t("common.privacyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {t("tools.json.csv.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.json.csv.privacy.after")}
        </p>
      </ToolSection>
    </ToolPage>
  );
}
