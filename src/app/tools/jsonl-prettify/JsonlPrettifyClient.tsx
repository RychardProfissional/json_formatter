"use client";

import { useMemo, useState } from "react";
import { prettifyJsonl } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";

export function JsonlPrettifyClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<2 | 4 | 8>(2);
  const [status, setStatus] = useState<string>("Cole um JSON por linha e clique em prettify.");
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

  function onPrettify() {
    try {
      setOutput(prettifyJsonl(input, indent));
      setOk("JSONL formatado.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Falha ao formatar JSONL.");
      setOutput("");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Prettify JSONL</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Um JSON por linha → blocos legíveis (separados por linha em branco).</p>

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="text-sm font-semibold" htmlFor="indent">
            Indentação
          </label>
          <select
            id="indent"
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value) as 2 | 4 | 8)}
            className="mt-1 w-36 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-900"
          >
            <option value={2}>2 espaços</option>
            <option value={4}>4 espaços</option>
            <option value={8}>8 espaços</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onPrettify}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prettify
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
            Entrada
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="mt-1 min-h-80 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-950"
            placeholder='{"a":1}\n{"b":2}'
          />
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="output">
            Saída
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
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">O que é JSONL</h2>
        <p>
          JSONL (JSON Lines) é um formato onde cada linha é um JSON independente. Ele é comum em logs, pipelines e exportações.
          Esta ferramenta transforma cada linha em um bloco JSON bem formatado, separado por uma linha em branco.
        </p>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Como usar</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Cole um JSON por linha no campo de entrada.</li>
          <li>Escolha a indentação (2/4/8 espaços).</li>
          <li>Clique em Prettify e copie o resultado.</li>
        </ul>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Privacidade</h2>
        <p>
          O processamento é local, no navegador. Evite colar dados sensíveis. Veja{" "}
          <a className="font-semibold" href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>
    </main>
  );
}
