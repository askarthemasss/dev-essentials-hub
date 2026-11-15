import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeBinary, encodeBinary } from "@/lib/encoding";

const BinaryTextTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toBin" | "toText">("toBin");

  const process = (text: string, nextMode: "toBin" | "toText") => {
    if (!text) return "";
    try {
      return nextMode === "toBin" ? encodeBinary(text) : decodeBinary(text);
    } catch {
      return "Error: Binary input must contain 8-bit groups";
    }
  };

  const output = process(input, mode);

  const switchMode = (nextMode: "toBin" | "toText") => {
    if (nextMode === mode) return;
    const nextInput = isConversionResult(output) ? output : input;
    setMode(nextMode);
    setInput(nextInput);
  };

  return (
    <DualPane input={input} output={output} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "toBin" ? "default" : "secondary"} onClick={() => switchMode("toBin")}>Text → Binary</Button>
        <Button size="sm" variant={mode === "toText" ? "default" : "secondary"} onClick={() => switchMode("toText")}>Binary → Text</Button>
      </>}
    />
  );
};
export default BinaryTextTool;
