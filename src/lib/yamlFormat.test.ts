import { describe, expect, it } from "vitest";
import { formatYaml } from "./yamlFormat";

describe("formatYaml", () => {
  it("formats a valid document with two-space indentation", () => {
    const result = formatYaml("name: Ada\nskills:\n- maths\n- code");

    expect(result.error).toBe("");
    expect(result.output).toContain("name: Ada");
    expect(result.output).toContain("  - maths");
  });

  it("returns an empty result for blank input", () => {
    expect(formatYaml("  \n")).toEqual({ output: "", error: "" });
  });

  it("keeps parse failures out of the output pane", () => {
    const result = formatYaml("name: [Ada\n");

    expect(result.output).toBe("");
    expect(result.error).toMatch(/^Invalid YAML:/);
    expect(result.error).toContain("Check indentation, quotes and colons.");
  });

  it("preserves Unicode values", () => {
    const result = formatYaml("greeting: café ☕");

    expect(result.error).toBe("");
    expect(result.output).toContain("café ☕");
  });
});
