import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Token { type: string; value: string; explanation: string }

function explainRegex(pattern: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    switch (ch) {
      case "^": tokens.push({ type: "anchor", value: "^", explanation: "Start of string" }); break;
      case "$": tokens.push({ type: "anchor", value: "$", explanation: "End of string" }); break;
      case ".": tokens.push({ type: "meta", value: ".", explanation: "Any character (except newline)" }); break;
      case "*": tokens.push({ type: "quantifier", value: "*", explanation: "0 or more of previous" }); break;
      case "+": tokens.push({ type: "quantifier", value: "+", explanation: "1 or more of previous" }); break;
      case "?": tokens.push({ type: "quantifier", value: "?", explanation: "0 or 1 of previous (optional)" }); break;
      case "|": tokens.push({ type: "alternation", value: "|", explanation: "OR — match either side" }); break;
      case "(": tokens.push({ type: "group", value: "(", explanation: "Start capturing group" }); break;
      case ")": tokens.push({ type: "group", value: ")", explanation: "End capturing group" }); break;
      case "[": {
        let cls = "[";
        i++;
        while (i < pattern.length && pattern[i] !== "]") { cls += pattern[i]; i++; }
        cls += "]";
        tokens.push({ type: "class", value: cls, explanation: `Character class: match one of ${cls}` });
        break;
      }
      case "\\": {
        i++;
        const next = pattern[i] || "";
        const escMap: Record<string, string> = {
          d: "Any digit (0-9)", D: "Any non-digit", w: "Any word character (a-z, A-Z, 0-9, _)",
          W: "Any non-word character", s: "Any whitespace", S: "Any non-whitespace",
          b: "Word boundary", B: "Non-word boundary", n: "Newline", t: "Tab",
        };
        tokens.push({ type: "escape", value: `\\${next}`, explanation: escMap[next] || `Escaped character: ${next}` });
        break;
      }
      case "{": {
        let q = "{";
        i++;
        while (i < pattern.length && pattern[i] !== "}") { q += pattern[i]; i++; }
        q += "}";
        tokens.push({ type: "quantifier", value: q, explanation: `Repeat ${q} times` });
        break;
      }
      default:
        tokens.push({ type: "literal", value: ch, explanation: `Literal character "${ch}"` });
    }
    i++;
  }
  return tokens;
}

const colors: Record<string, string> = {
  anchor: "text-red-400", meta: "text-yellow-400", quantifier: "text-green-400",
  alternation: "text-purple-400", group: "text-blue-400", class: "text-orange-400",
  escape: "text-cyan-400", literal: "text-foreground",
};

const RegexExplainerTool = () => {
  const [pattern, setPattern] = useState("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  const tokens = explainRegex(pattern);

  return (
    <div className="space-y-4">
      <Input value={pattern} onChange={(e) => setPattern(e.target.value)} className="font-mono text-sm bg-secondary border-border" placeholder="Enter regex pattern…" />
      <div className="rounded-lg border border-border bg-secondary p-4 space-y-1">
        {tokens.map((t, i) => (
          <div key={i} className="flex items-start gap-3">
            <code className={`font-mono text-sm font-bold ${colors[t.type] || "text-foreground"} min-w-[80px]`}>{t.value}</code>
            <span className="text-sm text-muted-foreground">{t.explanation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegexExplainerTool;
