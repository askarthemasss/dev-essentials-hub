import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, FileUp, XCircle } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { parseExpectedChecksum, type HashAlgorithm } from "@/lib/checksum";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const ChecksumValidatorTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [expected, setExpected] = useState("");
  const [computed, setComputed] = useState("");
  const [hashing, setHashing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setComputed("");
      setHashing(false);
      return;
    }

    let active = true;
    setHashing(true);
    setError("");
    setComputed("");

    void file
      .arrayBuffer()
      .then((buffer) => crypto.subtle.digest(algorithm, buffer))
      .then((digest) => {
        if (active) setComputed(toHex(digest));
      })
      .catch(() => {
        if (active) setError("Could not read this file");
      })
      .finally(() => {
        if (active) setHashing(false);
      });

    return () => {
      active = false;
    };
  }, [file, algorithm]);

  const parsedExpected = parseExpectedChecksum(expected, algorithm);
  const expectedNormalized = parsedExpected.value;
  const matches = Boolean(computed && expectedNormalized && computed === expectedNormalized);

  return (
    <div className="max-w-2xl space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="mb-1 block text-xs text-muted-foreground">File</span>
          <label
            htmlFor="checksum-file"
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-secondary px-3 py-2 font-mono text-sm text-muted-foreground transition-colors duration-150 hover:border-primary/60 hover:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
          >
            <FileUp className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{file ? file.name : "Choose a file to hash…"}</span>
          </label>
          <input
            id="checksum-file"
            type="file"
            className="sr-only"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </div>
        <div>
          <span className="mb-1 block text-xs text-muted-foreground">Algorithm</span>
          <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}>
            <SelectTrigger aria-label="Checksum algorithm" className="w-36 border-border bg-secondary font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHA-1">SHA-1</SelectItem>
              <SelectItem value="SHA-256">SHA-256</SelectItem>
              <SelectItem value="SHA-512">SHA-512</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="checksum-expected" className="mb-1 block text-sm font-medium text-foreground">
          Expected checksum
        </label>
        <Input
          id="checksum-expected"
          value={expected}
          onChange={(event) => setExpected(event.target.value)}
          placeholder="Paste the published checksum (sha256: prefix is optional)"
          spellCheck={false}
          aria-invalid={Boolean(parsedExpected.error)}
          aria-describedby={parsedExpected.error ? "checksum-expected-error" : undefined}
          className="border-border bg-secondary font-mono text-sm"
        />
        {parsedExpected.error && (
          <p id="checksum-expected-error" role="alert" className="mt-1 font-mono text-xs text-danger">
            {parsedExpected.error}
          </p>
        )}
      </div>

      {hashing && (
        <p role="status" aria-live="polite" className="font-mono text-sm text-muted-foreground">
          Hashing {file?.name}…
        </p>
      )}
      {error && (
        <p role="alert" className="font-mono text-sm text-danger">
          {error}
        </p>
      )}

      {computed && (
        <div className="space-y-3">
          <div className="rounded border border-border bg-secondary p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-muted-foreground">{algorithm}</span>
              <CopyButton value={computed} label="Copy checksum" showLabel className="h-8 text-xs" />
            </div>
            <p className="break-all font-mono text-sm text-foreground">{computed}</p>
          </div>

          {expectedNormalized && (
            <div
              role="status"
              className={`flex items-center gap-2 rounded-md border p-3 font-mono text-sm ${
                matches
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-danger/40 bg-danger/10 text-danger"
              }`}
            >
              {matches ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <XCircle className="h-4 w-4" aria-hidden="true" />
              )}
              {matches ? "Checksum matches" : "Checksum does not match"}
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Files are read and hashed locally in your browser. Nothing is uploaded.
      </p>
    </div>
  );
};

export default ChecksumValidatorTool;
