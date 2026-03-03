import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
const CharCounterTool = () => {
  const [input, setInput] = useState("");
  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste text…" className="min-h-[200px] font-mono text-sm bg-secondary border-border" />
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{input.length}</div><div className="text-xs text-muted-foreground">With spaces</div></div>
        <div className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{input.replace(/\s/g, "").length}</div><div className="text-xs text-muted-foreground">Without spaces</div></div>
        <div className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{new Blob([input]).size}</div><div className="text-xs text-muted-foreground">Bytes (UTF-8)</div></div>
      </div>
    </div>
  );
};
export default CharCounterTool;
