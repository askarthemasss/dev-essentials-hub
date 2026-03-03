import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const jsonToYaml = (obj: any, indent = 0): string => {
  const pad = "  ".repeat(indent);
  if (Array.isArray(obj)) return obj.map(v => `${pad}- ${typeof v === "object" ? "\n" + jsonToYaml(v, indent + 1) : v}`).join("\n");
  if (typeof obj === "object" && obj !== null) return Object.entries(obj).map(([k, v]) => `${pad}${k}: ${typeof v === "object" ? "\n" + jsonToYaml(v, indent + 1) : v}`).join("\n");
  return String(obj);
};
const JsonYamlTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toYaml" | "toJson">("toYaml");
  const process = (text: string, m: string) => {
    try { setOutput(m === "toYaml" ? jsonToYaml(JSON.parse(text)) : JSON.stringify(JSON.parse(text), null, 2)); } catch { setOutput(text ? "Invalid input" : ""); }
  };
  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "toYaml" ? "default" : "secondary"} onClick={() => { setMode("toYaml"); process(input, "toYaml"); }}>JSON → YAML</Button>
        <Button size="sm" variant={mode === "toJson" ? "default" : "secondary"} onClick={() => { setMode("toJson"); process(input, "toJson"); }}>YAML → JSON</Button>
      </>}
    />
  );
};
export default JsonYamlTool;
