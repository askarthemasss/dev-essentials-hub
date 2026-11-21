import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { decodeBase58, encodeBase58 } from "@/lib/encoding";

const Base58Tool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  let output = "";
  let error = "";

  if (input) {
    try {
      output = mode === "encode" ? encodeBase58(input) : decodeBase58(input);
    } catch {
      error = "Invalid Base58 character. Use the Bitcoin Base58 alphabet: 1–9, A–H, J–N, P–Z, a–k, m–z.";
    }
  }

  const switchMode = (nextMode: "encode" | "decode") => {
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
      inputLabel={mode === "encode" ? "Text" : "Base58"}
      outputLabel={mode === "encode" ? "Base58" : "Text"}
      inputPlaceholder={mode === "encode" ? "Type or paste text to encode…" : "Paste Base58 to decode…"}
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

export default Base58Tool;
