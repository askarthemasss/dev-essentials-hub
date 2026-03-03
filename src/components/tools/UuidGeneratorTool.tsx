import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw } from "lucide-react";

const UuidGeneratorTool = () => {
  const gen = () => crypto.randomUUID();
  const [uuids, setUuids] = useState<string[]>([gen()]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => setUuids(Array.from({ length: count }, gen));
  const copy = (text: string, i: number) => { navigator.clipboard.writeText(text); setCopied(i); setTimeout(() => setCopied(null), 1500); };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24 font-mono bg-secondary border-border" />
        <Button onClick={generate}><RefreshCw className="h-4 w-4 mr-1" /> Generate</Button>
      </div>
      <div className="space-y-2">
        {uuids.map((id, i) => (
          <div key={i} className="flex items-center gap-2 rounded bg-secondary p-2">
            <code className="flex-1 font-mono text-sm text-foreground">{id}</code>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copy(id, i)}>
              {copied === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UuidGeneratorTool;
