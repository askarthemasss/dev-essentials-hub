import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeBase64, encodeBase64 } from "@/lib/encoding";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, nextMode: "encode" | "decode") => {
    try {
      setOutput(nextMode === "encode" ? encodeBase64(text) : decodeBase64(text));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid Base64. Check for characters outside A–Z, a–z, 0–9, +, / and =.");
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
      inputLabel={mode === "encode" ? "Text" : "Base64"}
      outputLabel={mode === "encode" ? "Base64" : "Text"}
      inputPlaceholder={mode === "encode" ? "Type or paste text to encode…" : "Paste Base64 to decode…"}
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

export default Base64Tool;
