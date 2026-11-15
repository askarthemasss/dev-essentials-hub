import { describe, expect, it } from "vitest";
import { decodeHtmlEntities, encodeHtmlEntities } from "./htmlEntities";

describe("HTML entities", () => {
  it("encodes the special HTML characters", () => {
    expect(encodeHtmlEntities(`<a href="x">Tom & Jerry's</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;"
    );
  });

  it("decodes entities without stripping markup", () => {
    expect(decodeHtmlEntities("&lt;b&gt;hi&lt;/b&gt; &amp; bye")).toBe("<b>hi</b> & bye");
    expect(decodeHtmlEntities("<b>hi</b> &amp; bye")).toBe("<b>hi</b> & bye");
  });

  it("decodes numeric entities and leaves unknown entities alone", () => {
    expect(decodeHtmlEntities("&#65;&#x42;&nbsp;")).toBe("AB\u00a0");
    expect(decodeHtmlEntities("&unknown;")).toBe("&unknown;");
  });

  it("round-trips encoded text", () => {
    const source = `<div class="a">'Tom & Jerry'</div>`;
    expect(decodeHtmlEntities(encodeHtmlEntities(source))).toBe(source);
  });
});
