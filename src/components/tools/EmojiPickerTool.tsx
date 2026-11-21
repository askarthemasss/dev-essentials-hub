import { useEffect, useId, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchEmojis } from "@/lib/emoji";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

const EmojiPickerTool = () => {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [failed, setFailed] = useState(false);
  const searchId = useId();
  const timer = useRef<number | undefined>(undefined);
  const results = searchEmojis(search);

  useEffect(
    () => () => {
      if (timer.current !== undefined) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async (emoji: string) => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    const ok = await copyText(emoji);
    setCopied(ok ? emoji : "");
    setFailed(!ok);
    timer.current = window.setTimeout(() => {
      setCopied("");
      setFailed(false);
    }, ok ? 1500 : 4000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor={searchId} className="block text-sm font-medium text-foreground">
          Search emojis
        </label>
        <Input
          id={searchId}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or keyword…"
          className="max-w-md border-border bg-secondary font-mono"
        />
      </div>
      {results.length === 0 ? (
        <p role="status" className="font-mono text-sm text-muted-foreground">
          No emojis match “{search.trim()}”. Try a broader term.
        </p>
      ) : (
        <div className="flex flex-wrap gap-1">
          {results.map((entry) => (
            <button
              key={entry.emoji}
              type="button"
              onClick={() => void copy(entry.emoji)}
              title={`${entry.name} — ${entry.keywords.join(", ")}`}
              aria-label={`Copy ${entry.name}`}
              className={cn(
                "touch-target inline-flex h-10 w-10 items-center justify-center rounded-md text-2xl transition-colors duration-150",
                "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                copied === entry.emoji && "bg-primary/20",
              )}
            >
              {entry.emoji}
            </button>
          ))}
        </div>
      )}
      <p aria-live="polite" className="min-h-5 font-mono text-xs text-muted-foreground">
        {failed
          ? "Copy failed — check clipboard permissions and try again."
          : copied
            ? `Copied ${copied}`
            : ""}
      </p>
    </div>
  );
};

export default EmojiPickerTool;
