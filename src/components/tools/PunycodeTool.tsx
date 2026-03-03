import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const PunycodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (text: string, m: string) => {
    try {
      if (m === "encode") {
        const url = new URL("http://" + text);
        setOutput(url.hostname);
      } else {
        setOutput(new URL("http://" + text).hostname);
      }
    } catch { setOutput("Enter a valid domain name"); }
  };

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      inputPlaceholder="Enter domain name…"
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => { setMode("encode"); process(input, "encode"); }}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => { setMode("decode"); process(input, "decode"); }}>Decode</Button>
      </>}
    />
  );
};
export default PunycodeTool;
