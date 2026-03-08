import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const cssToTw: Record<string, string> = {
  "display: flex": "flex",
  "display: grid": "grid",
  "display: block": "block",
  "display: inline-block": "inline-block",
  "display: inline": "inline",
  "display: none": "hidden",
  "position: relative": "relative",
  "position: absolute": "absolute",
  "position: fixed": "fixed",
  "position: sticky": "sticky",
  "text-align: center": "text-center",
  "text-align: left": "text-left",
  "text-align: right": "text-right",
  "font-weight: bold": "font-bold",
  "font-weight: 700": "font-bold",
  "font-weight: 600": "font-semibold",
  "font-weight: 500": "font-medium",
  "font-weight: 400": "font-normal",
  "font-weight: 300": "font-light",
  "font-style: italic": "italic",
  "text-decoration: underline": "underline",
  "text-decoration: line-through": "line-through",
  "text-decoration: none": "no-underline",
  "overflow: hidden": "overflow-hidden",
  "overflow: auto": "overflow-auto",
  "overflow: scroll": "overflow-scroll",
  "cursor: pointer": "cursor-pointer",
  "cursor: not-allowed": "cursor-not-allowed",
  "white-space: nowrap": "whitespace-nowrap",
  "white-space: pre": "whitespace-pre",
  "word-break: break-all": "break-all",
  "flex-direction: column": "flex-col",
  "flex-direction: row": "flex-row",
  "flex-wrap: wrap": "flex-wrap",
  "justify-content: center": "justify-center",
  "justify-content: space-between": "justify-between",
  "justify-content: space-around": "justify-around",
  "justify-content: flex-start": "justify-start",
  "justify-content: flex-end": "justify-end",
  "align-items: center": "items-center",
  "align-items: flex-start": "items-start",
  "align-items: flex-end": "items-end",
  "align-items: stretch": "items-stretch",
  "border-radius: 9999px": "rounded-full",
  "border-radius: 0": "rounded-none",
  "opacity: 0": "opacity-0",
  "opacity: 1": "opacity-100",
  "pointer-events: none": "pointer-events-none",
  "visibility: hidden": "invisible",
  "visibility: visible": "visible",
  "object-fit: cover": "object-cover",
  "object-fit: contain": "object-contain",
  "list-style: none": "list-none",
};

function convertValue(prop: string, val: string): string {
  const pxToRem = (px: string) => {
    const n = parseInt(px);
    if (n === 0) return "0";
    if (n % 4 === 0) return String(n / 4);
    return `[${px}]`;
  };

  const pxMatch = val.match(/^(\d+)px$/);

  if (["margin", "margin-top", "margin-bottom", "margin-left", "margin-right"].includes(prop) && pxMatch) {
    const prefix = prop === "margin" ? "m" : prop === "margin-top" ? "mt" : prop === "margin-bottom" ? "mb" : prop === "margin-left" ? "ml" : "mr";
    return `${prefix}-${pxToRem(val)}`;
  }
  if (["padding", "padding-top", "padding-bottom", "padding-left", "padding-right"].includes(prop) && pxMatch) {
    const prefix = prop === "padding" ? "p" : prop === "padding-top" ? "pt" : prop === "padding-bottom" ? "pb" : prop === "padding-left" ? "pl" : "pr";
    return `${prefix}-${pxToRem(val)}`;
  }
  if (prop === "width" && pxMatch) return `w-${pxToRem(val)}`;
  if (prop === "height" && pxMatch) return `h-${pxToRem(val)}`;
  if (prop === "width" && val === "100%") return "w-full";
  if (prop === "height" && val === "100%") return "h-full";
  if (prop === "width" && val === "auto") return "w-auto";
  if (prop === "max-width" && val === "100%") return "max-w-full";
  if (prop === "min-height" && val === "100vh") return "min-h-screen";
  if (prop === "font-size" && pxMatch) return `text-[${val}]`;
  if (prop === "line-height" && pxMatch) return `leading-[${val}]`;
  if (prop === "gap" && pxMatch) return `gap-${pxToRem(val)}`;
  if (prop === "border-radius" && pxMatch) return `rounded-[${val}]`;
  if (prop === "z-index") return `z-${val}`;
  return "";
}

function cssToTailwind(css: string): string {
  const lines = css.split("\n").map((l) => l.trim()).filter(Boolean);
  const results: string[] = [];

  for (const line of lines) {
    const clean = line.replace(/;$/, "").trim();
    if (clean.startsWith("{") || clean.startsWith("}") || clean.startsWith("//") || clean.startsWith("/*")) continue;
    if (!clean.includes(":")) continue;

    const full = clean.replace(/\s*:\s*/, ": ");
    if (cssToTw[full]) {
      results.push(cssToTw[full]);
      continue;
    }

    const [prop, ...rest] = clean.split(":");
    const val = rest.join(":").trim();
    const converted = convertValue(prop.trim(), val);
    if (converted) {
      results.push(converted);
    } else {
      results.push(`/* ${clean} */`);
    }
  }

  return results.join(" ");
}

const TailwindConverterTool = () => {
  const [input, setInput] = useState(`display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 16px;
margin-top: 8px;
gap: 12px;
width: 100%;
font-weight: bold;
cursor: pointer;`);

  const output = cssToTailwind(input);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-mono text-muted-foreground mb-1 block">CSS Properties</label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="font-mono text-sm bg-secondary border-border" placeholder="Paste CSS properties…" />
      </div>
      <div className="relative">
        <label className="text-sm font-mono text-muted-foreground mb-1 block">Tailwind Classes</label>
        <div className="rounded-lg border border-border bg-secondary p-4 font-mono text-sm text-foreground break-words min-h-[60px]">
          {output || "Enter CSS to convert"}
        </div>
        <Button size="icon" variant="ghost" className="absolute top-8 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default TailwindConverterTool;
