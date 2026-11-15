import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodePunycodeDomain, encodePunycodeDomain } from "@/lib/punycode";

const PunycodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, nextMode: "encode" | "decode") => {
    if (!text.trim()) {
      setOutput("");
      return;
    }
    setOutput(nextMode === "encode" ? encodePunycodeDomain(text) : decodePunycodeDomain(text));
  };

  const switchMode = (nextMode: "encode" | "decode") => {
    if (nextMode === mode) return;
    const nextInput = isConversionResult(output) ? output : input;
    setMode(nextMode);
    setInput(nextInput);
    process(nextInput, nextMode);
  };

  return (
    <DualPane input={input} output={output} onInputChange={(value) => { setInput(value); process(value, mode); }}
      inputPlaceholder="Enter domain name…"
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => switchMode("encode")}>To Punycode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => switchMode("decode")}>To Unicode</Button>
      </>}
    />
  );
};
export default PunycodeTool;
