"use client";

import { useMemo, useState } from "react";
import { escapeForJsonString, unescapeFromJsonString } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";

export function JsonEscapeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string>("Cole um texto e escolha uma ação.");
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");

  const isEmpty = useMemo(() => input.length === 0, [input]);

  function setOk(msg: string) {
    setStatusKind("ok");
    setStatus(msg);
  }

  function setErr(msg: string) {
    setStatusKind("error");
    setStatus(msg);
  }

  function onEscape() {
    setOutput(escapeForJsonString(input));
    setOk("Texto escapado.");
  }

  function onUnescape() {
    try {
      setOutput(unescapeFromJsonString(input));
      setOk("Texto desescapado.");
    } catch {
      setErr("Entrada inválida para unescape.");
      setOutput("");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Escape / Unescape</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Escape e unescape de strings para uso em JSON (\\n, \\t, aspas, etc.).
      </p>

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEscape}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Escape
        </button>
        <button
          type="button"
          onClick={onUnescape}
          disabled={isEmpty}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Unescape
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
            className="mt-1 min-h-60 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-700 dark:focus:ring-blue-950"
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
            className="mt-1 min-h-60 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
          />
        </div>
      </div>

      <section className="mt-10 space-y-4 text-slate-600 dark:text-slate-300">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">O que é escape e unescape</h2>
        <p>
          O <strong>escape</strong> transforma caracteres especiais em sequências seguras para strings, como <code>\n</code> (quebra de linha),
          <code>\t</code> (tab) e <code>\"</code> (aspas). O <strong>unescape</strong> faz o caminho inverso.
        </p>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Quando usar</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Inserir um JSON como string em código (ex.: JavaScript/TypeScript).</li>
          <li>Colar valores em variáveis de ambiente, logs ou testes automatizados.</li>
          <li>Reverter uma string escapada para leitura humana (unescape).</li>
        </ul>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Cuidados</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Evite escape duplo (escapar duas vezes) para não dificultar o unescape.</li>
          <li>Se estiver lidando com JSON completo, valide antes com o <a className="font-semibold" href="/tools/json-validator">Validador JSON</a>.</li>
        </ul>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Privacidade</h2>
        <p>
          O processamento acontece no seu navegador. Evite colar segredos. Detalhes em{" "}
          <a className="font-semibold" href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>
    </main>
  );
}
