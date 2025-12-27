"use client";

import { useI18n, type Locale } from "@/ui/providers/I18nProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SUPPORTED_LOCALES } from "@/application/i18n";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const router = useRouter();

  const options: Array<{ locale: Locale; label: string }> = SUPPORTED_LOCALES.map((loc) => {
    const short = loc.split("-")[0];
    const labelKey = `lang.${short}`;
    return { locale: loc as Locale, label: t(labelKey) };
  });

  function routeFor(next: Locale): string {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("lang", next);
    const qs = params.toString();
    return pathname + (qs ? `?${qs}` : "");
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
