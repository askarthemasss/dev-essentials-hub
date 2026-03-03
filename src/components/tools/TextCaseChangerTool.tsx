import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const TextCaseChangerTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("upper");
  const convert = (s: string) => {
    switch (mode) {
      case "upper": return s.toUpperCase();
      case "lower": return s.toLowerCase();
      case "title": return s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase());
      case "sentence": return s.replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
      case "toggle": return [...s].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
      default: return s;
    }
  };
  return (
    <DualPane input={input} output={convert(input)} onInputChange={setInput}
      actions={<>{["upper","lower","title","sentence","toggle"].map(m => <Button key={m} size="sm" variant={mode === m ? "default" : "secondary"} onClick={() => setMode(m)}>{m}</Button>)}</>}
    />
  );
};
export default TextCaseChangerTool;
