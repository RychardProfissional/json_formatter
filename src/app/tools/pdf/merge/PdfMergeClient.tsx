"use client";

import { useState } from "react";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { mergePdfs } from "@/domain/tools";
import { ToolPage } from "@/ui/components/tools/ToolPage";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

function downloadBytes(
  bytes: ArrayBuffer | Uint8Array,
  filename: string,
  mime: string
) {
  const view =
    bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes as ArrayBuffer);
  const blob = new Blob([(view as unknown) as BlobPart], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function PdfMergeClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>(() =>
    t("tools.pdf.merge.status.idle")
  );
  const [statusKind, setStatusKind] = useState<"ok" | "error" | "">("");

  const hasFiles = files.length > 0;

  function setOk(msg: string) {
    setStatusKind("ok");
    setStatus(msg);
  }

  function setErr(msg: string) {
    setStatusKind("error");
    setStatus(msg);
  }

  async function onMerge() {
    try {
      setStatusKind("");
      setStatus(t("tools.pdf.merge.status.working"));

      const buffers = await Promise.all(files.map((f) => f.arrayBuffer()));
      const out = await mergePdfs(buffers);
      downloadBytes(out, t("tools.pdf.merge.downloadName"), "application/pdf");
      setOk(t("tools.pdf.merge.status.done"));
    } catch {
      setErr(t("tools.pdf.merge.status.error"));
    }
  }

  function onClear() {
    setFiles([]);
    setStatusKind("");
    setStatus(t("tools.pdf.merge.status.idle"));
  }

  return (
    <ToolPage>
      <ToolHeader
        title={t("tools.pdf.merge.title")}
        subtitle={t("tools.pdf.merge.subtitle")}
      />

      <AdSlot
        slot={SITE.adsenseSlots.toolContentTop}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <ToolSection>
        <label className="text-sm font-semibold" htmlFor="pdfs">
          {t("tools.pdf.merge.inputLabel")}
        </label>
        <input
          id="pdfs"
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="mt-2 block w-full text-sm"
        />

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {t("tools.pdf.merge.selected.before", { count: files.length })}
          <span className="font-semibold">{files.length}</span>
          {t("tools.pdf.merge.selected.after")}
        </p>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {t("tools.pdf.merge.tip")}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onMerge}
            disabled={!hasFiles}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("tools.pdf.merge.action")}
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
      </ToolSection>

      <ToolSection>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {t("common.privacyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {t("tools.pdf.merge.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.pdf.merge.privacy.after")}
        </p>
      </ToolSection>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {t("common.backTo")}{" "}
        <a className="font-semibold" href={lp("/tools/pdf")}>
          {t("tools.pdf.index.title")}
        </a>
        .
      </p>
    </ToolPage>
  );
}
