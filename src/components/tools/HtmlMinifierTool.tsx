import { useState } from "react";
import DualPane from "./DualPane";
import { useAsyncOutput } from "@/hooks/useAsyncOutput";
import { minifyHtml } from "@/lib/codeFormat";

const HtmlMinifierTool = () => {
  const [input, setInput] = useState("");
  const output = useAsyncOutput(input, minifyHtml);
  return <DualPane inputLabel="HTML" outputLabel="Minified" input={input} output={output} onInputChange={setInput} inputPlaceholder="Paste HTML…" />;
};

export default HtmlMinifierTool;
