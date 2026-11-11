import { useMemo, useState } from "react";
import selectorParser from "postcss-selector-parser";
import { selectorSpecificity } from "@csstools/selector-specificity";
import { Input } from "@/components/ui/input";

interface SpecificityRow {
  selector: string;
  a: number;
  b: number;
  c: number;
}

const CssSpecificityTool = () => {
  const [selector, setSelector] = useState("#app .card > a:hover");

  const result = useMemo(() => {
    const value = selector.trim();
    if (!value) return { rows: [] as SpecificityRow[], error: "" };

    try {
      const root = selectorParser().astSync(value);
      const rows = Array.from(root.nodes).map((node) => {
        const specificity = selectorSpecificity(node);
        return { selector: String(node).trim(), ...specificity };
      });
      return { rows, error: "" };
    } catch (caught) {
      return {
        rows: [] as SpecificityRow[],
        error: caught instanceof Error ? caught.message : "Invalid selector",
      };
    }
  }, [selector]);

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <label htmlFor="css-selector" className="mb-1 block font-mono text-xs text-muted-foreground">
          CSS selector
        </label>
        <Input
          id="css-selector"
          value={selector}
          onChange={(event) => setSelector(event.target.value)}
          placeholder="#app .card > a:hover"
          spellCheck={false}
          aria-invalid={Boolean(result.error)}
          className="border-border bg-secondary font-mono"
        />
      </div>

      {result.error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {result.error}
        </p>
      )}

      {result.rows.length > 0 && (
        <div className="overflow-auto rounded border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th scope="col" className="px-3 py-2 text-left font-mono text-xs text-muted-foreground">
                  Selector
                </th>
                <th scope="col" className="px-3 py-2 text-center font-mono text-xs text-muted-foreground">
                  IDs
                </th>
                <th scope="col" className="px-3 py-2 text-center font-mono text-xs text-muted-foreground">
                  Classes
                </th>
                <th scope="col" className="px-3 py-2 text-center font-mono text-xs text-muted-foreground">
                  Elements
                </th>
                <th scope="col" className="px-3 py-2 text-right font-mono text-xs text-muted-foreground">
                  Specificity
                </th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, index) => (
                <tr key={`${row.selector}-${index}`} className="border-b border-border last:border-0">
                  <td className="break-all px-3 py-2 font-mono text-xs text-foreground">{row.selector}</td>
                  <td className="px-3 py-2 text-center font-mono text-sm">{row.a}</td>
                  <td className="px-3 py-2 text-center font-mono text-sm">{row.b}</td>
                  <td className="px-3 py-2 text-center font-mono text-sm">{row.c}</td>
                  <td className="px-3 py-2 text-right font-mono text-sm text-primary">
                    ({row.a},{row.b},{row.c})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded border border-border bg-secondary p-3 text-xs text-muted-foreground">
        Specificity is compared lexicographically: IDs first, then classes/attributes/pseudo-classes, then elements and
        pseudo-elements. Inline styles beat every selector, and <span className="font-mono">!important</span> is handled
        separately by the cascade.
      </div>
    </div>
  );
};

export default CssSpecificityTool;
