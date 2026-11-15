export interface MacAddressFormats {
  normalized: string;
  colon: string;
  dash: string;
  dot: string;
  raw: string;
}

/**
 * Accepts 12 hexadecimal digits with optional colon, dash, dot or whitespace
 * separators. Anything containing other characters or the wrong length is
 * rejected instead of being silently stripped into a different address.
 */
export function formatMacAddress(input: string): MacAddressFormats | null {
  const compact = input.trim().replace(/[\s:.-]/g, "").toUpperCase();
  if (!/^[0-9A-F]{12}$/.test(compact)) return null;

  const groups = compact.match(/.{2}/g) ?? [];
  return {
    normalized: compact,
    colon: groups.join(":"),
    dash: groups.join("-"),
    dot: (compact.match(/.{4}/g) ?? []).join("."),
    raw: compact,
  };
}
