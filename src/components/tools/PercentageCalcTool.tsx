import { useState } from "react";
import { Input } from "@/components/ui/input";
const PercentageCalcTool = () => {
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");
  const pct = (parseFloat(a) / 100) * parseFloat(b);
  const whatPct = (parseFloat(a) / parseFloat(b)) * 100;
  return (
    <div className="space-y-4 max-w-md">
      <div className="flex gap-2 items-center"><Input value={a} onChange={(e) => setA(e.target.value)} className="font-mono bg-secondary border-border" /><span className="text-muted-foreground">% of</span><Input value={b} onChange={(e) => setB(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">{a}% of {b} = {pct.toFixed(2)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">{a} is {whatPct.toFixed(2)}% of {b}</div>
    </div>
  );
};
export default PercentageCalcTool;
