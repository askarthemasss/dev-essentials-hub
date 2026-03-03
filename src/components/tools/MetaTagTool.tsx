import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const MetaTagTool = () => {
  const [title, setTitle] = useState("My Website");
  const [desc, setDesc] = useState("A great website");
  const [keywords, setKeywords] = useState("web, developer");
  const output = `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta name="keywords" content="${keywords}">`;
  return (
    <div className="space-y-4 max-w-lg">
      <div><label className="text-xs text-muted-foreground font-mono">Title</label><Input value={title} onChange={(e) => setTitle(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div><label className="text-xs text-muted-foreground font-mono">Description</label><Input value={desc} onChange={(e) => setDesc(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <div><label className="text-xs text-muted-foreground font-mono">Keywords</label><Input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <Textarea value={output} readOnly className="min-h-[150px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default MetaTagTool;
