import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { escapeUnicode, unescapeUnicode } from "@/lib/encoding";

const UnicodeEscapeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const process = (text: string, nextMode: "escape" | "unescape") => {
    setOutput(nextMode === "escape" ? escapeUnicode(text) : unescapeUnicode(text));
  };

  return (
    <DualPane input={input} output={output} onInputChange={(value) => { setInput(value); process(value, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "escape" ? "default" : "secondary"} onClick={() => { setMode("escape"); process(input, "escape"); }}>Escape</Button>
        <Button size="sm" variant={mode === "unescape" ? "default" : "secondary"} onClick={() => { setMode("unescape"); process(input, "unescape"); }}>Unescape</Button>
      </>}
    />
  );
};
export default UnicodeEscapeTool;
