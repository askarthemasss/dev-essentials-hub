import { useState } from "react";
import { Input } from "@/components/ui/input";
import { parseColor, toHex, toHslCss, toOpaqueHex, toRgbaCss } from "@/lib/color";

const ColorPickerTool = () => {
  const [value, setValue] = useState("#00d4ff");
  const color = parseColor(value);

  return (
    <div className="space-y-4 max-w-md">
      <div className="flex gap-4 items-center">
        <input
          type="color"
          value={color ? toOpaqueHex(color) : "#000000"}
          onChange={(event) => setValue(event.target.value)}
          className="h-16 w-16 rounded cursor-pointer"
          aria-label="Pick a color"
        />
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="#00d4ff or rgb(0, 212, 255)"
          spellCheck={false}
          aria-invalid={!color && value.trim().length > 0}
          className="font-mono bg-secondary border-border"
        />
      </div>
      <div
        className="h-20 rounded-md border border-border"
        style={{ backgroundColor: color ? toRgbaCss(color) : "transparent" }}
      />
      {color ? (
        <div className="space-y-1">
          <div className="rounded bg-secondary p-2 font-mono text-sm">HEX: {toHex(color)}</div>
          <div className="rounded bg-secondary p-2 font-mono text-sm">RGB: {toRgbaCss(color)}</div>
          <div className="rounded bg-secondary p-2 font-mono text-sm">HSL: {toHslCss(color)}</div>
        </div>
      ) : (
        value.trim() && (
          <p role="alert" className="font-mono text-sm text-destructive">
            Not a valid hex or rgb() color.
          </p>
        )
      )}
    </div>
  );
};

export default ColorPickerTool;
