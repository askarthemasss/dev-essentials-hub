import { useState } from "react";
import DualPane from "./DualPane";
import { textToAsciiArt } from "@/lib/asciiArt";

const AsciiArtTool = () => {
  const [input, setInput] = useState("Hi");
  return (
    <DualPane
      input={input}
      output={textToAsciiArt(input)}
      onInputChange={setInput}
      inputPlaceholder="Enter text using letters, digits and common punctuation…"
    />
  );
};

export default AsciiArtTool;
