import { useState } from "react";
const TimestampGeneratorTool = () => {
  const now = new Date();
  const formats = [
    { label: "Unix (seconds)", value: Math.floor(now.getTime() / 1000).toString() },
    { label: "Unix (ms)", value: now.getTime().toString() },
    { label: "ISO 8601", value: now.toISOString() },
    { label: "UTC String", value: now.toUTCString() },
    { label: "Local String", value: now.toLocaleString() },
    { label: "Date only", value: now.toISOString().split("T")[0] },
  ];
  return (
    <div className="space-y-3 max-w-md">
      {formats.map(f => (
        <div key={f.label} className="flex items-center justify-between rounded bg-secondary p-3">
          <span className="text-xs text-muted-foreground font-mono">{f.label}</span>
          <code className="font-mono text-sm">{f.value}</code>
        </div>
      ))}
    </div>
  );
};
export default TimestampGeneratorTool;
