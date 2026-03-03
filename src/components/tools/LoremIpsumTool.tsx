import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"];

const LoremIpsumTool = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState("paragraphs");

  const genSentence = () => {
    const len = 8 + Math.floor(Math.random() * 12);
    const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };
  const genParagraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, genSentence).join(" ");

  const output = type === "paragraphs"
    ? Array.from({ length: count }, genParagraph).join("\n\n")
    : type === "sentences"
    ? Array.from({ length: count }, genSentence).join(" ")
    : Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24 font-mono bg-secondary border-border" />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraphs">Paragraphs</SelectItem>
            <SelectItem value="sentences">Sentences</SelectItem>
            <SelectItem value="words">Words</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea value={output} readOnly className="min-h-[300px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default LoremIpsumTool;
