import { useState } from "react";
import DualPane from "./DualPane";

const beautifyCss = (css: string): string => {
  return css
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\n\s*\n/g, "\n")
    .replace(/  }/g, "}")
    .trim();
};

const CssBeautifierTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? beautifyCss(input) : ""} onInputChange={setInput} inputPlaceholder="Paste CSS here…" />;
};
export default CssBeautifierTool;
