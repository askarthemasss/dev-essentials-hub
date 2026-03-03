import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const BinaryTextTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toBin" | "toText">("toBin");
  const toBin = (s: string) => [...s].map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
  const toText = (s: string) => s.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");
  const process = (text: string, m: string) => { try { return m === "toBin" ? toBin(text) : toText(text); } catch { return "Error"; } };
  return (
    <DualPane input={input} output={process(input, mode)} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "toBin" ? "default" : "secondary"} onClick={() => setMode("toBin")}>Text → Binary</Button>
        <Button size="sm" variant={mode === "toText" ? "default" : "secondary"} onClick={() => setMode("toText")}>Binary → Text</Button>
      </>}
    />
  );
};
export default BinaryTextTool;
