import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { escapeString, unescapeString } from "@/lib/encoding";

const StringEscapeTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const output = mode === "escape" ? escapeString(input) : unescapeString(input);

  const switchMode = (nextMode: "escape" | "unescape") => {
    if (nextMode === mode) return;
    if (isConversionResult(output)) setInput(output);
    setMode(nextMode);
  };

  return (
    <DualPane input={input} output={output} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "escape" ? "default" : "secondary"} onClick={() => switchMode("escape")}>Escape</Button>
        <Button size="sm" variant={mode === "unescape" ? "default" : "secondary"} onClick={() => switchMode("unescape")}>Unescape</Button>
      </>}
    />
  );
};
export default StringEscapeTool;
