import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseAlpha(value: string): number | null {
  const normalized = value.trim();
  const parsed = normalized.endsWith("%")
    ? Number.parseFloat(normalized.slice(0, -1)) / 100
    : Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) return null;
  return parsed;
}

function parseChannel(value: string): number | null {
  const normalized = value.trim();
  if (normalized.endsWith("%")) {
    const percentage = Number.parseFloat(normalized.slice(0, -1));
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) return null;
    return Math.round((percentage / 100) * 255);
  }
  const channel = Number.parseFloat(normalized);
  if (!Number.isFinite(channel) || channel < 0 || channel > 255) return null;
  return Math.round(channel);
}

function parseColor(input: string): Rgba | null {
  const value = input.trim().toLowerCase();
  if (!value) return null;

  const hex = /^#?([0-9a-f]{3,8})$/.exec(value);
  if (hex) {
    let digits = hex[1];
    if (![3, 4, 6, 8].includes(digits.length)) return null;
    if (digits.length === 3 || digits.length === 4) {
      digits = [...digits].map((digit) => digit + digit).join("");
    }
    const r = Number.parseInt(digits.slice(0, 2), 16);
    const g = Number.parseInt(digits.slice(2, 4), 16);
    const b = Number.parseInt(digits.slice(4, 6), 16);
    const a = digits.length === 8 ? Number.parseInt(digits.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }

  const rgb = /^rgba?\(([^)]+)\)$/.exec(value);
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length !== 3 && parts.length !== 4) return null;
    const [r, g, b] = parts.slice(0, 3).map(parseChannel);
    if (r === null || g === null || b === null) return null;
    const a = parts.length === 4 ? parseAlpha(parts[3]) : 1;
    if (a === null) return null;
    return { r, g, b, a };
  }

  return null;
}

function toHex({ r, g, b, a }: Rgba): string {
  const base = [r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("");
  return `#${base}${a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0") : ""}`;
}

function toRgb({ r, g, b, a }: Rgba): string {
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})` : `rgb(${r}, ${g}, ${b})`;
}

const HexRgbTool = () => {
  const [input, setInput] = useState("#3498db");
  const color = parseColor(input);
  const hex = color ? toHex(color) : "";
  const rgb = color ? toRgb(color) : "";

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
          <p role="alert" className="font-mono text-sm text-destructive">
            Not a valid hex, rgb() or rgba() color.
          </p>
        )
      )}
    </div>
  );
};

export default HexRgbTool;
