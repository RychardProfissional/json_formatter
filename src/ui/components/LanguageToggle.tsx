"use client";

import { useI18n, type Locale } from "@/ui/providers/I18nProvider";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const options: Array<{ locale: Locale; label: string }> = [
    { locale: "pt-BR", label: t("lang.pt") },
    { locale: "en", label: t("lang.en") }
  ];

  const isEnPath = pathname === "/en" || pathname.startsWith("/en/");

  function routeFor(next: Locale): string {
    if (next === "en") {
      if (isEnPath) return pathname;
      return pathname === "/" ? "/en" : `/en${pathname}`;
    }

    // pt-BR
    if (!isEnPath) return pathname;
    const stripped = pathname.replace(/^\/en(\/|$)/, "/");
    return stripped === "" ? "/" : stripped;
  }

  return (
    <div className="flex items-center gap-2">
      {options.map((o) => (
        <button
          key={o.locale}
          type="button"
          onClick={() => {
            setLocale(o.locale);
            router.push(routeFor(o.locale));
          }}
          className={
            "rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 " +
            (locale === o.locale
              ? "border-slate-300 text-slate-900 dark:border-slate-700 dark:text-slate-100"
              : "border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-200")
          }
          aria-pressed={locale === o.locale}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
