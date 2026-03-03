import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
const JsonPathTool = () => {
  const [json, setJson] = useState('{"name":"John","age":30,"address":{"city":"NYC"},"hobbies":["reading","coding"]}');
  const [path, setPath] = useState("$.address.city");
  const evaluate = () => {
    try {
      const obj = JSON.parse(json);
      const parts = path.replace(/^\$\.?/, "").split(".").filter(Boolean);
      let current: any = obj;
      for (const p of parts) {
        const arrayMatch = p.match(/^(\w+)\[(\d+)\]$/);
        if (arrayMatch) { current = current[arrayMatch[1]][parseInt(arrayMatch[2])]; }
        else { current = current[p]; }
        if (current === undefined) return "undefined";
      }
      return typeof current === "object" ? JSON.stringify(current, null, 2) : String(current);
    } catch { return "Invalid JSON or path"; }
  };
  return (
    <div className="space-y-4">
      <Textarea value={json} onChange={(e) => setJson(e.target.value)} placeholder="JSON" className="min-h-[150px] font-mono text-sm bg-secondary border-border" />
      <Input value={path} onChange={(e) => setPath(e.target.value)} placeholder="$.path.to.value" className="font-mono bg-secondary border-border" />
      <div className="rounded bg-secondary p-3 font-mono text-sm whitespace-pre-wrap">{evaluate()}</div>
    </div>
  );
};
export default JsonPathTool;
