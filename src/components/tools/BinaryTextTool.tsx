import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { decodeBinary, encodeBinary } from "@/lib/encoding";

const BinaryTextTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toBin" | "toText">("toBin");

  const process = (text: string, nextMode: "toBin" | "toText") => {
    if (!text) return "";
    try {
      return nextMode === "toBin" ? encodeBinary(text) : decodeBinary(text);
    } catch {
      return "Error: Binary input must contain 8-bit groups";
    }
  };

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
