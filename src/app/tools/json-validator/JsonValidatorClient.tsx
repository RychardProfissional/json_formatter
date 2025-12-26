"use client";

import { useMemo, useState } from "react";
import { parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";

export function JsonValidatorClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string }>({
    ok: false,
    message: "Cole um JSON e clique em validar."
  });

  const isEmpty = useMemo(() => input.trim().length === 0, [input]);

  function onValidate() {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      setResult({ ok: false, message: parsed.errorMessage });
      return;
    }
    setResult({ ok: true, message: "JSON válido." });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Validador JSON</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Cheque se um JSON está válido e veja o erro quando não estiver.</p>

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onValidate}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Validar
        </button>
      </div>

      <div className="mt-4">
        <p
          className={`rounded-xl border px-3 py-2 text-sm ${
            result.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
              : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
          }`}
        >
          {result.message}
        </p>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold" htmlFor="input">
          JSON
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="mt-1 min-h-96 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-700 dark:focus:ring-blue-950"
          placeholder='{"ok":true}'
        />
      </div>

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        Dica: se estiver inválido, use o <a className="font-semibold" href="/tools/json-formatter">formatador</a> para facilitar a correção.
      </p>
    </main>
  );
}
