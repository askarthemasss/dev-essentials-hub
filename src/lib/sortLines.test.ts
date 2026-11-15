import { describe, expect, it } from "vitest";
import { sortLines } from "./sortLines";

describe("sortLines", () => {
  it("sorts alphabetically case-insensitively", () => {
    expect(sortLines("banana\nApple\ncherry", "asc")).toBe("Apple\nbanana\ncherry");
    expect(sortLines("banana\nApple\ncherry", "desc")).toBe("cherry\nbanana\nApple");
  });

  it("sorts numerically rather than lexically", () => {
    expect(sortLines("10\n2\n1\n30", "numeric-asc")).toBe("1\n2\n10\n30");
    expect(sortLines("10\n2\n1\n30", "numeric-desc")).toBe("30\n10\n2\n1");
  });

  it("keeps non-numeric lines after numeric ones", () => {
    expect(sortLines("apple\n10\n2", "numeric-asc")).toBe("2\n10\napple");
    expect(sortLines("apple\n10\n2", "numeric-desc")).toBe("10\n2\napple");
  });

  it("uses the first number when sorting labeled lines", () => {
    expect(sortLines("item 10\nitem 2\nitem 1", "numeric-asc")).toBe("item 1\nitem 2\nitem 10");
  });

  it("random mode preserves every line", () => {
    const source = "one\ntwo\nthree\nfour";
    const result = sortLines(source, "random");
    expect(result.split("\n").sort()).toEqual(source.split("\n").sort());
  });
});
