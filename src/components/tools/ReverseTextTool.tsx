import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const ReverseTextTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("chars");
  const rev = (s: string) => mode === "chars" ? [...s].reverse().join("") : mode === "words" ? s.split(" ").reverse().join(" ") : s.split("\n").reverse().join("\n");
  return (
    <DualPane input={input} output={rev(input)} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "chars" ? "default" : "secondary"} onClick={() => setMode("chars")}>Characters</Button>
        <Button size="sm" variant={mode === "words" ? "default" : "secondary"} onClick={() => setMode("words")}>Words</Button>
        <Button size="sm" variant={mode === "lines" ? "default" : "secondary"} onClick={() => setMode("lines")}>Lines</Button>
      </>}
    />
  );
};
export default ReverseTextTool;
