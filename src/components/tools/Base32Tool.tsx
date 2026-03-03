import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const base32Encode = (s: string): string => {
  const bytes = new TextEncoder().encode(s);
  let bits = "", result = "";
  bytes.forEach(b => bits += b.toString(2).padStart(8, "0"));
  while (bits.length % 5) bits += "0";
  for (let i = 0; i < bits.length; i += 5) result += CHARS[parseInt(bits.slice(i, i + 5), 2)];
  while (result.length % 8) result += "=";
  return result;
};
const base32Decode = (s: string): string => {
  let bits = "";
  s.replace(/=/g, "").split("").forEach(c => bits += CHARS.indexOf(c.toUpperCase()).toString(2).padStart(5, "0"));
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return new TextDecoder().decode(new Uint8Array(bytes));
};

const Base32Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const process = (text: string, m: string) => { try { setOutput(m === "encode" ? base32Encode(text) : base32Decode(text)); } catch { setOutput("Error"); } };
  return (
    <DualPane input={input} output={output} onInputChange={(v) => { setInput(v); process(v, mode); }}
      actions={<>
        <Button size="sm" variant={mode === "encode" ? "default" : "secondary"} onClick={() => { setMode("encode"); process(input, "encode"); }}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "secondary"} onClick={() => { setMode("decode"); process(input, "decode"); }}>Decode</Button>
      </>}
    />
  );
};
export default Base32Tool;
