import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Plus, Trash2, RefreshCw } from "lucide-react";

type FieldType = "string" | "number" | "boolean" | "uuid" | "email" | "date" | "url" | "name" | "sentence";
interface Field { name: string; type: FieldType }

const fieldTypes: FieldType[] = ["string", "number", "boolean", "uuid", "email", "date", "url", "name", "sentence"];

function randomValue(type: FieldType): any {
  const r = (max: number) => Math.floor(Math.random() * max);
  const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace"];
  const domains = ["example.com", "test.org", "demo.io", "sample.net"];
  const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"];
  switch (type) {
    case "string": return words.slice(0, r(3) + 2).join(" ");
    case "number": return r(1000);
    case "boolean": return Math.random() > 0.5;
    case "uuid": return crypto.randomUUID();
    case "email": return `${names[r(names.length)].toLowerCase()}@${domains[r(domains.length)]}`;
    case "date": return new Date(Date.now() - r(365 * 86400000)).toISOString().slice(0, 10);
    case "url": return `https://${domains[r(domains.length)]}/${words[r(words.length)]}`;
    case "name": return names[r(names.length)];
    case "sentence": return words.slice(0, r(5) + 3).join(" ") + ".";
  }
}

const ApiMockTool = () => {
  const [fields, setFields] = useState<Field[]>([
    { name: "id", type: "uuid" },
    { name: "name", type: "name" },
    { name: "email", type: "email" },
    { name: "active", type: "boolean" },
    { name: "createdAt", type: "date" },
  ]);
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const updateField = (i: number, u: Partial<Field>) => setFields((p) => p.map((f, j) => j === i ? { ...f, ...u } : f));
  const addField = () => setFields((p) => [...p, { name: "field", type: "string" }]);
  const removeField = (i: number) => setFields((p) => p.filter((_, j) => j !== i));

  const generate = () => {
    const data = Array.from({ length: count }, () => {
      const obj: any = {};
      for (const f of fields) obj[f.name] = randomValue(f.type);
      return obj;
    });
    setOutput(JSON.stringify(data, null, 2));
  };

  return (
    <div className="space-y-4">
      {fields.map((f, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={f.name} onChange={(e) => updateField(i, { name: e.target.value })} className="font-mono text-sm bg-secondary border-border w-40" placeholder="field name" />
          <Select value={f.type} onValueChange={(v) => updateField(i, { type: v as FieldType })}>
            <SelectTrigger className="w-32 font-mono text-sm bg-secondary border-border"><SelectValue /></SelectTrigger>
            <SelectContent>{fieldTypes.map((ft) => <SelectItem key={ft} value={ft}>{ft}</SelectItem>)}</SelectContent>
          </Select>
          <Button size="icon" variant="ghost" onClick={() => removeField(i)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <div className="flex gap-2 items-center">
        <Button size="sm" variant="outline" onClick={addField}><Plus className="h-3 w-3 mr-1" />Field</Button>
        <label className="text-sm font-mono text-muted-foreground">Count:</label>
        <Input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-20 font-mono text-sm bg-secondary border-border" min={1} max={100} />
      </div>
      <Button onClick={generate} className="bg-primary text-primary-foreground"><RefreshCw className="h-4 w-4 mr-2" />Generate Mock Data</Button>
      <div className="relative">
        <Textarea value={output} readOnly rows={14} className="font-mono text-sm bg-secondary border-border" placeholder="Click Generate to create mock data" />
        {output && <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>}
      </div>
    </div>
  );
};

export default ApiMockTool;
