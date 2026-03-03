import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RandomNumberTool = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => setResults(Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min));

  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-3 gap-2">
        <div><label className="text-xs text-muted-foreground font-mono">Min</label><Input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Max</label><Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
        <div><label className="text-xs text-muted-foreground font-mono">Count</label><Input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Number(e.target.value))} className="font-mono bg-secondary border-border" /></div>
      </div>
      <Button onClick={generate}>Generate</Button>
      {results.length > 0 && <div className="rounded bg-secondary p-3 font-mono text-sm">{results.join(", ")}</div>}
    </div>
  );
};
export default RandomNumberTool;
