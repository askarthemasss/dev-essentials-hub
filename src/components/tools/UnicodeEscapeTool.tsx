import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const UnicodeEscapeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const escape = (s: string) => [...s].map(c => c.charCodeAt(0) > 127 ? `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}` : c).join("");
  const unescape = (s: string) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  const process = (text: string, m: string) => setOutput(m === "escape" ? escape(text) : unescape(text));

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "escape" ? "default" : "secondary"} onClick={() => { setMode("escape"); process(input, "escape"); }}>Escape</Button>
        <Button size="sm" variant={mode === "unescape" ? "default" : "secondary"} onClick={() => { setMode("unescape"); process(input, "unescape"); }}>Unescape</Button>
      </>}
    />
  );
};
export default UnicodeEscapeTool;
