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
  const controls: Array<{ label: string; value: number; set: (value: number) => void; min: number; max: number }> = [
    { label: "X", value: x, set: setX, min: -50, max: 50 },
    { label: "Y", value: y, set: setY, min: -50, max: 50 },
    { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
    { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
    { label: "Opacity", value: opacity, set: setOpacity, min: 0, max: 100 },
  ];
  return (
    <div className="space-y-4 max-w-lg">
      <div className="flex items-center justify-center h-40"><div className="h-24 w-24 rounded-lg bg-card" style={{ boxShadow: shadow }} /></div>
      {controls.map((control) => (
        <div key={control.label}><label className="text-xs text-muted-foreground font-mono">{control.label}: {control.value}</label><Slider value={[control.value]} onValueChange={([value]) => control.set(value)} min={control.min} max={control.max} /></div>
      ))}
      <div><label className="text-xs text-muted-foreground font-mono">Color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="block h-8 w-16" /></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">box-shadow: {shadow};</div>
    </div>
  );
};
export default BoxShadowTool;
