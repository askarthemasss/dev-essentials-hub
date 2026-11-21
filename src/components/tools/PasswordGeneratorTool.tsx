import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { generatePassword } from "@/lib/random";

const PasswordGeneratorTool = () => {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generate = () => {
    try {
      setPassword(generatePassword(length, { upper, lower, numbers, symbols }));
      setError("");
    } catch (caught) {
      setPassword("");
      setError(caught instanceof Error ? caught.message : "Could not generate a password");
    }
  };

  const toggles: Array<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = [
    { label: "Uppercase", checked: upper, onChange: setUpper },
    { label: "Lowercase", checked: lower, onChange: setLower },
    { label: "Numbers", checked: numbers, onChange: setNumbers },
    { label: "Symbols", checked: symbols, onChange: setSymbols },
  ];

  return (
    <div className="max-w-md space-y-4">
      <div className="space-y-2">
        <span className="block font-mono text-sm text-secondary-foreground">Length: {length}</span>
        <Slider
          value={[length]}
          onValueChange={([value]) => setLength(value)}
          aria-label="Password length"
          min={4}
          max={128}
          step={1}
        />
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
      <Button type="button" onClick={generate}>
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Generate
      </Button>
      {error && (
        <p role="alert" className="font-mono text-xs text-danger">
          {error}
        </p>
      )}
      {password && (
        <div className="flex items-center gap-2 rounded-md border border-border bg-secondary p-3">
          <code className="min-w-0 flex-1 break-all font-mono text-sm text-foreground">{password}</code>
          <CopyButton value={password} label="Copy password" showLabel />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Generated locally with Web Crypto. Raise the length for anything long-lived.
      </p>
    </div>
  );
};

export default PasswordGeneratorTool;
