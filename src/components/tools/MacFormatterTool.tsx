import { useState } from "react";
import { Input } from "@/components/ui/input";
import { formatMacAddress } from "@/lib/mac";

const MacFormatterTool = () => {
  const [input, setInput] = useState("AA:BB:CC:DD:EE:FF");
  const formats = formatMacAddress(input);

  const controls = formats
    ? [
        { label: "Colon", value: formats.colon },
        { label: "Dash", value: formats.dash },
        { label: "Dot", value: formats.dot },
        { label: "Raw", value: formats.raw },
      ]
    : [];

  return (
    <div className="space-y-3 max-w-md">
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        aria-label="MAC address"
        placeholder="Enter MAC address"
        spellCheck={false}
        aria-invalid={!formats}
        className="font-mono bg-secondary border-border"
      />
      {formats ? (
        controls.map((control) => (
          <div
            key={control.label}
            className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"
          >
            <span className="text-muted-foreground">{control.label}</span>
            <span>{control.value}</span>
          </div>
        ))
      ) : (
        input.trim() && (
          <p role="alert" className="rounded bg-secondary p-3 font-mono text-sm text-danger">
            Enter exactly 12 hexadecimal digits, for example AA:BB:CC:DD:EE:FF.
          </p>
        )
      )}
    </div>
  );
};

export default MacFormatterTool;
