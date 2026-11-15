import { useState } from "react";
import DualPane from "./DualPane";
import { formatToml } from "@/lib/toml";

const TomlFormatterTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? formatToml(input) : ""} onInputChange={setInput} inputPlaceholder="Paste TOML here…" />;
};
export default TomlFormatterTool;
