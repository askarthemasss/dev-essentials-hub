import { useState } from "react";
import type { CSSProperties } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const FlexboxPlaygroundTool = () => {
  const [dir, setDir] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const css = `display: flex;\nflex-direction: ${dir};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};`;
  const controls: Array<{ label: string; value: string; set: (value: string) => void; options: string[] }> = [
    { label: "Direction", value: dir, set: setDir, options: ["row", "row-reverse", "column", "column-reverse"] },
    {
      label: "Justify",
      value: justify,
      set: setJustify,
      options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
    },
    { label: "Align", value: align, set: setAlign, options: ["flex-start", "flex-end", "center", "stretch", "baseline"] },
    { label: "Wrap", value: wrap, set: setWrap, options: ["nowrap", "wrap", "wrap-reverse"] },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {controls.map((control) => (
          <div key={control.label}><label className="text-xs text-muted-foreground font-mono">{control.label}</label>
            <Select value={control.value} onValueChange={control.set}><SelectTrigger className="bg-secondary border-border text-xs"><SelectValue /></SelectTrigger><SelectContent>{control.options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select>
          </div>
        ))}
      </div>
      <div className="h-48 rounded border border-border p-2" style={{ display: "flex", flexDirection: dir as CSSProperties["flexDirection"], justifyContent: justify, alignItems: align, flexWrap: wrap as CSSProperties["flexWrap"] }}>
        {[1,2,3,4].map(i => <div key={i} className="flex h-12 w-12 items-center justify-center rounded bg-primary text-primary-foreground font-mono text-sm m-1">{i}</div>)}
      </div>
      <pre className="rounded bg-secondary p-3 font-mono text-sm">{css}</pre>
    </div>
  );
};
export default FlexboxPlaygroundTool;
