import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { escapeUnicode, unescapeUnicode } from "@/lib/encoding";

const UnicodeEscapeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const process = (text: string, nextMode: "escape" | "unescape") => {
    setOutput(nextMode === "escape" ? escapeUnicode(text) : unescapeUnicode(text));
  };

  const switchMode = (nextMode: "escape" | "unescape") => {
    if (nextMode === mode) return;
    const nextInput = isConversionResult(output) ? output : input;
    setMode(nextMode);
    setInput(nextInput);
    process(nextInput, nextMode);
  };

  return (
    <DualPane input={input} output={output} onInputChange={(value) => { setInput(value); process(value, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "escape" ? "default" : "secondary"} onClick={() => switchMode("escape")}>Escape</Button>
        <Button size="sm" variant={mode === "unescape" ? "default" : "secondary"} onClick={() => switchMode("unescape")}>Unescape</Button>
      </>}
    />
  );
};
export default UnicodeEscapeTool;
