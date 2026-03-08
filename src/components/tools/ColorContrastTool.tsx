import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ColorContrastTool = () => {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#000000");

  const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };

  const luminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const contrastRatio = () => {
    const [r1, g1, b1] = hexToRgb(fg);
    const [r2, g2, b2] = hexToRgb(bg);
    const l1 = luminance(r1, g1, b1);
    const l2 = luminance(r2, g2, b2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const ratio = contrastRatio();
  const passAA = ratio >= 4.5;
  const passAALarge = ratio >= 3;
  const passAAA = ratio >= 7;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">Foreground</label>
          <div className="flex gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-14 rounded border border-border cursor-pointer" />
            <Input value={fg} onChange={(e) => setFg(e.target.value)} className="font-mono bg-secondary border-border" />
          </div>
        </div>
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">Background</label>
          <div className="flex gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-14 rounded border border-border cursor-pointer" />
            <Input value={bg} onChange={(e) => setBg(e.target.value)} className="font-mono bg-secondary border-border" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border p-8 text-center" style={{ backgroundColor: bg, color: fg }}>
        <p className="text-2xl font-bold font-mono">Sample Text</p>
        <p className="text-sm mt-2">The quick brown fox jumps over the lazy dog</p>
      </div>

      <div className="text-center">
        <p className="text-4xl font-bold font-mono text-foreground">{ratio.toFixed(2)}:1</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className={`rounded-lg border p-4 text-center ${passAALarge ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
          <p className="font-mono text-sm font-bold">{passAALarge ? "PASS" : "FAIL"}</p>
          <p className="text-xs text-muted-foreground mt-1">AA Large (3:1)</p>
        </div>
        <div className={`rounded-lg border p-4 text-center ${passAA ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
          <p className="font-mono text-sm font-bold">{passAA ? "PASS" : "FAIL"}</p>
          <p className="text-xs text-muted-foreground mt-1">AA Normal (4.5:1)</p>
        </div>
        <div className={`rounded-lg border p-4 text-center ${passAAA ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
          <p className="font-mono text-sm font-bold">{passAAA ? "PASS" : "FAIL"}</p>
          <p className="text-xs text-muted-foreground mt-1">AAA (7:1)</p>
        </div>
      </div>

      <Button variant="outline" onClick={() => { setFg(bg); setBg(fg); }} className="w-full">Swap Colors</Button>
    </div>
  );
};

export default ColorContrastTool;
