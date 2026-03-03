import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
const ChecksumValidatorTool = () => {
  const [hash1, setHash1] = useState("");
  const [hash2, setHash2] = useState("");
  const match = hash1 && hash2 && hash1.trim().toLowerCase() === hash2.trim().toLowerCase();
  return (
    <div className="space-y-4 max-w-lg">
      <div><label className="text-xs text-muted-foreground font-mono">Hash 1</label><Input value={hash1} onChange={(e) => setHash1(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div><label className="text-xs text-muted-foreground font-mono">Hash 2</label><Input value={hash2} onChange={(e) => setHash2(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      {hash1 && hash2 && <div className={`rounded p-3 font-mono text-sm text-center ${match ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>{match ? "✅ Hashes match!" : "❌ Hashes do not match"}</div>}
    </div>
  );
};
export default ChecksumValidatorTool;
