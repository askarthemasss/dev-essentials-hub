import { useState } from "react";
import { Input } from "@/components/ui/input";
import { formatBigIntInBase, parseBigIntInBase } from "@/lib/numberBase";

type Mode = "decimal-to-octal" | "octal-to-decimal";

const OctalDecimalTool = () => {
  const [input, setInput] = useState("255");
  const [mode, setMode] = useState<Mode>("decimal-to-octal");

  const inputBase = mode === "decimal-to-octal" ? 10 : 8;
  const outputBase = mode === "decimal-to-octal" ? 8 : 10;
  const value = parseBigIntInBase(input, inputBase);
  const output = value === null ? "" : formatBigIntInBase(value, outputBase);
  const invalid = input.trim() !== "" && value === null;

  const switchMode = (nextMode: Mode) => {
    if (value !== null) {
      setInput(formatBigIntInBase(value, nextMode === "decimal-to-octal" ? 10 : 8));
    }
    setMode(nextMode);
  };

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => switchMode("decimal-to-octal")}
          aria-pressed={mode === "decimal-to-octal"}
          className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
            mode === "decimal-to-octal"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          Decimal → Octal
        </button>
        <button
          type="button"
          onClick={() => switchMode("octal-to-decimal")}
          aria-pressed={mode === "octal-to-decimal"}
          className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
            mode === "octal-to-decimal"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          Octal → Decimal
        </button>
      </div>

      <div>
        <label htmlFor="octal-decimal-input" className="mb-1 block font-mono text-xs text-muted-foreground">
          {mode === "decimal-to-octal" ? "Decimal" : "Octal"}
        </label>
        <Input
          id="octal-decimal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={mode === "decimal-to-octal" ? "255" : "377"}
          spellCheck={false}
          aria-invalid={invalid}
          className="border-border bg-secondary font-mono"
        />
        {invalid && (
          <p role="alert" className="mt-1 font-mono text-xs text-destructive">
            “{input.trim()}” is not a valid {mode === "decimal-to-octal" ? "decimal" : "octal"} integer.
          </p>
        )}
      </div>

      {output && (
        <div className="rounded border border-border bg-secondary p-3">
          <div className="mb-1 font-mono text-xs text-muted-foreground">
            {mode === "decimal-to-octal" ? "Octal" : "Decimal"}
          </div>
          <div className="break-all font-mono text-lg text-foreground">{output}</div>
        </div>
      )}
    </div>
  );
};

export default OctalDecimalTool;
