import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw } from "lucide-react";

const UuidGeneratorTool = () => {
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);
  const [count, setCount] = useState("1");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    if (!count.trim()) {
      setError("Enter a whole number between 1 and 100.");
      return;
    }
    const parsed = Number(count);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
      setError("Enter a whole number between 1 and 100.");
      return;
    }

    setError("");
    setUuids(Array.from({ length: parsed }, () => crypto.randomUUID()));
  };

  const copy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(event) => setCount(event.target.value)}
          aria-label="Number of UUIDs"
          className="w-24 font-mono bg-secondary border-border"
        />
        <Button onClick={generate}>
          <RefreshCw className="h-4 w-4 mr-1" /> Generate
        </Button>
      </div>
      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="space-y-2">
        {uuids.map((id, index) => (
          <div key={index} className="flex items-center gap-2 rounded bg-secondary p-2">
            <code className="flex-1 font-mono text-sm text-foreground">{id}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => copy(id, index)}
              aria-label={`Copy UUID ${index + 1}`}
            >
              {copied === index ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UuidGeneratorTool;
