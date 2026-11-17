import { useState } from "react";
import { Input } from "@/components/ui/input";
const AngleConverterTool = () => {
  const [deg, setDeg] = useState("180");
  const numeric = Number.parseFloat(deg);
  const valid = Number.isFinite(numeric);
  const format = (value: number) => (valid ? value.toFixed(6) : "—");
  return (
    <div className="space-y-3 max-w-md">
      <div><span className="text-xs text-muted-foreground font-mono">Degrees</span><Input value={deg} onChange={(e) => setDeg(e.target.value)} aria-label="Degrees" aria-invalid={!valid} className="font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Radians: {format(numeric * Math.PI / 180)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Gradians: {format(numeric * 10 / 9)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Turns: {format(numeric / 360)}</div>
    </div>
  );
};
export default AngleConverterTool;
