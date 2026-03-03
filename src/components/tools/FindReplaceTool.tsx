import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const FindReplaceTool = () => {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const result = find ? input.split(find).join(replace) : input;
  const count = find ? (input.split(find).length - 1) : 0;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find" className="font-mono bg-secondary border-border" />
        <Input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace" className="font-mono bg-secondary border-border" />
        <span className="shrink-0 self-center text-xs text-muted-foreground font-mono">{count} found</span>
      </div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input text…" className="min-h-[150px] font-mono text-sm bg-secondary border-border" />
      <Textarea value={result} readOnly className="min-h-[150px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default FindReplaceTool;
