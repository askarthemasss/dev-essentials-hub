import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const JwtDecoderTool = () => {
  const [input, setInput] = useState("");

  const decode = (jwt: string) => {
    try {
      const parts = jwt.split(".");
      if (parts.length < 2) return { error: "Invalid JWT format" };
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      return { header, payload, signature: parts[2] || "" };
    } catch { return { error: "Invalid JWT" }; }
  };

  const result = input ? decode(input) : null;

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JWT token here…" className="min-h-[100px] font-mono text-sm bg-secondary border-border" />
      {result && (
        <div className="space-y-3">
          {"error" in result ? (
            <p className="text-destructive font-mono text-sm">{result.error}</p>
          ) : (
            <>
              <div>
                <label className="text-xs font-medium text-muted-foreground font-mono">Header</label>
                <pre className="mt-1 rounded bg-secondary p-3 font-mono text-sm text-foreground overflow-auto">{JSON.stringify(result.header, null, 2)}</pre>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground font-mono">Payload</label>
                <pre className="mt-1 rounded bg-secondary p-3 font-mono text-sm text-foreground overflow-auto">{JSON.stringify(result.payload, null, 2)}</pre>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground font-mono">Signature</label>
                <pre className="mt-1 rounded bg-secondary p-3 font-mono text-sm text-foreground overflow-auto break-all">{result.signature}</pre>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default JwtDecoderTool;
