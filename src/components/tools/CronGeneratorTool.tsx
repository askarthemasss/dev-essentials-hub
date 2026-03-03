import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const fields = ["minute","hour","day","month","weekday"] as const;
const CronGeneratorTool = () => {
  const [parts, setParts] = useState(["*","*","*","*","*"]);
  const update = (i: number, v: string) => { const n = [...parts]; n[i] = v; setParts(n); };
  return (
    <div className="space-y-4 max-w-lg">
      <div className="grid grid-cols-5 gap-2">
        {fields.map((f, i) => (
          <div key={f}>
            <label className="text-xs text-muted-foreground font-mono capitalize">{f}</label>
            <Input value={parts[i]} onChange={(e) => update(i, e.target.value)} className="font-mono bg-secondary border-border text-center" />
          </div>
        ))}
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-lg text-center">{parts.join(" ")}</div>
    </div>
  );
};
export default CronGeneratorTool;
