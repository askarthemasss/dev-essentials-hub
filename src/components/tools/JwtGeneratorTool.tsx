import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function base64url(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const JwtGeneratorTool = () => {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [output, setOutput] = useState("");

  const generate = () => {
    try {
      JSON.parse(header);
      JSON.parse(payload);
      const h = base64url(header);
      const p = base64url(payload);
      const fakeSignature = base64url("signature-placeholder");
      setOutput(`${h}.${p}.${fakeSignature}`);
    } catch (e: any) {
      setOutput("Error: " + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-mono text-muted-foreground mb-1 block">Header</label>
        <Textarea value={header} onChange={(e) => setHeader(e.target.value)} rows={4} className="font-mono text-sm bg-secondary border-border" />
      </div>
      <div>
        <label className="text-sm font-mono text-muted-foreground mb-1 block">Payload</label>
        <Textarea value={payload} onChange={(e) => setPayload(e.target.value)} rows={6} className="font-mono text-sm bg-secondary border-border" />
      </div>
      <p className="text-xs text-muted-foreground">Note: Signature is a placeholder — real HMAC signing requires a secret key and crypto library.</p>
      <Button onClick={generate} className="bg-primary text-primary-foreground">Generate JWT</Button>
      <div className="relative">
        <Textarea value={output} readOnly rows={4} className="font-mono text-sm bg-secondary border-border break-all" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default JwtGeneratorTool;
