"use client";

import { useMemo, useState } from "react";
import { formatJson, minifyJson, parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";

export function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<2 | 4 | 8>(2);
  const [status, setStatus] = useState<string>("Cole um JSON e escolha uma ação.");
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
    setOk("JSON formatado.");
  }

  function onMinify() {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      setErr(parsed.errorMessage);
      setOutput("");
      return;
    }
    setOutput(minifyJson(parsed.value));
    setOk("JSON compactado.");
  }

  async function onCopy() {
    if (!output.trim()) return;
    try {
      await navigator.clipboard.writeText(output);
      setOk("Copiado.");
    } catch {
      setErr("Não foi possível copiar automaticamente.");
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
    setOk("Download iniciado.");
  }

  function onClear() {
    setInput("");
    setOutput("");
    setStatusKind("");
    setStatus("Cole um JSON e escolha uma ação.");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Formatador de JSON</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Formatar, validar e compactar JSON no navegador.</p>

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
          onClick={onFormat}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Formatar
        </button>
        <button
          type="button"
          onClick={onMinify}
          disabled={isEmpty}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Minificar
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={!output.trim()}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Copiar
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={!output.trim()}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Baixar
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Limpar
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
            className="mt-1 min-h-80 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-700 dark:focus:ring-blue-950"
            placeholder='{"hello":"world"}'
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

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        Ver também: <a className="font-semibold" href="/tools/json-validator">validador</a> e{" "}
        <a className="font-semibold" href="/tools/json-minify">minify</a>.
      </p>

      <section className="mt-10 space-y-4 text-slate-600 dark:text-slate-300">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Como usar</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Cole o JSON na caixa de entrada.</li>
          <li>Escolha a indentação (2, 4 ou 8 espaços).</li>
          <li>Use <strong>Formatar</strong> para deixar legível ou <strong>Minificar</strong> para compactar.</li>
          <li>Copie ou baixe o resultado.</li>
        </ol>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Erros comuns</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Trailing comma:</strong> JSON não permite vírgula extra no final.
          </li>
          <li>
            <strong>Aspas simples:</strong> chaves e strings exigem aspas duplas.
          </li>
          <li>
            <strong>Chaves/colchetes:</strong> verifique se <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"{"}</code> fecha com{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"}"}</code> e <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"["}</code> fecha com{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"]"}</code>.
          </li>
        </ul>

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Privacidade</h2>
        <p>
          O processamento acontece no seu navegador. Evite colar segredos (tokens, senhas, chaves). Para detalhes sobre
          anúncios/cookies, leia a <a className="font-semibold" href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>
    </main>
  );
}
