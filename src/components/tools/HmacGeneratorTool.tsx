import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const HmacGeneratorTool = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [result, setResult] = useState("");
  const generate = async (msg: string, k: string, a: string) => {
    if (!msg || !k) { setResult(""); return; }
    try {
      const enc = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey("raw", enc.encode(k), { name: "HMAC", hash: a }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
      setResult(Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join(""));
    } catch { setResult("Error"); }
  };
  return (
    <div className="space-y-4">
      <Select value={algo} onValueChange={(v) => { setAlgo(v); generate(message, key, v); }}><SelectTrigger className="w-32 bg-secondary border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="SHA-256">SHA-256</SelectItem><SelectItem value="SHA-384">SHA-384</SelectItem><SelectItem value="SHA-512">SHA-512</SelectItem></SelectContent></Select>
      <Input value={key} onChange={(e) => { setKey(e.target.value); generate(message, e.target.value, algo); }} placeholder="Secret key" className="font-mono bg-secondary border-border" />
      <Textarea value={message} onChange={(e) => { setMessage(e.target.value); generate(e.target.value, key, algo); }} placeholder="Message" className="min-h-[100px] font-mono text-sm bg-secondary border-border" />
      {result && <div className="rounded bg-secondary p-3 font-mono text-sm break-all">{result}</div>}
    </div>
  );
};
export default HmacGeneratorTool;
