import { useState } from "react";
import DualPane from "./DualPane";

function minifyJs(code: string): string {
  return code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\n\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const JsMinifierTool = () => {
  const [input, setInput] = useState("");
  return <DualPane inputLabel="JavaScript" outputLabel="Minified" input={input} output={minifyJs(input)} onInputChange={setInput} inputPlaceholder="Paste JavaScript code…" />;
};

export default JsMinifierTool;
