import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function diffJson(a: unknown, b: unknown, path = ""): string[] {
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
  } else if (isRecord(a) && isRecord(b)) {
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
  const [error, setError] = useState<{ side: "left" | "right"; message: string } | null>(null);

  const compare = () => {
    let a: unknown;
    let b: unknown;

    try {
      a = JSON.parse(left);
    } catch (caught) {
      setError({
        side: "left",
        message: caught instanceof Error ? caught.message : "Invalid JSON",
      });
      setResult("");
      return;
    }

    try {
      b = JSON.parse(right);
    } catch (caught) {
      setError({
        side: "right",
        message: caught instanceof Error ? caught.message : "Invalid JSON",
      });
      setResult("");
      return;
    }

    setError(null);
    const diffs = diffJson(a, b);
    setResult(diffs.length === 0 ? "✓ Objects are identical" : diffs.join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">Original</span>
          <Textarea value={left} onChange={(e) => setLeft(e.target.value)} aria-label="Original JSON" aria-invalid={error?.side === "left"} aria-describedby={error?.side === "left" ? "json-diff-error" : undefined} rows={8} className="font-mono text-sm bg-secondary border-border" />
        </div>
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">Modified</span>
          <Textarea value={right} onChange={(e) => setRight(e.target.value)} aria-label="Modified JSON" aria-invalid={error?.side === "right"} aria-describedby={error?.side === "right" ? "json-diff-error" : undefined} rows={8} className="font-mono text-sm bg-secondary border-border" />
        </div>
      </div>
      <Button onClick={compare} className="bg-primary text-primary-foreground">Compare</Button>
      {error && (
        <p id="json-diff-error" role="alert" className="font-mono text-xs text-danger">
          {error.side === "left" ? "Original" : "Modified"} JSON is invalid: {error.message}. Fix the syntax and compare again.
        </p>
      )}
      <pre className="rounded-lg border border-border bg-secondary p-4 font-mono text-sm text-foreground whitespace-pre-wrap overflow-auto max-h-64">{error ? "No diff available until both JSON documents are valid." : result || "Click Compare to see differences"}</pre>
    </div>
  );
};

export default JsonDiffTool;
