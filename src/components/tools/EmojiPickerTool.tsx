import { useState } from "react";
import { Input } from "@/components/ui/input";
import { searchEmojis } from "@/lib/emoji";

const EmojiPickerTool = () => {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const results = searchEmojis(search);

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(""), 1000);
  };

  return (
    <div className="space-y-4">
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name or keyword…"
        className="font-mono bg-secondary border-border max-w-md"
      />
      {results.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">No matching emojis.</p>
      ) : (
        <div className="flex flex-wrap gap-1">
          {results.map((entry) => (
            <button
              key={entry.emoji}
              onClick={() => copy(entry.emoji)}
              title={`${entry.name} — ${entry.keywords.join(", ")}`}
              aria-label={`Copy ${entry.name}`}
              className={`text-2xl p-1 rounded hover:bg-secondary transition-colors ${
                copied === entry.emoji ? "bg-primary/20" : ""
              }`}
            >
              {entry.emoji}
            </button>
          ))}
        </div>
      )}
      {copied && <div className="text-xs text-muted-foreground font-mono">Copied {copied}!</div>}
    </div>
  );
};

export default EmojiPickerTool;
