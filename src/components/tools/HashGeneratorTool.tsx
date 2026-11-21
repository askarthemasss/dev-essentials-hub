import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

const HashGeneratorTool = () => {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setHash("");
    setError("");

    if (!input) return () => { active = false; };

    crypto.subtle
      .digest(algo, new TextEncoder().encode(input))
      .then((buffer) => {
        if (active) setHash(toHex(buffer));
      })
      .catch((caught: unknown) => {
        if (active) setError(caught instanceof Error ? caught.message : "Could not generate hash");
      });

    return () => {
      active = false;
    };
  }, [input, algo]);

  return (
    <div className="space-y-4">
      <Select value={algo} onValueChange={setAlgo}>
        <SelectTrigger aria-label="Hash algorithm" className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="SHA-1">SHA-1</SelectItem>
          <SelectItem value="SHA-256">SHA-256</SelectItem>
          <SelectItem value="SHA-384">SHA-384</SelectItem>
          <SelectItem value="SHA-512">SHA-512</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Enter text to hash…"
        className="min-h-[100px] font-mono text-sm bg-secondary border-border"
      />
      {error && <div role="alert" className="rounded bg-secondary p-3 font-mono text-sm text-danger">{error}</div>}
      {hash && <div className="rounded bg-secondary p-3 font-mono text-sm break-all">{hash}</div>}
    </div>
  );
};

export default HashGeneratorTool;
