import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";
import { isConversionResult } from "@/lib/conversion";
import { morseToText, textToMorse } from "@/lib/morse";

const MorseCodeTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toMorse" | "fromMorse">("toMorse");

  const process = (text: string, nextMode: "toMorse" | "fromMorse") =>
    setOutput(nextMode === "toMorse" ? textToMorse(text) : morseToText(text));

  const switchMode = (nextMode: "toMorse" | "fromMorse") => {
    if (nextMode === mode) return;
    const nextInput = isConversionResult(output) ? output : input;
    setMode(nextMode);
    setInput(nextInput);
    process(nextInput, nextMode);
  };

  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "toMorse" ? "default" : "secondary"} onClick={() => switchMode("toMorse")}>To Morse</Button>
        <Button size="sm" variant={mode === "fromMorse" ? "default" : "secondary"} onClick={() => switchMode("fromMorse")}>From Morse</Button>
      </>}
    />
  );
};
export default MorseCodeTool;
