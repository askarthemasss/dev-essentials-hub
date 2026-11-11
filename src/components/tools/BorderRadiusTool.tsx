import { useState } from "react";
import { Slider } from "@/components/ui/slider";
const BorderRadiusTool = () => {
  const [tl, setTl] = useState(10);
  const [tr, setTr] = useState(10);
  const [br, setBr] = useState(10);
  const [bl, setBl] = useState(10);
  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
  const dots: Array<{ label: string; value: number; set: (value: number) => void }> = [
    { label: "Top Left", value: tl, set: setTl },
    { label: "Top Right", value: tr, set: setTr },
    { label: "Bottom Right", value: br, set: setBr },
    { label: "Bottom Left", value: bl, set: setBl },
  ];
  return (
    <div className="space-y-4 max-w-lg">
      <div className="flex items-center justify-center h-40"><div className="h-24 w-24 bg-primary" style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }} /></div>
      {dots.map((dot) => (
        <div key={dot.label}><label className="text-xs text-muted-foreground font-mono">{dot.label}: {dot.value}px</label><Slider value={[dot.value]} onValueChange={([value]) => dot.set(value)} min={0} max={100} /></div>
      ))}
      <div className="rounded bg-secondary p-3 font-mono text-sm">{css}</div>
    </div>
  );
};
export default BorderRadiusTool;
