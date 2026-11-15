import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeHex, encodeHex } from "@/lib/encoding";

const HexEncodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, nextMode: "encode" | "decode") => {
    try {
      setOutput(nextMode === "encode" ? encodeHex(text) : decodeHex(text));
    } catch {
      setOutput("Error: Invalid hexadecimal input");
    }
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
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => switchMode("encode")}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => switchMode("decode")}>Decode</Button>
      </>}
    />
  );
};
export default HexEncodeTool;
