import { useState } from "react";
import DualPane from "./DualPane";

const beautifyJs = (js: string): string => {
  let result = "", indent = 0;
  for (let i = 0; i < js.length; i++) {
    const c = js[i];
    if (c === "{" || c === "[") { result += c + "\n" + "  ".repeat(++indent); }
    else if (c === "}" || c === "]") { result += "\n" + "  ".repeat(--indent) + c; }
    else if (c === ";") { result += ";\n" + "  ".repeat(indent); }
    else if (c === ",") { result += ",\n" + "  ".repeat(indent); }
    else result += c;
  }
  return result;
};

const JsBeautifierTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? beautifyJs(input) : ""} onInputChange={setInput} inputPlaceholder="Paste JavaScript here…" />;
};
export default JsBeautifierTool;
