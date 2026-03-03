import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const RegexGeneratorTool = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const test = (p: string, f: string, s: string) => {
    try { const re = new RegExp(p, f); setMatches(s.match(re) || []); } catch { setMatches([]); }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={pattern} onChange={(e) => { setPattern(e.target.value); test(e.target.value, flags, testStr); }} placeholder="Regex pattern" className="font-mono bg-secondary border-border" />
        <Input value={flags} onChange={(e) => { setFlags(e.target.value); test(pattern, e.target.value, testStr); }} placeholder="Flags" className="w-20 font-mono bg-secondary border-border" />
      </div>
      <Textarea value={testStr} onChange={(e) => { setTestStr(e.target.value); test(pattern, flags, e.target.value); }} placeholder="Test string…" className="min-h-[100px] font-mono text-sm bg-secondary border-border" />
      <div className="rounded bg-secondary p-3 font-mono text-sm">{matches.length} match(es): {matches.join(", ")}</div>
    </div>
  );
};
export default RegexGeneratorTool;
