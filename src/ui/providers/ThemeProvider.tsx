"use client";

import React, { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/application/theme";
import { BrowserStorage } from "@/infra/browser/storage";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storage = useMemo(() => new BrowserStorage(), []);

  const subscribe = useCallback((onStoreChange: () => void) => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      onStoreChange();
    };
    const onLocal = () => onStoreChange();

    window.addEventListener("storage", onStorage);
    window.addEventListener("rt:theme", onLocal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("rt:theme", onLocal);
    };
  }, []);

  const themeSnapshot = useSyncExternalStore<Theme | undefined>(
    subscribe,
    () => {
      const stored = storage.get(THEME_STORAGE_KEY) as Theme | null;
      if (stored === "dark" || stored === "light") return stored;
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
      return prefersDark ? "dark" : "light";
    },
    () => undefined
  );

  const theme: Theme = themeSnapshot ?? "light";

  const setTheme = useCallback(
    (t: Theme) => {
      storage.set(THEME_STORAGE_KEY, t);
      window.dispatchEvent(new Event("rt:theme"));
    },
    [storage]
  );

  useEffect(() => {
    if (themeSnapshot === undefined) return;
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    storage.set(THEME_STORAGE_KEY, theme);
  }, [theme, themeSnapshot, storage]);

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
