import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function jsonToSchema(val: any): any {
  if (val === null) return { type: "null" };
  if (Array.isArray(val)) {
    if (val.length === 0) return { type: "array", items: {} };
    return { type: "array", items: jsonToSchema(val[0]) };
  }
  switch (typeof val) {
    case "string": return { type: "string" };
    case "number": return Number.isInteger(val) ? { type: "integer" } : { type: "number" };
    case "boolean": return { type: "boolean" };
    case "object": {
      const props: any = {};
      const required: string[] = [];
      for (const [k, v] of Object.entries(val)) {
        props[k] = jsonToSchema(v);
        required.push(k);
      }
      return { type: "object", properties: props, required };
    }
    default: return {};
  }
}

const JsonSchemaTool = () => {
  const [input, setInput] = useState('{\n  "name": "John",\n  "age": 30,\n  "active": true,\n  "tags": ["dev", "js"]\n}');
  const [output, setOutput] = useState("");

  const generate = () => {
    try {
      const parsed = JSON.parse(input);
      const schema = { $schema: "https://json-schema.org/draft/2020-12/schema", ...jsonToSchema(parsed) };
      setOutput(JSON.stringify(schema, null, 2));
    } catch (e: any) {
      setOutput("Error: " + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="font-mono text-sm bg-secondary border-border" placeholder="Paste JSON here…" />
      <Button onClick={generate} className="bg-primary text-primary-foreground">Generate Schema</Button>
      <div className="relative">
        <Textarea value={output} readOnly rows={12} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default JsonSchemaTool;
