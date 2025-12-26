import { EN } from "./en";
import { PT_BR } from "./pt-br";

export type Locale = "pt-BR" | "en";

export type Dictionary = Record<string, string>;

export const DICTIONARIES: Record<Locale, Dictionary> = {
  "pt-BR": PT_BR,
  en: EN
};

export const SUPPORTED_LOCALES = ["pt-BR", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
