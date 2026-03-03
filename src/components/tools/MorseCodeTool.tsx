import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const MORSE: Record<string, string> = {"A":".-","B":"-...","C":"-.-.","D":"-..","E":".","F":"..-.","G":"--.","H":"....","I":"..","J":".---","K":"-.-","L":".-..","M":"--","N":"-.","O":"---","P":".--.","Q":"--.-","R":".-.","S":"...","T":"-","U":"..-","V":"...-","W":".--","X":"-..-","Y":"-.--","Z":"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",".":".-.-.-","?":"..--..","!":"-.-.--"," ":"/"};
const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

const MorseCodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toMorse" | "fromMorse">("toMorse");

  const toMorse = (s: string) => s.toUpperCase().split("").map(c => MORSE[c] || c).join(" ");
  const fromMorse = (s: string) => s.split(" / ").map(w => w.split(" ").map(c => REVERSE_MORSE[c] || c).join("")).join(" ");

  const process = (text: string, m: string) => setOutput(m === "toMorse" ? toMorse(text) : fromMorse(text));

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "toMorse" ? "default" : "secondary"} onClick={() => { setMode("toMorse"); process(input, "toMorse"); }}>To Morse</Button>
        <Button size="sm" variant={mode === "fromMorse" ? "default" : "secondary"} onClick={() => { setMode("fromMorse"); process(input, "fromMorse"); }}>From Morse</Button>
      </>}
    />
  );
};
export default MorseCodeTool;
