import { useState } from "react";
import { Input } from "@/components/ui/input";

const chars = Array.from({ length: 128 }, (_, code) => ({
  code,
  char:
    code >= 32 && code < 127
      ? String.fromCharCode(code)
      : code === 0
        ? "NUL"
        : code === 9
          ? "TAB"
          : code === 10
            ? "LF"
            : code === 13
              ? "CR"
              : code === 32
                ? "SP"
                : "·",
  hex: code.toString(16).toUpperCase().padStart(2, "0"),
}));

const AsciiTableTool = () => {
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  const filtered = chars.filter(
    (character) =>
      character.code.toString().includes(term) ||
      character.char.toLowerCase().includes(term) ||
      character.hex.toLowerCase().includes(term)
  );

  // The unfiltered table hides control characters, but filtering must be able
  // to find all 128 entries (including NUL, TAB, LF and CR).
  const visible = term ? filtered : chars.slice(32, 127);

  return (
    <div className="space-y-4">
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by character, code or hex…"
        className="font-mono bg-secondary border-border max-w-md"
      />
      {visible.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">No matching ASCII characters.</p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
          {visible.map((character) => (
            <div key={character.code} className="rounded bg-secondary p-2 text-center">
              <div className="text-lg font-mono">{character.char}</div>
              <div className="text-[10px] text-muted-foreground">
                {character.code} (0x{character.hex})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AsciiTableTool;
