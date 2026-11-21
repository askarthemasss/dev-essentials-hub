import { useState } from "react";
import { Input } from "@/components/ui/input";
import { calculateAspectRatio } from "@/lib/aspectRatio";

const AspectRatioTool = () => {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const ratio = calculateAspectRatio(Number(width), Number(height));

  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-xs text-muted-foreground font-mono">Width</span>
          <Input
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            inputMode="numeric"
            aria-label="Width"
            aria-invalid={!ratio}
            className="font-mono bg-secondary border-border"
          />
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">Height</span>
          <Input
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            inputMode="numeric"
            aria-label="Height"
            aria-invalid={!ratio}
            className="font-mono bg-secondary border-border"
          />
        </div>
      </div>
      {ratio ? (
        <div className="rounded bg-secondary p-4 font-mono text-2xl text-center">
          {ratio.simplifiedWidth}:{ratio.simplifiedHeight}
        </div>
      ) : (
        <div role="alert" className="rounded bg-secondary p-3 font-mono text-sm text-danger">
          Enter positive whole-number dimensions.
        </div>
      )}
      <div className="rounded bg-secondary p-3 font-mono text-sm text-center">
        Decimal: {ratio ? ratio.decimal.toFixed(4) : "—"}
      </div>
    </div>
  );
};

export default AspectRatioTool;
