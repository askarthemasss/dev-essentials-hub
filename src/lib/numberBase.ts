const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

export function parseBigIntInBase(input: string, base: number): bigint | null {
  if (!Number.isInteger(base) || base < 2 || base > 36) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  const negative = trimmed.startsWith("-");
  const digits = (negative ? trimmed.slice(1) : trimmed).toLowerCase();
  if (!digits) return null;

  let value = 0n;
  for (const character of digits) {
    const digit = DIGITS.indexOf(character);
    if (digit === -1 || digit >= base) return null;
    value = value * BigInt(base) + BigInt(digit);
  }
  return negative ? -value : value;
}

export function formatBigIntInBase(value: bigint, base: number, uppercase = false): string {
  if (!Number.isInteger(base) || base < 2 || base > 36) throw new Error("Base must be between 2 and 36");
  const formatted = value.toString(base);
  return uppercase ? formatted.toUpperCase() : formatted;
}

export function formatDecimal(value: number, precision = 4): string {
  if (!Number.isFinite(value)) return "";
  return String(Number(value.toFixed(precision)));
}
