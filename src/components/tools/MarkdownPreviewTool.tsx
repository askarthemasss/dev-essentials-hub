import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { markdownToSafeHtml } from "@/lib/markdown";

const MarkdownPreviewTool = () => {
  const [input, setInput] = useState(
    "# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n`code snippet`"
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="markdown-input" className="text-xs font-medium text-muted-foreground font-mono">
          Markdown
        </label>
        <Textarea
          id="markdown-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[400px] font-mono text-sm bg-secondary border-border"
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground font-mono">Preview</span>
        <div
          className="min-h-[400px] rounded-md border border-border bg-secondary p-4 prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToSafeHtml(input) }}
        />
      </div>
    </div>
  );
};

export default MarkdownPreviewTool;
