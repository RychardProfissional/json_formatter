"use client";

import { useTheme } from "@/ui/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-pressed={theme === "dark"}
    >
      Tema: {theme === "dark" ? "Escuro" : "Claro"}
    </button>
  );
}
