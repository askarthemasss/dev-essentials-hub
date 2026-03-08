import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

function validateYaml(yaml: string): { valid: boolean; error?: string } {
  if (!yaml.trim()) return { valid: true };
  const lines = yaml.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    const indent = line.length - line.trimStart().length;
    if (indent % 2 !== 0 && line.includes(":")) {
      return { valid: false, error: `Line ${i + 1}: Inconsistent indentation (${indent} spaces)` };
    }
    if (line.includes("\t")) {
      return { valid: false, error: `Line ${i + 1}: Tabs are not allowed in YAML` };
    }
    if (line.trimStart().startsWith("- ") || line.includes(":")) continue;
    if (i > 0 && !lines[i - 1].trimEnd().endsWith("|") && !lines[i - 1].trimEnd().endsWith(">")) {
      // Could be a multi-line value, skip
    }
  }
  // Check for duplicate keys at same level
  try {
    // Basic structure check - look for unclosed brackets/braces
    let braces = 0, brackets = 0;
    for (const ch of yaml) {
      if (ch === "{") braces++;
      if (ch === "}") braces--;
      if (ch === "[") brackets++;
      if (ch === "]") brackets--;
      if (braces < 0) return { valid: false, error: "Unexpected closing brace }" };
      if (brackets < 0) return { valid: false, error: "Unexpected closing bracket ]" };
    }
    if (braces !== 0) return { valid: false, error: "Unclosed braces {}" };
    if (brackets !== 0) return { valid: false, error: "Unclosed brackets []" };
  } catch (e: any) {
    return { valid: false, error: e.message };
  }
  return { valid: true };
}

const YamlValidatorTool = () => {
  const [input, setInput] = useState("name: John\nage: 30\ntags:\n  - developer\n  - javascript");
  const result = validateYaml(input);

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="font-mono text-sm bg-secondary border-border" placeholder="Paste YAML…" />
      <div className={`rounded-lg border p-4 ${result.valid ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
        <p className="font-mono text-sm font-bold">{result.valid ? "✓ Valid YAML" : "✗ Invalid YAML"}</p>
        {result.error && <p className="font-mono text-xs text-red-400 mt-1">{result.error}</p>}
      </div>
    </div>
  );
};

export default YamlValidatorTool;
