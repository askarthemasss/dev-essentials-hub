import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HashGeneratorTool = () => {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [hash, setHash] = useState("");

  const generate = async (text: string, algorithm: string) => {
    if (!text) { setHash(""); return; }
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest(algorithm, data);
    setHash(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join(""));
  };

  return (
    <div className="space-y-4">
      <Select value={algo} onValueChange={(v) => { setAlgo(v); generate(input, v); }}>
        <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="SHA-1">SHA-1</SelectItem>
          <SelectItem value="SHA-256">SHA-256</SelectItem>
          <SelectItem value="SHA-384">SHA-384</SelectItem>
          <SelectItem value="SHA-512">SHA-512</SelectItem>
        </SelectContent>
      </Select>
      <Textarea value={input} onChange={(e) => { setInput(e.target.value); generate(e.target.value, algo); }} placeholder="Enter text to hash…" className="min-h-[100px] font-mono text-sm bg-secondary border-border" />
      {hash && <div className="rounded bg-secondary p-3 font-mono text-sm break-all">{hash}</div>}
    </div>
  );
};
export default HashGeneratorTool;
