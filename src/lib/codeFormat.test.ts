import { describe, expect, it } from "vitest";
import {
  beautifyCss,
  beautifyHtml,
  beautifyJavaScript,
  minifyCss,
  minifyHtml,
  minifyJavaScript,
} from "./codeFormat";

describe("JavaScript formatting", () => {
  it("beautifies code without splitting string literals", async () => {
    const output = await beautifyJavaScript('const value="a;{b}";function add(a,b){return a+b;}');
    expect(output).toContain('"a;{b}"');
    expect(output).toContain("function add(a, b)");
  });

  it("minifies without removing comments inside strings", () => {
    const output = minifyJavaScript('const url = "https://example.com//path"; // comment\nconst n = 1 + 2;');
    expect(output).toContain("https://example.com//path");
    expect(output).not.toContain("// comment");
    expect(output).not.toContain("1 + 2");
  });

  it("reports invalid JavaScript", () => {
    expect(() => minifyJavaScript("function {")).toThrow();
  });
});

describe("CSS formatting", () => {
  it("beautifies without corrupting strings or URLs", async () => {
    const output = await beautifyCss('a{background:url("a;b.png");content:"x;y"}');
    expect(output).toContain('url("a;b.png")');
    expect(output).toContain('"x;y"');
    expect(output).toContain("a {");
  });

  it("minifies while preserving string content", () => {
    const output = minifyCss('/* note */ .a { background: url("a b.png"); content: "x ; y"; }');
    expect(output).not.toContain("note");
    expect(output).toContain("url(a\\ b.png)");
    expect(output).toContain('"x ; y"');
  });
});

describe("HTML formatting", () => {
  it("beautifies markup with > inside attributes", async () => {
    const output = await beautifyHtml('<div><img alt="a > b"><span>Text</span></div>');
    expect(output).toContain('alt="a > b"');
    expect(output).toContain("<span>Text</span>");
  });

  it("minifies without touching preformatted content", () => {
    const output = minifyHtml(
      '<div>  <!-- remove -->  <p>  Hello   world </p><pre>  keep\n   this  </pre><script>const s = "a  b";</script></div>'
    );
    expect(output).not.toContain("remove");
    expect(output).toContain("<pre>  keep\n   this  </pre>");
    expect(output).toContain('const s = "a  b";');
  });
});
