import { useState } from "react";
import { Input } from "@/components/ui/input";
const HexRgbTool = () => {
  const [hex, setHex] = useState("#3498db");
  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };
  const rgb = hexToRgb(hex);
  return (
    <div className="space-y-4 max-w-md">
      <Input value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#000000" className="font-mono bg-secondary border-border" />
      {rgb && <>
        <div className="h-20 rounded-md" style={{ backgroundColor: hex }} />
        <div className="rounded bg-secondary p-3 font-mono text-sm">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
      </>}
    </div>
  );
};
export default HexRgbTool;
