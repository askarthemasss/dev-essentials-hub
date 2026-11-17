import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contrastRatio, parseColor, toOpaqueHex, toRgbaCss } from "@/lib/color";

const ColorContrastTool = () => {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#000000");

  const foreground = parseColor(fg);
  const background = parseColor(bg);
  const ratio =
    foreground && background ? contrastRatio(foreground, background) : null;
  const passAA = ratio !== null && ratio >= 4.5;
  const passAALarge = ratio !== null && ratio >= 3;
  const passAAA = ratio !== null && ratio >= 7;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">Foreground</span>
          <div className="flex gap-2">
            <input
              type="color"
              value={foreground ? toOpaqueHex(foreground) : "#ffffff"}
              onChange={(event) => setFg(event.target.value)}
              className="h-10 w-14 rounded border border-border cursor-pointer"
              aria-label="Pick foreground color"
            />
            <Input
              value={fg}
              onChange={(event) => setFg(event.target.value)}
              placeholder="#ffffff"
              spellCheck={false}
              aria-label="Foreground hex color"
              aria-invalid={!foreground}
              className="font-mono bg-secondary border-border"
            />
          </div>
        </div>
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">Background</span>
          <div className="flex gap-2">
            <input
              type="color"
              value={background ? toOpaqueHex(background) : "#000000"}
              onChange={(event) => setBg(event.target.value)}
              className="h-10 w-14 rounded border border-border cursor-pointer"
              aria-label="Pick background color"
            />
            <Input
              value={bg}
              onChange={(event) => setBg(event.target.value)}
              placeholder="#000000"
              spellCheck={false}
              aria-label="Background hex color"
              aria-invalid={!background}
              className="font-mono bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      <div
        className="rounded-lg border border-border p-8 text-center"
        style={{
          backgroundColor: background ? toRgbaCss(background) : "#000000",
          color: foreground ? toRgbaCss(foreground) : "#ffffff",
        }}
      >
        <p className="text-2xl font-bold font-mono">Sample Text</p>
        <p className="text-sm mt-2">The quick brown fox jumps over the lazy dog</p>
      </div>

      {ratio !== null ? (
        <>
          <div className="text-center">
            <p className="text-4xl font-bold font-mono text-foreground">{ratio.toFixed(2)}:1</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className={`rounded-lg border p-4 text-center ${
                passAALarge ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
              }`}
            >
              <p className="font-mono text-sm font-bold">{passAALarge ? "PASS" : "FAIL"}</p>
              <p className="text-xs text-muted-foreground mt-1">AA Large (3:1)</p>
            </div>
            <div
              className={`rounded-lg border p-4 text-center ${
                passAA ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
              }`}
            >
              <p className="font-mono text-sm font-bold">{passAA ? "PASS" : "FAIL"}</p>
              <p className="text-xs text-muted-foreground mt-1">AA Normal (4.5:1)</p>
            </div>
            <div
              className={`rounded-lg border p-4 text-center ${
                passAAA ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
              }`}
            >
              <p className="font-mono text-sm font-bold">{passAAA ? "PASS" : "FAIL"}</p>
              <p className="text-xs text-muted-foreground mt-1">AAA (7:1)</p>
            </div>
          </div>
        </>
      ) : (
        <p role="alert" className="rounded bg-secondary p-3 font-mono text-sm text-destructive">
          Enter valid foreground and background colors to calculate contrast.
        </p>
      )}

      <Button
        variant="outline"
        onClick={() => {
          setFg(bg);
          setBg(fg);
        }}
        className="w-full"
      >
        Swap Colors
      </Button>
    </div>
  );
};

export default ColorContrastTool;
