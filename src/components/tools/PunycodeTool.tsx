import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
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

  return (
    <DualPane input={input} output={output} onInputChange={(value) => { setInput(value); process(value, mode); }}
      inputPlaceholder="Enter domain name…"
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => { setMode("encode"); process(input, "encode"); }}>To Punycode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => { setMode("decode"); process(input, "decode"); }}>To Unicode</Button>
      </>}
    />
  );
};
export default PunycodeTool;
