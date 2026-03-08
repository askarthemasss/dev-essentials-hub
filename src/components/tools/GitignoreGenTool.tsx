import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

const templates: Record<string, string[]> = {
  Node: ["node_modules/", "dist/", ".env", ".env.local", "npm-debug.log*", "coverage/", ".nyc_output/"],
  React: ["node_modules/", "build/", "dist/", ".env", ".env.local", "npm-debug.log*", "coverage/"],
  Python: ["__pycache__/", "*.py[cod]", "*.egg-info/", "dist/", "build/", ".env", "venv/", ".venv/", "*.so"],
  Java: ["*.class", "*.jar", "target/", ".gradle/", "build/", "*.log", ".settings/", ".project"],
  Go: ["bin/", "*.exe", "*.test", "vendor/", ".env"],
  Rust: ["target/", "Cargo.lock", "*.pdb"],
  Ruby: ["*.gem", ".bundle/", "vendor/bundle/", "log/", "tmp/", ".env"],
  General: [".DS_Store", "Thumbs.db", "*.log", ".idea/", ".vscode/", "*.swp", "*.swo", "*~"],
};

const GitignoreGenTool = () => {
  const [selected, setSelected] = useState<string[]>(["General", "Node"]);
  const output = selected.flatMap((t) => [`# ${t}`, ...templates[t], ""]).join("\n");

  const toggle = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(templates).map((key) => (
          <Button key={key} size="sm" variant={selected.includes(key) ? "default" : "outline"} onClick={() => toggle(key)}>
            {key}
          </Button>
        ))}
      </div>
      <div className="relative">
        <Textarea value={output} readOnly rows={16} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default GitignoreGenTool;
