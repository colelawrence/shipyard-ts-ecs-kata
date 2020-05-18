export function invariant(cond: any, message: string) {
  if (!cond) throw new Error(`Invariant: ${JSON.stringify(message)}`);
}
