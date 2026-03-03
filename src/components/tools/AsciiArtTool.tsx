import { useState } from "react";
import DualPane from "./DualPane";
const AsciiArtTool = () => {
  const [input, setInput] = useState("Hi");
  const toAscii = (s: string) => {
    const big: Record<string, string[]> = {
      " ": ["   ","   ","   ","   ","   "],
      "H": ["H   H","H   H","HHHHH","H   H","H   H"],
      "i": ["  i  ","     ","  i  ","  i  ","  i  "],
      "!": ["  !  ","  !  ","  !  ","     ","  !  "],
    };
    const def = ["?????","?   ?","  ?  "," ?   ","?????"];
    const chars = [...s].map(c => big[c] || big[c.toUpperCase()] || def);
    return Array.from({ length: 5 }, (_, row) => chars.map(c => c[row]).join("  ")).join("\n");
  };
  return <DualPane input={input} output={toAscii(input)} onInputChange={setInput} inputPlaceholder="Enter short text…" />;
};
export default AsciiArtTool;
