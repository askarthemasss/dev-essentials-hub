import { describe, expect, it } from "vitest";
import { diffLines } from "./textDiff";

describe("diffLines", () => {
  it("reports identical text as unchanged", () => {
    expect(diffLines("a\nb", "a\nb")).toEqual([
      { type: "same", text: "a" },
      { type: "same", text: "b" },
    ]);
  });

  it("does not shift lines after an insertion", () => {
    expect(diffLines("a\nc", "a\nb\nc")).toEqual([
      { type: "same", text: "a" },
      { type: "add", text: "b" },
      { type: "same", text: "c" },
    ]);
  });

  it("reports removals", () => {
    expect(diffLines("a\nb\nc", "a\nc")).toEqual([
      { type: "same", text: "a" },
      { type: "remove", text: "b" },
      { type: "same", text: "c" },
    ]);
  });

  it("represents a replacement as a removal followed by an addition", () => {
    expect(diffLines("old", "new")).toEqual([
      { type: "remove", text: "old" },
      { type: "add", text: "new" },
    ]);
  });

  it("handles empty inputs", () => {
    expect(diffLines("", "a")).toEqual([
      { type: "remove", text: "" },
      { type: "add", text: "a" },
    ]);
    expect(diffLines("a", "")).toEqual([
      { type: "remove", text: "a" },
      { type: "add", text: "" },
    ]);
  });
});
