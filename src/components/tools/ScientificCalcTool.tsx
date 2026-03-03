import { useState } from "react";
import { Button } from "@/components/ui/button";
const ScientificCalcTool = () => {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const press = (v: string) => {
    if (v === "C") { setDisplay("0"); setExpr(""); return; }
    if (v === "=") { try { setDisplay(String(eval(expr || display))); setExpr(""); } catch { setDisplay("Error"); } return; }
    if (v === "√") { setDisplay(String(Math.sqrt(parseFloat(display)))); return; }
    if (v === "π") { setDisplay(String(Math.PI)); return; }
    if (v === "e") { setDisplay(String(Math.E)); return; }
    const newExpr = expr + v;
    setExpr(newExpr);
    setDisplay(newExpr);
  };
  const buttons = ["C","(",")","÷","7","8","9","×","4","5","6","-","1","2","3","+","0",".","√","=","π","e","**",""];
  return (
    <div className="max-w-xs space-y-2">
      <div className="rounded bg-secondary p-4 text-right font-mono text-2xl truncate">{display}</div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.filter(Boolean).map(b => (
          <Button key={b} variant="secondary" className="font-mono h-12" onClick={() => press(b === "×" ? "*" : b === "÷" ? "/" : b)}>{b}</Button>
        ))}
      </div>
    </div>
  );
};
export default ScientificCalcTool;
