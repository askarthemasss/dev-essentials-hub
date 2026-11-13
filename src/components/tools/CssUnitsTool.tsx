import { useState } from "react";
import { Input } from "@/components/ui/input";
const CssUnitsTool = () => {
  const [px, setPx] = useState("16");
  const v = parseFloat(px);
  const units: Array<[string, number]> = [["rem", v / 16], ["em", v / 16], ["pt", v * 0.75], ["cm", v * 0.0264583], ["mm", v * 0.264583], ["in", v / 96], ["vw (1920)", v / 19.2], ["vh (1080)", v / 10.8]];
  return (
    <div className="space-y-3 max-w-md">
      <div><label className="text-xs text-muted-foreground font-mono">Pixels</label><Input value={px} onChange={(e) => setPx(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div className="space-y-1">
        {units.map(([unit, val]) => (
          <div key={unit} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span className="text-muted-foreground">{unit}</span><span>{val.toFixed(4)}</span></div>
        ))}
      </div>
    </div>
  );
};
export default CssUnitsTool;
