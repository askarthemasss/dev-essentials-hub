import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const JsonCsvTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toCsv" | "toJson">("toCsv");
  const jsonToCsv = (text: string) => {
    const arr = JSON.parse(text);
    if (!Array.isArray(arr) || !arr.length) return "Input must be array of objects";
    const keys = Object.keys(arr[0]);
    return [keys.join(","), ...arr.map((r: any) => keys.map(k => JSON.stringify(r[k] ?? "")).join(","))].join("\n");
  };
  const csvToJson = (text: string) => {
    const lines = text.split("\n").filter(Boolean);
    const headers = lines[0].split(",").map(h => h.trim());
    return JSON.stringify(lines.slice(1).map(l => { const vals = l.split(","); return Object.fromEntries(headers.map((h, i) => [h, vals[i]?.trim()])); }), null, 2);
  };
  const process = (text: string, m: string) => { try { setOutput(m === "toCsv" ? jsonToCsv(text) : csvToJson(text)); } catch { setOutput(text ? "Invalid input" : ""); } };
  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "toCsv" ? "default" : "secondary"} onClick={() => { setMode("toCsv"); process(input, "toCsv"); }}>JSON → CSV</Button>
        <Button size="sm" variant={mode === "toJson" ? "default" : "secondary"} onClick={() => { setMode("toJson"); process(input, "toJson"); }}>CSV → JSON</Button>
      </>}
    />
  );
};
export default JsonCsvTool;
