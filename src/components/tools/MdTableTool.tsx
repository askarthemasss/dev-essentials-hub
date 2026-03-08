import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, Trash2 } from "lucide-react";

const MdTableTool = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, (_, r) => Array.from({ length: 3 }, (_, c) => r === 0 ? `Header ${c + 1}` : ""))
  );

  const updateCell = (r: number, c: number, val: string) => {
    setData((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
  };

  const addRow = () => setData((prev) => [...prev, Array(prev[0].length).fill("")]);
  const addCol = () => setData((prev) => prev.map((row, i) => [...row, i === 0 ? `Header ${row.length + 1}` : ""]));

  const toMarkdown = () => {
    if (data.length < 2) return "";
    const header = "| " + data[0].map((c) => c || " ").join(" | ") + " |";
    const sep = "| " + data[0].map(() => "---").join(" | ") + " |";
    const body = data.slice(1).map((row) => "| " + row.map((c) => c || " ").join(" | ") + " |").join("\n");
    return `${header}\n${sep}\n${body}`;
  };

  const md = toMarkdown();

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="p-1">
                    <Input value={cell} onChange={(e) => updateCell(r, c, e.target.value)} className={`w-32 font-mono text-sm bg-secondary border-border ${r === 0 ? "font-bold" : ""}`} />
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
        <Textarea value={md} readOnly rows={8} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(md)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default MdTableTool;
