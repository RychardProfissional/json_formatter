"use client";

import React, { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { CONSENT_STORAGE_KEY, type ConsentChoice, type ConsentState } from "@/application/consent";
import { SITE } from "@/application/siteConfig";
import { BrowserStorage } from "@/infra/browser/storage";

type ConsentContextValue = {
  choice: ConsentChoice | null;
  openPreferences: () => void;
  accept: () => void;
  reject: () => void;
};

const ConsentContext = React.createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = React.useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

function readStored(storage: BrowserStorage): ConsentState | null {
  const raw = storage.get(CONSENT_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed?.choice) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(storage: BrowserStorage, choice: ConsentChoice) {
  const state: ConsentState = { choice, at: new Date().toISOString() };
  storage.set(CONSENT_STORAGE_KEY, JSON.stringify(state));
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const storage = useMemo(() => new BrowserStorage(), []);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = readStored(storage);
    if (!stored) {
      setIsOpen(true);
      return;
    }
    setChoice(stored.choice);
  }, [storage]);

  const api = useMemo<ConsentContextValue>(
    () => ({
      choice,
      openPreferences: () => setIsOpen(true),
      accept: () => {
        writeStored(storage, "accept");
        setChoice("accept");
        setIsOpen(false);
      },
      reject: () => {
        writeStored(storage, "reject");
        setChoice("reject");
        setIsOpen(false);
      }
    }),
    [choice, storage]
  );

  return (
    <ConsentContext.Provider value={api}>
      {/* Scripts: carregam apenas após consentimento */}
      {choice === "accept" ? (
        <>
          <Script
            id="plausible"
            src="https://plausible.io/js/script.js"
            data-domain={SITE.plausibleDomain}
            strategy="afterInteractive"
          />
          <Script
            id="adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
              SITE.adsenseClient
            )}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      ) : null}
      {choice === "reject" ? (
        <>
          <Script
            id="adsense-npa"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html:
                "window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.requestNonPersonalizedAds = 1;"
            }}
          />
          <Script
            id="adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
              SITE.adsenseClient
            )}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      ) : null}

      {children}

      {isOpen ? <ConsentBanner /> : null}
    </ConsentContext.Provider>
  );
}

function ConsentBanner() {
  const { accept, reject } = useConsent();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">Privacidade e cookies</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Usamos cookies/tecnologias semelhantes para exibir anúncios e medir uso do site.
          </p>
          <p className="text-sm">
            <a className="text-blue-700 hover:underline dark:text-blue-300" href="/politica-de-privacidade">
              Ver política
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
