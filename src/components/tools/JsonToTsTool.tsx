import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { jsonToTypeScript } from "@/lib/jsonToTs";

const JsonToTsTool = () => {
  const [input, setInput] = useState(
    '{\n  "id": 1,\n  "name": "Alice",\n  "active": true,\n  "address": {\n    "street": "123 Main",\n    "city": "Springfield"\n  },\n  "tags": ["dev", "js"]\n}'
  );
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      setOutput(jsonToTypeScript(JSON.parse(input)));
    } catch (caught) {
      setOutput("Error: " + (caught instanceof Error ? caught.message : "Invalid JSON"));
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={10}
        className="font-mono text-sm bg-secondary border-border"
        placeholder="Paste JSON…"
      />
      <Button onClick={convert} className="bg-primary text-primary-foreground">
        Convert to TypeScript
      </Button>
      <div className="relative">
        <Textarea
          value={output}
          readOnly
          rows={12}
          className="font-mono text-sm bg-secondary border-border"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={() => navigator.clipboard.writeText(output)}
          aria-label="Copy TypeScript types"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default JsonToTsTool;
