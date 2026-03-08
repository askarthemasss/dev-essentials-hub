import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function jsonToTs(obj: any, name = "Root", indent = ""): string {
  if (obj === null) return "null";
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "any[]";
    return jsonToTs(obj[0], name, indent) + "[]";
  }
  if (typeof obj !== "object") {
    if (typeof obj === "string") return "string";
    if (typeof obj === "number") return Number.isInteger(obj) ? "number" : "number";
    if (typeof obj === "boolean") return "boolean";
    return "any";
  }

  const lines: string[] = [];
  const nested: string[] = [];
  lines.push(`${indent}interface ${name} {`);
  for (const [key, val] of Object.entries(obj)) {
    const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      const subName = key.charAt(0).toUpperCase() + key.slice(1);
      lines.push(`${indent}  ${safeName}: ${subName};`);
      nested.push(jsonToTs(val, subName, indent));
    } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object") {
      const subName = key.charAt(0).toUpperCase() + key.slice(1) + "Item";
      lines.push(`${indent}  ${safeName}: ${subName}[];`);
      nested.push(jsonToTs(val[0], subName, indent));
    } else {
      lines.push(`${indent}  ${safeName}: ${jsonToTs(val, key, indent)};`);
    }
  }
  lines.push(`${indent}}`);
  return [...nested, ...lines].join("\n");
}

const JsonToTsTool = () => {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Alice",\n  "active": true,\n  "address": {\n    "street": "123 Main",\n    "city": "Springfield"\n  },\n  "tags": ["dev", "js"]\n}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(jsonToTs(parsed));
    } catch (e: any) {
      setOutput("Error: " + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="font-mono text-sm bg-secondary border-border" placeholder="Paste JSON…" />
      <Button onClick={convert} className="bg-primary text-primary-foreground">Convert to TypeScript</Button>
      <div className="relative">
        <Textarea value={output} readOnly rows={12} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default JsonToTsTool;
