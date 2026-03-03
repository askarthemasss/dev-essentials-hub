import { useState } from "react";
import { Input } from "@/components/ui/input";
const toRoman = (n: number): string => {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let r = "";
  vals.forEach((v, i) => { while (n >= v) { r += syms[i]; n -= v; } });
  return r;
};
const fromRoman = (s: string): number => {
  const map: Record<string, number> = { I:1,V:5,X:10,L:50,C:100,D:500,M:1000 };
  return s.toUpperCase().split("").reduce((a, c, i, arr) => a + (map[c] < (map[arr[i+1]] || 0) ? -map[c] : map[c]), 0);
};
const RomanNumeralTool = () => {
  const [input, setInput] = useState("42");
  const isNum = /^\d+$/.test(input);
  return (
    <div className="space-y-3 max-w-md">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter number or Roman numeral" className="font-mono bg-secondary border-border" />
      <div className="rounded bg-secondary p-3 font-mono text-lg text-center">{isNum ? toRoman(parseInt(input)) : fromRoman(input)}</div>
    </div>
  );
};
export default RomanNumeralTool;
