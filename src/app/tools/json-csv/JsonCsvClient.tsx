"use client";

import { useMemo, useState } from "react";
import { csvToJson, jsonToCsv, parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";

export function JsonCsvClient() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const [status, setStatus] = useState<string>("Converta JSON→CSV ou CSV→JSON.");
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
      setOk("Convertido para CSV.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Falha ao converter para CSV.");
      setCsvOutput("");
    }
  }

  function onCsvToJson() {
    try {
      const value = csvToJson(csvInput);
      setJsonOutput(JSON.stringify(value, null, 2));
      setOk("Convertido para JSON.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Falha ao converter para JSON.");
      setJsonOutput("");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">JSON ↔ CSV</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Conversor simples (mantém o comportamento do legado).</p>

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
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

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">JSON → CSV</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Use um objeto ou um array de objetos.</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onJsonToCsv}
            disabled={isJsonEmpty}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Converter
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
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">CSV → JSON</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Parser simples (não cobre casos complexos com vírgulas dentro de aspas).</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCsvToJson}
            disabled={isCsvEmpty}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Converter
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
      </section>
    </main>
  );
}
