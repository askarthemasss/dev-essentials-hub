import { useState } from "react";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";

const JsonYamlTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"toYaml" | "toJson">("toYaml");

  const process = (text: string, nextMode: "toYaml" | "toJson") => {
    if (!text.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      setOutput(
        nextMode === "toYaml"
          ? stringifyYaml(JSON.parse(text), { indent: 2, lineWidth: 0 })
          : JSON.stringify(parseYaml(text), null, 2),
      );
      setError("");
    } catch (caught) {
      setOutput("");
      setError(
        `Invalid ${nextMode === "toYaml" ? "JSON" : "YAML"}: ${
          caught instanceof Error ? caught.message : "the document could not be parsed"
        }. Check quotes, commas and indentation.`,
      );
    }
  };

  const switchMode = (nextMode: "toYaml" | "toJson") => {
    if (nextMode === mode) return;
    const nextInput = isConversionResult(output) ? output : input;
    setMode(nextMode);
    setInput(nextInput);
    process(nextInput, nextMode);
  };

  return (
    <DualPane
      input={input}
      output={output}
      error={error || undefined}
      onInputChange={(value) => {
        setInput(value);
        process(value, mode);
      }}
      inputLabel={mode === "toYaml" ? "JSON" : "YAML"}
      outputLabel={mode === "toYaml" ? "YAML" : "JSON"}
      inputPlaceholder={mode === "toYaml" ? "Paste JSON here…" : "Paste YAML here…"}
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
