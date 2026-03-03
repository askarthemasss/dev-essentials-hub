import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const CorsHelperTool = () => {
  const [origin, setOrigin] = useState("*");
  const [methods, setMethods] = useState(["GET","POST","PUT","DELETE"]);
  const [headers, setHeaders] = useState("Content-Type, Authorization");
  const toggleMethod = (m: string) => setMethods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  const output = `Access-Control-Allow-Origin: ${origin}\nAccess-Control-Allow-Methods: ${methods.join(", ")}\nAccess-Control-Allow-Headers: ${headers}\nAccess-Control-Max-Age: 86400`;
  return (
    <div className="space-y-4 max-w-lg">
      <div><label className="text-xs text-muted-foreground font-mono">Origin</label><Input value={origin} onChange={(e) => setOrigin(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div className="flex flex-wrap gap-3">{["GET","POST","PUT","DELETE","PATCH","OPTIONS"].map(m => <label key={m} className="flex items-center gap-1 text-sm font-mono"><Checkbox checked={methods.includes(m)} onCheckedChange={() => toggleMethod(m)} />{m}</label>)}</div>
      <div><label className="text-xs text-muted-foreground font-mono">Headers</label><Input value={headers} onChange={(e) => setHeaders(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <Textarea value={output} readOnly className="min-h-[100px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default CorsHelperTool;
