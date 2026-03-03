import { useState } from "react";
import { Input } from "@/components/ui/input";
const CssSpecificityTool = () => {
  const [selector, setSelector] = useState("");
  const calc = (s: string) => {
    const ids = (s.match(/#/g) || []).length;
    const classes = (s.match(/\./g) || []).length + (s.match(/\[/g) || []).length + (s.match(/:/g) || []).length;
    const elements = (s.match(/(?:^|\s)[a-zA-Z]/g) || []).length;
    return [0, ids, classes, elements];
  };
  const spec = calc(selector);
  return (
    <div className="space-y-4 max-w-md">
      <Input value={selector} onChange={(e) => setSelector(e.target.value)} placeholder="Enter CSS selector e.g. #id .class div" className="font-mono bg-secondary border-border" />
      <div className="flex gap-2">
        {["Inline","IDs","Classes","Elements"].map((l, i) => (
          <div key={l} className="flex-1 rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{spec[i]}</div><div className="text-xs text-muted-foreground">{l}</div></div>
        ))}
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-center text-lg">{spec.join(",")}</div>
    </div>
  );
};
export default CssSpecificityTool;
