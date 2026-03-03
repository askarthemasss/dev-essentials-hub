import { useState } from "react";
import { Input } from "@/components/ui/input";
const PlaceholderImageTool = () => {
  const [w, setW] = useState(400);
  const [h, setH] = useState(300);
  const [text, setText] = useState("400x300");
  const [bg, setBg] = useState("1a1a2e");
  const [fg, setFg] = useState("00d4ff");
  const url = `https://via.placeholder.com/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;
  return (
    <div className="space-y-4 max-w-lg">
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-xs text-muted-foreground font-mono">Width</label><Input type="number" value={w} onChange={(e) => setW(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Height</label><Input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
      </div>
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Text" className="font-mono bg-secondary border-border" />
      <img src={url} alt="Placeholder" className="rounded max-w-full" />
      <div className="rounded bg-secondary p-3 font-mono text-sm break-all">{url}</div>
    </div>
  );
};
export default PlaceholderImageTool;
