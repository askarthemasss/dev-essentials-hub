import { useState } from "react";
import DualPane from "./DualPane";

function minifyHtml(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
}

const HtmlMinifierTool = () => {
  const [input, setInput] = useState("");
  return <DualPane inputLabel="HTML" outputLabel="Minified" input={input} output={minifyHtml(input)} onInputChange={setInput} inputPlaceholder="Paste HTML…" />;
};

export default HtmlMinifierTool;
