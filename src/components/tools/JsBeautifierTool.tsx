import { useState } from "react";
import DualPane from "./DualPane";
import { useAsyncOutput } from "@/hooks/useAsyncOutput";
import { beautifyJavaScript } from "@/lib/codeFormat";

const JsBeautifierTool = () => {
  const [input, setInput] = useState("");
  const output = useAsyncOutput(input, beautifyJavaScript);
  return <DualPane input={input} output={output} onInputChange={setInput} inputPlaceholder="Paste JavaScript here…" />;
};
export default JsBeautifierTool;
