import { useState } from "react";
import { Input } from "@/components/ui/input";
import { formatBigIntInBase, parseBigIntInBase } from "@/lib/numberBase";

const bases = [
  { label: "Binary", base: 2 },
  { label: "Octal", base: 8 },
  { label: "Decimal", base: 10 },
  { label: "Hex", base: 16 },
];

const NumberBaseTool = () => {
  const [input, setInput] = useState("255");
  const [inputBase, setInputBase] = useState(10);
  const value = parseBigIntInBase(input, inputBase);
  const invalid = input.trim() !== "" && value === null;

  return (
    <div className="max-w-lg space-y-4">
      <div>
        <span className="mb-2 block font-mono text-xs text-muted-foreground">Input base</span>
        <div className="flex flex-wrap gap-2">
          {bases.map((option) => (
            <button
              key={option.base}
              type="button"
              onClick={() => setInputBase(option.base)}
              aria-pressed={inputBase === option.base}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                inputBase === option.base
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {option.label} ({option.base})
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="number-base-value" className="mb-1 block font-mono text-xs text-muted-foreground">
          Value (base {inputBase})
        </label>
        <Input
          id="number-base-value"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={inputBase === 16 ? "FF" : inputBase === 2 ? "11111111" : "255"}
          spellCheck={false}
          aria-invalid={invalid}
          className="border-border bg-secondary font-mono"
        />
        {invalid && (
          <p role="alert" className="mt-1 font-mono text-xs text-destructive">
            “{input.trim()}” is not a valid base-{inputBase} integer.
          </p>
        )}
      </div>

      {value !== null && (
        <div className="space-y-2">
          {bases.map((option) => (
            <div
              key={option.base}
              className="flex flex-col justify-between gap-1 rounded border border-border bg-secondary p-3 font-mono text-sm sm:flex-row sm:items-center"
            >
              <span className="text-muted-foreground">
                {option.label} <span className="text-xs">(base {option.base})</span>
              </span>
              <span className="break-all text-foreground">
                {formatBigIntInBase(value, option.base, option.base === 16)}
              </span>
            </div>
          ))}
          <div className="flex flex-col justify-between gap-1 rounded border border-border bg-secondary p-3 font-mono text-sm sm:flex-row sm:items-center">
            <span className="text-muted-foreground">
              Base 36 <span className="text-xs">(0–9, a–z)</span>
            </span>
            <span className="break-all text-foreground">{formatBigIntInBase(value, 36)}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Large values are handled with arbitrary-precision integers, so nothing is rounded.
      </p>
    </div>
  );
};

export default NumberBaseTool;
