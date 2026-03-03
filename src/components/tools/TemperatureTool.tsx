import { useState } from "react";
import { Input } from "@/components/ui/input";
const TemperatureTool = () => {
  const [c, setC] = useState("100");
  const celsius = parseFloat(c);
  const f = (celsius * 9/5 + 32).toFixed(2);
  const k = (celsius + 273.15).toFixed(2);
  return (
    <div className="space-y-3 max-w-md">
      <div><label className="text-xs text-muted-foreground font-mono">Celsius</label><Input value={c} onChange={(e) => setC(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Fahrenheit: {f}°F</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Kelvin: {k} K</div>
    </div>
  );
};
export default TemperatureTool;
