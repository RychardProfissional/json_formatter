"use client";

import React from "react";
import { useI18n } from "@/ui/providers/I18nProvider";
import { CookiePrefsLink } from "@/ui/components/CookiePrefsLink";
import { LanguageToggle } from "@/ui/components/LanguageToggle";
import { useLocalePath } from "@/ui/hooks/useLocalePath";
import { Suspense } from "react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none animate-pulse-slow" />

      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const { t, locale } = useI18n();
  const lp = useLocalePath(locale);

  const nav = [
    { href: lp("/"), label: t("nav.home") },
    { href: lp("/tools"), label: t("nav.tools") },
    { href: lp("/blog"), label: t("nav.blog") },
    { href: lp("/sobre"), label: t("nav.about") },
    { href: lp("/contato"), label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <div className="glass rounded-2xl flex items-center justify-between gap-3 px-4 py-3 shadow-2xl shadow-black/20">
        <nav className="flex flex-wrap items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 transition-all duration-200"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
            }
          >
            <LanguageToggle />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t, locale } = useI18n();
  const lp = useLocalePath(locale);

  return (
    <footer className="border-t border-white/5 bg-black/20 py-12 mt-20 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href={lp("/politica-de-privacidade")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("legal.privacy")}
            </a>
            <a
              href={lp("/termos-de-uso")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("legal.terms")}
            </a>
            <a
              href={lp("/sobre")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href={lp("/contato")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </a>
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <CookiePrefsLink />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
