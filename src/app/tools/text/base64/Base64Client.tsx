"use client";

import React, { useState } from "react";
import type { Dictionary } from "@/languages";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";

export function Base64Client({ dict }: { dict: Dictionary }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState(dict["tools.text.base64.status.idle"]);

  function handleEncode() {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setStatus("success");
      setStatusMsg(dict["tools.text.base64.status.encoded"]);
    } catch (err) {
      setStatus("error");
      setStatusMsg(dict["tools.text.base64.error.encode"]);
      console.error(err);
    }
  }

  function handleDecode() {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setStatus("success");
      setStatusMsg(dict["tools.text.base64.status.decoded"]);
    } catch (err) {
      setStatus("error");
      setStatusMsg(dict["tools.text.base64.error.decode"]);
      console.error(err);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ToolHeader
        title={dict["tools.text.base64.title"]}
        subtitle={dict["tools.text.base64.subtitle"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {dict["common.input"]}
          </label>
          <textarea
            className="w-full h-[400px] p-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm resize-none"
            placeholder="Text to encode/decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {dict["common.output"]}
          </label>
          <textarea
            readOnly
            className="w-full h-[400px] p-4 rounded-xl bg-black/20 border border-white/10 font-mono text-sm resize-none text-muted-foreground"
            value={output}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex gap-2">
          <button
            onClick={handleEncode}
            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            {dict["tools.text.base64.action.encode"]}
          </button>
          <button
            onClick={handleDecode}
            className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
          >
            {dict["tools.text.base64.action.decode"]}
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span
            className={
              "text-sm font-medium " +
              (status === "error"
                ? "text-red-400"
                : status === "success"
                ? "text-green-400"
                : "text-muted-foreground")
            }
          >
            {statusMsg}
          </span>
          {output && (
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-sm text-primary hover:underline"
            >
              {dict["common.copy"]}
            </button>
          )}
        </div>
      </div>

      <ToolSection title={dict["tools.text.base64.section.how"]}>
        <p className="text-muted-foreground leading-relaxed">
          {dict["tools.text.base64.how.body"]}
        </p>
      </ToolSection>
    </div>
  );
}
