import { useState } from "react";
import DualPane from "./DualPane";

const JsonFormatterTool = () => {
  const [input, setInput] = useState("");
  const format = (s: string) => { try { return JSON.stringify(JSON.parse(s), null, 2); } catch { return s ? "Invalid JSON" : ""; } };
  return <DualPane input={input} output={format(input)} onInputChange={setInput} inputPlaceholder="Paste JSON here…" />;
};
export default JsonFormatterTool;
