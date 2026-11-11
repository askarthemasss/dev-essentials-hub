import { describe, expect, it } from "vitest";
import { evaluateExpression } from "./evaluateExpression";

describe("evaluateExpression", () => {
  it("respects operator precedence", () => {
    expect(evaluateExpression("1 + 2 * 3")).toBe(7);
    expect(evaluateExpression("(1 + 2) * 3")).toBe(9);
  });

  it("supports exponents, factorials and functions", () => {
    expect(evaluateExpression("2^3^2")).toBe(512);
    expect(evaluateExpression("2**3")).toBe(8);
    expect(evaluateExpression("sqrt(16) + 5!")).toBe(124);
    expect(evaluateExpression("log(1000)")).toBeCloseTo(3);
    expect(evaluateExpression("sin(pi / 2)")).toBeCloseTo(1);
  });

  it("accepts calculator symbols and Unicode constants", () => {
    expect(evaluateExpression("6 × 7 ÷ 2 − 1")).toBe(20);
    expect(evaluateExpression("π")).toBeCloseTo(Math.PI);
  });

  it("rejects unsafe or malformed input", () => {
    expect(() => evaluateExpression("")).toThrow("Enter an expression");
    expect(() => evaluateExpression("1 / 0")).toThrow("Division by zero");
    expect(() => evaluateExpression("alert(1)")).toThrow('Unknown function "alert"');
    expect(() => evaluateExpression("2 +")).toThrow("Unexpected end of expression");
    expect(() => evaluateExpression("sqrt(-1)")).toThrow("negative");
    expect(() => evaluateExpression("process.exit()")).toThrow();
  });
});
