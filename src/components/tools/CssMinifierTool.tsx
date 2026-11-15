import { useState } from "react";
import DualPane from "./DualPane";
import { useAsyncOutput } from "@/hooks/useAsyncOutput";
import { minifyCss } from "@/lib/codeFormat";

const CssMinifierTool = () => {
  const [input, setInput] = useState("");
  const output = useAsyncOutput(input, minifyCss);
  return <DualPane input={input} output={output} onInputChange={setInput} inputPlaceholder="Paste CSS to minify…" />;
};
export default CssMinifierTool;
