import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const HexEncodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encode = (s: string) => [...s].map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");
  const decode = (s: string) => s.replace(/\s/g, "").match(/.{1,2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join("") || "";

  const process = (text: string, m: string) => { try { setOutput(m === "encode" ? encode(text) : decode(text)); } catch { setOutput("Error"); } };

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => { setMode("encode"); process(input, "encode"); }}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => { setMode("decode"); process(input, "decode"); }}>Decode</Button>
      </>}
    />
  );
};
export default HexEncodeTool;
