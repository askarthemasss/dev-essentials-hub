import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function diffJson(a: any, b: any, path = ""): string[] {
  const lines: string[] = [];
  if (typeof a !== typeof b) {
    lines.push(`~ ${path || "root"}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
    return lines;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      if (i >= a.length) lines.push(`+ ${path}[${i}]: ${JSON.stringify(b[i])}`);
      else if (i >= b.length) lines.push(`- ${path}[${i}]: ${JSON.stringify(a[i])}`);
      else lines.push(...diffJson(a[i], b[i], `${path}[${i}]`));
    }
  } else if (typeof a === "object" && a !== null && b !== null) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in a)) lines.push(`+ ${p}: ${JSON.stringify(b[k])}`);
      else if (!(k in b)) lines.push(`- ${p}: ${JSON.stringify(a[k])}`);
      else lines.push(...diffJson(a[k], b[k], p));
    }
  } else if (a !== b) {
    lines.push(`~ ${path || "root"}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
  }
  return lines;
}

const JsonDiffTool = () => {
  const [left, setLeft] = useState('{\n  "name": "Alice",\n  "age": 30\n}');
  const [right, setRight] = useState('{\n  "name": "Bob",\n  "age": 30,\n  "active": true\n}');
  const [result, setResult] = useState("");

  const compare = () => {
    try {
      const a = JSON.parse(left);
      const b = JSON.parse(right);
      const diffs = diffJson(a, b);
      setResult(diffs.length === 0 ? "✓ Objects are identical" : diffs.join("\n"));
    } catch (e: any) {
      setResult("Error: " + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">Original</label>
          <Textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={8} className="font-mono text-sm bg-secondary border-border" />
        </div>
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">Modified</label>
          <Textarea value={right} onChange={(e) => setRight(e.target.value)} rows={8} className="font-mono text-sm bg-secondary border-border" />
        </div>
      </div>
      <Button onClick={compare} className="bg-primary text-primary-foreground">Compare</Button>
      <pre className="rounded-lg border border-border bg-secondary p-4 font-mono text-sm text-foreground whitespace-pre-wrap overflow-auto max-h-64">{result || "Click Compare to see differences"}</pre>
    </div>
  );
};

export default JsonDiffTool;
