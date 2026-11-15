import { describe, expect, it } from "vitest";
import { evaluateJsonPath, formatJsonPathResult, parseJsonPath } from "./jsonPath";

const data = {
  users: [{ name: "Ada", "a.b": 1 }],
  "weird key": { value: 2 },
  tags: ["x", "y"],
};

describe("parseJsonPath", () => {
  it("supports dot, bracket and quoted-key notation", () => {
    expect(parseJsonPath("$.users[0].name")).toEqual(["users", 0, "name"]);
    expect(parseJsonPath("$['weird key'].value")).toEqual(["weird key", "value"]);
    expect(parseJsonPath('$["users"][0]["a.b"]')).toEqual(["users", 0, "a.b"]);
    expect(parseJsonPath("[0].name")).toEqual([0, "name"]);
    expect(parseJsonPath("$")).toEqual([]);
  });

  it("rejects malformed paths", () => {
    for (const path of ["$.users[", "$['unterminated]", "$[]", "$..users", "$.users."]) {
      expect(() => parseJsonPath(path)).toThrow();
    }
  });
});

describe("evaluateJsonPath", () => {
  it("evaluates paths from object and array roots", () => {
    expect(evaluateJsonPath(data, "$")).toBe(data);
    expect(evaluateJsonPath(data, "$.users[0].name")).toBe("Ada");
    expect(evaluateJsonPath(data, "$['weird key'].value")).toBe(2);
    expect(evaluateJsonPath(data, '$["users"][0]["a.b"]')).toBe(1);
    expect(evaluateJsonPath(data, "$.tags.length")).toBe(2);
    expect(evaluateJsonPath([{ name: "root array" }], "$[0].name")).toBe("root array");
    expect(evaluateJsonPath(data, "users[1].name")).toBeUndefined();
  });

  it("does not resolve inherited properties", () => {
    expect(evaluateJsonPath({}, "$.constructor")).toBeUndefined();
    expect(evaluateJsonPath({}, "$.__proto__")).toBeUndefined();
  });

  it("formats results for display", () => {
    expect(formatJsonPathResult(undefined)).toBe("undefined");
    expect(formatJsonPathResult(null)).toBe("null");
    expect(formatJsonPathResult("text")).toBe("text");
    expect(formatJsonPathResult({ a: 1 })).toBe('{\n  "a": 1\n}');
  });
});
