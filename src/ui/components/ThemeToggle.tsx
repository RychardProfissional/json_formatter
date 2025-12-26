"use client";

import { useTheme } from "@/ui/providers/ThemeProvider";
import { useI18n } from "@/ui/providers/I18nProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-pressed={theme === "dark"}
    >
      {t("theme.label")}: {theme === "dark" ? t("theme.dark") : t("theme.light")}
    </button>
  );
}
