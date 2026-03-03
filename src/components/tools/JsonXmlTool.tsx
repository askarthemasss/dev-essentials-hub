import { useState } from "react";
import DualPane from "./DualPane";
const jsonToXml = (obj: any, root = "root"): string => {
  const convert = (o: any, tag: string): string => {
    if (typeof o !== "object" || o === null) return `<${tag}>${o}</${tag}>`;
    if (Array.isArray(o)) return o.map(i => convert(i, "item")).join("\n");
    return `<${tag}>\n${Object.entries(o).map(([k, v]) => "  " + convert(v, k)).join("\n")}\n</${tag}>`;
  };
  return `<?xml version="1.0"?>\n${convert(obj, root)}`;
};
const JsonXmlTool = () => {
  const [input, setInput] = useState("");
  const convert = (s: string) => { try { return jsonToXml(JSON.parse(s)); } catch { return s ? "Invalid JSON" : ""; } };
  return <DualPane input={input} output={convert(input)} onInputChange={setInput} inputPlaceholder="Paste JSON here…" />;
};
export default JsonXmlTool;
