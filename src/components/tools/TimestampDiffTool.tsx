import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TimestampDiffTool = () => {
  const [d1, setD1] = useState(new Date().toISOString().slice(0, 16));
  const [d2, setD2] = useState(new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16));
  const [result, setResult] = useState("");

  const calc = () => {
    const a = new Date(d1).getTime();
    const b = new Date(d2).getTime();
    if (isNaN(a) || isNaN(b)) { setResult("Invalid date"); return; }
    const diffMs = Math.abs(b - a);
    const s = Math.floor(diffMs / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const y = Math.floor(d / 365.25);
    const months = Math.floor(d / 30.44);
    const weeks = Math.floor(d / 7);
    setResult([
      `${d} days`,
      `${weeks} weeks, ${d % 7} days`,
      `${months} months`,
      `${h} hours`,
      `${m} minutes`,
      `${s} seconds`,
      `${diffMs} milliseconds`,
    ].join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">Start</label>
          <Input type="datetime-local" value={d1} onChange={(e) => setD1(e.target.value)} className="font-mono bg-secondary border-border" />
        </div>
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">End</label>
          <Input type="datetime-local" value={d2} onChange={(e) => setD2(e.target.value)} className="font-mono bg-secondary border-border" />
        </div>
      </div>
      <Button onClick={calc} className="bg-primary text-primary-foreground">Calculate Difference</Button>
      <pre className="rounded-lg border border-border bg-secondary p-4 font-mono text-sm text-foreground whitespace-pre-wrap">{result || "Click Calculate"}</pre>
    </div>
  );
};

export default TimestampDiffTool;
