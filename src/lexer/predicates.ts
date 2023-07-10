export function isNumber (s: string) {
  return s && /^[0-9]/.test(s);
}

export function isAlphabetic (s: string) {
  return s && /^[a-zA-Z_]/.test(s);
}

export function isAlphanumeric (s: string) {
  return s && /^[a-zA-Z0-9_]/.test(s);
}

export function isSkippable (s: string) {
  return s && /^\s/.test(s);
}
