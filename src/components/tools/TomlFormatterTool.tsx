import { useState } from "react";
import DualPane from "./DualPane";

const TomlFormatterTool = () => {
  const [input, setInput] = useState("");
  const format = (s: string) => s.split("\n").map(l => l.trimEnd()).join("\n");
  return <DualPane input={input} output={format(input)} onInputChange={setInput} inputPlaceholder="Paste TOML here…" />;
};
export default TomlFormatterTool;
