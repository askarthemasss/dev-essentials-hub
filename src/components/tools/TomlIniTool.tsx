import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CopyButton from "@/components/CopyButton";
import { isConversionResult } from "@/lib/conversion";
import { iniToToml, tomlToIni } from "@/lib/toml";

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

  const switchMode = (nextMode: "toml-to-ini" | "ini-to-toml") => {
    if (nextMode === mode) return;
    if (isConversionResult(output)) setInput(output);
    setMode(nextMode);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => switchMode("toml-to-ini")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "toml-to-ini" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>TOML → INI</button>
        <button onClick={() => switchMode("ini-to-toml")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "ini-to-toml" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>INI → TOML</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">{mode === "toml-to-ini" ? "TOML" : "INI"}</span>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} aria-label={mode === "toml-to-ini" ? "TOML input" : "INI input"} rows={14} className="font-mono text-sm bg-secondary border-border" />
        </div>
        <div className="relative">
          <span className="text-sm font-mono text-muted-foreground mb-1 block">{mode === "toml-to-ini" ? "INI" : "TOML"}</span>
          <Textarea value={output} readOnly rows={14} aria-label="Converted TOML or INI output" className="font-mono text-sm bg-secondary border-border" />
          <CopyButton value={output} label="Copy output" size="icon" className="absolute right-2 top-8 bg-card" />
        </div>
      </div>
    </div>
  );
};

export default TomlIniTool;
