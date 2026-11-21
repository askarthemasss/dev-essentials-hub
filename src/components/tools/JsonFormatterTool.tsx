import { useState } from "react";
import DualPane from "./DualPane";
import { formatJson } from "@/lib/jsonFormat";

const JsonFormatterTool = () => {
  const [input, setInput] = useState("");
  const { output, error } = formatJson(input);

  return (
    <DualPane
      input={input}
      output={output}
      onInputChange={setInput}
      inputPlaceholder="Paste JSON here…"
      outputPlaceholder="Formatted JSON appears here…"
      error={error || undefined}
    />
  );
};

export default JsonFormatterTool;
