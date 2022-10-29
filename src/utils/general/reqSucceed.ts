export function reqSucceed (response: any) {
  return !(response instanceof Error || null);
}
