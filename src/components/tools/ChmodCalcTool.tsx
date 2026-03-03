import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
const perms = [
  { label: "Owner Read", bit: 256 },{ label: "Owner Write", bit: 128 },{ label: "Owner Execute", bit: 64 },
  { label: "Group Read", bit: 32 },{ label: "Group Write", bit: 16 },{ label: "Group Execute", bit: 8 },
  { label: "Others Read", bit: 4 },{ label: "Others Write", bit: 2 },{ label: "Others Execute", bit: 1 },
];
const ChmodCalcTool = () => {
  const [mode, setMode] = useState(0o755);
  const toggle = (bit: number) => setMode(prev => prev ^ bit);
  const octal = mode.toString(8).padStart(3, "0");
  const symbolic = () => {
    const r = (v: number) => `${v & 4 ? "r" : "-"}${v & 2 ? "w" : "-"}${v & 1 ? "x" : "-"}`;
    return `-${r((mode >> 6) & 7)}${r((mode >> 3) & 7)}${r(mode & 7)}`;
  };
  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-3 gap-3">
        {["Owner","Group","Others"].map((label, gi) => (
          <div key={label}>
            <div className="text-xs text-muted-foreground font-mono mb-1">{label}</div>
            {["Read","Write","Execute"].map((p, pi) => {
              const bit = perms[gi * 3 + pi].bit;
              return <label key={p} className="flex items-center gap-1 text-xs font-mono"><Checkbox checked={!!(mode & bit)} onCheckedChange={() => toggle(bit)} />{p[0]}</label>;
            })}
          </div>
        ))}
      </div>
      <div className="rounded bg-secondary p-4 text-center font-mono"><div className="text-3xl font-bold">{octal}</div><div className="text-sm text-muted-foreground mt-1">{symbolic()}</div></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm text-center">chmod {octal} filename</div>
    </div>
  );
};
export default ChmodCalcTool;
