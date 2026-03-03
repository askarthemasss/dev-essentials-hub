import { useState } from "react";
import { Input } from "@/components/ui/input";
const AspectRatioTool = () => {
  const [w, setW] = useState("1920");
  const [h, setH] = useState("1080");
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const wn = parseInt(w), hn = parseInt(h);
  const d = gcd(wn, hn);
  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-xs text-muted-foreground font-mono">Width</label><Input value={w} onChange={(e) => setW(e.target.value)} className="font-mono bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Height</label><Input value={h} onChange={(e) => setH(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      </div>
      {d > 0 && <div className="rounded bg-secondary p-4 font-mono text-2xl text-center">{wn/d}:{hn/d}</div>}
      <div className="rounded bg-secondary p-3 font-mono text-sm text-center">Decimal: {(wn/hn).toFixed(4)}</div>
    </div>
  );
};
export default AspectRatioTool;
