import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const UrlEncodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, m: string) => {
    try {
      setOutput(m === "encode" ? encodeURIComponent(text) : decodeURIComponent(text));
    } catch { setOutput("Error: Invalid input"); }
  };

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => { setMode("encode"); process(input, "encode"); }}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => { setMode("decode"); process(input, "decode"); }}>Decode</Button>
      </>}
    />
  );
};
export default UrlEncodeTool;
