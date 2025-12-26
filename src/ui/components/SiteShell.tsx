"use client";

import React from "react";
import { useI18n } from "@/ui/providers/I18nProvider";
import { ThemeToggle } from "@/ui/components/ThemeToggle";
import { CookiePrefsLink } from "@/ui/components/CookiePrefsLink";
import { LanguageToggle } from "@/ui/components/LanguageToggle";
import { useLocalePath } from "@/ui/hooks/useLocalePath";

export function SiteShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function Header() {
  const { t } = useI18n();
  const lp = useLocalePath();

  const nav = [
    { href: lp("/"), label: t("nav.home") },
    { href: lp("/tools"), label: t("nav.tools") },
    { href: lp("/blog"), label: t("nav.blog") },
    { href: lp("/sobre"), label: t("nav.about") },
    { href: lp("/contato"), label: t("nav.contact") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <nav className="flex flex-wrap items-center gap-2">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  const lp = useLocalePath();

  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">{t("footer.tagline")}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a href={lp("/politica-de-privacidade")} className="font-semibold">
            {t("legal.privacy")}
          </a>
          <a href={lp("/termos-de-uso")} className="font-semibold">
            {t("legal.terms")}
          </a>
          <a href={lp("/sobre")} className="font-semibold">
            {t("nav.about")}
          </a>
          <a href={lp("/contato")} className="font-semibold">
            {t("nav.contact")}
          </a>
          <CookiePrefsLink />
        </div>
      </div>
    </footer>
  );
}
