import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { evaluateJsonPath, formatJsonPathResult } from "@/lib/jsonPath";

const JsonPathTool = () => {
  const [json, setJson] = useState(
    '{"name":"John","age":30,"address":{"city":"NYC"},"hobbies":["reading","coding"]}'
  );
  const [path, setPath] = useState("$.address.city");

  const evaluate = () => {
    try {
      return formatJsonPathResult(evaluateJsonPath(JSON.parse(json), path));
    } catch (caught) {
      return `Error: ${caught instanceof Error ? caught.message : "Invalid JSON or path"}`;
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={json}
        onChange={(event) => setJson(event.target.value)}
        placeholder="JSON"
        className="min-h-[150px] font-mono text-sm bg-secondary border-border"
      />
      <Input
        value={path}
        onChange={(event) => setPath(event.target.value)}
        placeholder="$.path.to.value, $[0].name or $['a.b']"
        className="font-mono bg-secondary border-border"
      />
      <div className="rounded bg-secondary p-3 font-mono text-sm whitespace-pre-wrap">{evaluate()}</div>
    </div>
  );
};

export default JsonPathTool;
