import { describe, expect, it } from "vitest";
import { escapeHtml, escapeMarkdownTableCell, escapeXml } from "./markup";

describe("markup escaping", () => {
  it("escapes HTML text and attributes", () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;"
    );
  });

  it("escapes XML including apostrophes", () => {
    expect(escapeXml(`<loc>a&b</loc>`)).toBe("&lt;loc&gt;a&amp;b&lt;/loc&gt;");
    expect(escapeXml("'")).toBe("&apos;");
  });

  it("escapes markdown table cells", () => {
    expect(escapeMarkdownTableCell("a|b\\c\nd")).toBe("a\\|b\\\\c<br>d");
  });
});
