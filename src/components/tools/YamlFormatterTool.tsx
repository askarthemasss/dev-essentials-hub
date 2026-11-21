import { useState } from "react";
import DualPane from "./DualPane";
import { formatYaml } from "@/lib/yamlFormat";

const YamlFormatterTool = () => {
  const [input, setInput] = useState("");
  const { output, error } = formatYaml(input);

  return (
    <DualPane
      input={input}
      output={output}
      error={error || undefined}
      onInputChange={setInput}
      inputPlaceholder="Paste YAML here…"
      outputPlaceholder="Formatted YAML appears here…"
    />
  );
};

export default YamlFormatterTool;
