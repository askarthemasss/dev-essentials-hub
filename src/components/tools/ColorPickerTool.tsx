import { useState } from "react";
import { Input } from "@/components/ui/input";
const ColorPickerTool = () => {
  const [color, setColor] = useState("#00d4ff");
  const hexToRgb = (h: string) => { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h); return r ? [parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16)] : [0,0,0]; };
  const [r,g,b] = hexToRgb(color);
  const rgbToHsl = (r:number,g:number,b:number) => { r/=255;g/=255;b/=255; const max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2; let h=0,s=0; if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}} return [Math.round(h*360),Math.round(s*100),Math.round(l*100)]; };
  const [h,s,l] = rgbToHsl(r,g,b);
  return (
    <div className="space-y-4 max-w-md">
      <div className="flex gap-4 items-center">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-16 w-16 rounded cursor-pointer" />
        <Input value={color} onChange={(e) => setColor(e.target.value)} className="font-mono bg-secondary border-border" />
      </div>
      <div className="h-20 rounded-md" style={{ backgroundColor: color }} />
      <div className="space-y-1">
        <div className="rounded bg-secondary p-2 font-mono text-sm">HEX: {color}</div>
        <div className="rounded bg-secondary p-2 font-mono text-sm">RGB: rgb({r}, {g}, {b})</div>
        <div className="rounded bg-secondary p-2 font-mono text-sm">HSL: hsl({h}, {s}%, {l}%)</div>
      </div>
    </div>
  );
};
export default ColorPickerTool;
