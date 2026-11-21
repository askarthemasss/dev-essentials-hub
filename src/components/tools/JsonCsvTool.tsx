import { useState } from "react";
import Papa from "papaparse";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const JsonCsvTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toCsv" | "toJson">("toCsv");

  const { output, error } = (() => {
    if (!input.trim()) return { output: "", error: "" };
    try {
      if (mode === "toCsv") {
        const parsed: unknown = JSON.parse(input);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return { output: "", error: "JSON input must be a non-empty array of objects." };
        }
        const rows = parsed.map((row) => (isRecord(row) ? row : { value: row }));
        return { output: Papa.unparse(rows), error: "" };
      }

      const parsed = Papa.parse<Record<string, string>>(input, {
        header: true,
        skipEmptyLines: "greedy",
      });
      if (parsed.errors.length > 0) {
        return { output: "", error: `Invalid CSV: ${parsed.errors[0].message}. Check delimiters and quoted fields.` };
      }
      return { output: JSON.stringify(parsed.data, null, 2), error: "" };
    } catch (caught) {
      return {
        output: "",
        error: `Invalid JSON: ${
          caught instanceof Error ? caught.message : "the document could not be parsed"
        }. Check quotes, commas and brackets.`,
      };
    }
  })();

  const switchMode = (nextMode: "toCsv" | "toJson") => {
    if (nextMode === mode) return;
    if (isConversionResult(output)) setInput(output);
    setMode(nextMode);
  };

  return (
    <DualPane
      input={input}
      output={output}
      error={error || undefined}
      onInputChange={setInput}
      inputLabel={mode === "toCsv" ? "JSON" : "CSV"}
      outputLabel={mode === "toCsv" ? "CSV" : "JSON"}
      inputPlaceholder={mode === "toCsv" ? "Paste a JSON array here…" : "Paste CSV here…"}
      actions={
        <>
          <Button size="sm" variant={mode === "toCsv" ? "default" : "secondary"} onClick={() => switchMode("toCsv")}>
            JSON → CSV
          </Button>
          <Button size="sm" variant={mode === "toJson" ? "default" : "secondary"} onClick={() => switchMode("toJson")}>
            CSV → JSON
          </Button>
        </>
      }
    />
  );
};

export default JsonCsvTool;
