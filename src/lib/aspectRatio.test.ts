import { describe, expect, it } from "vitest";
import { calculateAspectRatio } from "./aspectRatio";

describe("calculateAspectRatio", () => {
  it("simplifies whole-number dimensions", () => {
    expect(calculateAspectRatio(1920, 1080)).toMatchObject({
      simplifiedWidth: 16,
      simplifiedHeight: 9,
      divisor: 120,
    });
    expect(calculateAspectRatio(1000, 500)).toMatchObject({
      simplifiedWidth: 2,
      simplifiedHeight: 1,
    });
    expect(calculateAspectRatio(7, 3)?.decimal).toBeCloseTo(2.3333, 4);
  });

  it("handles equal dimensions and prime numbers", () => {
    expect(calculateAspectRatio(800, 800)).toMatchObject({ simplifiedWidth: 1, simplifiedHeight: 1 });
    expect(calculateAspectRatio(17, 13)).toMatchObject({ simplifiedWidth: 17, simplifiedHeight: 13 });
  });

  it("returns null for empty, fractional, zero, negative and non-finite input", () => {
    for (const [width, height] of [
      [Number.NaN, 1080],
      [1920, Number.NaN],
      [0, 1080],
      [1920, 0],
      [-1920, 1080],
      [1920.5, 1080],
      [Number.POSITIVE_INFINITY, 1080],
    ]) {
      expect(calculateAspectRatio(width, height)).toBeNull();
    }
  });
});
