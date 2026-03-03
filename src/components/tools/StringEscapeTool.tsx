import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const StringEscapeTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r");
  const unescape = (s: string) => s.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  return (
    <DualPane input={input} output={mode === "escape" ? escape(input) : unescape(input)} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "escape" ? "default" : "secondary"} onClick={() => setMode("escape")}>Escape</Button>
        <Button size="sm" variant={mode === "unescape" ? "default" : "secondary"} onClick={() => setMode("unescape")}>Unescape</Button>
      </>}
    />
  );
};
export default StringEscapeTool;
