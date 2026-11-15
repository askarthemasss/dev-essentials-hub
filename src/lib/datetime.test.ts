import { describe, expect, it } from "vitest";
import { toDateTimeLocalValue } from "./datetime";

describe("toDateTimeLocalValue", () => {
  it("formats a date using local time rather than UTC", () => {
    const date = new Date(2024, 0, 2, 3, 4, 5);

    expect(toDateTimeLocalValue(date)).toBe("2024-01-02T03:04");
    expect(toDateTimeLocalValue(date, true)).toBe("2024-01-02T03:04:05");
  });

  it("pads every component", () => {
    expect(toDateTimeLocalValue(new Date(2024, 10, 9, 8, 7, 6), true)).toBe("2024-11-09T08:07:06");
  });

  it("returns an empty string for an invalid date", () => {
    expect(toDateTimeLocalValue(new Date(Number.NaN))).toBe("");
  });
});
