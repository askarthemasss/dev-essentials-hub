import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const HtmlEntityTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encode = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c));
  const decode = (s: string) => { const d = document.createElement("div"); d.innerHTML = s; return d.textContent || ""; };

  const process = (text: string, m: string) => setOutput(m === "encode" ? encode(text) : decode(text));

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => { setMode("encode"); process(input, "encode"); }}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => { setMode("decode"); process(input, "decode"); }}>Decode</Button>
      </>}
    />
  );
};
export default HtmlEntityTool;
