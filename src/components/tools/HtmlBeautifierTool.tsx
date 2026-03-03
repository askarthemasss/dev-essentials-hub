import { useState } from "react";
import DualPane from "./DualPane";

const beautifyHtml = (html: string): string => {
  let formatted = "", indent = 0;
  html.replace(/>\s*</g, "><").split(/(<[^>]+>)/g).filter(Boolean).forEach(node => {
    if (node.match(/^<\/\w/)) indent--;
    if (node.match(/^<\w/)) {
      formatted += "  ".repeat(Math.max(indent, 0)) + node + "\n";
      if (!node.match(/\/>\s*$/) && !node.match(/^<(br|hr|img|input|meta|link)/i)) indent++;
    } else if (node.match(/^<\//)) {
      formatted += "  ".repeat(Math.max(indent, 0)) + node + "\n";
    } else {
      formatted += "  ".repeat(Math.max(indent, 0)) + node.trim() + "\n";
    }
  });
  return formatted.trim();
};

const HtmlBeautifierTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? beautifyHtml(input) : ""} onInputChange={setInput} inputPlaceholder="Paste HTML here…" />;
};
export default HtmlBeautifierTool;
