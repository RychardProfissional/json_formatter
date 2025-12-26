"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Locale = "pt-BR" | "en";

type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": {
    "nav.home": "Respawn Tech",
    "nav.tools": "Ferramentas",
    "nav.blog": "Blog",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "footer.tagline": "Respawn Tech existe para devolver tempo a quem cria.",
    "legal.privacy": "Política de Privacidade",
    "legal.terms": "Termos de Uso",
    "legal.cookiePrefs": "Preferências de cookies"
  },
  en: {
    "nav.home": "Respawn Tech",
    "nav.tools": "Tools",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "footer.tagline": "Respawn Tech helps you move faster.",
    "legal.privacy": "Privacy Policy",
    "legal.terms": "Terms of Use",
    "legal.cookiePrefs": "Cookie preferences"
  }
};

interface I18nApi {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nApi | null>(null);

export function I18nProvider({
  children,
  defaultLocale = "pt-BR"
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const api = useMemo<I18nApi>(() => {
    const dict = dictionaries[locale] ?? dictionaries["pt-BR"];
    return {
      locale,
      setLocale,
      t: (key: string) => dict[key] ?? key
    };
  }, [locale]);

  return <I18nContext.Provider value={api}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nApi {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
