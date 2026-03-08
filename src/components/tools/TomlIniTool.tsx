import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function tomlToIni(toml: string): string {
  const lines = toml.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) { result.push(trimmed); continue; }
    if (trimmed.startsWith("[")) { result.push(trimmed); continue; }
    // Convert TOML values to INI (strip quotes for strings, remove type hints)
    const m = trimmed.match(/^(\S+)\s*=\s*(.+)$/);
    if (m) {
      let val = m[2].trim();
      // Remove quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      // Arrays → comma separated
      if (val.startsWith("[") && val.endsWith("]")) {
        val = val.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, "")).join(", ");
      }
      result.push(`${m[1]} = ${val}`);
    } else {
      result.push(trimmed);
    }
  }
  return result.join("\n");
}

function iniToToml(ini: string): string {
  const lines = ini.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith(";")) { result.push(trimmed.replace(/^;/, "#")); continue; }
    if (trimmed.startsWith("[")) { result.push(trimmed); continue; }
    const m = trimmed.match(/^(\S+)\s*=\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      // Try to detect type
      if (val === "true" || val === "false") {
        result.push(`${m[1]} = ${val}`);
      } else if (/^\d+$/.test(val)) {
        result.push(`${m[1]} = ${val}`);
      } else if (/^\d+\.\d+$/.test(val)) {
        result.push(`${m[1]} = ${val}`);
      } else if (val.includes(",")) {
        const items = val.split(",").map((v) => `"${v.trim()}"`).join(", ");
        result.push(`${m[1]} = [${items}]`);
      } else {
        result.push(`${m[1]} = "${val}"`);
      }
    } else {
      result.push(trimmed);
    }
  }
  return result.join("\n");
}

const TomlIniTool = () => {
  const [input, setInput] = useState(`[database]
host = "localhost"
port = 5432
name = "mydb"
ssl = true

[server]
port = 3000
workers = 4
allowed_origins = ["http://localhost", "https://example.com"]`);
  const [mode, setMode] = useState<"toml-to-ini" | "ini-to-toml">("toml-to-ini");

  const output = mode === "toml-to-ini" ? tomlToIni(input) : iniToToml(input);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("toml-to-ini")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "toml-to-ini" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>TOML → INI</button>
        <button onClick={() => setMode("ini-to-toml")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "ini-to-toml" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>INI → TOML</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-mono text-muted-foreground mb-1 block">{mode === "toml-to-ini" ? "TOML" : "INI"}</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={14} className="font-mono text-sm bg-secondary border-border" />
        </div>
        <div className="relative">
          <label className="text-sm font-mono text-muted-foreground mb-1 block">{mode === "toml-to-ini" ? "INI" : "TOML"}</label>
          <Textarea value={output} readOnly rows={14} className="font-mono text-sm bg-secondary border-border" />
          <Button size="icon" variant="ghost" className="absolute top-8 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default TomlIniTool;
