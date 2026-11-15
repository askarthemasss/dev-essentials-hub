import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { secureRandomIntegers } from "@/lib/random";

const RandomNumberTool = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    if (!min.trim() || !max.trim() || !count.trim()) {
      setResults([]);
      setError("Enter whole numbers for minimum, maximum and count.");
      return;
    }

    try {
      setResults(secureRandomIntegers(Number(min), Number(max), Number(count)));
      setError("");
    } catch (caught) {
      setResults([]);
      setError(caught instanceof Error ? caught.message : "Could not generate random numbers");
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs text-muted-foreground font-mono">Min</label>
          <Input
            type="number"
            value={min}
            onChange={(event) => setMin(event.target.value)}
            className="font-mono bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground font-mono">Max</label>
          <Input
            type="number"
            value={max}
            onChange={(event) => setMax(event.target.value)}
            className="font-mono bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground font-mono">Count</label>
          <Input
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            className="font-mono bg-secondary border-border"
          />
        </div>
      </div>
      <Button onClick={generate}>Generate</Button>
      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {error}
        </p>
      )}
      {results.length > 0 && (
        <div className="rounded bg-secondary p-3 font-mono text-sm">{results.join(", ")}</div>
      )}
    </div>
  );
};

export default RandomNumberTool;
