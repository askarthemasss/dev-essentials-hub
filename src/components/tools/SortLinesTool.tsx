import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { sortLines, type SortMode } from "@/lib/sortLines";

const SortLinesTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<SortMode>("asc");

  return (
    <DualPane
      input={input}
      output={sortLines(input, mode)}
      onInputChange={setInput}
      actions={
        <>
          <Button size="sm" variant={mode === "asc" ? "default" : "secondary"} onClick={() => setMode("asc")}>
            A → Z
          </Button>
          <Button size="sm" variant={mode === "desc" ? "default" : "secondary"} onClick={() => setMode("desc")}>
            Z → A
          </Button>
          <Button
            size="sm"
            variant={mode === "numeric-asc" ? "default" : "secondary"}
            onClick={() => setMode("numeric-asc")}
          >
            Numeric ↑
          </Button>
          <Button
            size="sm"
            variant={mode === "numeric-desc" ? "default" : "secondary"}
            onClick={() => setMode("numeric-desc")}
          >
            Numeric ↓
          </Button>
          <Button
            size="sm"
            variant={mode === "random" ? "default" : "secondary"}
            onClick={() => setMode("random")}
          >
            Random
          </Button>
        </>
      }
    />
  );
};

export default SortLinesTool;
