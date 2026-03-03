import { useState } from "react";
import { Input } from "@/components/ui/input";
const UnixTimestampTool = () => {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000).toString());
  const date = new Date(Number(ts) * (ts.length > 10 ? 1 : 1000));
  const valid = !isNaN(date.getTime());
  return (
    <div className="space-y-4 max-w-md">
      <Input value={ts} onChange={(e) => setTs(e.target.value)} placeholder="Enter Unix timestamp" className="font-mono bg-secondary border-border" />
      {valid && (
        <div className="space-y-2">
          <div className="rounded bg-secondary p-3 font-mono text-sm">UTC: {date.toUTCString()}</div>
          <div className="rounded bg-secondary p-3 font-mono text-sm">Local: {date.toLocaleString()}</div>
          <div className="rounded bg-secondary p-3 font-mono text-sm">ISO: {date.toISOString()}</div>
        </div>
      )}
    </div>
  );
};
export default UnixTimestampTool;
