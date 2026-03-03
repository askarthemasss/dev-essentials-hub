import { useState } from "react";
import { Input } from "@/components/ui/input";
const AsciiTableTool = () => {
  const [search, setSearch] = useState("");
  const chars = Array.from({ length: 128 }, (_, i) => ({ code: i, char: i >= 32 && i < 127 ? String.fromCharCode(i) : i === 0 ? "NUL" : i === 9 ? "TAB" : i === 10 ? "LF" : i === 13 ? "CR" : i === 32 ? "SP" : "·", hex: i.toString(16).toUpperCase().padStart(2, "0") }));
  const filtered = chars.filter(c => c.code.toString().includes(search) || c.char.toLowerCase().includes(search.toLowerCase()) || c.hex.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="font-mono bg-secondary border-border max-w-md" />
      <div className="grid grid-cols-4 md:grid-cols-8 gap-1">{filtered.slice(32, 127).map(c => (
        <div key={c.code} className="rounded bg-secondary p-2 text-center"><div className="text-lg font-mono">{c.char}</div><div className="text-[10px] text-muted-foreground">{c.code} (0x{c.hex})</div></div>
      ))}</div>
    </div>
  );
};
export default AsciiTableTool;
