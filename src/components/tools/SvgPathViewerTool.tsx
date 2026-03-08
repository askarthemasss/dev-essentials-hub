import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const SvgPathViewerTool = () => {
  const [path, setPath] = useState("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80");

  return (
    <div className="space-y-4">
      <Textarea value={path} onChange={(e) => setPath(e.target.value)} rows={3} className="font-mono text-sm bg-secondary border-border" placeholder="Enter SVG path data (d attribute)…" />
      <div className="flex justify-center p-4 bg-secondary rounded-lg border border-border">
        <svg viewBox="0 0 200 200" width="300" height="300" className="border border-border/50 rounded bg-background">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)" />
          <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default SvgPathViewerTool;
