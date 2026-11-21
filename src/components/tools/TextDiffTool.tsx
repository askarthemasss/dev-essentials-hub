import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { diffLines } from "@/lib/textDiff";

const TextDiffTool = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const diff = diffLines(a, b);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div><span className="text-xs text-muted-foreground font-mono">Original</span><Textarea value={a} onChange={(e) => setA(e.target.value)} aria-label="Original text" className="min-h-[200px] font-mono text-sm bg-secondary border-border" /></div>
        <div><span className="text-xs text-muted-foreground font-mono">Modified</span><Textarea value={b} onChange={(e) => setB(e.target.value)} aria-label="Modified text" className="min-h-[200px] font-mono text-sm bg-secondary border-border" /></div>
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-sm space-y-1">
        {diff.map((line, i) => (
          <div key={i} className={line.type === "same" ? "text-muted-foreground" : line.type === "add" ? "text-success" : "text-danger"}>
            {line.type === "same" ? `  ${line.text}` : line.type === "add" ? `+ ${line.text}` : `- ${line.text}`}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TextDiffTool;
