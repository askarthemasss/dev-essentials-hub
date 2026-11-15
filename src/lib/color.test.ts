import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  parseColor,
  rgbToHsl,
  toHex,
  toHslCss,
  toOpaqueHex,
  toRgbaCss,
} from "./color";

describe("parseColor", () => {
  it("parses short and long hex colors", () => {
    expect(parseColor("#3498db")).toEqual({ r: 52, g: 152, b: 219, a: 1 });
    expect(parseColor("3498db")).toEqual({ r: 52, g: 152, b: 219, a: 1 });
    expect(parseColor("#abc")).toEqual({ r: 170, g: 187, b: 204, a: 1 });
  });

  it("parses hex alpha and rgb percentages", () => {
    const alpha = parseColor("#abcd");
    expect(alpha?.a).toBeCloseTo(221 / 255);
    expect(parseColor("rgb(100%, 0%, 50%)")).toEqual({ r: 255, g: 0, b: 128, a: 1 });
    expect(parseColor("rgba(1, 2, 3, 0.25)")).toEqual({ r: 1, g: 2, b: 3, a: 0.25 });
    expect(parseColor("rgb(0 128 255 / 50%)")).toEqual({ r: 0, g: 128, b: 255, a: 0.5 });
  });

  it("rejects malformed and out-of-range colors", () => {
    for (const value of ["", "#12", "#gggggg", "rgb(300, 0, 0)", "rgba(0, 0, 0, 2)", "hsl(0, 100%, 50%)"]) {
      expect(parseColor(value)).toBeNull();
    }
  });
});

describe("color formatting", () => {
  it("round-trips opaque and translucent hex", () => {
    expect(toHex({ r: 52, g: 152, b: 219, a: 1 })).toBe("#3498db");
    expect(toHex({ r: 255, g: 255, b: 255, a: 0.5 })).toBe("#ffffff80");
    expect(toOpaqueHex({ r: 52, g: 152, b: 219, a: 0.2 })).toBe("#3498db");
  });

  it("formats rgb and hsl output", () => {
    expect(toRgbaCss({ r: 52, g: 152, b: 219, a: 1 })).toBe("rgb(52, 152, 219)");
    expect(toRgbaCss({ r: 52, g: 152, b: 219, a: 0.5 })).toBe("rgba(52, 152, 219, 0.5)");
    expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
    expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
    expect(toHslCss({ r: 0, g: 0, b: 255, a: 1 })).toBe("hsl(240, 100%, 50%)");
  });
});

describe("contrastRatio", () => {
  it("uses the WCAG relative luminance formula", () => {
    const white = parseColor("#ffffff");
    const black = parseColor("#000000");
    expect(white && black ? contrastRatio(white, black) : 0).toBeCloseTo(21);
    expect(white && black ? contrastRatio(white, white) : 0).toBeCloseTo(1);
  });

  it("is symmetric", () => {
    const first = parseColor("#777777");
    const second = parseColor("#ffffff");
    expect(first && second ? contrastRatio(first, second) : 0).toBeCloseTo(
      first && second ? contrastRatio(second, first) : 0
    );
  });
});
