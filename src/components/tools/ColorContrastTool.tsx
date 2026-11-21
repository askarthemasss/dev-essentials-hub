import { useState } from "react";
import { ArrowLeftRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contrastRatio, parseColor, toOpaqueHex, toRgbaCss } from "@/lib/color";
import { cn } from "@/lib/utils";

const ColorContrastTool = () => {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#000000");

  const foreground = parseColor(fg);
  const background = parseColor(bg);
  const ratio = foreground && background ? contrastRatio(foreground, background) : null;
  const passAA = ratio !== null && ratio >= 4.5;
  const passAALarge = ratio !== null && ratio >= 3;
  const passAAA = ratio !== null && ratio >= 7;

  const fgError = foreground ? "" : "Enter a foreground color, for example #ffffff or rgb(255 255 255).";
  const bgError = background ? "" : "Enter a background color, for example #000000 or rgb(0 0 0).";

  const checks = [
    { label: "AA large text (3:1)", pass: passAALarge },
    { label: "AA normal text (4.5:1)", pass: passAA },
    { label: "AAA normal text (7:1)", pass: passAAA },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contrast-foreground" className="block text-sm font-medium text-foreground">
            Foreground
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={foreground ? toOpaqueHex(foreground) : "#ffffff"}
              onChange={(event) => setFg(event.target.value)}
              className="h-10 w-14 shrink-0 cursor-pointer rounded-md border border-border bg-background p-1"
              aria-label="Pick foreground color"
            />
            <Input
              id="contrast-foreground"
              value={fg}
              onChange={(event) => setFg(event.target.value)}
              placeholder="#ffffff"
              spellCheck={false}
              aria-label="Foreground hex color"
              aria-invalid={Boolean(fgError)}
              aria-describedby={fgError ? "contrast-foreground-error" : undefined}
              className="border-border bg-secondary font-mono"
            />
          </div>
          {fgError && (
            <p id="contrast-foreground-error" role="alert" className="font-mono text-xs text-danger">
              {fgError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contrast-background" className="block text-sm font-medium text-foreground">
            Background
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={background ? toOpaqueHex(background) : "#000000"}
              onChange={(event) => setBg(event.target.value)}
              className="h-10 w-14 shrink-0 cursor-pointer rounded-md border border-border bg-background p-1"
              aria-label="Pick background color"
            />
            <Input
              id="contrast-background"
              value={bg}
              onChange={(event) => setBg(event.target.value)}
              placeholder="#000000"
              spellCheck={false}
              aria-label="Background hex color"
              aria-invalid={Boolean(bgError)}
              aria-describedby={bgError ? "contrast-background-error" : undefined}
              className="border-border bg-secondary font-mono"
            />
          </div>
          {bgError && (
            <p id="contrast-background-error" role="alert" className="font-mono text-xs text-danger">
              {bgError}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Preview</p>
        <div
          className="rounded-md border border-border p-8 text-center"
          style={{
            backgroundColor: background ? toRgbaCss(background) : "#000000",
            color: foreground ? toRgbaCss(foreground) : "#ffffff",
          }}
        >
          <p className="font-mono text-2xl font-bold">Sample text</p>
          <p className="mt-2 text-sm">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>

      {ratio !== null ? (
        <>
          <div className="text-center" aria-live="polite">
            <p className="font-mono text-4xl font-bold tabular-nums text-foreground">
              {ratio.toFixed(2)}:1
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {checks.map((check) => {
              const Icon = check.pass ? CheckCircle2 : XCircle;
              return (
                <div
                  key={check.label}
                  className={cn(
                    "rounded-md border p-4 text-center",
                    check.pass
                      ? "border-success/40 bg-success/10"
                      : "border-danger/40 bg-danger/10",
                  )}
                >
                  <p
                    className={cn(
                      "flex items-center justify-center gap-1.5 font-mono text-sm font-bold",
                      check.pass ? "text-success" : "text-danger",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {check.pass ? "PASS" : "FAIL"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{check.label}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="rounded-md border border-border bg-secondary p-3 text-sm text-muted-foreground">
          Fix the invalid color above to calculate the contrast ratio.
        </p>
      )}

      <Button
        variant="outline"
        onClick={() => {
          setFg(bg);
          setBg(fg);
        }}
        className="w-full sm:w-auto"
      >
        <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
        Swap colors
      </Button>
    </div>
  );
};

export default ColorContrastTool;
