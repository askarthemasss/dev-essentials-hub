import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const mdToHtml = (md: string): string => {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n/g, "<br>");
};

const MarkdownPreviewTool = () => {
  const [input, setInput] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n`code snippet`");
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground font-mono">Markdown</label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-sm bg-secondary border-border" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground font-mono">Preview</label>
        <div className="min-h-[400px] rounded-md border border-border bg-secondary p-4 prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: mdToHtml(input) }} />
      </div>
    </div>
  );
};
export default MarkdownPreviewTool;
