"use client";

import { useMemo, useState } from "react";
import { escapeForJsonString, unescapeFromJsonString } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { ToolPage } from "@/ui/components/tools/ToolPage";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

export function JsonEscapeClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string>(() =>
    t("tools.json.escape.status.idle")
  );
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
    setOk(t("tools.json.escape.status.escaped"));
  }

  function onUnescape() {
    try {
      setOutput(unescapeFromJsonString(input));
      setOk(t("tools.json.escape.status.unescaped"));
    } catch {
      setErr(t("tools.json.escape.status.invalid"));
      setOutput("");
    }
  }

  return (
    <ToolPage>
      <ToolHeader
        title={t("tools.json.escape.title")}
        subtitle={t("tools.json.escape.subtitle")}
      />

      <AdSlot
        slot={SITE.adsenseSlots.toolContentTop}
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
          {t("tools.json.escape.action.escape")}
        </button>
        <button
          type="button"
          onClick={onUnescape}
          disabled={isEmpty}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {t("tools.json.escape.action.unescape")}
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
            className="mt-1 min-h-60 w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-700 dark:focus:ring-blue-950"
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
            className="mt-1 min-h-60 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
          />
        </div>
      </div>

      <ToolSection title={t("tools.json.escape.section.what")}>
        <p className="text-slate-600 dark:text-slate-300">
          {t("tools.json.escape.what.before")}
          <code>\\n</code>
          {t("tools.json.escape.what.middle1")}
          <code>\\t</code>
          {t("tools.json.escape.what.middle2")}
          <code>{'\\"'}</code>
          {t("tools.json.escape.what.after")}
        </p>
      </ToolSection>

      <ToolSection title={t("tools.json.escape.section.when")}>
        <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>{t("tools.json.escape.when.li1")}</li>
          <li>{t("tools.json.escape.when.li2")}</li>
          <li>{t("tools.json.escape.when.li3")}</li>
        </ul>
      </ToolSection>

      <ToolSection title={t("tools.json.escape.section.cautions")}>
        <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>{t("tools.json.escape.cautions.li1")}</li>
          <li>
            {t("tools.json.escape.cautions.li2.before")}
            <a className="font-semibold" href={lp("/tools/json/validator")}>
              {t("tools.json.escape.cautions.li2.link")}
            </a>
            {t("tools.json.escape.cautions.li2.after")}
          </li>
        </ul>
      </ToolSection>

      <ToolSection>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {t("common.privacyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {t("tools.json.escape.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.json.escape.privacy.after")}
        </p>
      </ToolSection>
    </ToolPage>
  );
}
