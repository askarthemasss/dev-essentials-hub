import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const OgPreviewTool = () => {
  const [title, setTitle] = useState("My Page");
  const [desc, setDesc] = useState("Page description");
  const [image, setImage] = useState("https://via.placeholder.com/1200x630");
  const [url, setUrl] = useState("https://example.com");
  const output = `<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n<meta property="og:image" content="${image}">\n<meta property="og:url" content="${url}">\n<meta property="og:type" content="website">`;
  return (
    <div className="space-y-4 max-w-lg">
      {[["Title", title, setTitle], ["Description", desc, setDesc], ["Image URL", image, setImage], ["URL", url, setUrl]].map(([l, v, s]: any) => (
        <div key={l}><label className="text-xs text-muted-foreground font-mono">{l}</label><Input value={v} onChange={(e) => s(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      ))}
      <div className="rounded border border-border p-3">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
        <div className="text-xs text-primary">{url}</div>
      </div>
      <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default OgPreviewTool;
