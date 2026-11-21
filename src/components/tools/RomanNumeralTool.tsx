import { useState } from "react";
import { Input } from "@/components/ui/input";
import { convertRomanInput } from "@/lib/roman";

const RomanNumeralTool = () => {
  const [input, setInput] = useState("42");
  const { value, error } = convertRomanInput(input);

  return (
    <div className="space-y-3 max-w-md">
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Enter a number (1–3999) or a Roman numeral"
        spellCheck={false}
        aria-invalid={Boolean(error)}
        className="font-mono bg-secondary border-border"
      />
      {error ? (
        <div role="alert" className="rounded bg-secondary p-3 font-mono text-sm text-danger">
          {error}
        </div>
      ) : (
        value && <div className="rounded bg-secondary p-3 font-mono text-lg text-center">{value}</div>
      )}
    </div>
  );
};

export default RomanNumeralTool;
