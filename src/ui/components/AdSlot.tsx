"use client";

import React, { useEffect, useRef } from "react";
import { useConsent } from "@/ui/providers/ConsentProvider";
import { SITE } from "@/application/siteConfig";

function canRender(el: HTMLElement | null): boolean {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  if (!rect || rect.width <= 0) return false;
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return false;
  return true;
}

export function AdSlot({
  slot,
  className,
  minHeight = 250
}: {
  slot: string;
  className?: string;
  minHeight?: number;
}) {
  const { choice } = useConsent();
  const insRef = useRef<HTMLModElement | null>(null);
  const rendered = useRef(false);

  const enabled = choice === "accept" || choice === "reject";
  const client = SITE.adsenseClient;

  useEffect(() => {
    if (!enabled) return;
    if (!slot) return;
    if (rendered.current) return;

    const ins = insRef.current as unknown as HTMLElement | null;
    if (!ins) return;

    const tryRender = (attemptsLeft: number) => {
      if (rendered.current) return;
      const shell = ins.parentElement;
      if (!canRender(shell) || !canRender(ins)) {
        if (attemptsLeft <= 0) return;
        setTimeout(() => requestAnimationFrame(() => tryRender(attemptsLeft - 1)), 120);
        return;
      }
      try {
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle?.push({});
        rendered.current = true;
      } catch {
        // ignore
      }
    };

    tryRender(8);
  }, [enabled, slot]);

  if (!enabled) return null;
  if (!slot) return null;

  return (
    <div className={className} style={{ minHeight }}>
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
