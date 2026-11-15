import { describe, expect, it } from "vitest";
import {
  countCharactersWithoutWhitespace,
  countGraphemes,
  countParagraphs,
  countSentences,
  countWords,
} from "./textStats";

describe("text statistics", () => {
  it("counts grapheme clusters instead of UTF-16 code units", () => {
    expect(countGraphemes("abc")).toBe(3);
    expect(countGraphemes("a👍")).toBe(2);
    expect(countGraphemes("👨‍👩‍👧‍👦")).toBe(1);
    expect(countGraphemes("e\u0301")).toBe(1);
    expect(countGraphemes("")).toBe(0);
  });

  it("counts characters without whitespace", () => {
    expect(countCharactersWithoutWhitespace("a b\tc\nd")).toBe(4);
    expect(countCharactersWithoutWhitespace("👍 👍")).toBe(2);
  });

  it("counts words", () => {
    expect(countWords("  hello   world\nagain ")).toBe(3);
    expect(countWords(" \n\t ")).toBe(0);
  });

  it("counts sentences without splitting repeated punctuation", () => {
    expect(countSentences("Hello... World. Again!")).toBe(3);
    expect(countSentences("Hello.World")).toBe(1);
    expect(countSentences("")).toBe(0);
  });

  it("counts paragraphs", () => {
    expect(countParagraphs("one\n\ntwo\n\n\nthree")).toBe(3);
    expect(countParagraphs("one\ntwo")).toBe(1);
    expect(countParagraphs(" ")).toBe(0);
  });
});
