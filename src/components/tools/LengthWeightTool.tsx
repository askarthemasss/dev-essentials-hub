import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const units: Record<string, Record<string, number>> = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 },
  weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
  volume: { l: 1, ml: 0.001, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.236588 },
};
const LengthWeightTool = () => {
  const [cat, setCat] = useState("length");
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("m");
  const u = units[cat];
  const results = Object.entries(u).map(([k, factor]) => ({ unit: k, value: (parseFloat(val) * u[from] / factor).toFixed(6) }));
  return (
    <div className="space-y-4 max-w-md">
      <Select value={cat} onValueChange={(v) => { setCat(v); setFrom(Object.keys(units[v])[0]); }}>
        <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
        <SelectContent>{Object.keys(units).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
      </Select>
      <div className="flex gap-2">
        <Input value={val} onChange={(e) => setVal(e.target.value)} className="font-mono bg-secondary border-border" />
        <Select value={from} onValueChange={setFrom}>
          <SelectTrigger className="w-24 bg-secondary border-border"><SelectValue /></SelectTrigger>
          <SelectContent>{Object.keys(u).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-1">{results.map(r => <div key={r.unit} className="rounded bg-secondary p-2 font-mono text-sm flex justify-between"><span>{r.unit}</span><span>{r.value}</span></div>)}</div>
    </div>
  );
};
export default LengthWeightTool;
