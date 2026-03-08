import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy } from "lucide-react";

const shapes = ["circle", "ellipse", "polygon", "inset"] as const;
type Shape = typeof shapes[number];

const CssClipPathTool = () => {
  const [shape, setShape] = useState<Shape>("circle");
  const [radius, setRadius] = useState(50);
  const [inset, setInset] = useState(10);

  const getClipPath = () => {
    switch (shape) {
      case "circle": return `circle(${radius}% at 50% 50%)`;
      case "ellipse": return `ellipse(${radius}% ${Math.round(radius * 0.7)}% at 50% 50%)`;
      case "polygon": return `polygon(50% ${100 - radius}%, ${radius}% 100%, ${100 - radius}% 100%)`;
      case "inset": return `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${inset}px)`;
    }
  };

  const css = `clip-path: ${getClipPath()};`;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {shapes.map((s) => (
          <Button key={s} size="sm" variant={shape === s ? "default" : "outline"} onClick={() => setShape(s)}>{s}</Button>
        ))}
      </div>
      <div>
        <label className="text-sm font-mono text-muted-foreground mb-1 block">{shape === "inset" ? "Inset" : "Size"}: {shape === "inset" ? inset : radius}%</label>
        <Slider value={[shape === "inset" ? inset : radius]} onValueChange={([v]) => shape === "inset" ? setInset(v) : setRadius(v)} min={5} max={95} step={1} />
      </div>
      <div className="flex justify-center p-8 bg-secondary rounded-lg border border-border">
        <div className="w-48 h-48 bg-primary" style={{ clipPath: getClipPath() }} />
      </div>
      <div className="relative rounded-lg border border-border bg-secondary p-4">
        <code className="font-mono text-sm text-foreground">{css}</code>
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(css)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default CssClipPathTool;
