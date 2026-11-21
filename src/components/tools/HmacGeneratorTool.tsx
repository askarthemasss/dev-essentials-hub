import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HmacGeneratorTool = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setResult("");
    setError("");

    if (!message || !key) return () => { active = false; };

    const generate = async () => {
      try {
        const encoder = new TextEncoder();
        const cryptoKey = await crypto.subtle.importKey(
          "raw",
          encoder.encode(key),
          { name: "HMAC", hash: algo },
          false,
          ["sign"]
        );
        const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message));
        if (active) {
          setResult(
            Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("")
          );
        }
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Could not generate HMAC");
        }
      }
    };

    void generate();

    return () => {
      active = false;
    };
  }, [message, key, algo]);

  return (
    <div className="space-y-4">
      <Select value={algo} onValueChange={setAlgo}>
        <SelectTrigger aria-label="HMAC algorithm" className="w-32 bg-secondary border-border"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="SHA-256">SHA-256</SelectItem>
          <SelectItem value="SHA-384">SHA-384</SelectItem>
          <SelectItem value="SHA-512">SHA-512</SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={key}
        onChange={(event) => setKey(event.target.value)}
        aria-label="Secret key"
        placeholder="Secret key"
        className="font-mono bg-secondary border-border"
      />
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        aria-label="Message"
        placeholder="Message"
        className="min-h-[100px] font-mono text-sm bg-secondary border-border"
      />
      {error && <div role="alert" className="rounded bg-secondary p-3 font-mono text-sm text-danger">{error}</div>}
      {result && <div className="rounded bg-secondary p-3 font-mono text-sm break-all">{result}</div>}
    </div>
  );
};

export default HmacGeneratorTool;
