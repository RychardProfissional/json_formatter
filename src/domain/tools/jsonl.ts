import { formatJson, parseJson } from "./json";

export function prettifyJsonl(text: string, indent: number): string {
  const lines = String(text)
    .split(/\r?\n/)
    .filter((l) => l.trim().length);

  if (!lines.length) return "";

  const prettyLines = lines.map((line, idx) => {
    const parsed = parseJson(line);
    if (!parsed.ok) throw new Error(`Linha ${idx + 1}: JSON inválido`);
    return formatJson(parsed.value, indent);
  });

  return prettyLines.join("\n\n");
}
