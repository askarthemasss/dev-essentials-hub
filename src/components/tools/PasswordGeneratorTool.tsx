import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, RefreshCw } from "lucide-react";

const PasswordGeneratorTool = () => {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { setPassword("Select at least one option"); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, n => chars[n % chars.length]).join(""));
  };

  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground font-mono">Length: {length}</label>
        <Slider value={[length]} onValueChange={([v]) => setLength(v)} min={4} max={128} step={1} />
      </div>
      <div className="flex flex-wrap gap-4">
        {[["Uppercase", upper, setUpper], ["Lowercase", lower, setLower], ["Numbers", numbers, setNumbers], ["Symbols", symbols, setSymbols]].map(([label, val, setter]: any) => (
          <label key={label} className="flex items-center gap-2 text-sm"><Checkbox checked={val} onCheckedChange={setter} />{label}</label>
        ))}
      </div>
      <Button onClick={generate}><RefreshCw className="h-4 w-4 mr-1" /> Generate</Button>
      {password && (
        <div className="flex items-center gap-2 rounded bg-secondary p-3">
          <code className="flex-1 font-mono text-sm break-all">{password}</code>
          <Button variant="ghost" size="icon" onClick={copy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</Button>
        </div>
      )}
    </div>
  );
};
export default PasswordGeneratorTool;
