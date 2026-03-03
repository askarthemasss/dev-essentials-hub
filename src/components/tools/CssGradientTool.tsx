import { useState } from "react";
import { Slider } from "@/components/ui/slider";
const CssGradientTool = () => {
  const [angle, setAngle] = useState(135);
  const [c1, setC1] = useState("#00d4ff");
  const [c2, setC2] = useState("#7b2ff7");
  const css = `background: linear-gradient(${angle}deg, ${c1}, ${c2});`;
  return (
    <div className="space-y-4 max-w-lg">
      <div className="h-40 rounded-md" style={{ background: `linear-gradient(${angle}deg, ${c1}, ${c2})` }} />
      <div><label className="text-xs text-muted-foreground font-mono">Angle: {angle}°</label><Slider value={[angle]} onValueChange={([v]) => setAngle(v)} min={0} max={360} /></div>
      <div className="flex gap-4">
        <div><label className="text-xs text-muted-foreground font-mono">Color 1</label><input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="block h-10 w-16" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Color 2</label><input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="block h-10 w-16" /></div>
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">{css}</div>
    </div>
  );
};
export default CssGradientTool;
