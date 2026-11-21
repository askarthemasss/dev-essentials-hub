import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeBinary, encodeBinary } from "@/lib/encoding";

const BinaryTextTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toBin" | "toText">("toBin");

  let output = "";
  let error = "";

  if (input) {
    try {
      output = mode === "toBin" ? encodeBinary(input) : decodeBinary(input);
    } catch {
      error = "Binary input must be 8-bit groups, for example 01001000 01101001.";
    }
  }

  const switchMode = (nextMode: "toBin" | "toText") => {
    if (nextMode === mode) return;
    if (isConversionResult(output)) setInput(output);
    setMode(nextMode);
  };

  return (
    <DualPane
      input={input}
      output={output}
      error={error || undefined}
      onInputChange={setInput}
      inputLabel={mode === "toBin" ? "Text" : "Binary"}
      outputLabel={mode === "toBin" ? "Binary" : "Text"}
      inputPlaceholder={
        mode === "toBin" ? "Type or paste text to convert…" : "Paste 8-bit binary groups to decode…"
      }
      actions={
        <>
          <Button size="sm" variant={mode === "toBin" ? "default" : "secondary"} onClick={() => switchMode("toBin")}>
            Text → Binary
          </Button>
          <Button size="sm" variant={mode === "toText" ? "default" : "secondary"} onClick={() => switchMode("toText")}>
            Binary → Text
          </Button>
        </>
      }
    />
  );
};

export default BinaryTextTool;
