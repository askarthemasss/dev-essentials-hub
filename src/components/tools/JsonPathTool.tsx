import { useId, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { evaluateJsonPath, formatJsonPathResult } from "@/lib/jsonPath";

const JsonPathTool = () => {
  const jsonId = useId();
  const pathId = useId();
  const errorId = useId();
  const [json, setJson] = useState(
    '{"name":"John","age":30,"address":{"city":"NYC"},"hobbies":["reading","coding"]}',
  );
  const [path, setPath] = useState("$.address.city");

  let output = "";
  let error = "";

  try {
    output = formatJsonPathResult(evaluateJsonPath(JSON.parse(json), path));
  } catch (caught) {
    error = `Invalid JSON or path: ${
      caught instanceof Error ? caught.message : "the expression could not be evaluated"
    }. Check the JSON and the JSONPath expression.`;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor={jsonId} className="block text-sm font-medium text-foreground">
          JSON input
        </label>
        <Textarea
          id={jsonId}
          value={json}
          onChange={(event) => setJson(event.target.value)}
          rows={8}
          placeholder="Paste JSON here…"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="border-border bg-secondary font-mono text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor={pathId} className="block text-sm font-medium text-foreground">
          JSONPath expression
        </label>
        <Input
          id={pathId}
          value={path}
          onChange={(event) => setPath(event.target.value)}
          placeholder="$.path.to.value, $[0].name or $['a.b']"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="border-border bg-secondary font-mono"
        />
        {error && (
          <p id={errorId} role="alert" className="font-mono text-xs text-danger">
            {error}
          </p>
        )}
      </div>
      <div
        aria-live="polite"
        className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-secondary p-3 font-mono text-sm text-foreground"
      >
        {error ? "Result unavailable while the input is invalid." : output || "No value matches this path."}
      </div>
    </div>
  );
};

export default JsonPathTool;
