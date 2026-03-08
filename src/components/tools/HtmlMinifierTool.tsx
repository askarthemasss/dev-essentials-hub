import DualPane from "./DualPane";

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

const HtmlMinifierTool = () => (
  <DualPane
    title="HTML Minifier"
    inputLabel="HTML"
    outputLabel="Minified"
    placeholder="Paste HTML…"
    process={minifyHtml}
  />
);

export default HtmlMinifierTool;
