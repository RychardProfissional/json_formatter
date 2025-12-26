export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

export type JsonParseResult =
  | { ok: true; value: JsonValue }
  | { ok: false; errorMessage: string };

export function parseJson(input: string): JsonParseResult {
  try {
    return { ok: true, value: JSON.parse(input) as JsonValue };
  } catch (err) {
    const message = err instanceof Error ? err.message : "JSON inválido";
    return { ok: false, errorMessage: message };
  }
}

export function formatJson(value: JsonValue, indent: number): string {
  return JSON.stringify(value, null, indent);
}

export function minifyJson(value: JsonValue): string {
  return JSON.stringify(value);
}
