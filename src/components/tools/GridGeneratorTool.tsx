import { useState } from "react";
import { Input } from "@/components/ui/input";
const clamp = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, Math.round(value))) : min;

const GridGeneratorTool = () => {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(8);
  const safeCols = clamp(cols, 1, 12);
  const safeRows = clamp(rows, 1, 12);
  const safeGap = clamp(gap, 0, 50);
  const css = `display: grid;\ngrid-template-columns: repeat(${safeCols}, 1fr);\ngrid-template-rows: repeat(${safeRows}, 1fr);\ngap: ${safeGap}px;`;
  return (
    <div className="space-y-4 max-w-lg">
      <div className="grid grid-cols-3 gap-2">
        <div><span className="text-xs text-muted-foreground font-mono">Columns</span><Input type="number" min={1} max={12} value={cols} onChange={(e) => setCols(Number(e.target.value))} aria-label="Columns" className="font-mono bg-secondary border-border" /></div>
        <div><span className="text-xs text-muted-foreground font-mono">Rows</span><Input type="number" min={1} max={12} value={rows} onChange={(e) => setRows(Number(e.target.value))} aria-label="Rows" className="font-mono bg-secondary border-border" /></div>
        <div><span className="text-xs text-muted-foreground font-mono">Gap (px)</span><Input type="number" min={0} max={50} value={gap} onChange={(e) => setGap(Number(e.target.value))} aria-label="Gap in pixels" className="font-mono bg-secondary border-border" /></div>
      </div>
      <div className="rounded border border-border p-2" style={{ display: "grid", gridTemplateColumns: `repeat(${safeCols}, 1fr)`, gridTemplateRows: `repeat(${safeRows}, 1fr)`, gap: `${safeGap}px` }}>
        {Array.from({ length: safeCols * safeRows }, (_, i) => <div key={i} className="flex h-12 items-center justify-center rounded bg-primary/20 text-primary font-mono text-xs">{i + 1}</div>)}
      </div>
      <pre className="rounded bg-secondary p-3 font-mono text-sm">{css}</pre>
    </div>
  );
};
export default GridGeneratorTool;
