import { useState } from "react";
import DualPane from "./DualPane";

const formatXml = (xml: string): string => {
  let formatted = "", indent = 0;
  xml.replace(/>\s*</g, "><").split(/(<[^>]+>)/g).filter(Boolean).forEach(node => {
    if (node.match(/^<\/\w/)) indent--;
    formatted += "  ".repeat(Math.max(indent, 0)) + node + "\n";
    if (node.match(/^<\w[^>]*[^/]>$/)) indent++;
  });
  return formatted.trim();
};

const XmlFormatterTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? formatXml(input) : ""} onInputChange={setInput} inputPlaceholder="Paste XML here…" />;
};
export default XmlFormatterTool;
