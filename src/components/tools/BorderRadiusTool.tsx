import { useState } from "react";
import { Slider } from "@/components/ui/slider";
const BorderRadiusTool = () => {
  const [tl, setTl] = useState(10);
  const [tr, setTr] = useState(10);
  const [br, setBr] = useState(10);
  const [bl, setBl] = useState(10);
  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
  return (
    <div className="space-y-4 max-w-lg">
      <div className="flex items-center justify-center h-40"><div className="h-24 w-24 bg-primary" style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }} /></div>
      {[["Top Left", tl, setTl], ["Top Right", tr, setTr], ["Bottom Right", br, setBr], ["Bottom Left", bl, setBl]].map(([l, v, s]: any) => (
        <div key={l}><label className="text-xs text-muted-foreground font-mono">{l}: {v}px</label><Slider value={[v]} onValueChange={([val]) => s(val)} min={0} max={100} /></div>
      ))}
      <div className="rounded bg-secondary p-3 font-mono text-sm">{css}</div>
    </div>
  );
};
export default BorderRadiusTool;
