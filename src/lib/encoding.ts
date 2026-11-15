const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function bytesToBinary(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return binary;
}

function binaryToBytes(binary: string): Uint8Array {
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export function encodeBase64(text: string): string {
  return btoa(bytesToBinary(new TextEncoder().encode(text)));
}

export function decodeBase64(encoded: string): string {
  const normalized = encoded.replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.length % 4 === 1) {
    throw new Error("Invalid Base64 input");
  }
  return new TextDecoder().decode(binaryToBytes(atob(normalized)));
}

export function encodeBase32(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bits = "";
  for (const byte of bytes) bits += byte.toString(2).padStart(8, "0");
  while (bits.length % 5 !== 0) bits += "0";

  let result = "";
  for (let index = 0; index < bits.length; index += 5) {
    result += BASE32_ALPHABET[Number.parseInt(bits.slice(index, index + 5), 2)];
  }
  while (result.length % 8 !== 0) result += "=";
  return result;
}

export function decodeBase32(encoded: string): string {
  const normalized = encoded.replace(/\s+/g, "").replace(/=+$/, "").toUpperCase();
  if (!/^[A-Z2-7]*$/.test(normalized)) {
    throw new Error("Invalid Base32 input");
  }
  if ([1, 3, 6].includes(normalized.length % 8)) {
    throw new Error("Invalid Base32 length");
  }

  let bits = "";
  for (const character of normalized) {
    bits += BASE32_ALPHABET.indexOf(character).toString(2).padStart(5, "0");
  }

  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(bits.slice(index * 8, index * 8 + 8), 2);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeBase58(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let number = 0n;
  for (const byte of bytes) number = number * 256n + BigInt(byte);

  let result = "";
  while (number > 0n) {
    result = BASE58_ALPHABET[Number(number % 58n)] + result;
    number /= 58n;
  }

  for (const byte of bytes) {
    if (byte !== 0) break;
    result = "1" + result;
  }
  return result;
}

export function decodeBase58(encoded: string): string {
  const normalized = encoded.trim();
  let number = 0n;
  for (const character of normalized) {
    const index = BASE58_ALPHABET.indexOf(character);
    if (index === -1) throw new Error("Invalid Base58 character");
    number = number * 58n + BigInt(index);
  }

  const bytes: number[] = [];
  while (number > 0n) {
    bytes.unshift(Number(number % 256n));
    number /= 256n;
  }

  const leadingZeros = normalized.match(/^1*/)?.[0].length ?? 0;
  for (let index = 0; index < leadingZeros; index += 1) bytes.unshift(0);
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function encodeHex(text: string): string {
  return Array.from(new TextEncoder().encode(text), (byte) => byte.toString(16).padStart(2, "0")).join(" ");
}

export function decodeHex(encoded: string): string {
  const normalized = encoded.replace(/\s+/g, "");
  if (!/^[0-9a-fA-F]*$/.test(normalized) || normalized.length % 2 !== 0) {
    throw new Error("Invalid hexadecimal input");
  }
  const bytes = new Uint8Array(normalized.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(normalized.slice(index * 2, index * 2 + 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeBinary(text: string): string {
  return Array.from(new TextEncoder().encode(text), (byte) => byte.toString(2).padStart(8, "0")).join(" ");
}

export function decodeBinary(encoded: string): string {
  const normalized = encoded.trim();
  if (!normalized) return "";
  const groups = normalized.split(/\s+/);
  if (groups.some((group) => !/^[01]{8}$/.test(group))) {
    throw new Error("Binary input must contain 8-bit groups");
  }
  return new TextDecoder().decode(Uint8Array.from(groups, (group) => Number.parseInt(group, 2)));
}

function unicodeEscape(codePoint: number): string {
  if (codePoint <= 0xffff) return `\\u${codePoint.toString(16).padStart(4, "0")}`;
  const offset = codePoint - 0x10000;
  const high = 0xd800 + (offset >> 10);
  const low = 0xdc00 + (offset & 0x3ff);
  return `\\u${high.toString(16)}\\u${low.toString(16)}`;
}

export function escapeUnicode(text: string): string {
  let result = "";
  for (const character of text) {
    const codePoint = character.codePointAt(0) ?? 0;
    result += codePoint > 0x7f ? unicodeEscape(codePoint) : character;
  }
  return result;
}

export function unescapeUnicode(text: string): string {
  return text.replace(/\\u(?:\{([0-9a-fA-F]+)\}|([0-9a-fA-F]{4}))/g, (match, braced, short) => {
    const codePoint = Number.parseInt(braced ?? short, 16);
    if (codePoint > 0x10ffff) return match;
    return String.fromCodePoint(codePoint);
  });
}

export function escapeString(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .split(String.fromCharCode(8))
    .join("\\b")
    .replace(/\f/g, "\\f");
}

const STRING_ESCAPES: Record<string, string> = {
  "\\": "\\",
  '"': '"',
  "'": "'",
  n: "\n",
  r: "\r",
  t: "\t",
  b: "\b",
  f: "\f",
  v: "\v",
  "0": "\0",
};

export function unescapeString(text: string): string {
  return text.replace(/\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|.)/g, (match, escape) => {
    if (escape.startsWith("u{")) return String.fromCodePoint(Number.parseInt(escape.slice(2, -1), 16));
    if (escape.startsWith("u") && escape.length === 5) return String.fromCharCode(Number.parseInt(escape.slice(1), 16));
    if (escape.startsWith("x") && escape.length === 3) return String.fromCharCode(Number.parseInt(escape.slice(1), 16));
    return STRING_ESCAPES[escape] ?? match;
  });
}

export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
