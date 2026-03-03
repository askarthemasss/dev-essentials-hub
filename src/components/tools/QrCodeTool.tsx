import { useState } from "react";
import { Input } from "@/components/ui/input";

const QrCodeTool = () => {
  const [text, setText] = useState("https://example.com");
  const size = 200;
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  return (
    <div className="space-y-4 max-w-md">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL…" className="font-mono bg-secondary border-border" />
      {text && <div className="rounded bg-secondary p-4 flex justify-center"><img src={url} alt="QR Code" width={size} height={size} className="rounded" /></div>}
    </div>
  );
};
export default QrCodeTool;
