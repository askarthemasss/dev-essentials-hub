import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const CaseConverterTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("camel");
  const convert = (s: string, m: string) => {
    const words = s.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").split(/\s+/).filter(Boolean).map(w => w.toLowerCase());
    switch (m) {
      case "camel": return words.map((w, i) => i ? w[0].toUpperCase() + w.slice(1) : w).join("");
      case "pascal": return words.map(w => w[0].toUpperCase() + w.slice(1)).join("");
      case "snake": return words.join("_");
      case "kebab": return words.join("-");
      case "constant": return words.join("_").toUpperCase();
      default: return s;
    }
  };
  return (
    <DualPane input={input} output={convert(input, mode)} onInputChange={setInput}
      actions={<>{["camel","pascal","snake","kebab","constant"].map(m => <Button key={m} size="sm" variant={mode === m ? "default" : "secondary"} onClick={() => setMode(m)}>{m}Case</Button>)}</>}
    />
  );
};
export default CaseConverterTool;
