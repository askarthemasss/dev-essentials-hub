import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeHex, encodeHex } from "@/lib/encoding";

const HexEncodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, nextMode: "encode" | "decode") => {
    try {
      setOutput(nextMode === "encode" ? encodeHex(text) : decodeHex(text));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid hexadecimal input. Use pairs of 0–9 or a–f, for example 68 69.");
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
    <DualPane
      input={input}
      output={output}
      error={error || undefined}
      onInputChange={(value) => {
        setInput(value);
        process(value, mode);
      }}
      inputLabel={mode === "encode" ? "Text" : "Hex"}
      outputLabel={mode === "encode" ? "Hex" : "Text"}
      inputPlaceholder={mode === "encode" ? "Type or paste text to encode…" : "Paste hexadecimal bytes to decode…"}
      actions={
        <>
          <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => switchMode("encode")}>
            Encode
          </Button>
          <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => switchMode("decode")}>
            Decode
          </Button>
        </>
      }
    />
  );
};

export default HexEncodeTool;
