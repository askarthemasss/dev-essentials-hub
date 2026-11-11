import { useState } from "react";
import Papa from "papaparse";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const JsonCsvTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toCsv" | "toJson">("toCsv");

  const output = (() => {
    if (!input.trim()) return "";
    try {
      if (mode === "toCsv") {
        const parsed: unknown = JSON.parse(input);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return "Input must be a non-empty array of objects";
        }
        const rows = parsed.map((row) => (isRecord(row) ? row : { value: row }));
        return Papa.unparse(rows);
      }

      const parsed = Papa.parse<Record<string, string>>(input, {
        header: true,
        skipEmptyLines: "greedy",
      });
      if (parsed.errors.length > 0) {
        return `Invalid CSV: ${parsed.errors[0].message}`;
      }
      return JSON.stringify(parsed.data, null, 2);
    } catch (caught) {
      return `Invalid input: ${caught instanceof Error ? caught.message : "could not parse document"}`;
    }
  })();

  const switchMode = (nextMode: "toCsv" | "toJson") => {
    setMode(nextMode);
    if (output && !output.startsWith("Invalid") && !output.startsWith("Input must")) {
      setInput(output);
    }
  };

  return (
    <DualPane
      input={input}
      output={output}
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
