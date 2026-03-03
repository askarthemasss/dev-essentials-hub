import { useState } from "react";
import DualPane from "./DualPane";
const mdToHtml = (md: string) => md.replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`(.+?)`/g,"<code>$1</code>").replace(/\n/g,"<br>");
const MarkdownHtmlTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={mdToHtml(input)} onInputChange={setInput} inputPlaceholder="Paste Markdown here…" outputLabel="HTML" />;
};
export default MarkdownHtmlTool;
