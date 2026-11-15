import { useState } from "react";
import DualPane from "./DualPane";
import { useAsyncOutput } from "@/hooks/useAsyncOutput";
import { beautifyCss } from "@/lib/codeFormat";

const CssBeautifierTool = () => {
  const [input, setInput] = useState("");
  const output = useAsyncOutput(input, beautifyCss);
  return <DualPane input={input} output={output} onInputChange={setInput} inputPlaceholder="Paste CSS here…" />;
};
export default CssBeautifierTool;
