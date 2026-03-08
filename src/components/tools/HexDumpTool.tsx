import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

function hexDump(text: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const lines: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    const offset = i.toString(16).padStart(8, "0");
    const hex = Array.from(chunk).map((b) => b.toString(16).padStart(2, "0")).join(" ");
    const ascii = Array.from(chunk).map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : ".")).join("");
    lines.push(`${offset}  ${hex.padEnd(48)}  |${ascii}|`);
  }
  return lines.join("\n");
}

const HexDumpTool = () => {
  const [input, setInput] = useState("Hello, World! This is a hex dump viewer tool.");

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="font-mono text-sm bg-secondary border-border" placeholder="Enter text…" />
      <pre className="rounded-lg border border-border bg-secondary p-4 font-mono text-xs text-foreground whitespace-pre overflow-x-auto">{hexDump(input)}</pre>
    </div>
  );
};

export default HexDumpTool;
