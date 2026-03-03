import { useState } from "react";
import DualPane from "./DualPane";
const CssMinifierTool = () => {
  const [input, setInput] = useState("");
  const minify = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim();
  return <DualPane input={input} output={minify(input)} onInputChange={setInput} inputPlaceholder="Paste CSS to minify…" />;
};
export default CssMinifierTool;
