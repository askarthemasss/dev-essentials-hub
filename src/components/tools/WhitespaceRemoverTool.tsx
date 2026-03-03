import { useState } from "react";
import DualPane from "./DualPane";
const WhitespaceRemoverTool = () => {
  const [input, setInput] = useState("");
  const clean = (s: string) => s.split("\n").map(l => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
  return <DualPane input={input} output={clean(input)} onInputChange={setInput} />;
};
export default WhitespaceRemoverTool;
