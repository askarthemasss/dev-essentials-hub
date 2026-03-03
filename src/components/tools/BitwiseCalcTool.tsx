import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const ops = ["AND","OR","XOR","NOT","LSHIFT","RSHIFT"];
const BitwiseCalcTool = () => {
  const [a, setA] = useState("255");
  const [b, setB] = useState("15");
  const [op, setOp] = useState("AND");
  const calc = () => {
    const na = parseInt(a), nb = parseInt(b);
    switch (op) { case "AND": return na & nb; case "OR": return na | nb; case "XOR": return na ^ nb; case "NOT": return ~na; case "LSHIFT": return na << nb; case "RSHIFT": return na >> nb; default: return 0; }
  };
  const result = calc();
  return (
    <div className="space-y-3 max-w-md">
      <div className="flex gap-2">
        <Input value={a} onChange={(e) => setA(e.target.value)} className="font-mono bg-secondary border-border" />
        <Select value={op} onValueChange={setOp}><SelectTrigger className="w-28 bg-secondary border-border"><SelectValue /></SelectTrigger><SelectContent>{ops.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
        <Input value={b} onChange={(e) => setB(e.target.value)} className="font-mono bg-secondary border-border" />
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Decimal: {result}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Binary: {(result >>> 0).toString(2)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Hex: 0x{(result >>> 0).toString(16).toUpperCase()}</div>
    </div>
  );
};
export default BitwiseCalcTool;
