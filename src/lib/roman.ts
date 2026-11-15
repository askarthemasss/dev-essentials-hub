const NUMERAL_VALUES: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const VALID_ROMAN = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function toRoman(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new Error("Enter a whole number between 1 and 3999");
  }

  let remaining = value;
  let result = "";
  for (const [amount, symbol] of NUMERAL_VALUES) {
    while (remaining >= amount) {
      result += symbol;
      remaining -= amount;
    }
  }
  return result;
}

export function fromRoman(input: string): number {
  const value = input.trim().toUpperCase();
  if (!value || !VALID_ROMAN.test(value)) {
    throw new Error("Enter a valid Roman numeral between I and MMMCMXCIX");
  }

  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    const current = numeralValue(value[index]);
    const next = index + 1 < value.length ? numeralValue(value[index + 1]) : 0;
    total += current < next ? -current : current;
  }
  return total;
}

function numeralValue(symbol: string): number {
  const values: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  return values[symbol] ?? 0;
}

export function convertRomanInput(input: string): { value: string; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { value: "", error: "" };

  try {
    if (/^\d+$/.test(trimmed)) {
      return { value: toRoman(Number(trimmed)), error: "" };
    }
    return { value: String(fromRoman(trimmed)), error: "" };
  } catch (caught) {
    return { value: "", error: caught instanceof Error ? caught.message : "Invalid Roman numeral" };
  }
}
