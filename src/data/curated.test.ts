import { describe, expect, it } from "vitest";
import { getToolsByIds, popularToolIds, popularTools } from "./curated";
import { tools } from "./tools";

describe("curated tool lists", () => {
  it("references only real tools without duplicates", () => {
    expect(new Set(popularToolIds).size).toBe(popularToolIds.length);
    expect(popularTools).toHaveLength(popularToolIds.length);
    expect(popularTools.every((tool) => tools.some((entry) => entry.id === tool.id))).toBe(true);
  });

  it("preserves the requested order and skips missing ids", () => {
    expect(getToolsByIds(["uuid-generator", "missing", "json-formatter"]).map((tool) => tool.id)).toEqual([
      "uuid-generator",
      "json-formatter",
    ]);
  });
});
