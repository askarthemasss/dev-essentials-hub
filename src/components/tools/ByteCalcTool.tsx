import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const units = ["B","KB","MB","GB","TB","PB"];
const ByteCalcTool = () => {
  const [val, setVal] = useState("1024");
  const [unit, setUnit] = useState("MB");
  const bytes = parseFloat(val) * Math.pow(1024, units.indexOf(unit));
  return (
    <div className="space-y-3 max-w-md">
      <div className="flex gap-2">
        <Input value={val} onChange={(e) => setVal(e.target.value)} className="font-mono bg-secondary border-border" />
        <Select value={unit} onValueChange={setUnit}><SelectTrigger className="w-24 bg-secondary border-border"><SelectValue /></SelectTrigger><SelectContent>{units.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="space-y-1">{units.map(u => <div key={u} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span>{u}</span><span>{(bytes / Math.pow(1024, units.indexOf(u))).toFixed(4)}</span></div>)}</div>
      <div className="rounded bg-secondary p-2 font-mono text-sm">Bits: {(bytes * 8).toLocaleString()}</div>
    </div>
  );
};
export default ByteCalcTool;
