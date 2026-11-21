import { describe, expect, it } from "vitest";
import { formatJson } from "./jsonFormat";

describe("formatJson", () => {
  it("formats valid JSON with two-space indentation", () => {
    expect(formatJson('{"name":"Ada","tags":["math","code"]}')).toEqual({
      output: '{\n  "name": "Ada",\n  "tags": [\n    "math",\n    "code"\n  ]\n}',
      error: "",
    });
  });

  it("returns an empty result for blank input", () => {
    expect(formatJson("   \n")).toEqual({ output: "", error: "" });
  });

  it("keeps parse failures out of the output pane", () => {
    const result = formatJson('{"name": }');

    expect(result.output).toBe("");
    expect(result.error).toMatch(/^Invalid JSON:/);
    expect(result.error).toContain("Check for a missing comma, quote or bracket.");
  });

  it("formats primitives and preserves Unicode", () => {
    expect(formatJson('"café ☕"')).toEqual({ output: '"café ☕"', error: "" });
    expect(formatJson("42").output).toBe("42");
  });
});
