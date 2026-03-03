import { useState } from "react";
import { Input } from "@/components/ui/input";
const OctalDecimalTool = () => {
  const [input, setInput] = useState("255");
  const n = parseInt(input, 10);
  const o = parseInt(input, 8);
  return (
    <div className="space-y-3 max-w-md">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter number" className="font-mono bg-secondary border-border" />
      {!isNaN(n) && <div className="rounded bg-secondary p-3 font-mono text-sm">Decimal {input} → Octal: {n.toString(8)}</div>}
      {!isNaN(o) && <div className="rounded bg-secondary p-3 font-mono text-sm">Octal {input} → Decimal: {o}</div>}
    </div>
  );
};
export default OctalDecimalTool;
