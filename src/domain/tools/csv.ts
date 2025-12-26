import type { JsonValue } from "./json";

export function jsonToCsv(value: JsonValue): string {
  const rows = Array.isArray(value) ? value : [value];
  if (!rows.length) return "";

  const objects = rows.map((r) => {
    if (r && typeof r === "object" && !Array.isArray(r)) return r as Record<string, JsonValue>;
    throw new Error("Para JSON→CSV, use um objeto ou array de objetos.");
  });

  const headers = Array.from(new Set(objects.flatMap((o) => Object.keys(o))));

  const esc = (v: JsonValue): string => {
    if (v === null || v === undefined) return "";
    const s = typeof v === "string" ? v : JSON.stringify(v);
    const needsQuote = /[\n\r,\"]/g.test(s);
    const q = s.replace(/\"/g, '"').replace(/"/g, '""');
    return needsQuote ? `"${q}"` : q;
  };

  const lines: string[] = [];
  lines.push(headers.join(","));
  for (const obj of objects) {
    lines.push(headers.map((h) => esc(obj[h] ?? "" as unknown as JsonValue)).join(","));
  }
  return lines.join("\n");
}

// Simple CSV parser (no complex quoted commas). Matches legacy behavior.
export function csvToJson(text: string): Array<Record<string, string>> {
  const lines = String(text)
    .split(/\r?\n/)
    .filter((l) => l.trim().length);

  if (lines.length < 2) throw new Error("CSV precisa de header + pelo menos 1 linha.");

  const headers = lines[0].split(",").map((h) => h.trim());
  const data: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = (cols[idx] || "").trim();
    });
    data.push(obj);
  }

  return data;
}
