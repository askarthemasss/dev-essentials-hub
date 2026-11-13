import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function normalizeHex(value: string, fallback: string): string {
  const cleaned = value.trim().replace(/^#/, "");
  return /^[0-9a-f]{6}$/i.test(cleaned) ? cleaned : fallback;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const PlaceholderImageTool = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [text, setText] = useState("400x300");
  const [background, setBackground] = useState("1a1a2e");
  const [foreground, setForeground] = useState("00d4ff");

  const safeWidth = Math.min(2000, Math.max(16, Number.isFinite(width) ? width : 400));
  const safeHeight = Math.min(2000, Math.max(16, Number.isFinite(height) ? height : 300));
  const safeBackground = normalizeHex(background, "1a1a2e");
  const safeForeground = normalizeHex(foreground, "00d4ff");
  const label = text.trim() || `${safeWidth}×${safeHeight}`;
  const fontSize = Math.max(12, Math.min(safeWidth, safeHeight) / 8);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}">
  <rect width="100%" height="100%" fill="#${safeBackground}"/>
  <text x="50%" y="50%" fill="#${safeForeground}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
</svg>`;
  const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="placeholder-width" className="mb-1 block font-mono text-xs text-muted-foreground">
            Width
          </label>
          <Input
            id="placeholder-width"
            type="number"
            min={16}
            max={2000}
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
            className="border-border bg-secondary font-mono"
          />
        </div>
        <div>
          <label htmlFor="placeholder-height" className="mb-1 block font-mono text-xs text-muted-foreground">
            Height
          </label>
          <Input
            id="placeholder-height"
            type="number"
            min={16}
            max={2000}
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
            className="border-border bg-secondary font-mono"
          />
        </div>
      </div>

      <div>
        <label htmlFor="placeholder-text" className="mb-1 block font-mono text-xs text-muted-foreground">
          Text
        </label>
        <Input
          id="placeholder-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={`${safeWidth}×${safeHeight}`}
          className="border-border bg-secondary font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <label htmlFor="placeholder-bg" className="mb-1 block font-mono text-xs text-muted-foreground">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              id="placeholder-bg"
              type="color"
              value={`#${safeBackground}`}
              onChange={(event) => setBackground(event.target.value.replace(/^#/, ""))}
              className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
            />
            <span className="font-mono text-xs text-muted-foreground">#{safeBackground}</span>
          </div>
        </div>
        <div>
          <label htmlFor="placeholder-fg" className="mb-1 block font-mono text-xs text-muted-foreground">
            Text color
          </label>
          <div className="flex items-center gap-2">
            <input
              id="placeholder-fg"
              type="color"
              value={`#${safeForeground}`}
              onChange={(event) => setForeground(event.target.value.replace(/^#/, ""))}
              className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
            />
            <span className="font-mono text-xs text-muted-foreground">#{safeForeground}</span>
          </div>
        </div>
      </div>

      <div className="rounded border border-border bg-secondary p-3">
        <img src={dataUri} alt={`Placeholder ${safeWidth} by ${safeHeight}`} className="mx-auto max-w-full rounded" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline">
          <a href={dataUri} download={`placeholder-${safeWidth}x${safeHeight}.svg`}>
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Download SVG
          </a>
        </Button>
        <span className="text-xs text-muted-foreground">Generated locally — no image service involved.</span>
      </div>

      <Textarea value={dataUri} readOnly rows={4} className="border-border bg-secondary font-mono text-xs" aria-label="SVG data URI" />
    </div>
  );
};

export default PlaceholderImageTool;
