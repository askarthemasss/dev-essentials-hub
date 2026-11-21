import { useState } from "react";
import { Input } from "@/components/ui/input";
import { parseColor, toHex, toRgbaCss } from "@/lib/color";

const HexRgbTool = () => {
  const [input, setInput] = useState("#3498db");
  const color = parseColor(input);
  const hex = color ? toHex(color) : "";
  const rgb = color ? toRgbaCss(color) : "";

  return (
    <div className="max-w-md space-y-4">
      <div>
        <label htmlFor="color-input" className="mb-1 block font-mono text-xs text-muted-foreground">
          Hex, RGB or RGBA
        </label>
        <Input
          id="color-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="#3498db, rgb(52, 152, 219) or rgba(52, 152, 219, 0.8)"
          spellCheck={false}
          className="border-border bg-secondary font-mono"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Supports 3, 4, 6 and 8 digit hex plus rgb()/rgba() with numbers, percentages or a slash alpha.
        </p>
      </div>

      {color ? (
        <>
          <div
            className="h-24 rounded-md border border-border"
            style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}
            role="img"
            aria-label={`Color preview ${hex}`}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
              <span className="text-muted-foreground">HEX</span>
              <span className="text-foreground">{hex}</span>
            </div>
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
              <span className="text-muted-foreground">RGB</span>
              <span className="text-foreground">{rgb}</span>
            </div>
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
              <span className="text-muted-foreground">Channels</span>
              <span className="text-foreground">
                {color.r}, {color.g}, {color.b}
                {color.a < 1 ? ` · alpha ${Number(color.a.toFixed(3))}` : ""}
              </span>
            </div>
          </div>
        </>
      ) : (
        input.trim() && (
          <p role="alert" className="font-mono text-sm text-danger">
            Not a valid hex, rgb() or rgba() color.
          </p>
        )
      )}
    </div>
  );
};

export default HexRgbTool;
