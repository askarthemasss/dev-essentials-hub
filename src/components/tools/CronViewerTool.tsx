import { useState } from "react";
import { Input } from "@/components/ui/input";
const CronViewerTool = () => {
  const [cron, setCron] = useState("*/5 * * * *");
  const describe = (expr: string) => {
    const parts = expr.split(" ");
    if (parts.length !== 5) return "Invalid cron (need 5 fields)";
    const [min, hr, dom, mon, dow] = parts;
    let desc = "";
    if (min === "*" && hr === "*") desc = "Every minute";
    else if (min.startsWith("*/")) desc = `Every ${min.slice(2)} minutes`;
    else if (hr === "*") desc = `At minute ${min}`;
    else desc = `At ${hr}:${min.padStart(2, "0")}`;
    if (dom !== "*") desc += ` on day ${dom}`;
    if (mon !== "*") desc += ` of month ${mon}`;
    if (dow !== "*") desc += ` on weekday ${dow}`;
    return desc;
  };
  return (
    <div className="space-y-4 max-w-md">
      <Input value={cron} onChange={(e) => setCron(e.target.value)} placeholder="* * * * *" className="font-mono bg-secondary border-border text-center text-lg" />
      <div className="grid grid-cols-5 gap-1 text-center text-xs text-muted-foreground font-mono">{["min","hour","day","month","weekday"].map(l => <span key={l}>{l}</span>)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm text-center">{describe(cron)}</div>
    </div>
  );
};
export default CronViewerTool;
