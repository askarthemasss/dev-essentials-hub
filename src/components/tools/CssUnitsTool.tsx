import { useState } from "react";
import { Input } from "@/components/ui/input";
const CssUnitsTool = () => {
  const [px, setPx] = useState("16");
  const value = Number.parseFloat(px);
  const valid = Number.isFinite(value);
  const units: Array<[string, number | null]> = [
    ["rem", valid ? value / 16 : null],
    ["em", valid ? value / 16 : null],
    ["pt", valid ? value * 0.75 : null],
    ["cm", valid ? value * 0.0264583 : null],
    ["mm", valid ? value * 0.264583 : null],
    ["in", valid ? value / 96 : null],
    ["vw (1920)", valid ? value / 19.2 : null],
    ["vh (1080)", valid ? value / 10.8 : null],
  ];
  return (
    <div className="space-y-3 max-w-md">
      <div><label className="text-xs text-muted-foreground font-mono">Pixels</label><Input value={px} onChange={(e) => setPx(e.target.value)} aria-label="Pixels" aria-invalid={!valid} className="font-mono bg-secondary border-border" /></div>
      <div className="space-y-1">
        {units.map(([unit, val]) => (
          <div key={unit} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span className="text-muted-foreground">{unit}</span><span>{val === null ? "—" : val.toFixed(4)}</span></div>
        ))}
      </div>
    </div>
  );
};
export default CssUnitsTool;
