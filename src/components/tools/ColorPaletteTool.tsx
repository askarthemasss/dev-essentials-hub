import { useState } from "react";
import { Button } from "@/components/ui/button";
const hslToHex = (h: number, s: number, l: number) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); };
  return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, "0")).join("")}`;
};
const ColorPaletteTool = () => {
  const [colors, setColors] = useState<string[]>([]);
  const generate = () => {
    const base = Math.random() * 360;
    setColors(Array.from({ length: 5 }, (_, i) => hslToHex((base + i * 72) % 360, 0.7, 0.5)));
  };
  return (
    <div className="space-y-4">
      <Button onClick={generate}>Generate Palette</Button>
      <div className="flex gap-2">
        {colors.map((c, i) => (
          <div key={i} className="flex-1 space-y-1">
            <div className="h-24 rounded-md" style={{ backgroundColor: c }} />
            <p className="text-center font-mono text-xs text-muted-foreground">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ColorPaletteTool;
