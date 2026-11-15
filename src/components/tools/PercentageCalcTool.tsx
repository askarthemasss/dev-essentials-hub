import { useState } from "react";
import { Input } from "@/components/ui/input";
const PercentageCalcTool = () => {
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");
  const aValue = Number.parseFloat(a);
  const bValue = Number.parseFloat(b);
  const valid = Number.isFinite(aValue) && Number.isFinite(bValue);
  const pct = valid ? (aValue / 100) * bValue : null;
  const whatPct = valid && bValue !== 0 ? (aValue / bValue) * 100 : null;
  return (
    <div className="space-y-4 max-w-md">
      <div className="flex gap-2 items-center"><Input value={a} onChange={(e) => setA(e.target.value)} aria-label="Percentage" aria-invalid={!valid} className="font-mono bg-secondary border-border" /><span className="text-muted-foreground">% of</span><Input value={b} onChange={(e) => setB(e.target.value)} aria-label="Value" aria-invalid={!valid} className="font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">{a}% of {b} = {pct === null ? "—" : pct.toFixed(2)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">{a} is {whatPct === null ? "—" : whatPct.toFixed(2)}% of {b}</div>
    </div>
  );
};
export default PercentageCalcTool;
