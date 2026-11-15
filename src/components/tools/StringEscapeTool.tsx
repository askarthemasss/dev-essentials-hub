import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { escapeString, unescapeString } from "@/lib/encoding";

const StringEscapeTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  return (
    <DualPane input={input} output={mode === "escape" ? escapeString(input) : unescapeString(input)} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "escape" ? "default" : "secondary"} onClick={() => setMode("escape")}>Escape</Button>
        <Button size="sm" variant={mode === "unescape" ? "default" : "secondary"} onClick={() => setMode("unescape")}>Unescape</Button>
      </>}
    />
  );
};
export default StringEscapeTool;
