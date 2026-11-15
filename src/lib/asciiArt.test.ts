import { describe, expect, it } from "vitest";
import { textToAsciiArt } from "./asciiArt";

describe("textToAsciiArt", () => {
  it("renders supported characters as five-row artwork", () => {
    expect(textToAsciiArt("A")).toBe([" ###", "#   #", "#####", "#   #", "#   #"].join("\n"));
    expect(textToAsciiArt("Hi").split("\n")).toHaveLength(5);
    expect(textToAsciiArt("AZ09!?").split("\n")).toHaveLength(5);
  });

  it("distinguishes letters instead of replacing everything with question marks", () => {
    const a = textToAsciiArt("A");
    const b = textToAsciiArt("B");
    const z = textToAsciiArt("Z");
    expect(a).not.toBe(b);
    expect(b).not.toBe(z);
    expect(a).not.toBe(textToAsciiArt("é"));
  });

  it("renders lowercase using uppercase glyphs", () => {
    expect(textToAsciiArt("hi")).toBe(textToAsciiArt("HI"));
  });

  it("supports multiple lines and spaces", () => {
    const output = textToAsciiArt("A B\nC");
    const blocks = output.split("\n\n");
    expect(blocks).toHaveLength(2);
    expect(blocks[0].split("\n")).toHaveLength(5);
    expect(blocks[0]).toContain("  ");
  });

  it("returns an empty string for blank input", () => {
    expect(textToAsciiArt("")).toBe("");
    expect(textToAsciiArt("   \n ")).toBe("");
  });
});
