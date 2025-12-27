"use client";

import { DEFAULT_LOCALE } from "@/application/i18n";

export function useLocalePath(targetLocale?: string) {
  return (path: string) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const to = targetLocale ?? undefined;
    if (!to || to === DEFAULT_LOCALE) return normalized;
    const qs = `?lang=${encodeURIComponent(to)}`;
    return `${normalized}${qs}`;
  };
}
