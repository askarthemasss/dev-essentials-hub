import { describe, expect, it } from "vitest";
import { isConversionResult } from "./conversion";

describe("isConversionResult", () => {
  it("accepts normal conversion output", () => {
    expect(isConversionResult("aGVsbG8=")).toBe(true);
    expect(isConversionResult("name: Alice")).toBe(true);
    expect(isConversionResult("<root><item/></root>")).toBe(true);
  });

  it("rejects blank output and error messages", () => {
    expect(isConversionResult("")).toBe(false);
    expect(isConversionResult("   ")).toBe(false);
    expect(isConversionResult("Error: Invalid Base64 input")).toBe(false);
    expect(isConversionResult("Invalid input: unexpected token")).toBe(false);
    expect(isConversionResult("Input must be a non-empty array of objects")).toBe(false);
    expect(isConversionResult("Could not convert document")).toBe(false);
  });
});
