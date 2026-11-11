import { useState } from "react";
import Papa from "papaparse";
import { Textarea } from "@/components/ui/textarea";

const CsvViewerTool = () => {
  const [input, setInput] = useState("name,age,city\nAlice,30,NYC\nBob,25,LA\nCharlie,35,Chicago");

  const parsed = Papa.parse<string[]>(input, { skipEmptyLines: "greedy" });
  const rows = parsed.data.filter((row) => row.some((cell) => cell !== ""));
  const headers = rows[0] ?? [];
  const data = rows.slice(1);
  const error = parsed.errors.find((issue) => issue.type === "Quotes" || issue.type === "Delimiter");

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="csv-input" className="mb-1 block font-mono text-xs text-muted-foreground">
          CSV input
        </label>
        <Textarea
          id="csv-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste CSV here…"
          className="min-h-[120px] border-border bg-secondary font-mono text-sm"
        />
      </div>

      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          Row {error.row !== undefined ? error.row + 1 : "?"}: {error.message}
        </p>
      )}

      {headers.length > 0 && (
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">
            {data.length} data row{data.length === 1 ? "" : "s"} · {headers.length} column
            {headers.length === 1 ? "" : "s"}
          </p>
          <div className="overflow-auto rounded border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={`${header}-${index}`}
                      scope="col"
                      className="border-b border-border bg-secondary px-3 py-2 text-left font-mono text-xs text-muted-foreground"
                    >
                      {header || `Column ${index + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border last:border-0">
                    {headers.map((_, columnIndex) => (
                      <td key={columnIndex} className="whitespace-pre-wrap px-3 py-2 font-mono text-xs">
                        {row[columnIndex] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Uses RFC 4180 parsing with quoted fields, escaped quotes and automatic delimiter detection.
      </p>
    </div>
  );
};

export default CsvViewerTool;
