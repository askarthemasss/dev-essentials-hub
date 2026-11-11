import { useState } from "react";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const JsonYamlTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toYaml" | "toJson">("toYaml");

  const process = (text: string, nextMode: "toYaml" | "toJson") => {
    if (!text.trim()) {
      setOutput("");
      return;
    }

    try {
      if (nextMode === "toYaml") {
        setOutput(stringifyYaml(JSON.parse(text), { indent: 2, lineWidth: 0 }));
      } else {
        setOutput(JSON.stringify(parseYaml(text), null, 2));
      }
    } catch (caught) {
      setOutput(`Invalid input: ${caught instanceof Error ? caught.message : "could not parse document"}`);
    }
  };

  const switchMode = (nextMode: "toYaml" | "toJson") => {
    setMode(nextMode);
    process(input, nextMode);
  };

  return (
    <DualPane
      input={input}
      output={output}
      onInputChange={(value) => {
        setInput(value);
        process(value, mode);
      }}
      actions={
        <>
          <Button size="sm" variant={mode === "toYaml" ? "default" : "secondary"} onClick={() => switchMode("toYaml")}>
            JSON → YAML
          </Button>
          <Button size="sm" variant={mode === "toJson" ? "default" : "secondary"} onClick={() => switchMode("toJson")}>
            YAML → JSON
          </Button>
        </>
      }
    />
  );
};

export default JsonYamlTool;
