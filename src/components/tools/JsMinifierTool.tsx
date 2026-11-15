import { useState } from "react";
import DualPane from "./DualPane";
import { useAsyncOutput } from "@/hooks/useAsyncOutput";
import { minifyJavaScript } from "@/lib/codeFormat";

const JsMinifierTool = () => {
  const [input, setInput] = useState("");
  const output = useAsyncOutput(input, minifyJavaScript);
  return <DualPane inputLabel="JavaScript" outputLabel="Minified" input={input} output={output} onInputChange={setInput} inputPlaceholder="Paste JavaScript code…" />;
};

export default JsMinifierTool;
