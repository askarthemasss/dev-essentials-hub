import { describe, expect, it } from "vitest";
import { EMOJIS, searchEmojis } from "./emoji";

const emojiList = (query: string) => searchEmojis(query).map((entry) => entry.emoji);

describe("searchEmojis", () => {
  it("returns every emoji for an empty query", () => {
    expect(searchEmojis("")).toHaveLength(EMOJIS.length);
    expect(searchEmojis("   ")).toHaveLength(EMOJIS.length);
  });

  it("searches names and keywords case-insensitively", () => {
    expect(emojiList("rocket")).toContain("🚀");
    expect(emojiList("COMPUTER")).toContain("💻");
    expect(emojiList("heart")).toContain("❤️");
    expect(emojiList("coffee")).toContain("☕");
  });

  it("requires every search term to match", () => {
    expect(emojiList("party celebrate")).toContain("🎉");
    expect(emojiList("party pizza")).toEqual([]);
  });

  it("returns no results for unknown terms", () => {
    expect(searchEmojis("not-a-real-emoji-name")).toEqual([]);
  });
});
