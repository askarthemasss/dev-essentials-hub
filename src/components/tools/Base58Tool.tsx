import { useState } from "react";
import DualPane from "./DualPane";

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function base58Encode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let num = BigInt(0);
  for (const b of bytes) num = num * 256n + BigInt(b);
  let result = "";
  while (num > 0n) {
    result = ALPHABET[Number(num % 58n)] + result;
    num = num / 58n;
  }
  for (const b of bytes) { if (b === 0) result = "1" + result; else break; }
  return result;
}

function base58Decode(encoded: string): string {
  let num = BigInt(0);
  for (const ch of encoded) {
    const idx = ALPHABET.indexOf(ch);
    if (idx === -1) return "Error: Invalid Base58 character";
    num = num * 58n + BigInt(idx);
  }
  const hex = num.toString(16);
  const padded = hex.length % 2 ? "0" + hex : hex;
  const bytes = [];
  for (let i = 0; i < padded.length; i += 2) bytes.push(parseInt(padded.slice(i, i + 2), 16));
  for (const ch of encoded) { if (ch === "1") bytes.unshift(0); else break; }
  return new TextDecoder().decode(new Uint8Array(bytes));
}

const Base58Tool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("encode")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "encode" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Encode</button>
        <button onClick={() => setMode("decode")} className={`px-3 py-1 rounded text-sm font-mono ${mode === "decode" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Decode</button>
      </div>
      <DualPane
        inputLabel={mode === "encode" ? "Text" : "Base58"}
        outputLabel={mode === "encode" ? "Base58" : "Text"}
        input={input}
        output={input ? (mode === "encode" ? base58Encode(input) : base58Decode(input)) : ""}
        onInputChange={setInput}
      />
    </div>
  );
};

export default Base58Tool;
