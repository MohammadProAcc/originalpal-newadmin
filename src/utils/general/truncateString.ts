export function truncateString(str: string, maxLength: number, replaceChar?: string) {
  return str.length <= maxLength ? str : str.substring(0, maxLength) + (replaceChar ?? "...");
}
