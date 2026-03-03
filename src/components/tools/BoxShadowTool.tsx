import { useState } from "react";
import { Slider } from "@/components/ui/slider";
const BoxShadowTool = () => {
  const [x, setX] = useState(5);
  const [y, setY] = useState(5);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#00d4ff");
  const [opacity, setOpacity] = useState(40);
  const shadow = `${x}px ${y}px ${blur}px ${spread}px ${color}${Math.round(opacity * 2.55).toString(16).padStart(2, "0")}`;
  return (
    <div className="space-y-4 max-w-lg">
      <div className="flex items-center justify-center h-40"><div className="h-24 w-24 rounded-lg bg-card" style={{ boxShadow: shadow }} /></div>
      {[["X", x, setX, -50, 50], ["Y", y, setY, -50, 50], ["Blur", blur, setBlur, 0, 100], ["Spread", spread, setSpread, -50, 50], ["Opacity", opacity, setOpacity, 0, 100]].map(([l, v, s, min, max]: any) => (
        <div key={l}><label className="text-xs text-muted-foreground font-mono">{l}: {v}</label><Slider value={[v]} onValueChange={([val]) => s(val)} min={min} max={max} /></div>
      ))}
      <div><label className="text-xs text-muted-foreground font-mono">Color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="block h-8 w-16" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">box-shadow: {shadow};</div>
    </div>
  );
};
export default BoxShadowTool;
