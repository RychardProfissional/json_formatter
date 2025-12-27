"use client";

import { useMemo, useState } from "react";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { imagesToPdf } from "@/domain/tools";

function downloadBytes(bytes: ArrayBuffer | Uint8Array, filename: string, mime: string) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes as ArrayBuffer);
  const blob = new Blob([view as unknown as BlobPart], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function ImageToPdfClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>(() => t("tools.pdf.imageToPdf.status.idle"));
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");
  const busy = useMemo(() => statusKind === "ok" && status === t("tools.pdf.imageToPdf.status.done"), [status, statusKind, t]);

  const hasFiles = files.length > 0;

  function setOk(msg: string) {
    setStatusKind("ok");
    setStatus(msg);
  }

  function setErr(msg: string) {
    setStatusKind("error");
    setStatus(msg);
  }

  async function onConvert() {
    try {
      setStatusKind("");
      setStatus(t("tools.pdf.imageToPdf.status.working"));

      const items = await Promise.all(
        files.map(async (f) => ({
          bytes: await f.arrayBuffer(),
          mime: f.type
        }))
      );

      const out = await imagesToPdf(items);
      downloadBytes(out, t("tools.pdf.imageToPdf.downloadName"), "application/pdf");
      setOk(t("tools.pdf.imageToPdf.status.done"));
    } catch {
      setErr(t("tools.pdf.imageToPdf.status.error"));
    }
  }

  function onClear() {
    setFiles([]);
    setStatusKind("");
    setStatus(t("tools.pdf.imageToPdf.status.idle"));
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("tools.pdf.imageToPdf.title")}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{t("tools.pdf.imageToPdf.subtitle")}</p>

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <label className="text-sm font-semibold" htmlFor="images">
          {t("tools.pdf.imageToPdf.inputLabel")}
        </label>
        <input
          id="images"
          type="file"
          accept="image/png,image/jpeg"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="mt-2 block w-full text-sm"
        />

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {t("tools.pdf.imageToPdf.selected.before", { count: files.length })}
          <span className="font-semibold">{files.length}</span>
          {t("tools.pdf.imageToPdf.selected.after")}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConvert}
            disabled={!hasFiles}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("tools.pdf.imageToPdf.action")}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!hasFiles}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            {t("common.clear")}
          </button>
        </div>

        <p
          className={`mt-4 rounded-xl border px-3 py-2 text-sm ${
            statusKind === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
              : statusKind === "error"
                ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
                : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          {status}
        </p>
      </section>

      <section className="mt-10 space-y-4 text-slate-600 dark:text-slate-300">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {t("common.privacyTitle")}
        </h2>
        <p>
          {t("tools.pdf.imageToPdf.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.pdf.imageToPdf.privacy.after")}
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {t("common.backTo")} {" "}
        <a className="font-semibold" href={lp("/tools/pdf")}>
          {t("tools.pdf.index.title")}
        </a>
        .
      </p>
    </main>
  );
}
