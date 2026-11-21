import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { escapeMarkdownTableCell } from "@/lib/markup";

const MdTableTool = () => {
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, (_, row) => Array.from({ length: 3 }, (_, column) => row === 0 ? `Header ${column + 1}` : ""))
  );

  const updateCell = (row: number, column: number, value: string) => {
    setData((previous) => {
      const next = previous.map((cells) => [...cells]);
      next[row][column] = value;
      return next;
    });
  };

  const addRow = () => setData((previous) => [...previous, Array(previous[0].length).fill("")]);
  const addCol = () => setData((previous) => previous.map((row, index) => [...row, index === 0 ? `Header ${row.length + 1}` : ""]));

  const toMarkdown = () => {
    if (data.length < 2) return "";
    const row = (cells: string[]) => "| " + cells.map((cell) => escapeMarkdownTableCell(cell) || " ").join(" | ") + " |";
    const header = row(data[0]);
    const separator = "| " + data[0].map(() => "---").join(" | ") + " |";
    const body = data.slice(1).map(row).join("\n");
    return `${header}\n${separator}\n${body}`;
  };

  const markdown = toMarkdown();

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <tbody>
            {data.map((cells, row) => (
              <tr key={row}>
                {cells.map((cell, column) => (
                  <td key={column} className="p-1">
                    <Input value={cell} onChange={(event) => updateCell(row, column, event.target.value)} aria-label={row === 0 ? `Column ${column + 1} header` : `Row ${row}, column ${column + 1}`} className={`w-32 font-mono text-sm bg-secondary border-border ${row === 0 ? "font-bold" : ""}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={addRow}><Plus className="h-3 w-3 mr-1" />Row</Button>
        <Button size="sm" variant="outline" onClick={addCol}><Plus className="h-3 w-3 mr-1" />Column</Button>
      </div>
      <div className="relative">
        <Textarea value={markdown} readOnly rows={8} className="font-mono text-sm bg-secondary border-border" />
        <CopyButton value={markdown} label="Copy Markdown table" size="icon" className="absolute right-2 top-2 bg-card" />
      </div>
    </div>
  );
};

export default MdTableTool;
