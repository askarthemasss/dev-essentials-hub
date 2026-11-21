import { useId, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/CopyButton";

interface JsonSchema {
  type?: string;
  items?: JsonSchema;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  [key: string]: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonToSchema(value: unknown): JsonSchema {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    return { type: "array", items: jsonToSchema(value[0]) };
  }
  switch (typeof value) {
    case "string":
      return { type: "string" };
    case "number":
      return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "object": {
      if (!isRecord(value)) return {};
      const properties: Record<string, JsonSchema> = {};
      const required: string[] = [];
      for (const [key, child] of Object.entries(value)) {
        properties[key] = jsonToSchema(child);
        required.push(key);
      }
      return { type: "object", properties, required };
    }
    default:
      return {};
  }
}

const JsonSchemaTool = () => {
  const inputId = useId();
  const outputId = useId();
  const errorId = useId();
  const [input, setInput] = useState(
    '{\n  "name": "John",\n  "age": 30,\n  "active": true,\n  "tags": ["dev", "js"]\n}',
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const generate = () => {
    try {
      const parsed = JSON.parse(input);
      const schema = { $schema: "https://json-schema.org/draft/2020-12/schema", ...jsonToSchema(parsed) };
      setOutput(JSON.stringify(schema, null, 2));
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
          rows={8}
          className="border-border bg-secondary font-mono text-sm"
          placeholder="Paste JSON here…"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p id={errorId} role="alert" className="font-mono text-xs text-danger">
            {error}
          </p>
        )}
      </div>
      <Button onClick={generate}>Generate schema</Button>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={outputId} className="text-sm font-medium text-foreground">
            JSON Schema
          </label>
          <CopyButton value={output} label="Copy JSON schema" showLabel className="h-9 text-xs" />
        </div>
        <Textarea
          id={outputId}
          value={output}
          readOnly
          rows={12}
          placeholder="Generated schema appears here…"
          className="border-border bg-secondary font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default JsonSchemaTool;
