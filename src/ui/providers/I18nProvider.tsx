"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { I18N_COOKIE_KEY, I18N_STORAGE_KEY, isSupportedLocale } from "@/application/i18n";
import { DICTIONARIES, DEFAULT_LOCALE, type Locale as AppLocale } from "@/languages";

export type Locale = AppLocale;

interface I18nApi {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nApi | null>(null);

export function I18nProvider({
  children,
  defaultLocale = "pt-BR"
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return defaultLocale;
    const stored = window.localStorage.getItem(I18N_STORAGE_KEY);
    if (isSupportedLocale(stored)) return stored;

    try {
      const params = new URLSearchParams(window.location.search ?? "");
      const q = params.get("lang") ?? params.get("locale");
      if (isSupportedLocale(q)) return q as AppLocale;
    } catch {
      // ignore
    }

    return defaultLocale;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(I18N_STORAGE_KEY, locale);
    } catch {
      // ignore
    }

    try {
      document.documentElement.lang = locale;
    } catch {
      // ignore
    }

    try {
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `${I18N_COOKIE_KEY}=${encodeURIComponent(locale)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
    } catch {
      // ignore
    }
  }, [locale]);

  const api = useMemo<I18nApi>(() => {
    const dict = DICTIONARIES[locale] ?? DICTIONARIES["pt-BR"];
    return {
      locale,
      setLocale,
      t: (key: string, vars?: Record<string, string | number>) => {
        const template = dict[key] ?? key;
        if (!vars) return template;
        return template.replace(/\{(\w+)\}/g, (_m, name: string) => {
          const value = vars[name];
          return value === undefined ? `{${name}}` : String(value);
        });
      }
    };
  }, [locale]);

  return <I18nContext.Provider value={api}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nApi {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
