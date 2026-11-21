import { useId, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/CopyButton";
import { jsonToTypeScript } from "@/lib/jsonToTs";

const JsonToTsTool = () => {
  const inputId = useId();
  const outputId = useId();
  const errorId = useId();
  const [input, setInput] = useState(
    '{\n  "id": 1,\n  "name": "Alice",\n  "active": true,\n  "address": {\n    "street": "123 Main",\n    "city": "Springfield"\n  },\n  "tags": ["dev", "js"]\n}',
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setOutput(jsonToTypeScript(JSON.parse(input)));
      setError("");
    } catch (caught) {
      setOutput("");
      setError(
        `Invalid JSON: ${
          caught instanceof Error ? caught.message : "the document could not be parsed"
        }. Check quotes, commas and brackets.`,
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
          JSON input
        </label>
        <Textarea
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={10}
          className="border-border bg-secondary font-mono text-sm"
          placeholder="Paste JSON…"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p id={errorId} role="alert" className="font-mono text-xs text-danger">
            {error}
          </p>
        )}
      </div>
      <Button onClick={convert}>Convert to TypeScript</Button>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={outputId} className="text-sm font-medium text-foreground">
            TypeScript types
          </label>
          <CopyButton value={output} label="Copy TypeScript types" showLabel className="h-9 text-xs" />
        </div>
        <Textarea
          id={outputId}
          value={output}
          readOnly
          rows={12}
          placeholder="Generated types appear here…"
          className="border-border bg-secondary font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default JsonToTsTool;
