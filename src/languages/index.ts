import { EN } from "./en";
import { PT_BR } from "./pt-br";
import { es } from "./es";
import { fr } from "./fr";

export type Locale = string;

export type Dictionary = Record<string, string>;

export const SUPPORTED_LOCALES = ["pt-BR", "en", "es", "fr"] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: SupportedLocale = "pt-BR";

export const dictionaries: Record<SupportedLocale, typeof PT_BR> = {
  "pt-BR": PT_BR,
  en: EN,
  es,
  fr,
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}
