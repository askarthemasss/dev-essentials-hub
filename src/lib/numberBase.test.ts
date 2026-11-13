import { describe, expect, it } from "vitest";
import { formatBigIntInBase, parseBigIntInBase } from "./numberBase";

describe("number base helpers", () => {
  it("parses integers in arbitrary bases", () => {
    expect(parseBigIntInBase("ff", 16)).toBe(255n);
    expect(parseBigIntInBase("11111111", 2)).toBe(255n);
    expect(parseBigIntInBase("377", 8)).toBe(255n);
    expect(parseBigIntInBase("-1010", 2)).toBe(-10n);
    expect(parseBigIntInBase("zz", 36)).toBe(1295n);
  });

  it("rejects digits outside the base", () => {
    expect(parseBigIntInBase("2", 2)).toBeNull();
    expect(parseBigIntInBase("g", 16)).toBeNull();
    expect(parseBigIntInBase("", 10)).toBeNull();
    expect(parseBigIntInBase("10", 1)).toBeNull();
  });

  it("formats integers in arbitrary bases", () => {
    expect(formatBigIntInBase(255n, 16)).toBe("ff");
    expect(formatBigIntInBase(255n, 16, true)).toBe("FF");
    expect(formatBigIntInBase(-10n, 2)).toBe("-1010");
    expect(formatBigIntInBase(12345678901234567890n, 10)).toBe("12345678901234567890");
  });
});
