import { describe, expect, it } from "vitest";
import { convertRomanInput, fromRoman, toRoman } from "./roman";

describe("roman numerals", () => {
  it("converts numbers to numerals", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
    expect(toRoman(42)).toBe("XLII");
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  it("rejects out-of-range and fractional numbers", () => {
    for (const value of [0, -1, 4000, 1.5, Number.NaN]) {
      expect(() => toRoman(value)).toThrow();
    }
  });

  it("parses valid numerals", () => {
    expect(fromRoman("XLII")).toBe(42);
    expect(fromRoman("mcmxciv")).toBe(1994);
    expect(fromRoman("  MMMCMXCIX  ")).toBe(3999);
  });

  it("rejects malformed or out-of-range numerals", () => {
    for (const value of ["", "IIII", "IC", "ABC", "MMMM", "IVI", "0"]) {
      expect(() => fromRoman(value)).toThrow();
    }
  });

  it("round-trips every supported number", () => {
    for (let value = 1; value <= 3999; value += 1) {
      expect(fromRoman(toRoman(value))).toBe(value);
    }
  });

  it("converts either direction for the UI", () => {
    expect(convertRomanInput("42")).toEqual({ value: "XLII", error: "" });
    expect(convertRomanInput("xlii")).toEqual({ value: "42", error: "" });
    expect(convertRomanInput("")).toEqual({ value: "", error: "" });
    expect(convertRomanInput("0").error).toMatch(/1 and 3999/);
    expect(convertRomanInput("IIII").error).toMatch(/valid Roman numeral/);
  });
});
