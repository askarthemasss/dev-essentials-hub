import { useState } from "react";
import { Input } from "@/components/ui/input";
const GridGeneratorTool = () => {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(8);
  const css = `display: grid;\ngrid-template-columns: repeat(${cols}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ngap: ${gap}px;`;
  return (
    <div className="space-y-4 max-w-lg">
      <div className="grid grid-cols-3 gap-2">
        <div><label className="text-xs text-muted-foreground font-mono">Columns</label><Input type="number" min={1} max={12} value={cols} onChange={(e) => setCols(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Rows</label><Input type="number" min={1} max={12} value={rows} onChange={(e) => setRows(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Gap (px)</label><Input type="number" min={0} max={50} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
      </div>
      <div className="rounded border border-border p-2" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: `${gap}px` }}>
        {Array.from({ length: cols * rows }, (_, i) => <div key={i} className="flex h-12 items-center justify-center rounded bg-primary/20 text-primary font-mono text-xs">{i + 1}</div>)}
      </div>
      <pre className="rounded bg-secondary p-3 font-mono text-sm">{css}</pre>
    </div>
  );
};
export default GridGeneratorTool;
