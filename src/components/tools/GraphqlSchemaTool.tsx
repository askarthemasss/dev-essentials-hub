import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Plus, Trash2 } from "lucide-react";

type FieldType = "String" | "Int" | "Float" | "Boolean" | "ID" | "DateTime";
interface Field { name: string; type: FieldType; required: boolean; isList: boolean }
interface GqlType { name: string; fields: Field[] }

const fieldTypes: FieldType[] = ["String", "Int", "Float", "Boolean", "ID", "DateTime"];

const GraphqlSchemaTool = () => {
  const [types, setTypes] = useState<GqlType[]>([
    { name: "User", fields: [
      { name: "id", type: "ID", required: true, isList: false },
      { name: "name", type: "String", required: true, isList: false },
      { name: "email", type: "String", required: true, isList: false },
      { name: "age", type: "Int", required: false, isList: false },
    ]},
  ]);

  const updateType = (idx: number, name: string) => setTypes((p) => p.map((t, i) => i === idx ? { ...t, name } : t));
  const addType = () => setTypes((p) => [...p, { name: "NewType", fields: [{ name: "id", type: "ID", required: true, isList: false }] }]);
  const removeType = (idx: number) => setTypes((p) => p.filter((_, i) => i !== idx));

  const updateField = (ti: number, fi: number, updates: Partial<Field>) => {
    setTypes((p) => p.map((t, i) => i === ti ? { ...t, fields: t.fields.map((f, j) => j === fi ? { ...f, ...updates } : f) } : t));
  };
  const addField = (ti: number) => setTypes((p) => p.map((t, i) => i === ti ? { ...t, fields: [...t.fields, { name: "field", type: "String", required: false, isList: false }] } : t));
  const removeField = (ti: number, fi: number) => setTypes((p) => p.map((t, i) => i === ti ? { ...t, fields: t.fields.filter((_, j) => j !== fi) } : t));

  const generate = () => {
    let schema = `scalar DateTime\n\n`;
    for (const t of types) {
      schema += `type ${t.name} {\n`;
      for (const f of t.fields) {
        const typeStr = f.isList ? `[${f.type}]` : f.type;
        schema += `  ${f.name}: ${typeStr}${f.required ? "!" : ""}\n`;
      }
      schema += `}\n\n`;
    }
    // Generate Query type
    schema += `type Query {\n`;
    for (const t of types) {
      const lower = t.name.charAt(0).toLowerCase() + t.name.slice(1);
      schema += `  ${lower}(id: ID!): ${t.name}\n`;
      schema += `  ${lower}s: [${t.name}!]!\n`;
    }
    schema += `}\n`;
    return schema;
  };

  const output = generate();

  return (
    <div className="space-y-4">
      {types.map((t, ti) => (
        <div key={ti} className="rounded-lg border border-border bg-secondary/50 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">type</span>
            <Input value={t.name} onChange={(e) => updateType(ti, e.target.value)} className="font-mono text-sm bg-secondary border-border w-40" />
            {types.length > 1 && <Button size="icon" variant="ghost" onClick={() => removeType(ti)} className="ml-auto"><Trash2 className="h-4 w-4" /></Button>}
          </div>
          {t.fields.map((f, fi) => (
            <div key={fi} className="flex items-center gap-2">
              <Input value={f.name} onChange={(e) => updateField(ti, fi, { name: e.target.value })} className="font-mono text-sm bg-secondary border-border w-32" placeholder="field" />
              <Select value={f.type} onValueChange={(v) => updateField(ti, fi, { type: v as FieldType })}>
                <SelectTrigger className="w-28 font-mono text-sm bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{fieldTypes.map((ft) => <SelectItem key={ft} value={ft}>{ft}</SelectItem>)}</SelectContent>
              </Select>
              <label className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <input type="checkbox" checked={f.required} onChange={(e) => updateField(ti, fi, { required: e.target.checked })} />!
              </label>
              <label className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <input type="checkbox" checked={f.isList} onChange={(e) => updateField(ti, fi, { isList: e.target.checked })} />[]
              </label>
              <Button size="icon" variant="ghost" onClick={() => removeField(ti, fi)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={() => addField(ti)}><Plus className="h-3 w-3 mr-1" />Field</Button>
        </div>
      ))}
      <Button variant="outline" onClick={addType}><Plus className="h-4 w-4 mr-1" />Add Type</Button>
      <div className="relative">
        <Textarea value={output} readOnly rows={16} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default GraphqlSchemaTool;
