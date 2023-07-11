export function isAlphanumeric (s: string) {
  return s && /^[a-zA-Z0-9_]/.test(s);
}

export function isSkippable (s: string) {
  return s && /^\s/.test(s);
}
