import { useState } from "react";
import { Input } from "@/components/ui/input";
const PxRemTool = () => {
  const [px, setPx] = useState("16");
  const [base, setBase] = useState("16");
  const rem = (parseFloat(px) / parseFloat(base)).toFixed(4);
  return (
    <div className="space-y-3 max-w-md">
      <div><label className="text-xs text-muted-foreground font-mono">Pixels</label><Input value={px} onChange={(e) => setPx(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div><label className="text-xs text-muted-foreground font-mono">Base font size (px)</label><Input value={base} onChange={(e) => setBase(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-lg text-center">{rem} rem</div>
    </div>
  );
};
export default PxRemTool;
