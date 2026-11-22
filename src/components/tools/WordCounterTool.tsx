import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { countGraphemes, countParagraphs, countSentences, countWords } from "@/lib/textStats";
const WordCounterTool = () => {
  const [input, setInput] = useState("");
  const words = countWords(input);
  const chars = countGraphemes(input);
  const sentences = countSentences(input);
  const paragraphs = countParagraphs(input);
  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} aria-label="Text to count" placeholder="Paste text here…" className="min-h-[200px] font-mono text-sm bg-secondary border-border" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[["Words", words], ["Characters", chars], ["Sentences", sentences], ["Paragraphs", paragraphs]].map(([l, v]) => (
          <div key={l as string} className="rounded bg-secondary p-3 text-center"><div className="text-2xl font-bold font-mono">{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>
        ))}
      </div>
    </div>
  );
};
export default WordCounterTool;
