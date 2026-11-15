const BASE = 36;
const T_MIN = 1;
const T_MAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;

function adapt(delta: number, numberOfPoints: number, firstTime: boolean): number {
  let value = firstTime ? Math.floor(delta / DAMP) : delta >> 1;
  value += Math.floor(value / numberOfPoints);
  let k = 0;
  while (value > ((BASE - T_MIN) * T_MAX) >> 1) {
    value = Math.floor(value / (BASE - T_MIN));
    k += BASE;
  }
  return k + Math.floor(((BASE - T_MIN + 1) * value) / (value + SKEW));
}

function digitToBasic(digit: number): string {
  return String.fromCharCode(digit < 26 ? digit + 97 : digit - 26 + 48);
}

function basicToDigit(code: number): number {
  if (code >= 48 && code <= 57) return code - 22;
  if (code >= 65 && code <= 90) return code - 65;
  if (code >= 97 && code <= 122) return code - 97;
  return BASE;
}

export function encodePunycodeLabel(label: string): string {
  const codePoints = Array.from(label, (character) => character.codePointAt(0) ?? 0);
  const output: number[] = codePoints.filter((codePoint) => codePoint < 0x80);
  const basicLength = output.length;

  let handled = basicLength;
  if (basicLength > 0) output.push(0x2d);

  let n = INITIAL_N;
  let delta = 0;
  let bias = INITIAL_BIAS;

  while (handled < codePoints.length) {
    const next = Math.min(...codePoints.filter((codePoint) => codePoint >= n));
    delta += (next - n) * (handled + 1);
    n = next;

    for (const codePoint of codePoints) {
      if (codePoint < n) {
        delta += 1;
      } else if (codePoint === n) {
        let q = delta;
        for (let k = BASE; ; k += BASE) {
          const threshold = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
          if (q < threshold) break;
          output.push(digitToBasic(threshold + ((q - threshold) % (BASE - threshold))).charCodeAt(0));
          q = Math.floor((q - threshold) / (BASE - threshold));
        }
        output.push(digitToBasic(q).charCodeAt(0));
        bias = adapt(delta, handled + 1, handled === basicLength);
        delta = 0;
        handled += 1;
      }
    }

    delta += 1;
    n += 1;
  }

  return String.fromCharCode(...output);
}

export function decodePunycodeLabel(label: string): string {
  const output: number[] = [];
  let index = 0;

  const basicEnd = label.lastIndexOf("-");
  if (basicEnd > 0) {
    for (let position = 0; position < basicEnd; position += 1) {
      output.push(label.charCodeAt(position));
    }
    index = basicEnd + 1;
  }

  let n = INITIAL_N;
  let delta = 0;
  let bias = INITIAL_BIAS;

  while (index < label.length) {
    let weight = 1;

    for (let k = BASE; ; k += BASE) {
      if (index >= label.length) throw new Error("Invalid punycode label");
      const digit = basicToDigit(label.charCodeAt(index));
      index += 1;
      if (digit >= BASE) throw new Error("Invalid punycode digit");

      delta += digit * weight;
      const threshold = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
      if (digit < threshold) break;
      weight *= BASE - threshold;
    }

    const outputLength = output.length + 1;
    bias = adapt(delta, outputLength, outputLength === 1);
    n += Math.floor(delta / outputLength);
    delta %= outputLength;
    output.splice(delta, 0, n);
    delta += 1;
  }

  if (output.some((codePoint) => codePoint > 0x10ffff)) {
    throw new Error("Invalid punycode code point");
  }
  return String.fromCodePoint(...output);
}

function mapLabels(domain: string, transform: (label: string) => string): string {
  return domain
    .split(".")
    .map((label) => (label ? transform(label) : label))
    .join(".");
}

export function encodePunycodeDomain(domain: string): string {
  return mapLabels(domain.trim(), (label) => {
    if ([...label].every((character) => (character.codePointAt(0) ?? 0) < 0x80)) {
      return label.toLowerCase();
    }
    return `xn--${encodePunycodeLabel(label.toLowerCase())}`;
  });
}

export function decodePunycodeDomain(domain: string): string {
  return mapLabels(domain.trim(), (label) => {
    if (!/^xn--/i.test(label)) return label;
    try {
      const decoded = decodePunycodeLabel(label.slice(4).toLowerCase());
      return decoded || label;
    } catch {
      return label;
    }
  });
}
