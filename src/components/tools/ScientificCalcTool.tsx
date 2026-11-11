import { useState } from "react";
import { Button } from "@/components/ui/button";
import { evaluateExpression } from "@/lib/evaluateExpression";
import { cn } from "@/lib/utils";

const buttons = [
  "C", "⌫", "(", ")",
  "sin", "cos", "tan", "^",
  "7", "8", "9", "÷",
  "4", "5", "6", "×",
  "1", "2", "3", "-",
  "0", ".", "π", "e",
  "√", "ln", "log", "!",
];

const ScientificCalcTool = () => {
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("0");
  const [error, setError] = useState("");

  const press = (value: string) => {
    setError("");

    if (value === "C") {
      setExpression("");
      setDisplay("0");
      return;
    }

    if (value === "⌫") {
      setExpression((previous) => {
        const next = previous.slice(0, -1);
        setDisplay(next || "0");
        return next;
      });
      return;
    }

    if (value === "=") {
      try {
        const result = evaluateExpression(expression);
        const formatted = Number.isInteger(result) ? String(result) : String(Number(result.toPrecision(12)));
        setDisplay(formatted);
        setExpression(formatted);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Invalid expression");
        setDisplay("Error");
        setExpression("");
      }
      return;
    }

    const insertion =
      value === "√" ? "sqrt(" :
      value === "sin" || value === "cos" || value === "tan" || value === "ln" || value === "log" ? `${value}(` :
      value;

    setExpression((previous) => {
      const next = previous + insertion;
      setDisplay(next);
      return next;
    });
  };

  return (
    <div className="max-w-xs space-y-2">
      <div
        className={cn(
          "min-h-16 overflow-x-auto rounded bg-secondary p-4 text-right font-mono text-2xl",
          error ? "text-destructive" : "text-foreground"
        )}
        aria-live="polite"
      >
        {display}
      </div>
      {error && <p className="font-mono text-xs text-destructive">{error}</p>}
      <div className="grid grid-cols-4 gap-1">
        {buttons.map((button) => (
          <Button
            key={button}
            variant="secondary"
            className={cn("h-12 font-mono", button === "=" && "col-span-4")}
            onClick={() => press(button)}
            aria-label={button === "⌫" ? "Backspace" : undefined}
          >
            {button}
          </Button>
        ))}
        <Button
          variant="default"
          className="col-span-4 h-12 font-mono"
          onClick={() => press("=")}
          aria-label="Evaluate expression"
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default ScientificCalcTool;
