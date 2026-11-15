import { describe, expect, it } from "vitest";
import {
  decodeBase32,
  decodeBase58,
  decodeBase64,
  decodeBinary,
  decodeHex,
  encodeBase32,
  encodeBase58,
  encodeBase64,
  encodeBinary,
  encodeHex,
  escapeString,
  escapeUnicode,
  slugify,
  unescapeString,
  unescapeUnicode,
} from "./encoding";

describe("base64", () => {
  it("round-trips unicode text", () => {
    const source = "Hello, 世界! 😀";
    expect(decodeBase64(encodeBase64(source))).toBe(source);
  });

  it("accepts wrapped input", () => {
    expect(decodeBase64("SGVsbG8s\nIFdvcmxkIQ==")).toBe("Hello, World!");
  });

  it("rejects invalid input", () => {
    expect(() => decodeBase64("not base64!")).toThrow();
    expect(() => decodeBase64("A")).toThrow();
  });
});

describe("base32", () => {
  it("encodes RFC 4648 vectors", () => {
    expect(encodeBase32("Hello")).toBe("JBSWY3DP");
    expect(encodeBase32("")).toBe("");
  });

  it("round-trips unicode text", () => {
    const source = "Hello, 世界! 😀";
    expect(decodeBase32(encodeBase32(source))).toBe(source);
  });

  it("rejects invalid characters and lengths", () => {
    expect(() => decodeBase32("JBSWY3DP!")).toThrow();
    expect(() => decodeBase32("JBSWY3")).toThrow();
    expect(() => decodeBase32("J")).toThrow();
  });
});

describe("base58", () => {
  it("preserves leading zero bytes", () => {
    expect(encodeBase58("\0")).toBe("1");
    expect(decodeBase58("1")).toBe("\0");
    expect(decodeBase58("111")).toBe("\0\0\0");
  });

  it("round-trips unicode text", () => {
    const source = "Hello, 世界! 😀";
    expect(decodeBase58(encodeBase58(source))).toBe(source);
  });

  it("rejects ambiguous characters", () => {
    expect(() => decodeBase58("0OIl")).toThrow();
  });
});

describe("hex and binary", () => {
  it("encodes UTF-8 bytes", () => {
    expect(encodeHex("A😀")).toBe("41 f0 9f 98 80");
    expect(decodeHex("41 f0 9f 98 80")).toBe("A😀");
  });

  it("rejects malformed hex", () => {
    expect(() => decodeHex("abc")).toThrow();
    expect(() => decodeHex("zz")).toThrow();
  });

  it("round-trips binary text", () => {
    expect(encodeBinary("A😀")).toBe("01000001 11110000 10011111 10011000 10000000");
    expect(decodeBinary("01000001 11110000 10011111 10011000 10000000")).toBe("A😀");
  });

  it("rejects malformed binary", () => {
    expect(() => decodeBinary("101")).toThrow();
    expect(() => decodeBinary("101010102")).toThrow();
  });
});

describe("unicode escapes", () => {
  it("escapes astral characters as surrogate pairs", () => {
    expect(escapeUnicode("A😀é")).toBe("A\\ud83d\\ude00\\u00e9");
  });

  it("unescapes both escape styles", () => {
    expect(unescapeUnicode("A\\uD83D\\uDE00\\u00e9")).toBe("A😀é");
    expect(unescapeUnicode("\\u{1f600}")).toBe("😀");
  });
});

describe("string escapes", () => {
  it("round-trips quotes, newlines, tabs and literal escapes", () => {
    const source = 'He said "hi"\\n\nnext\tline\\';
    expect(unescapeString(escapeString(source))).toBe(source);
  });

  it("does not turn a literal backslash-n into a newline", () => {
    expect(unescapeString("\\\\n")).toBe("\\n");
  });

  it("supports unicode and hex escapes", () => {
    expect(unescapeString("\\u0041\\x42")).toBe("AB");
  });

  it("escapes and unescapes backspace", () => {
    const source = `a${String.fromCharCode(8)}b`;
    expect(escapeString(source)).toBe("a\\bb");
    expect(unescapeString("a\\bb")).toBe(source);
  });
});

describe("slugify", () => {
  it("normalizes accents, punctuation and separators", () => {
    expect(slugify("  Café & Crème -- Test  ")).toBe("cafe-creme-test");
    expect(slugify("Hello, World!")).toBe("hello-world");
    expect(slugify("__already___snake__")).toBe("already-snake");
    expect(slugify("---")).toBe("");
  });
});
