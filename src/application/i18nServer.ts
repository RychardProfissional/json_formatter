import { EN } from "@/languages/en";
import { PT_BR } from "@/languages/pt-br";

export type RouteLocaleParam = string | undefined;

export function getDict(locale?: RouteLocaleParam) {
  return locale === "en" ? EN : PT_BR;
}

export function localePrefix(locale?: RouteLocaleParam) {
  return locale === "en" ? "/en" : "";
}
