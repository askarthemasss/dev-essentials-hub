import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";

const UrlEncodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, nextMode: "encode" | "decode") => {
    try {
      setOutput(nextMode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid percent-encoding. Check for a lone % or an incomplete escape sequence.");
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
      inputLabel={mode === "encode" ? "Text" : "Encoded URL"}
      outputLabel={mode === "encode" ? "Encoded URL" : "Text"}
      inputPlaceholder={mode === "encode" ? "Type or paste text to encode…" : "Paste a percent-encoded URL to decode…"}
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

export default UrlEncodeTool;
