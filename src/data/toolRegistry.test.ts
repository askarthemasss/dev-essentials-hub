import { describe, expect, it } from "vitest";
import { tools } from "@/data/tools";
import { getToolComponent, toolComponentIds } from "@/data/toolRegistry";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

describe("tool registry", () => {
  it("has a component for every tool in the catalogue", () => {
    const missing = tools.filter((tool) => !getToolComponent(tool.id)).map((tool) => tool.id);
    expect(missing).toEqual([]);
  });

  it("does not expose components that are missing from the catalogue", () => {
    const toolIds = new Set(tools.map((tool) => normalize(tool.id)));
    const orphaned = [...toolComponentIds].filter((id) => !toolIds.has(id));
    expect(orphaned).toEqual([]);
  });

  it("keeps the catalogue and component count in sync", () => {
    expect(toolComponentIds.size).toBe(tools.length);
  });

  it("resolves ids independently of punctuation and casing", () => {
    expect(getToolComponent("json-yaml")).toBe(getToolComponent("JSONYAML"));
    expect(getToolComponent("does-not-exist")).toBeUndefined();
  });
});
