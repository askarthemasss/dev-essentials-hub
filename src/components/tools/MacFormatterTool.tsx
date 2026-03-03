import { useState } from "react";
import { Input } from "@/components/ui/input";
const MacFormatterTool = () => {
  const [input, setInput] = useState("AA:BB:CC:DD:EE:FF");
  const clean = input.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
  const formats = [
    clean.match(/.{2}/g)?.join(":") || "",
    clean.match(/.{2}/g)?.join("-") || "",
    clean.match(/.{4}/g)?.join(".") || "",
    clean,
  ];
  return (
    <div className="space-y-3 max-w-md">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter MAC address" className="font-mono bg-secondary border-border" />
      {[["Colon", 0], ["Dash", 1], ["Dot", 2], ["Raw", 3]].map(([l, i]: any) => (
        <div key={l} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span className="text-muted-foreground">{l}</span><span>{formats[i]}</span></div>
      ))}
    </div>
  );
};
export default MacFormatterTool;
