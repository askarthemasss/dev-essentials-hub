import { useState } from "react";
import DualPane from "./DualPane";
import { useAsyncOutput } from "@/hooks/useAsyncOutput";
import { beautifyHtml } from "@/lib/codeFormat";

const HtmlBeautifierTool = () => {
  const [input, setInput] = useState("");
  const output = useAsyncOutput(input, beautifyHtml);
  return <DualPane input={input} output={output} onInputChange={setInput} inputPlaceholder="Paste HTML here…" />;
};
export default HtmlBeautifierTool;
