import { useState } from "react";
import { Input } from "@/components/ui/input";
const NumberBaseTool = () => {
  const [dec, setDec] = useState("255");
  const n = parseInt(dec, 10);
  const valid = !isNaN(n);
  return (
    <div className="space-y-3 max-w-md">
      <Input value={dec} onChange={(e) => setDec(e.target.value)} placeholder="Decimal number" className="font-mono bg-secondary border-border" />
      {valid && <>
        <div className="rounded bg-secondary p-3 font-mono text-sm">Binary: {n.toString(2)}</div>
        <div className="rounded bg-secondary p-3 font-mono text-sm">Octal: {n.toString(8)}</div>
        <div className="rounded bg-secondary p-3 font-mono text-sm">Hex: {n.toString(16).toUpperCase()}</div>
      </>}
    </div>
  );
};
export default NumberBaseTool;
