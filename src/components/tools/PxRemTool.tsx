import { useState } from "react";
import { Input } from "@/components/ui/input";
import { formatDecimal } from "@/lib/numberBase";

const PxRemTool = () => {
  const [px, setPx] = useState("16");
  const [rem, setRem] = useState("1");
  const [base, setBase] = useState("16");

  const baseValue = Number.parseFloat(base);
  const baseValid = Number.isFinite(baseValue) && baseValue > 0;

  const updatePx = (value: string) => {
    setPx(value);
    const pixels = Number.parseFloat(value);
    if (!baseValid || !Number.isFinite(pixels)) {
      setRem("");
      return;
    }
    setRem(formatDecimal(pixels / baseValue));
  };

  const updateRem = (value: string) => {
    setRem(value);
    const remValue = Number.parseFloat(value);
    if (!baseValid || !Number.isFinite(remValue)) {
      setPx(value.trim() ? "" : "");
      return;
    }
    setPx(formatDecimal(remValue * baseValue));
  };

  const updateBase = (value: string) => {
    setBase(value);
    const nextBase = Number.parseFloat(value);
    if (!Number.isFinite(nextBase) || nextBase <= 0) return;
    const pixels = Number.parseFloat(px);
    if (Number.isFinite(pixels)) {
      setRem(formatDecimal(pixels / nextBase));
      return;
    }
    const remValue = Number.parseFloat(rem);
    if (Number.isFinite(remValue)) setPx(formatDecimal(remValue * nextBase));
  };

  const invalidValue = (!px.trim() && !rem.trim()) || (px.trim() !== "" && !Number.isFinite(Number.parseFloat(px)));

  return (
    <div className="max-w-md space-y-4">
      <div>
        <label htmlFor="px-value" className="mb-1 block font-mono text-xs text-muted-foreground">
          Pixels
        </label>
        <Input
          id="px-value"
          inputMode="decimal"
          value={px}
          onChange={(event) => updatePx(event.target.value)}
          placeholder="16"
          className="border-border bg-secondary font-mono"
        />
      </div>

      <div>
        <label htmlFor="rem-value" className="mb-1 block font-mono text-xs text-muted-foreground">
          REM
        </label>
        <Input
          id="rem-value"
          inputMode="decimal"
          value={rem}
          onChange={(event) => updateRem(event.target.value)}
          placeholder="1"
          className="border-border bg-secondary font-mono"
        />
      </div>

      <div>
        <label htmlFor="base-size" className="mb-1 block font-mono text-xs text-muted-foreground">
          Root font size (px)
        </label>
        <Input
          id="base-size"
          inputMode="decimal"
          value={base}
          onChange={(event) => updateBase(event.target.value)}
          placeholder="16"
          aria-invalid={!baseValid}
          className="border-border bg-secondary font-mono"
        />
        {!baseValid && base.trim() !== "" && (
          <p role="alert" className="mt-1 font-mono text-xs text-destructive">
            Root font size must be greater than zero.
          </p>
        )}
      </div>

      {px.trim() && rem.trim() && baseValid && !invalidValue && (
        <div className="rounded border border-border bg-secondary p-3 text-center font-mono text-sm text-muted-foreground">
          {px}px ÷ {base}px = <span className="text-foreground">{rem}rem</span>
        </div>
      )}
    </div>
  );
};

export default PxRemTool;
