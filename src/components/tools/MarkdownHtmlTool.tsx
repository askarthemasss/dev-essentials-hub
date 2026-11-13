import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { htmlToMarkdown, markdownToHtml } from "@/lib/markdown";

type Mode = "markdown-to-html" | "html-to-markdown";

const MarkdownHtmlTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("markdown-to-html");

  const output = mode === "markdown-to-html" ? markdownToHtml(input) : htmlToMarkdown(input);

  const switchMode = (nextMode: Mode) => {
    if (output.trim()) setInput(output);
    setMode(nextMode);
  };

  return (
    <DualPane
      input={input}
      output={output}
      onInputChange={setInput}
      inputLabel={mode === "markdown-to-html" ? "Markdown" : "HTML"}
      outputLabel={mode === "markdown-to-html" ? "HTML" : "Markdown"}
      inputPlaceholder={mode === "markdown-to-html" ? "Paste Markdown here…" : "Paste HTML here…"}
      actions={
        <>
          <Button
            size="sm"
            variant={mode === "markdown-to-html" ? "default" : "secondary"}
            onClick={() => switchMode("markdown-to-html")}
          >
            Markdown → HTML
          </Button>
          <Button
            size="sm"
            variant={mode === "html-to-markdown" ? "default" : "secondary"}
            onClick={() => switchMode("html-to-markdown")}
          >
            HTML → Markdown
          </Button>
        </>
      }
    />
  );
};

export default MarkdownHtmlTool;
