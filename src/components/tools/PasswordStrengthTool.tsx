import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
const PasswordStrengthTool = () => {
  const [pw, setPw] = useState("");
  const calc = (s: string) => {
    let score = 0;
    if (s.length >= 8) score += 20;
    if (s.length >= 12) score += 10;
    if (s.length >= 16) score += 10;
    if (/[a-z]/.test(s)) score += 10;
    if (/[A-Z]/.test(s)) score += 10;
    if (/\d/.test(s)) score += 10;
    if (/[^a-zA-Z0-9]/.test(s)) score += 15;
    if (new Set(s).size >= 8) score += 15;
    return Math.min(score, 100);
  };
  const score = calc(pw);
  const label = score < 30 ? "Weak" : score < 60 ? "Fair" : score < 80 ? "Good" : "Strong";
  return (
    <div className="space-y-4 max-w-md">
      <Input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" className="font-mono bg-secondary border-border" type="text" />
      <Progress value={score} className="h-3" />
      <div className="flex justify-between font-mono text-sm"><span>{label}</span><span>{score}/100</span></div>
      <div className="space-y-1 text-xs font-mono text-muted-foreground">
        <div>{pw.length >= 8 ? "✅" : "❌"} At least 8 characters</div>
        <div>{/[A-Z]/.test(pw) ? "✅" : "❌"} Uppercase letter</div>
        <div>{/[a-z]/.test(pw) ? "✅" : "❌"} Lowercase letter</div>
        <div>{/\d/.test(pw) ? "✅" : "❌"} Number</div>
        <div>{/[^a-zA-Z0-9]/.test(pw) ? "✅" : "❌"} Special character</div>
      </div>
    </div>
  );
};
export default PasswordStrengthTool;
