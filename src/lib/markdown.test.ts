import { describe, expect, it } from "vitest";
import { htmlToMarkdown, markdownToHtml, markdownToSafeHtml } from "./markdown";

describe("markdown helpers", () => {
  it("renders common Markdown", () => {
    const html = markdownToHtml("# Title\n\n**bold** and `code`");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<code>code</code>");
  });

  it("sanitizes scripts and unsafe links", () => {
    const html = markdownToSafeHtml('<script>alert("xss")</script>\n\n[x](javascript:alert(1))');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("javascript:");
  });

  it("adds safe link attributes", () => {
    const html = markdownToSafeHtml("[example](https://example.com)");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("converts HTML back to Markdown", () => {
    const markdown = htmlToMarkdown("<h1>Title</h1><p><strong>Bold</strong> and <em>italic</em></p>");
    expect(markdown).toContain("# Title");
    expect(markdown).toContain("**Bold**");
    expect(markdown).toContain("_italic_");
  });

  it("drops scripts when converting HTML to Markdown", () => {
    const markdown = htmlToMarkdown('<script>alert("xss")</script><p>Safe</p>');
    expect(markdown).toBe("Safe");
  });
});
