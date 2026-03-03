import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const RegexTesterTool = () => {
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Hello World 123");
  let matches: string[] = [], error = "";
  try { matches = text.match(new RegExp(pattern, flags)) || []; } catch (e: any) { error = e.message; }
  return (
    <div className="space-y-4">
      <div className="flex gap-2"><Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Pattern" className="font-mono bg-secondary border-border" /><Input value={flags} onChange={(e) => setFlags(e.target.value)} className="w-20 font-mono bg-secondary border-border" /></div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[100px] font-mono text-sm bg-secondary border-border" />
      {error ? <div className="text-destructive font-mono text-sm">{error}</div> : <div className="rounded bg-secondary p-3 font-mono text-sm">{matches.length} match(es): {matches.join(", ")}</div>}
    </div>
  );
};
export default RegexTesterTool;
