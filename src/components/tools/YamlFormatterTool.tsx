import { useState } from "react";
import { parseDocument } from "yaml";
import DualPane from "./DualPane";

const YamlFormatterTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = (source: string) => {
    if (!source.trim()) {
      setOutput("");
      return;
    }

    try {
      const document = parseDocument(source);
      if (document.errors.length > 0) {
        setOutput(`Invalid YAML: ${document.errors[0].message}`);
        return;
      }
      setOutput(document.toString({ indent: 2, lineWidth: 0 }));
    } catch (caught) {
      setOutput(`Invalid YAML: ${caught instanceof Error ? caught.message : "could not parse document"}`);
    }
  };

  return (
    <DualPane
      input={input}
      output={output}
      onInputChange={(value) => {
        setInput(value);
        format(value);
      }}
      inputPlaceholder="Paste YAML here…"
    />
  );
};

export default YamlFormatterTool;
