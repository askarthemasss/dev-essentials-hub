import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, Trash2 } from "lucide-react";

interface EnvVar { key: string; value: string; comment: string }

const EnvGeneratorTool = () => {
  const [vars, setVars] = useState<EnvVar[]>([
    { key: "DATABASE_URL", value: "postgresql://user:pass@localhost:5432/db", comment: "Database connection" },
    { key: "API_KEY", value: "", comment: "API key" },
    { key: "NODE_ENV", value: "development", comment: "Environment" },
  ]);

  const update = (idx: number, field: keyof EnvVar, val: string) => {
    setVars((prev) => prev.map((v, i) => i === idx ? { ...v, [field]: val } : v));
  };
  const add = () => setVars((prev) => [...prev, { key: "", value: "", comment: "" }]);
  const remove = (idx: number) => setVars((prev) => prev.filter((_, i) => i !== idx));

  const output = vars.map((v) => {
    const comment = v.comment ? `# ${v.comment}\n` : "";
    return `${comment}${v.key}=${v.value}`;
  }).join("\n\n");

  const exampleOutput = vars.map((v) => {
    const comment = v.comment ? `# ${v.comment}\n` : "";
    return `${comment}${v.key}=`;
  }).join("\n\n");

  return (
    <div className="space-y-4">
      {vars.map((v, i) => (
        <div key={i} className="flex gap-2 items-start">
          <Input value={v.key} onChange={(e) => update(i, "key", e.target.value)} placeholder="KEY" className="font-mono text-sm bg-secondary border-border w-40" />
          <Input value={v.value} onChange={(e) => update(i, "value", e.target.value)} placeholder="value" className="font-mono text-sm bg-secondary border-border flex-1" />
          <Input value={v.comment} onChange={(e) => update(i, "comment", e.target.value)} placeholder="comment" className="font-mono text-sm bg-secondary border-border w-40" />
          <Button size="icon" variant="ghost" onClick={() => remove(i)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button variant="outline" onClick={add}><Plus className="h-4 w-4 mr-1" />Add Variable</Button>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="text-sm font-mono text-muted-foreground mb-1 block">.env</label>
          <Textarea value={output} readOnly rows={10} className="font-mono text-sm bg-secondary border-border" />
          <Button size="icon" variant="ghost" className="absolute top-8 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
        </div>
        <div className="relative">
          <label className="text-sm font-mono text-muted-foreground mb-1 block">.env.example</label>
          <Textarea value={exampleOutput} readOnly rows={10} className="font-mono text-sm bg-secondary border-border" />
          <Button size="icon" variant="ghost" className="absolute top-8 right-2" onClick={() => navigator.clipboard.writeText(exampleOutput)}><Copy className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default EnvGeneratorTool;
