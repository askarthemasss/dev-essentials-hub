import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const CsvViewerTool = () => {
  const [input, setInput] = useState("name,age,city\nAlice,30,NYC\nBob,25,LA\nCharlie,35,Chicago");

  const parse = (csv: string) => csv.split("\n").filter(Boolean).map(row => row.split(",").map(c => c.trim()));
  const rows = parse(input);
  const headers = rows[0] || [];
  const data = rows.slice(1);

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste CSV here…" className="min-h-[120px] font-mono text-sm bg-secondary border-border" />
      {headers.length > 0 && (
        <div className="overflow-auto rounded border border-border">
          <table className="w-full text-sm">
            <thead><tr>{headers.map((h, i) => <th key={i} className="border-b border-border bg-secondary px-3 py-2 text-left font-mono text-xs text-muted-foreground">{h}</th>)}</tr></thead>
            <tbody>{data.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border-b border-border px-3 py-2 font-mono text-xs">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default CsvViewerTool;
