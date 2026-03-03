import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
const TextDiffTool = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const diff = () => {
    const la = a.split("\n"), lb = b.split("\n");
    const max = Math.max(la.length, lb.length);
    return Array.from({ length: max }, (_, i) => {
      if (la[i] === lb[i]) return { type: "same", text: la[i] || "" };
      if (i >= la.length) return { type: "add", text: lb[i] };
      if (i >= lb.length) return { type: "remove", text: la[i] };
      return { type: "change", old: la[i], new: lb[i] };
    });
  };
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="text-xs text-muted-foreground font-mono">Original</label><Textarea value={a} onChange={(e) => setA(e.target.value)} className="min-h-[200px] font-mono text-sm bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Modified</label><Textarea value={b} onChange={(e) => setB(e.target.value)} className="min-h-[200px] font-mono text-sm bg-secondary border-border" /></div>
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-sm space-y-1">
        {diff().map((d, i) => (
          <div key={i}>
            {d.type === "same" && <div className="text-muted-foreground">  {d.text}</div>}
            {d.type === "add" && <div className="text-green-400">+ {d.text}</div>}
            {d.type === "remove" && <div className="text-red-400">- {d.text}</div>}
            {d.type === "change" && <><div className="text-red-400">- {(d as any).old}</div><div className="text-green-400">+ {(d as any).new}</div></>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TextDiffTool;
