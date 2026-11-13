import { useState } from "react";
import { parseDocument } from "yaml";
import { Textarea } from "@/components/ui/textarea";

function validateYaml(source: string): { valid: boolean; error?: string } {
  if (!source.trim()) return { valid: true };

  const document = parseDocument(source);
  if (document.errors.length > 0) {
    return { valid: false, error: document.errors[0].message };
  }
  return { valid: true };
}

const YamlValidatorTool = () => {
  const [input, setInput] = useState("name: John\nage: 30\ntags:\n  - developer\n  - javascript");
  const result = validateYaml(input);

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={10}
        className="font-mono text-sm bg-secondary border-border"
        placeholder="Paste YAML…"
        aria-label="YAML input"
      />
      <div
        className={`rounded-lg border p-4 ${
          result.valid ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
        }`}
        role="status"
      >
        <p className="font-mono text-sm font-bold">{result.valid ? "✓ Valid YAML" : "✗ Invalid YAML"}</p>
        {result.error && <p className="mt-1 whitespace-pre-wrap font-mono text-xs text-red-400">{result.error}</p>}
      </div>
    </div>
  );
};

export default YamlValidatorTool;
