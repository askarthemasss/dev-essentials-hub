import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeBase32, encodeBase32 } from "@/lib/encoding";

const Base32Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, nextMode: "encode" | "decode") => {
    try {
      setOutput(nextMode === "encode" ? encodeBase32(text) : decodeBase32(text));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid Base32. Use A–Z and 2–7 only, with correct padding.");
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
      inputLabel={mode === "encode" ? "Text" : "Base32"}
      outputLabel={mode === "encode" ? "Base32" : "Text"}
      inputPlaceholder={mode === "encode" ? "Type or paste text to encode…" : "Paste Base32 to decode…"}
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

export default Base32Tool;
