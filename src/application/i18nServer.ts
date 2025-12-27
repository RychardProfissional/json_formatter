import { dictionaries, DEFAULT_LOCALE } from "@/languages";

export type RouteLocaleParam = string | undefined;

export function getDict(locale?: RouteLocaleParam) {
  const defaultDict = dictionaries[DEFAULT_LOCALE];
  if (!locale) return defaultDict;

  // @ts-expect-error - we know locale is a string, but it might not be a valid key
  const targetDict = dictionaries[locale];

  if (!targetDict) return defaultDict;

  // Merge: default (pt-BR) as base, target as override
  return { ...defaultDict, ...targetDict };
}

// Legacy: kept for compatibility but app now uses query-param `lang`.
export function localePrefix(locale?: RouteLocaleParam): string {
  if (!locale || locale === DEFAULT_LOCALE) return "";
  return `/${locale}`;
}

// New helper: produce a query string fragment to append to paths when
// the locale is provided via query (e.g. `?lang=pt-BR`). Returns empty
// string for default/undefined locale.
export function localeQuery(locale?: RouteLocaleParam): string {
  if (!locale || locale === DEFAULT_LOCALE) return "";
  return `?lang=${encodeURIComponent(locale)}`;
}
