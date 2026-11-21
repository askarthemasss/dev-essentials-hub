import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { signJwt } from "@/lib/jwt";

const JwtGeneratorTool = () => {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [signing, setSigning] = useState(false);
  const requestId = useRef(0);

  const generate = async () => {
    const request = requestId.current + 1;
    requestId.current = request;
    setSigning(true);
    setError("");

    try {
      const token = await signJwt(header, payload, secret);
      if (requestId.current === request) setOutput(token);
    } catch (caught) {
      if (requestId.current === request) {
        setOutput("");
        setError(caught instanceof Error ? caught.message : "Could not sign token");
      }
    } finally {
      if (requestId.current === request) setSigning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
        Signs locally with HMAC via the Web Crypto API. Supported algorithms:{" "}
        <span className="font-mono text-foreground">HS256</span>,{" "}
        <span className="font-mono text-foreground">HS384</span>,{" "}
        <span className="font-mono text-foreground">HS512</span>. The secret never leaves this page.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="jwt-header" className="mb-1 block text-sm font-medium text-foreground">
            Header
          </label>
          <Textarea
            id="jwt-header"
            value={header}
            onChange={(event) => setHeader(event.target.value)}
            rows={5}
            spellCheck={false}
            className="border-border bg-secondary font-mono text-sm"
          />
        </div>
        <div>
          <label htmlFor="jwt-payload" className="mb-1 block text-sm font-medium text-foreground">
            Payload
          </label>
          <Textarea
            id="jwt-payload"
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            rows={5}
            spellCheck={false}
            className="border-border bg-secondary font-mono text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="jwt-secret" className="mb-1 block text-sm font-medium text-foreground">
          Secret key
        </label>
        <Input
          id="jwt-secret"
          type="password"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          placeholder="HMAC secret"
          autoComplete="off"
          className="border-border bg-secondary font-mono"
        />
      </div>

      <Button onClick={() => void generate()} disabled={signing} className="bg-primary text-primary-foreground">
        <RefreshCw className={`mr-2 h-4 w-4 ${signing ? "animate-spin" : ""}`} aria-hidden="true" />
        {signing ? "Signing…" : "Generate JWT"}
      </Button>

      {error && (
        <p id="jwt-sign-error" role="alert" className="font-mono text-sm text-danger">
          {error}
        </p>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="jwt-output" className="text-sm font-medium text-foreground">
              Signed token
            </label>
            <CopyButton value={output} label="Copy JWT" showLabel />
          </div>
          <Textarea
            id="jwt-output"
            value={output}
            readOnly
            rows={5}
            spellCheck={false}
            className="break-all border-border bg-secondary font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default JwtGeneratorTool;
