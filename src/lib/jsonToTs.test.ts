import { describe, expect, it } from "vitest";
import { jsonToTypeScript } from "./jsonToTs";

describe("jsonToTypeScript", () => {
  it("emits a type alias for root arrays", () => {
    const output = jsonToTypeScript([{ id: 1, name: "Alice" }]);
    expect(output).toContain("type Root = RootItem[];");
    expect(output).toContain("interface RootItem {");
    expect(output).toContain("id: number;");
    expect(output).toContain("name: string;");
    expect(output).not.toContain("interface Root {");
  });

  it("handles primitive roots and nested arrays", () => {
    expect(jsonToTypeScript("hello")).toBe("type Root = string;");
    expect(jsonToTypeScript(42)).toBe("type Root = number;");
    expect(jsonToTypeScript([[1, 2], [3]])).toBe("type Root = number[][];");
    expect(jsonToTypeScript([])).toBe("type Root = unknown[];");
  });

  it("quotes non-identifier keys and escapes quotes", () => {
    const output = jsonToTypeScript({ "first-name": "a", "123": 1, 'a"b': true });
    expect(output).toContain('"first-name": string;');
    expect(output).toContain('"123": number;');
    expect(output).toContain('"a\\"b": boolean;');
  });

  it("merges object shapes inside arrays and marks missing keys optional", () => {
    const output = jsonToTypeScript([{ id: 1 }, { id: 2, name: "x" }]);
    expect(output).toContain("id: number;");
    expect(output).toContain("name?: string;");
  });

  it("uses unions for mixed array values", () => {
    expect(jsonToTypeScript([1, "a"])).toBe("type Root = (number | string)[];");
    expect(jsonToTypeScript([true, false, true])).toBe("type Root = boolean[];");
  });

  it("builds nested interfaces for objects and arrays of objects", () => {
    const output = jsonToTypeScript({
      address: { city: "Springfield" },
      contacts: [{ email: "a@example.com" }],
    });
    expect(output).toContain("interface Root {");
    expect(output).toContain("address: RootAddress;");
    expect(output).toContain("contacts: RootContactsItem[];");
    expect(output).toContain("interface RootAddress {");
    expect(output).toContain("interface RootContactsItem {");
  });
});
