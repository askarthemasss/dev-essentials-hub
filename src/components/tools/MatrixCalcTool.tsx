import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const MatrixCalcTool = () => {
  const [m, setM] = useState([[1,0],[0,1]]);
  const update = (r: number, c: number, v: string) => { const n = m.map(row => [...row]); n[r][c] = parseFloat(v) || 0; setM(n); };
  const det = m.length === 2 ? m[0][0]*m[1][1] - m[0][1]*m[1][0] : 0;
  const transpose = m[0].map((_, i) => m.map(row => row[i]));
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-1">
        {m.map((row, r) => <div key={r} className="flex gap-1">{row.map((cell, c) => <Input key={c} value={cell} onChange={(e) => update(r, c, e.target.value)} className="w-20 text-center font-mono bg-secondary border-border" />)}</div>)}
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Determinant: {det}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Transpose: [{transpose.map(r => `[${r.join(",")}]`).join(",")}]</div>
    </div>
  );
};
export default MatrixCalcTool;
