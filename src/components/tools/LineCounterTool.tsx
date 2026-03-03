import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
const LineCounterTool = () => {
  const [input, setInput] = useState("");
  const lines = input ? input.split("\n") : [];
  const nonEmpty = lines.filter(l => l.trim()).length;
  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text…" className="min-h-[200px] font-mono text-sm bg-secondary border-border" />
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{lines.length}</div><div className="text-xs text-muted-foreground">Total lines</div></div>
        <div className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{nonEmpty}</div><div className="text-xs text-muted-foreground">Non-empty</div></div>
        <div className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{lines.length - nonEmpty}</div><div className="text-xs text-muted-foreground">Empty</div></div>
      </div>
    </div>
  );
};
export default LineCounterTool;
