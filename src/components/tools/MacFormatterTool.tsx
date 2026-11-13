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
  const controls: Array<{ label: string; value: string }> = [
    { label: "Colon", value: formats[0] },
    { label: "Dash", value: formats[1] },
    { label: "Dot", value: formats[2] },
    { label: "Raw", value: formats[3] },
  ];
  return (
    <div className="space-y-3 max-w-md">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter MAC address" className="font-mono bg-secondary border-border" />
      {controls.map((control) => (
        <div key={control.label} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span className="text-muted-foreground">{control.label}</span><span>{control.value}</span></div>
      ))}
    </div>
  );
};
export default MacFormatterTool;
