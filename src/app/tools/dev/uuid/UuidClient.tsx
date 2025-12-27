"use client";

import React, { useState } from "react";
import type { Dictionary } from "@/languages";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";
import { AdSlot } from "@/ui/components/AdSlot";
import { SITE } from "@/application/siteConfig";

export function UuidClient({ dict }: { dict: Dictionary }) {
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(1);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [statusMsg, setStatusMsg] = useState(dict["tools.dev.uuid.status.idle"]);

  function generate() {
    const uuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (!hyphens) uuid = uuid.replace(/-/g, "");
      if (uppercase) uuid = uuid.toUpperCase();
      uuids.push(uuid);
    }
    setOutput(uuids.join("\n"));
    setStatus("success");
    setStatusMsg(dict["tools.dev.uuid.status.generated"]);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ToolHeader
        title={dict["tools.dev.uuid.title"]}
        subtitle={dict["tools.dev.uuid.subtitle"]}
      />

      <AdSlot
        slot={SITE.adsenseSlots.toolContentTop}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {dict["tools.dev.uuid.quantity"]}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full p-2 rounded-lg bg-black/20 border border-white/10 focus:border-primary/50 outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-muted-foreground">
                  {dict["tools.dev.uuid.hyphens"]}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-muted-foreground">
                  {dict["tools.dev.uuid.uppercase"]}
                </span>
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {dict["tools.dev.uuid.action.generate"]}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              {dict["common.output"]}
            </label>
            {output && (
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-sm text-primary hover:underline"
              >
                {dict["common.copy"]}
              </button>
            )}
          </div>
          <textarea
            readOnly
            className="w-full h-[400px] p-4 rounded-xl bg-black/20 border border-white/10 font-mono text-sm resize-none text-muted-foreground"
            value={output}
          />
        </div>
      </div>

      <ToolSection title={dict["tools.dev.uuid.section.how"]}>
        <p className="text-muted-foreground leading-relaxed">
          {dict["tools.dev.uuid.how.body"]}
        </p>
      </ToolSection>
    </div>
  );
}
