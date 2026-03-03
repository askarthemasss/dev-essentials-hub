import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const emojis = ["😀","😂","🤣","😊","😍","🤩","😎","🤔","😴","🤯","😱","🥳","💀","👻","👾","🤖","💩","🔥","⭐","💥","❤️","💚","💙","💜","🖤","👍","👎","✌️","🤞","👋","🙌","💪","🎉","🎊","🎈","🎯","🚀","💻","⌨️","🖥️","📱","🔧","🔨","⚙️","🎮","🎵","☕","🍕","🌍","🌈","⚡","✅","❌","⭕","➡️","⬅️","📌","📎","🔗"];
const EmojiPickerTool = () => {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const copy = (e: string) => { navigator.clipboard.writeText(e); setCopied(e); setTimeout(() => setCopied(""), 1000); };
  return (
    <div className="space-y-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search emoji…" className="font-mono bg-secondary border-border max-w-md" />
      <div className="flex flex-wrap gap-1">{emojis.map(e => (
        <button key={e} onClick={() => copy(e)} className={`text-2xl p-1 rounded hover:bg-secondary transition-colors ${copied === e ? "bg-primary/20" : ""}`}>{e}</button>
      ))}</div>
      {copied && <div className="text-xs text-muted-foreground font-mono">Copied {copied}!</div>}
    </div>
  );
};
export default EmojiPickerTool;
