import { useState } from "react";
import DualPane from "./DualPane";
import { decodeBase58, encodeBase58 } from "@/lib/encoding";

const Base58Tool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = (() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeBase58(input) : decodeBase58(input);
    } catch (caught) {
      return caught instanceof Error ? `Error: ${caught.message}` : "Error: Invalid Base58 input";
    }
  })();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("encode")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "encode" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Encode</button>
        <button onClick={() => setMode("decode")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "decode" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Decode</button>
      </div>
      <DualPane
        inputLabel={mode === "encode" ? "Text" : "Base58"}
        outputLabel={mode === "encode" ? "Base58" : "Text"}
        input={input}
        output={output}
        onInputChange={setInput}
      />
    </div>
  );
};

export default Base58Tool;
