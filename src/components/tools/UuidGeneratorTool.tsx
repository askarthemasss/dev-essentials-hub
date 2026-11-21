import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";
import CopyButton from "@/components/CopyButton";

const UuidGeneratorTool = () => {
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);
  const [count, setCount] = useState("1");
  const [error, setError] = useState("");

  const generate = () => {
    if (!count.trim()) {
      setError("Enter a whole number between 1 and 100.");
      return;
    }
    const parsed = Number(count);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
      setError("Enter a whole number between 1 and 100.");
      return;
    }

    setError("");
    setUuids(Array.from({ length: parsed }, () => crypto.randomUUID()));
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          generate();
        }}
        className="flex flex-wrap items-end gap-2"
      >
        <div className="space-y-1.5">
          <label htmlFor="uuid-count" className="block text-sm font-medium text-foreground">
            How many UUIDs?
          </label>
          <Input
            id="uuid-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={100}
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "uuid-count-error" : undefined}
            className="w-28 border-border bg-secondary font-mono"
          />
        </div>
        <Button type="submit">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Generate
        </Button>
      </form>

      {error && (
        <p id="uuid-count-error" role="alert" className="font-mono text-xs text-danger">
          {error}
        </p>
      )}

      <ul className="space-y-2" aria-label="Generated UUIDs">
        {uuids.map((id, index) => (
          <li key={id} className="flex items-center gap-2 rounded-md border border-border bg-secondary p-2">
            <code className="min-w-0 flex-1 break-all font-mono text-sm text-foreground">{id}</code>
            <CopyButton
              value={id}
              label={`Copy UUID ${index + 1}`}
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            />
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground">
        UUID v4 values are generated locally with Web Crypto. Nothing leaves this browser.
      </p>
    </div>
  );
};

export default UuidGeneratorTool;
