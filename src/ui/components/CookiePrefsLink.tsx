"use client";

import { useConsent } from "@/ui/providers/ConsentProvider";
import { useI18n } from "@/ui/providers/I18nProvider";

export function CookiePrefsLink() {
  const { openPreferences } = useConsent();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="font-semibold text-blue-700 hover:underline dark:text-blue-300"
    >
      {t("legal.cookiePrefs")}
    </button>
  );
}
