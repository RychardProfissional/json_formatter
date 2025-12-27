import { EN } from "./en";
import { PT_BR } from "./pt-br";

export type Locale = string;

export type Dictionary = Record<string, string>;

export const DICTIONARIES: Record<string, Dictionary> = {
  "pt-BR": PT_BR,
  en: EN
};

export const DEFAULT_LOCALE = "pt-BR";

export const SUPPORTED_LOCALES = Object.keys(DICTIONARIES) as string[];
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value as string);
}
