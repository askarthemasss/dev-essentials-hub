import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
const SortLinesTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("asc");
  const sort = (s: string) => {
    const lines = s.split("\n");
    return mode === "asc" ? lines.sort().join("\n") : mode === "desc" ? lines.sort().reverse().join("\n") : lines.sort(() => Math.random() - 0.5).join("\n");
  };
  return (
    <DualPane input={input} output={sort(input)} onInputChange={setInput}
      actions={<>
        <Button size="sm" variant={mode === "asc" ? "default" : "secondary"} onClick={() => setMode("asc")}>A → Z</Button>
        <Button size="sm" variant={mode === "desc" ? "default" : "secondary"} onClick={() => setMode("desc")}>Z → A</Button>
        <Button size="sm" variant={mode === "random" ? "default" : "secondary"} onClick={() => setMode("random")}>Random</Button>
      </>}
    />
  );
};
export default SortLinesTool;
