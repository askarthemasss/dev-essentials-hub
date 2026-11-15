import { describe, expect, it } from "vitest";
import { determinant2x2, parseMatrixCell, transposeMatrix } from "./matrix";

describe("matrix helpers", () => {
  it("parses partial input as zero without losing the typed text", () => {
    expect(parseMatrixCell("5")).toBe(5);
    expect(parseMatrixCell("-4.5")).toBe(-4.5);
    expect(parseMatrixCell("-")).toBe(0);
    expect(parseMatrixCell("")).toBe(0);
  });

  it("computes determinants including negative values", () => {
    expect(determinant2x2([[1, 2], [3, 4]])).toBe(-2);
    expect(determinant2x2([[-2, 0.5], [4, 3]])).toBe(-8);
  });

  it("transposes matrices", () => {
    expect(transposeMatrix([[1, 2, 3], [4, 5, 6]])).toEqual([[1, 4], [2, 5], [3, 6]]);
    expect(transposeMatrix([])).toEqual([]);
  });
});
