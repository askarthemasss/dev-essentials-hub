import { describe, expect, it } from "vitest";
import { formatXml, tokenizeXml } from "./xml";

describe("XML formatting", () => {
  it("indents nested elements", () => {
    expect(formatXml("<root><item>A</item><item>B</item></root>")).toBe(
      ["<root>", "  <item>A</item>", "  <item>B</item>", "</root>"].join("\n")
    );
  });

  it("does not split tags that contain a greater-than sign in an attribute", () => {
    const source = '<root><node title="a > b" data-x=\'c > d\'>value</node></root>';
    const output = formatXml(source);

    expect(output).toContain('<node title="a > b" data-x=\'c > d\'>value</node>');
    expect(output).toBe(
      ["<root>", '  <node title="a > b" data-x=\'c > d\'>value</node>', "</root>"].join("\n")
    );
  });

  it("keeps self-closing tags on one line without changing indentation", () => {
    expect(formatXml('<root><br/><img src="x"/></root>')).toBe(
      ["<root>", "  <br/>", '  <img src="x"/>', "</root>"].join("\n")
    );
  });

  it("preserves declarations, comments, CDATA and doctypes", () => {
    const source =
      '<?xml version="1.0"?><root><!-- note --><![CDATA[<raw>]]><!DOCTYPE ignored></root>';
    const tokens = tokenizeXml(source);

    expect(tokens.map((token) => token.type)).toEqual([
      "declaration",
      "open",
      "comment",
      "cdata",
      "doctype",
      "close",
    ]);
    expect(formatXml(source)).toContain("<!-- note -->");
    expect(formatXml(source)).toContain("<![CDATA[<raw>]]>");
    expect(formatXml(source)).toContain("<?xml version=\"1.0\"?>");
  });

  it("handles doctypes with an internal subset", () => {
    const source = '<!DOCTYPE note [ <!ELEMENT note (#PCDATA)> ]><note>x</note>';
    const tokens = tokenizeXml(source);

    expect(tokens[0]).toEqual({
      type: "doctype",
      value: "<!DOCTYPE note [ <!ELEMENT note (#PCDATA)> ]>",
    });
    expect(formatXml(source)).toBe(
      "<!DOCTYPE note [ <!ELEMENT note (#PCDATA)> ]>\n<note>x</note>"
    );
  });

  it("returns an empty string for blank input and keeps plain text", () => {
    expect(formatXml("   \n  ")).toBe("");
    expect(formatXml("plain text")).toBe("plain text");
  });
});
