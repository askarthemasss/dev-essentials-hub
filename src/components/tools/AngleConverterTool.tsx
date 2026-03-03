import { useState } from "react";
import { Input } from "@/components/ui/input";
const AngleConverterTool = () => {
  const [deg, setDeg] = useState("180");
  const d = parseFloat(deg);
  return (
    <div className="space-y-3 max-w-md">
      <div><label className="text-xs text-muted-foreground font-mono">Degrees</label><Input value={deg} onChange={(e) => setDeg(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Radians: {(d * Math.PI / 180).toFixed(6)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Gradians: {(d * 10 / 9).toFixed(6)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Turns: {(d / 360).toFixed(6)}</div>
    </div>
  );
};
export default AngleConverterTool;
