import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, RefreshCw } from "lucide-react";
import { generatePassword } from "@/lib/random";

const PasswordGeneratorTool = () => {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    try {
      setPassword(generatePassword(length, { upper, lower, numbers, symbols }));
      setError("");
    } catch (caught) {
      setPassword("");
      setError(caught instanceof Error ? caught.message : "Could not generate a password");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggles: Array<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = [
    { label: "Uppercase", checked: upper, onChange: setUpper },
    { label: "Lowercase", checked: lower, onChange: setLower },
    { label: "Numbers", checked: numbers, onChange: setNumbers },
    { label: "Symbols", checked: symbols, onChange: setSymbols },
  ];

  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground font-mono">Length: {length}</label>
        <Slider value={[length]} onValueChange={([value]) => setLength(value)} aria-label="Password length" min={4} max={128} step={1} />
      </div>
      <div className="flex flex-wrap gap-4">
        {toggles.map((toggle) => (
          <label key={toggle.label} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={toggle.checked}
              onCheckedChange={(checked) => toggle.onChange(checked === true)}
            />
            {toggle.label}
          </label>
        ))}
      </div>
      <Button onClick={generate}>
        <RefreshCw className="h-4 w-4 mr-1" /> Generate
      </Button>
      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {error}
        </p>
      )}
      {password && (
        <div className="flex items-center gap-2 rounded bg-secondary p-3">
          <code className="flex-1 font-mono text-sm break-all">{password}</code>
          <Button variant="ghost" size="icon" onClick={copy} aria-label="Copy password">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PasswordGeneratorTool;
