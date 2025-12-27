"use client";

import { useMemo, useState } from "react";
import { parseJson } from "@/domain/tools";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";
import { useI18n } from "@/ui/providers/I18nProvider";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { ToolPage } from "@/ui/components/tools/ToolPage";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

export function JsonValidatorClient() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string }>({
    ok: false,
    message: t("tools.json.validator.status.idle"),
  });

  const isEmpty = useMemo(() => input.trim().length === 0, [input]);

  function onValidate() {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      setResult({ ok: false, message: parsed.errorMessage });
      return;
    }
    setResult({ ok: true, message: t("tools.json.validator.status.valid") });
  }

  return (
    <ToolPage>
      <ToolHeader
        title={t("tools.json.validator.title")}
        subtitle={t("tools.json.validator.subtitle")}
      />

      <AdSlot
        slot={SITE.adsenseSlots.tools}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onValidate}
          disabled={isEmpty}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("common.validate")}
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
          {t("common.json")}
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
        {t("tools.json.validator.tip.before")}
        <a className="font-semibold" href={lp("/tools/json/formatter")}>
          {t("tools.json.validator.tip.link")}
        </a>
        {t("tools.json.validator.tip.after")}
      </p>

      <ToolSection title={t("tools.json.validator.section.what")}>
        <p className="text-slate-600 dark:text-slate-300">
          {t("tools.json.validator.what.body")}
        </p>
      </ToolSection>

      <ToolSection title={t("tools.json.validator.section.fix")}>
        <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>{t("tools.json.validator.fix.li1")}</li>
          <li>{t("tools.json.validator.fix.li2")}</li>
          <li>{t("tools.json.validator.fix.li3")}</li>
          <li>
            {t("tools.json.validator.fix.li4.before")}
            <a className="font-semibold" href={lp("/tools/json/formatter")}>
              {t("tools.json.validator.fix.li4.link")}
            </a>
            {t("tools.json.validator.fix.li4.after")}
          </li>
        </ul>
      </ToolSection>

      <ToolSection>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {t("common.privacyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {t("tools.json.validator.privacy.before")}
          <a className="font-semibold" href={lp("/politica-de-privacidade")}>
            {t("common.privacyPolicy")}
          </a>
          {t("tools.json.validator.privacy.after")}
        </p>
      </ToolSection>
    </ToolPage>
  );
}
