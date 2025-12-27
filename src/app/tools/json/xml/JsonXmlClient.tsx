"use client";

import React, { useState } from "react";
import type { Dictionary } from "@/languages";
import { ToolHeader } from "@/ui/components/tools/ToolHeader";
import { ToolSection } from "@/ui/components/tools/ToolSection";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

export function JsonXmlClient({ dict }: { dict: Dictionary }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState(dict["tools.json.xml.status.idle"]);

  function handleToJson() {
    try {
      const parser = new XMLParser();
      const jsonObj = parser.parse(input);
      if (!jsonObj || Object.keys(jsonObj).length === 0) throw new Error("Invalid XML");
      setOutput(JSON.stringify(jsonObj, null, 2));
      setStatus("success");
      setStatusMsg(dict["tools.json.xml.status.toJson"]);
    } catch (err) {
      setStatus("error");
      setStatusMsg(dict["tools.json.xml.error.toJson"]);
      console.error(err);
    }
  }

  function handleToXml() {
    try {
      const parsed = JSON.parse(input);
      const builder = new XMLBuilder({ format: true, ignoreAttributes: false });
      const xmlStr = builder.build(parsed);
      setOutput(xmlStr);
      setStatus("success");
      setStatusMsg(dict["tools.json.xml.status.toXml"]);
    } catch (err) {
      setStatus("error");
      setStatusMsg(dict["tools.json.xml.error.toXml"]);
      console.error(err);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ToolHeader
        title={dict["tools.json.xml.title"]}
        subtitle={dict["tools.json.xml.subtitle"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {dict["common.input"]}
          </label>
          <textarea
            className="w-full h-[400px] p-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm resize-none"
            placeholder="JSON or XML..."
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
            onClick={handleToXml}
            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            {dict["tools.json.xml.action.toXml"]}
          </button>
          <button
            onClick={handleToJson}
            className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
          >
            {dict["tools.json.xml.action.toJson"]}
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

      <ToolSection title={dict["tools.json.xml.section.how"]}>
        <p className="text-muted-foreground leading-relaxed">
          {dict["tools.json.xml.how.body"]}
        </p>
      </ToolSection>

      <ToolSection title={dict["tools.json.xml.section.privacy"]}>
        <p className="text-muted-foreground leading-relaxed">
          {dict["tools.json.xml.privacy.before"]}
          <a href="/politica-de-privacidade" className="text-primary hover:underline">
            {dict["common.privacyPolicy"]}
          </a>
          {dict["tools.json.xml.privacy.after"]}
        </p>
      </ToolSection>
    </div>
  );
}
