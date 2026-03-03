import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const FaviconTool = () => {
  const [url, setUrl] = useState("/favicon.ico");
  const [color, setColor] = useState("#00d4ff");
  const output = `<link rel="icon" type="image/x-icon" href="${url}">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<meta name="theme-color" content="${color}">`;
  return (
    <div className="space-y-4 max-w-lg">
      <div><label className="text-xs text-muted-foreground font-mono">Favicon URL</label><Input value={url} onChange={(e) => setUrl(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div><label className="text-xs text-muted-foreground font-mono">Theme Color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="block h-8 w-16" /></div>
      <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default FaviconTool;
