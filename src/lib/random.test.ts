import { describe, expect, it } from "vitest";
import {
  generatePassword,
  secureRandomInt,
  secureRandomIntegers,
  shuffleSecure,
} from "./random";

const SYMBOLS = /^[!@#$%^&*()_+\-=[\]{}|;:,.<>?]$/;

describe("secure random values", () => {
  it("returns values inside the requested bound", () => {
    expect(secureRandomInt(1)).toBe(0);
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const value = secureRandomInt(10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(10);
    }
  });

  it("rejects invalid bounds", () => {
    for (const bound of [0, -1, 1.5, 2 ** 32 + 1]) {
      expect(() => secureRandomInt(bound)).toThrow();
    }
  });

  it("generates integers within an inclusive range", () => {
    const values = secureRandomIntegers(-5, 5, 250);
    expect(values).toHaveLength(250);
    expect(values.every((value) => Number.isInteger(value) && value >= -5 && value <= 5)).toBe(true);
  });

  it("rejects invalid ranges and counts", () => {
    expect(() => secureRandomIntegers(10, 1, 1)).toThrow();
    expect(() => secureRandomIntegers(1, 10, 0)).toThrow();
    expect(() => secureRandomIntegers(1, 10, 1001)).toThrow();
    expect(() => secureRandomIntegers(1.5, 10, 1)).toThrow();
    expect(() => secureRandomIntegers(0, 2 ** 32, 1)).toThrow();
  });

  it("shuffles without losing values", () => {
    const source = [1, 2, 3, 4, 5];
    const shuffled = shuffleSecure(source);
    expect(shuffled).toHaveLength(source.length);
    expect([...shuffled].sort()).toEqual(source);
    expect(source).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("generatePassword", () => {
  it("includes every selected character class", () => {
    const password = generatePassword(32, {
      upper: true,
      lower: true,
      numbers: true,
      symbols: true,
    });
    expect(password).toHaveLength(32);
    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[0-9]/);
    expect([...password].some((character) => SYMBOLS.test(character))).toBe(true);
  });

  it("only uses the selected character sets", () => {
    const password = generatePassword(64, {
      upper: false,
      lower: false,
      numbers: false,
      symbols: true,
    });
    expect(password).toHaveLength(64);
    expect([...password].every((character) => SYMBOLS.test(character))).toBe(true);
  });

  it("rejects invalid lengths and an empty selection", () => {
    for (const length of [3, 129, 8.5]) {
      expect(() =>
        generatePassword(length, { upper: true, lower: true, numbers: true, symbols: true })
      ).toThrow();
    }
    expect(() =>
      generatePassword(16, { upper: false, lower: false, numbers: false, symbols: false })
    ).toThrow();
  });
});
