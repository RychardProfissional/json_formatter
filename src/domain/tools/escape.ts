export function escapeForJsonString(input: string): string {
  return JSON.stringify(String(input)).slice(1, -1);
}

export function unescapeFromJsonString(input: string): string {
  // Treat the input as a JSON string literal.
  // We escape quotes to keep it parseable.
  return JSON.parse('"' + String(input).replace(/"/g, '\\"') + '"') as string;
}
