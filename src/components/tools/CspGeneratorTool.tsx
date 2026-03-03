import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
const directives = ["default-src","script-src","style-src","img-src","font-src","connect-src","media-src","frame-src"];
const CspGeneratorTool = () => {
  const [values, setValues] = useState<Record<string,string>>(Object.fromEntries(directives.map(d => [d, "'self'"])));
  const update = (k: string, v: string) => setValues({...values, [k]: v});
  const csp = Object.entries(values).filter(([,v]) => v).map(([k,v]) => `${k} ${v}`).join("; ");
  return (
    <div className="space-y-3">
      {directives.map(d => (
        <div key={d} className="flex gap-2 items-center"><span className="w-28 text-xs font-mono text-muted-foreground shrink-0">{d}</span><input value={values[d]} onChange={(e) => update(d, e.target.value)} className="flex-1 rounded border border-border bg-secondary px-2 py-1 font-mono text-sm" /></div>
      ))}
      <Textarea value={csp} readOnly className="min-h-[80px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default CspGeneratorTool;
