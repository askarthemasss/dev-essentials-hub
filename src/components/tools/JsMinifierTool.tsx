import DualPane from "./DualPane";

function minifyJs(code: string): string {
  return code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\n\s*/g, "")
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const JsMinifierTool = () => (
  <DualPane
    title="JavaScript Minifier"
    inputLabel="JavaScript"
    outputLabel="Minified"
    placeholder="Paste JavaScript code…"
    process={minifyJs}
  />
);

export default JsMinifierTool;
