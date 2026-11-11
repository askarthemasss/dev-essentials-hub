import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { decodeJwt } from "@/lib/jwt";

const JwtDecoderTool = () => {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    try {
      return { token: decodeJwt(input), error: "" };
    } catch (caught) {
      return { token: null, error: caught instanceof Error ? caught.message : "Invalid JWT" };
    }
  }, [input]);

  const expiry = useMemo(() => {
    const exp = result?.token?.payload.exp;
    if (typeof exp !== "number") return null;
    const expiresAt = new Date(exp * 1000);
    return {
      date: expiresAt.toUTCString(),
      expired: expiresAt.getTime() <= Date.now(),
    };
  }, [result]);

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Paste JWT token here…"
        spellCheck={false}
        className="min-h-[100px] border-border bg-secondary font-mono text-sm"
        aria-label="JWT token"
      />

      {result && (
        <div className="space-y-3">
          {result.error ? (
            <p role="alert" className="font-mono text-sm text-destructive">
              {result.error}
            </p>
          ) : result.token ? (
            <>
              {expiry && (
                <div
                  className={`rounded border p-3 font-mono text-xs ${
                    expiry.expired
                      ? "border-red-500/50 bg-red-500/10 text-red-400"
                      : "border-green-500/50 bg-green-500/10 text-green-400"
                  }`}
                >
                  {expiry.expired ? "Expired" : "Expires"}: {expiry.date}
                </div>
              )}
              <div>
                <h3 className="font-mono text-xs font-medium text-muted-foreground">Header</h3>
                <pre className="mt-1 overflow-auto rounded bg-secondary p-3 font-mono text-sm text-foreground">
                  {JSON.stringify(result.token.header, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-mono text-xs font-medium text-muted-foreground">Payload</h3>
                <pre className="mt-1 overflow-auto rounded bg-secondary p-3 font-mono text-sm text-foreground">
                  {JSON.stringify(result.token.payload, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-mono text-xs font-medium text-muted-foreground">Signature (base64url)</h3>
                <pre className="mt-1 overflow-auto break-all rounded bg-secondary p-3 font-mono text-sm text-foreground">
                  {result.token.signature || "(none)"}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground">
                Decoding does not verify the signature. Use the JWT Generator to sign a token with HS256/384/512.
              </p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default JwtDecoderTool;
