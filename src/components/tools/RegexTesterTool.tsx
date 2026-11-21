import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RegexTesterTool = () => {
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Hello World 123");
  const flagsErrorId = useId();
  const patternErrorId = useId();

  let matches: string[] = [];
  let flagsError = "";
  let patternError = "";

  try {
    new RegExp("", flags);
  } catch (caught) {
    flagsError = caught instanceof Error ? caught.message : "Invalid regular expression flags";
  }

  if (!flagsError) {
    try {
      matches = text.match(new RegExp(pattern, flags)) || [];
    } catch (caught) {
      patternError =
        caught instanceof Error ? caught.message : "Invalid regular expression pattern";
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
        <div className="space-y-1.5">
          <label htmlFor="regex-pattern" className="block text-sm font-medium text-foreground">
            Pattern
          </label>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            placeholder="\\b\\w+\\b"
            spellCheck={false}
            aria-invalid={Boolean(patternError)}
            aria-describedby={patternError ? patternErrorId : undefined}
            className="border-border bg-secondary font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="regex-flags" className="block text-sm font-medium text-foreground">
            Flags
          </label>
          <Input
            id="regex-flags"
            value={flags}
            onChange={(event) => setFlags(event.target.value)}
            placeholder="g"
            spellCheck={false}
            aria-invalid={Boolean(flagsError)}
            aria-describedby={flagsError ? flagsErrorId : undefined}
            className="border-border bg-secondary font-mono"
          />
        </div>
      </div>

      {patternError && (
        <p id={patternErrorId} role="alert" className="font-mono text-xs text-danger">
          Invalid pattern: {patternError}. Check parentheses, brackets and escapes.
        </p>
      )}
      {flagsError && (
        <p id={flagsErrorId} role="alert" className="font-mono text-xs text-danger">
          Invalid flags: {flagsError}. Use letters such as g, i, m, s or u.
        </p>
      )}

      <div className="space-y-1.5">
        <label htmlFor="regex-text" className="block text-sm font-medium text-foreground">
          Test string
        </label>
        <Textarea
          id="regex-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="min-h-[100px] border-border bg-secondary font-mono text-sm"
        />
      </div>

      <div
        aria-live="polite"
        className="rounded-md border border-border bg-secondary p-3 font-mono text-sm text-foreground"
      >
        {patternError || flagsError
          ? "No matches while the expression is invalid."
          : matches.length > 0
            ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}: ${matches.join(", ")}`
            : "No matches."}
      </div>
    </div>
  );
};

export default RegexTesterTool;
