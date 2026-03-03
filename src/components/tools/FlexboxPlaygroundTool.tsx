import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const FlexboxPlaygroundTool = () => {
  const [dir, setDir] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const css = `display: flex;\nflex-direction: ${dir};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};`;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[["Direction", dir, setDir, ["row","row-reverse","column","column-reverse"]], ["Justify", justify, setJustify, ["flex-start","flex-end","center","space-between","space-around","space-evenly"]], ["Align", align, setAlign, ["flex-start","flex-end","center","stretch","baseline"]], ["Wrap", wrap, setWrap, ["nowrap","wrap","wrap-reverse"]]].map(([label, val, setter, opts]: any) => (
          <div key={label}><label className="text-xs text-muted-foreground font-mono">{label}</label>
            <Select value={val} onValueChange={setter}><SelectTrigger className="bg-secondary border-border text-xs"><SelectValue /></SelectTrigger><SelectContent>{opts.map((o: string) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
          </div>
        ))}
      </div>
      <div className="h-48 rounded border border-border p-2" style={{ display: "flex", flexDirection: dir as any, justifyContent: justify, alignItems: align, flexWrap: wrap as any }}>
        {[1,2,3,4].map(i => <div key={i} className="flex h-12 w-12 items-center justify-center rounded bg-primary text-primary-foreground font-mono text-sm m-1">{i}</div>)}
      </div>
      <pre className="rounded bg-secondary p-3 font-mono text-sm">{css}</pre>
    </div>
  );
};
export default FlexboxPlaygroundTool;
