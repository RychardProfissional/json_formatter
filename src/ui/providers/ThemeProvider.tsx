"use client";

import React, { useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/application/theme";
import { BrowserStorage } from "@/infra/browser/storage";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storage = useMemo(() => new BrowserStorage(), []);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = storage.get(THEME_STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const initial: Theme = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    setTheme(initial);
  }, [storage]);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    storage.set(THEME_STORAGE_KEY, theme);
  }, [theme, storage]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const ThemeContext = React.createContext<
  { theme: Theme; setTheme: (t: Theme) => void } | null
>(null);

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
